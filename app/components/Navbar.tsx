import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/dashboard" className="text-xl font-bold">
          JobTrack
        </Link>

        <div className="flex gap-4">
          <Link href="/jobs">Jobs</Link>
          <Link href="/applications">Applications</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </div>
    </nav>
  );
}