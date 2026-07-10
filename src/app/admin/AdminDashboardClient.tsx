"use client";

import Link from "next/link";

type RecentContact = {
  id: number;
  type: "contact";
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

type RecentFranchise = {
  id: number;
  type: "franchise";
  name: string;
  phone: string;
  city: string;
  status: string;
  createdAt: string;
};

type RecentItem = {
  id: number;
  type: "contact" | "franchise";
  name: string;
  status: string;
  date: string;
  subtitle: string;
  iconType: "contact" | "franchise";
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

const statusConfig: Record<string, { label: string; dot: string; bg: string }> = {
  new: {
    label: "New",
    dot: "bg-amber-400",
    bg: "bg-amber-500/10 text-amber-600",
  },
  contacted: {
    label: "Contacted",
    dot: "bg-emerald-400",
    bg: "bg-emerald-500/10 text-emerald-600",
  },
  closed: {
    label: "Closed",
    dot: "bg-stone-400",
    bg: "bg-stone-500/10 text-stone-500",
  },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] || statusConfig.new;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider ${cfg.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

export default function AdminDashboardClient({
  totalProducts,
  totalCategories,
  totalInquiries,
  totalFranchise,
  totalNewsletter,
  totalUnread,
  recentSubmissions,
  recentFranchise,
}: {
  totalProducts: number;
  totalCategories: number;
  totalInquiries: number;
  totalFranchise: number;
  totalNewsletter: number;
  totalUnread: number;
  recentSubmissions: RecentContact[];
  recentFranchise: RecentFranchise[];
}) {
  const allRecent: RecentItem[] = [
    ...recentSubmissions.map((s): RecentItem => ({
      id: s.id,
      type: "contact",
      name: s.name,
      status: s.status,
      date: s.createdAt,
      subtitle: s.email,
      iconType: "contact",
    })),
    ...recentFranchise.map((s): RecentItem => ({
      id: s.id,
      type: "franchise",
      name: s.name,
      status: s.status,
      date: s.createdAt,
      subtitle: `${s.phone} · ${s.city}`,
      iconType: "franchise",
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
   .slice(0, 8);

  const statCards = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      gradient: "from-emerald-600 to-emerald-700",
      bg: "bg-emerald-500/10",
      textColor: "text-emerald-600",
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
        </svg>
      ),
      gradient: "from-violet-600 to-violet-700",
      bg: "bg-violet-500/10",
      textColor: "text-violet-600",
    },
    {
      label: "Contact Inquiries",
      value: totalInquiries,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
        </svg>
      ),
      gradient: "from-blue-600 to-blue-700",
      bg: "bg-blue-500/10",
      textColor: "text-blue-600",
    },
    {
      label: "Franchise Requests",
      value: totalFranchise,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      gradient: "from-amber-600 to-amber-700",
      bg: "bg-amber-500/10",
      textColor: "text-amber-600",
    },
    {
      label: "Newsletter Subscribers",
      value: totalNewsletter,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      gradient: "from-rose-600 to-rose-700",
      bg: "bg-rose-500/10",
      textColor: "text-rose-600",
    },
    {
      label: "Unread Messages",
      value: totalUnread,
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
      gradient: "from-red-600 to-red-700",
      bg: "bg-red-500/10",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--admin-text-muted)" }}>
            Overview of your platform activity
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium" style={{ backgroundColor: "var(--admin-surface)", color: "var(--admin-text-secondary)", border: "1px solid var(--admin-border)" }}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          System Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="relative group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--admin-card)",
              border: "1px solid var(--admin-border)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.bg}`}>
                <span className={card.textColor}>{card.icon}</span>
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
              {card.value}
            </p>
            <p className="text-xs font-medium mt-1" style={{ color: "var(--admin-text-secondary)" }}>
              {card.label}
            </p>
            {/* Gradient accent line */}
            <div className={`absolute bottom-0 left-5 right-5 h-0.5 rounded-full bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          </div>
        ))}
      </div>

      {/* Recent Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div
          className="lg:col-span-2 rounded-2xl p-6"
          style={{
            backgroundColor: "var(--admin-card)",
            border: "1px solid var(--admin-border)",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold" style={{ color: "var(--admin-text)" }}>
              Recent Activity
            </h2>
            <Link
              href="/admin/submissions"
              className="text-xs font-medium hover:opacity-80 transition-opacity"
              style={{ color: "var(--admin-text-muted)" }}
            >
              View all
            </Link>
          </div>

          {allRecent.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
                <svg className="w-7 h-7" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--admin-text-secondary)" }}>
                No recent activity
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--admin-text-muted)" }}>
                Submissions will appear here when visitors contact you
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {allRecent.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl transition-colors hover:bg-[var(--admin-hover)]"
                >
                  {/* Type icon */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    item.iconType === "contact" ? "bg-blue-500/10 text-blue-600" : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {item.iconType === "contact" ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "var(--admin-text)" }}>
                      {item.name}
                    </p>
                    <p className="text-xs truncate mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Status + Time */}
                  <div className="flex items-center gap-2 shrink-0">
                    <StatusBadge status={item.status} />
                    <span className="text-[10px] whitespace-nowrap" style={{ color: "var(--admin-text-muted)" }}>
                      {timeAgo(item.date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div
          className="rounded-2xl p-6"
          style={{
            backgroundColor: "var(--admin-card)",
            border: "1px solid var(--admin-border)",
          }}
        >
          <h2 className="text-base font-bold mb-5" style={{ color: "var(--admin-text)" }}>
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Link
              href="/admin/submissions"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--admin-hover)] group"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                  View Inquiries
                </p>
                <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                  Check contact submissions
                </p>
              </div>
              <svg className="w-4 h-4" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>

            <Link
              href="/admin/franchise"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--admin-hover)] group"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                  Franchise Requests
                </p>
                <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                  Review franchise applications
                </p>
              </div>
              <svg className="w-4 h-4" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>

            <Link
              href="/admin/newsletter"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--admin-hover)] group"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                  Newsletter
                </p>
                <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                  View subscribers
                </p>
              </div>
              <svg className="w-4 h-4" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[var(--admin-hover)] group"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                  Products Catalog
                </p>
                <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                  Browse product catalog
                </p>
              </div>
              <svg className="w-4 h-4" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
