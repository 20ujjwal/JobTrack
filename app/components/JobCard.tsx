import Link from "next/link";
import { applyToJob } from "@/app/jobs/actions";

interface Job {
  id: number;
  company: string;
  position: string;
  salary: number;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <article className="rounded-xl border bg-gray-50/50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-gray-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {job.company}
          </p>

          <h2 className="mt-1 text-xl font-semibold">
            {job.position}
          </h2>
        </div>

        <p className="font-semibold">
          ₹{job.salary.toLocaleString()}
        </p>
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href={`/jobs/${job.id}`}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
        >
          View Job
        </Link>

        <Link
          href={`/jobs/${job.id}/edit`}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80"
        >
          Edit
        </Link>

        {/* 
          This form connects the UI to our existing applyToJob Server Action.
          The hidden input tells the action which job the user is applying to.
        */}
        <form action={applyToJob}>
          <input
            type="hidden"
            name="jobId"
            value={job.id}
          />

          <button
            type="submit"
            className="rounded-lg border border-black px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
          >
            Apply
          </button>
        </form>
      </div>
    </article>
  );
}