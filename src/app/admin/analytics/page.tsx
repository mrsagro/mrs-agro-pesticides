import { prisma } from "@/lib/prisma";

export default async function AdminAnalyticsPage() {
  const totalVisits = await prisma.visitLog.count();

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const visitsThisWeek = await prisma.visitLog.count({
    where: { createdAt: { gte: sevenDaysAgo } },
  });

  const visitsByPage = await prisma.visitLog.groupBy({
    by: ["page"],
    _count: { page: true },
    orderBy: { _count: { page: "desc" } },
    take: 10,
  });

  const visitsByCountry = await prisma.visitLog.groupBy({
    by: ["country"],
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: 10,
  });

  const visitsByDevice = await prisma.visitLog.groupBy({
    by: ["deviceType"],
    _count: { deviceType: true },
    orderBy: { _count: { deviceType: "desc" } },
  });

  const recentVisits = await prisma.visitLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const maxPageCount = visitsByPage.length > 0 ? visitsByPage[0]._count.page : 1;

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold text-stone-800">Analytics</h1>

      {totalVisits === 0 ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-12 text-center">
          <p className="text-3xl">📊</p>
          <p className="mt-3 text-lg font-medium text-stone-600">
            No visit data yet
          </p>
          <p className="mt-1 text-sm text-stone-400">
            Visitor analytics will appear here once people start browsing the
            site.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <OverviewCard label="Total Visits" value={totalVisits.toString()} />
            <OverviewCard
              label="Visits This Week"
              value={visitsThisWeek.toString()}
            />
          </div>

          {/* Top Pages */}
          <Section title="Top Pages">
            {visitsByPage.map((item: { page: string; _count: { page: number } }) => {
              const pct =
                maxPageCount > 0
                  ? Math.round((item._count.page / maxPageCount) * 100)
                  : 0;
              return (
                <BarRow
                  key={item.page}
                  label={item.page || "/"}
                  count={item._count.page}
                  pct={pct}
                  color="bg-emerald-500"
                />
              );
            })}
          </Section>

          {/* Top Countries */}
          <Section title="Top Countries">
            {visitsByCountry.map((item: { country: string | null; _count: { country: number } }) => {
              const pct =
                maxPageCount > 0
                  ? Math.round(
                      (item._count.country / visitsByCountry[0]._count.country) *
                        100
                    )
                  : 0;
              return (
                <BarRow
                  key={item.country || "unknown"}
                  label={item.country || "Unknown"}
                  count={item._count.country}
                  pct={pct}
                  color="bg-blue-500"
                />
              );
            })}
          </Section>

          {/* Device Breakdown */}
          <Section title="Device Breakdown">
            {visitsByDevice.length === 0 ? (
              <p className="text-sm text-stone-400">No data</p>
            ) : (
              visitsByDevice.map((item: { deviceType: string | null; _count: { deviceType: number } }) => {
                const pct =
                  visitsByDevice[0]._count.deviceType > 0
                    ? Math.round(
                        (item._count.deviceType /
                          visitsByDevice[0]._count.deviceType) *
                          100
                      )
                    : 0;
                return (
                  <BarRow
                    key={item.deviceType || "unknown"}
                    label={item.deviceType || "Unknown"}
                    count={item._count.deviceType}
                    pct={pct}
                    color="bg-violet-500"
                  />
                );
              })
            )}
          </Section>

          {/* Recent Visits Table */}
          <Section title="Recent Visits (Last 20)">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-stone-100 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <th className="px-4 py-2">Page</th>
                    <th className="px-4 py-2">Country</th>
                    <th className="px-4 py-2">City</th>
                    <th className="px-4 py-2">Device</th>
                    <th className="px-4 py-2">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentVisits.map((v: { id: number; page: string; country: string | null; city: string | null; deviceType: string | null; createdAt: Date }) => (
                    <tr key={v.id} className="hover:bg-stone-50">
                      <td className="px-4 py-2.5 font-medium text-stone-700">
                        {v.page}
                      </td>
                      <td className="px-4 py-2.5 text-stone-500">
                        {v.country || "—"}
                      </td>
                      <td className="px-4 py-2.5 text-stone-500">
                        {v.city || "—"}
                      </td>
                      <td className="px-4 py-2.5 text-stone-500">
                        {v.deviceType || "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2.5 text-stone-500">
                        {v.createdAt.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        </div>
      )}
    </div>
  );
}

function OverviewCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-stone-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-stone-800">{value}</p>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-stone-700">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function BarRow({
  label,
  count,
  pct,
  color,
}: {
  label: string;
  count: number;
  pct: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-40 shrink-0 truncate text-sm font-medium text-stone-700">
        {label}
      </span>
      <div className="flex-1">
        <div className="h-2.5 rounded-full bg-stone-100">
          <div
            className={`h-2.5 rounded-full ${color}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      <span className="w-12 text-right text-sm font-semibold text-stone-600">
        {count}
      </span>
    </div>
  );
}
