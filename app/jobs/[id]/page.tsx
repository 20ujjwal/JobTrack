import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { applyToJob } from "../actions";

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobPage({
  params,
}: JobPageProps) {
  const { id } = await params;

  const jobId = Number(id);

  if (Number.isNaN(jobId)) {
    notFound();
  }

  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/jobs"
        className="text-sm text-gray-500 hover:underline"
      >
        ← Back to Jobs
      </Link>

      <div className="mt-6 rounded-2xl border p-8 shadow-sm">
        <p className="text-sm font-medium text-gray-500">
          {job.company}
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          {job.position}
        </h1>

        <p className="mt-4 text-xl font-semibold">
          ₹{job.salary.toLocaleString()}
        </p>

        <form action={applyToJob}>
          <input type="hidden" name="jobId" value={job.id} />

          <button
            type="submit"
            className="rounded bg-black px-4 py-2 text-white"
          >
            Apply to Job
          </button>
        </form>

        <div className="mt-8">
          <Link
            href={`/jobs/${job.id}/edit`}
            className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80"
          >
            Edit Job
          </Link>
        </div>
      </div>
    </main>
  );
}