import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const [jobCount, applicationCount] = await Promise.all([
    prisma.job.count(),
    prisma.application.count({
      where: {
        userId: session.user.id,
      },
    }),
  ]);

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-bold">
        JobTrack Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome, {session.user.name}
      </p>

      <p className="text-gray-600">
        {session.user.email}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <p className="text-sm text-gray-500">
            Available Jobs
          </p>

          <p className="mt-2 text-3xl font-bold">
            {jobCount}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <p className="text-sm text-gray-500">
            My Applications
          </p>

          <p className="mt-2 text-3xl font-bold">
            {applicationCount}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <a
          href="/jobs"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Browse Jobs
        </a>

        <a
          href="/applications"
          className="rounded border px-4 py-2"
        >
          My Applications
        </a>
      </div>

      <LogoutButton />
    </main>
  );
}