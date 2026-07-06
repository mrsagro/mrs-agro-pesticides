import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const totalSubmissions = await prisma.formSubmission.count();

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const visitsThisWeek = await prisma.visitLog.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });

  const totalVisits = await prisma.visitLog.count();

  const mostVisitedPage = await prisma.visitLog.groupBy({
    by: ["page"],
    _count: { page: true },
    orderBy: { _count: { page: "desc" } },
    take: 1,
  });

  const topPage =
    mostVisitedPage.length > 0
      ? mostVisitedPage[0].page
      : "—";

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-800">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Submissions"
          value={totalSubmissions.toString()}
          color="bg-emerald-500"
        />
        <StatCard
          label="Visits This Week"
          value={visitsThisWeek.toString()}
          color="bg-blue-500"
        />
        <StatCard
          label="Total Visits"
          value={totalVisits.toString()}
          color="bg-violet-500"
        />
        <StatCard
          label="Most Visited Page"
          value={topPage}
          color="bg-amber-500"
        />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className={`mb-3 h-1.5 w-12 rounded-full ${color}`} />
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-stone-800 truncate">{value}</p>
    </div>
  );
}
