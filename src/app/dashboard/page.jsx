import { getAuthSession } from "@/lib/authOptions";
import Image from "next/image";

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-300">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">You are not authenticated</h1>
          <p>
            Please{" "}
            <a href="/signIn" className="text-blue-500 underline">
              sign in
            </a>{" "}
            to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <section className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {session.user.name} 👋</h1>
            <p className="text-gray-400 mt-1">Here's what's happening today in BlogWarden.</p>
          </div>
          <Image
            src={session.user.image}
            alt="User Profile"
            width={48}
            height={48}
            className="rounded-full border border-gray-700 shadow-md"
          />
        </div>

        {/* Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">📝 New Post</h2>
            <p className="text-gray-400 mt-2">Start writing a new blog post.</p>
          </div>

          <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">📊 Analytics</h2>
            <p className="text-gray-400 mt-2">View stats on your recent posts.</p>
          </div>

          <div className="p-4 bg-gray-900 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">📚 My Posts</h2>
            <p className="text-gray-400 mt-2">Manage or edit your existing blogs.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

