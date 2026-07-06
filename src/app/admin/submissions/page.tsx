import { prisma } from "@/lib/prisma";

export default async function AdminSubmissionsPage() {
  const submissions = await prisma.formSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-800">Submissions</h1>

      {submissions.length === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
          <p className="text-3xl">📭</p>
          <p className="mt-3 text-lg font-medium text-stone-600">
            No submissions yet
          </p>
          <p className="mt-1 text-sm text-stone-400">
            Contact form submissions will appear here once visitors start using
            the form.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                <th className="px-5 py-3">Date / Time</th>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Contact Info</th>
                <th className="px-5 py-3">Message</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {submissions.map((s: { id: number; formType: string; name: string; contactInfo: string; message: string; createdAt: Date }) => (
                <tr key={s.id} className="hover:bg-stone-50">
                  <td className="whitespace-nowrap px-5 py-3.5 text-stone-500">
                    {s.createdAt.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-5 py-3.5 font-medium text-stone-800">
                    {s.name}
                  </td>
                  <td className="px-5 py-3.5 text-stone-600">{s.contactInfo}</td>
                  <td className="px-5 py-3.5 text-stone-600 max-w-xs break-words">
                    {s.message}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
