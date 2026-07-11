"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type Subscriber = {
  id: number;
  email: string;
  createdAt: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminNewsletterClient({
  subscribers,
}: {
  subscribers: Subscriber[];
}) {
  const { language } = useLanguage();
  const isUrdu = language === "ur";
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [localSubs, setLocalSubs] = useState(subscribers);

  const filtered = useMemo(() => {
    return localSubs.filter((s) =>
      s.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [localSubs, search]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((s) => s.id)));
    }
  };

  const handleDelete = async (id: number) => {
    const deleted = localSubs.find((s) => s.id === id);
    setLocalSubs((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      if (deleted) setLocalSubs((prev) => [...prev, deleted].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    }
  };

  const handleExport = () => {
    const csv = "Email,Date Subscribed\n" + localSubs
      .map((s) => `${s.email},${s.createdAt}`)
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
            {isUrdu ? "نیوز لیٹر" : "Newsletter"}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--admin-text-muted)" }}>
            {isUrdu
              ? `${localSubs.length} سبسکرائبرز`
              : `${localSubs.length} email subscribers`
            }
          </p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5 cursor-pointer"
          style={{
            backgroundColor: "var(--admin-surface)",
            color: "var(--admin-text)",
            border: "1px solid var(--admin-border)",
          }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {isUrdu ? "برآمد کریں" : "Export CSV"}
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "var(--admin-text-muted)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={isUrdu ? "ای میل تلاش کریں..." : "Search email..."}
          className="w-full rounded-xl border px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 transition-all"
          style={{
            backgroundColor: "var(--admin-input)",
            borderColor: "var(--admin-input-border)",
            color: "var(--admin-text)",
          }}
        />
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-card)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
            <svg className="w-7 h-7" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--admin-text-secondary)" }}>
            {isUrdu
              ? search ? "کوئی ای میل نہیں ملی" : "ابھی تک کوئی سبسکرائبر نہیں"
              : search ? "No emails found" : "No subscribers yet"
            }
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--admin-text-muted)" }}>
            {isUrdu
              ? "سبسکرائبرز یہاں ظاہر ہوں گے"
              : "Subscribers will appear here when visitors sign up"
            }
          </p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-card)" }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--admin-border)" }}>
                  <th className="p-4 text-left w-12">
                    <input
                      type="checkbox"
                      checked={selectedIds.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--admin-text-muted)" }}>
                    {isUrdu ? "ای میل" : "Email"}
                  </th>
                  <th className="p-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--admin-text-muted)" }}>
                    {isUrdu ? "تاریخ" : "Subscribed"}
                  </th>
                  <th className="p-4 text-right text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--admin-text-muted)" }}>
                    {isUrdu ? "عمل" : "Actions"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((sub) => (
                  <tr
                    key={sub.id}
                    className="transition-colors hover:bg-[var(--admin-hover)]"
                    style={{ borderBottom: "1px solid var(--admin-border)" }}
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(sub.id)}
                        onChange={() => toggleSelect(sub.id)}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>
                          {sub.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs" style={{ color: "var(--admin-text-secondary)" }}>
                        {formatDate(sub.createdAt)}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        className="p-2 rounded-xl transition-colors hover:bg-red-500/10 text-red-500/60 hover:text-red-500 cursor-pointer"
                        title="Delete"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: "1px solid var(--admin-border)" }}>
            <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
              {selectedIds.size > 0
                ? isUrdu
                  ? `${selectedIds.size} منتخب`
                  : `${selectedIds.size} selected`
                : isUrdu
                  ? `${filtered.length} میں سے ${localSubs.length} سبسکرائبرز`
                  : `${filtered.length} of ${localSubs.length} subscribers`
              }
            </p>
            {selectedIds.size > 0 && (
              <button
                onClick={async () => {
                  const ids = Array.from(selectedIds);
                  for (const id of ids) {
                    await handleDelete(id);
                  }
                }}
                className="text-xs font-medium text-red-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                {isUrdu ? "منتخب حذف کریں" : "Delete selected"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
