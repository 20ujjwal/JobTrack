import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-500">
            JobTrack
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Manage your job search in one place.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Track jobs, manage applications, and keep your job search
            organized with a simple full-stack platform.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-black px-5 py-3 font-medium text-white"
            >
              Get Started
            </Link>

            <Link
              href="/jobs"
              className="rounded-lg border px-5 py-3 font-medium"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Track Jobs
            </h2>

            <p className="mt-2 text-gray-600">
              Keep job opportunities organized with company,
              position, and salary information.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Manage Applications
            </h2>

            <p className="mt-2 text-gray-600">
              Apply to jobs and keep track of your application
              status from one place.
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Secure Accounts
            </h2>

            <p className="mt-2 text-gray-600">
              Each user's applications are connected to their
              authenticated account.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="border-t">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Start organizing your job search
          </h2>

          <p className="mt-3 text-gray-600">
            Create an account and start tracking your applications.
          </p>

          <Link
            href="/register"
            className="mt-6 inline-block rounded-lg bg-black px-5 py-3 font-medium text-white"
          >
            Create Account
          </Link>
        </div>
      </section>
    </main>
  );
}