"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createJob(formData: FormData) {
  // FormData contains the values submitted by the HTML form.
  const company = formData.get("company");
  const position = formData.get("position");
  const salary = formData.get("salary");

  // Basic server-side validation.
  if (
    typeof company !== "string" ||
    typeof position !== "string" ||
    typeof salary !== "string"
  ) {
    throw new Error("Invalid form data.");
  }

  if (!company.trim() || !position.trim() || !salary.trim()) {
    throw new Error("All fields are required.");
  }

  const salaryNumber = Number(salary);

  if (Number.isNaN(salaryNumber)) {
    throw new Error("Salary must be a valid number.");
  }

  // Create the job in PostgreSQL through Prisma.
  await prisma.job.create({
    data: {
      company: company.trim(),
      position: position.trim(),
      salary: salaryNumber,
    },
  });

  // Tell Next.js that the jobs page should use fresh data.
  revalidatePath("/jobs");

  // Send the user back to the jobs list.
  redirect("/jobs");
}
export async function updateJob(formData: FormData) {
  // Get the values submitted by the edit form.
  const id = formData.get("id");
  const company = formData.get("company");
  const position = formData.get("position");
  const salary = formData.get("salary");

  // Make sure all values have the expected type.
  if (
    typeof id !== "string" ||
    typeof company !== "string" ||
    typeof position !== "string" ||
    typeof salary !== "string"
  ) {
    throw new Error("Invalid form data.");
  }

  const jobId = Number(id);
  const salaryNumber = Number(salary);

  // Validate the converted numbers.
  if (Number.isNaN(jobId)) {
    throw new Error("Invalid job ID.");
  }

  if (Number.isNaN(salaryNumber)) {
    throw new Error("Salary must be a valid number.");
  }

  // Validate text fields.
  if (!company.trim() || !position.trim()) {
    throw new Error("Company and position are required.");
  }

  // Make sure the job exists before trying to update it.
  const existingJob = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!existingJob) {
    throw new Error("Job not found.");
  }

  // Update the existing job in PostgreSQL.
  await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      company: company.trim(),
      position: position.trim(),
      salary: salaryNumber,
    },
  });

  // Refresh pages that display this job.
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${jobId}`);

  // Return to the updated job.
  redirect(`/jobs/${jobId}`);
}
export async function applyToJob(formData: FormData) {
  const jobIdValue = formData.get("jobId");

  if (typeof jobIdValue !== "string") {
    throw new Error("Invalid job ID.");
  }

  const jobId = Number(jobIdValue);

  if (Number.isNaN(jobId)) {
    throw new Error("Invalid job ID.");
  }

  // Get the currently logged-in user.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Make sure the job actually exists.
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    throw new Error("Job not found.");
  }

  // Prevent duplicate applications.
  const existingApplication = await prisma.application.findUnique({
    where: {
      userId_jobId: {
        userId: session.user.id,
        jobId,
      },
    },
  });

  if (existingApplication) {
    throw new Error("You have already applied to this job.");
  }

  await prisma.application.create({
    data: {
      status: "Applied",
      userId: session.user.id,
      jobId,
    },
  });

  revalidatePath("/jobs");
  revalidatePath("/dashboard");
  revalidatePath("/applications");

  redirect("/applications");
}
export async function updateApplicationStatus(formData: FormData) {
  const applicationIdValue = formData.get("applicationId");
  const status = formData.get("status");

  if (
    typeof applicationIdValue !== "string" ||
    typeof status !== "string"
  ) {
    throw new Error("Invalid application data.");
  }

  const applicationId = Number(applicationIdValue);

  if (Number.isNaN(applicationId)) {
    throw new Error("Invalid application ID.");
  }

  const allowedStatuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid application status.");
  }

  // Get the currently logged-in user.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Find the application.
  const application = await prisma.application.findUnique({
    where: {
      id: applicationId,
    },
  });

  if (!application) {
    throw new Error("Application not found.");
  }

  // Make sure the application belongs to this user.
  if (application.userId !== session.user.id) {
    throw new Error("You are not allowed to update this application.");
  }

  // Update the existing application.
  await prisma.application.update({
    where: {
      id: applicationId,
    },
    data: {
      status: status,
    },
  });

  // Refresh the applications page.
  revalidatePath("/applications");

  // Explicitly render the applications page again.
  redirect("/applications");
}