import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { updateApplicationStatus } from "@/app/jobs/actions";

export default async function ApplicationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const applications = await prisma.application.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      job: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div>
        <p className="text-sm font-medium text-gray-500">
          JobTrack
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          My Applications
        </h1>

        <p className="mt-2 text-gray-600">
          Track the progress of the jobs you have applied to.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed p-10 text-center">
          <h2 className="text-lg font-semibold">
            No applications yet
          </h2>

          <p className="mt-2 text-gray-500">
            Apply to a job from My Jobs and it will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-xl border p-5 shadow-sm"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {application.job.position}
                  </h2>

                  <p className="mt-1 text-gray-600">
                    {application.job.company}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Applied on{" "}
                    {application.createdAt.toLocaleDateString()}
                  </p>
                </div>

                <form action={updateApplicationStatus}>
                  <input
                    type="hidden"
                    name="applicationId"
                    value={application.id}
                  />

                  <div className="flex items-center gap-3">
                    <label
                      htmlFor={`status-${application.id}`}
                      className="text-sm font-medium"
                    >
                      Status
                    </label>

                    <select
                      id={`status-${application.id}`}
                      name="status"
                      defaultValue={application.status}
                      className="rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm font-medium text-white outline-none transition hover:bg-gray-700 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                    >
                      <option value="Applied" className="bg-gray-800 text-white">
                        Applied
                      </option>

                      <option value="Interview" className="bg-gray-800 text-white">
                        Interview
                      </option>

                      <option value="Offer" className="bg-gray-800 text-white">
                        Offer
                      </option>

                      <option value="Rejected" className="bg-gray-800 text-white">
                        Rejected
                      </option>

                      <option value="Withdrawn" className="bg-gray-800 text-white">
                        Withdrawn
                      </option>
                    </select>
                    <button
                      type="submit"
                      className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-80"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}