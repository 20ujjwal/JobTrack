import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { updateJob } from "@/app/jobs/actions";

interface EditJobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditJobPage({
  params,
}: EditJobPageProps) {
  // Get the job ID from the dynamic URL.
  const { id } = await params;

  const jobId = Number(id);

  if (Number.isNaN(jobId)) {
    notFound();
  }

  // Find the existing job in PostgreSQL.
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  // If the job doesn't exist, show the 404 page.
  if (!job) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <Link
        href={`/jobs/${job.id}`}
        className="text-sm text-gray-500 hover:underline"
      >
        ← Back to Job
      </Link>

      <div className="mb-8">
        <h1 className="mt-4 text-3xl font-bold">
          Edit Job
        </h1>

        <p className="mt-2 text-gray-600">
          Update the job information.
        </p>
      </div>

      {/* 
        The form sends its data to the updateJob Server Action.
      */}
      <form action={updateJob} className="space-y-5">
        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-sm font-medium"
          >
            Company
          </label>

          <input
            id="company"
            name="company"
            type="text"
            defaultValue={job.company}
            className="w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="position"
            className="mb-2 block text-sm font-medium"
          >
            Position
          </label>

          <input
            id="position"
            name="position"
            type="text"
            defaultValue={job.position}
            className="w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="salary"
            className="mb-2 block text-sm font-medium"
          >
            Salary
          </label>

          <input
            id="salary"
            name="salary"
            type="number"
            defaultValue={job.salary}
            className="w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2"
            required
          />
        </div>

        {/* 
          The ID is sent to the Server Action so it knows
          which database record should be updated.
        */}
        <input
          type="hidden"
          name="id"
          value={job.id}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:opacity-80"
        >
          Update Job
        </button>
      </form>
    </main>
  );
}