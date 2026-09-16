import Link from "next/link";
import { createJob } from "../actions";

export default function NewJobPage() {
  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <div className="mb-8">
        <Link
          href="/jobs"
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back to Jobs
        </Link>

        <h1 className="mt-4 text-3xl font-bold">
          Add New Job
        </h1>

        <p className="mt-2 text-gray-600">
          Add a job opportunity to JobTrack.
        </p>
      </div>

     <form action={createJob} className="space-y-5">
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
            placeholder="e.g. Microsoft"
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
            placeholder="e.g. Frontend Developer"
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
            placeholder="e.g. 800000"
            className="w-full rounded-lg border px-3 py-2 outline-none transition focus:ring-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:opacity-80"
        >
          Create Job
        </button>
      </form>
    </main>
  );
}