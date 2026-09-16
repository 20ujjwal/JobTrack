import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import JobCard from "../components/JobCard";

export default async function JobsPage() {
  // Check whether the user is logged in.
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If the user is not logged in,
  // don't query the database and show a simple login message.
  if (!session) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">
          Login Required
        </h1>

        <p className="mt-3 text-gray-600">
          Please login or create an account to view and manage jobs.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-80"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-gray-50"
          >
            Register
          </Link>
        </div>
      </main>
    );
  }

  // User is logged in, so now we can fetch jobs.
  const jobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            JobTrack
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            My Jobs
          </h1>

          <p className="mt-2 text-gray-600">
            Find and track opportunities that interest you.
          </p>
        </div>

        <Link
          href="/jobs/new"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80"
        >
          Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold">
            No jobs available
          </h2>

          <p className="mt-2 text-gray-500">
            Create your first job to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </main>
  );
}