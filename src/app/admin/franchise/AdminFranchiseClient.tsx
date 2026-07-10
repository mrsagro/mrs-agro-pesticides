"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type Submission = {
  id: number;
  name: string;
  phone: string;
  city: string;
  message: string | null;
  status: string;
  createdAt: string;
};

const STATUS_CONFIG: Record<string, { label: string; labelUr: string; dot: string; bg: string }> = {
  new: {
    label: "New",
    labelUr: "نیا",
    dot: "bg-amber-400",
    bg: "bg-amber-500/10 text-amber-600",
  },
  contacted: {
    label: "Contacted",
    labelUr: "رابطہ کیا گیا",
    dot: "bg-emerald-400",
    bg: "bg-emerald-500/10 text-emerald-600",
  },
  closed: {
    label: "Closed",
    labelUr: "بند شدہ",
    dot: "bg-stone-400",
    bg: "bg-stone-500/10 text-stone-500",
  },
};

const VALID_STATUSES = ["new", "contacted", "closed"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminFranchiseClient({
  submissions,
}: {
  submissions: Submission[];
}) {
  const { language } = useLanguage();
  const isUrdu = language === "ur";
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [localStatuses, setLocalStatuses] = useState<Record<number, string>>(
    () => {
      const map: Record<number, string> = {};
      for (const s of submissions) {
        map[s.id] = s.status;
      }
      return map;
    }
  );
  const [localSubs, setLocalSubs] = useState(submissions);

  const filtered = useMemo(() => {
    return localSubs.filter((s) => {
      const nameMatch = s.name.toLowerCase().includes(search.toLowerCase());
      const cityMatch = s.city.toLowerCase().includes(search.toLowerCase());
      const phoneMatch = s.phone.includes(search);
      const statusMatch =
        statusFilter === "all" || localStatuses[s.id] === statusFilter;
      return (nameMatch || cityMatch || phoneMatch) && statusMatch;
    });
  }, [localSubs, search, statusFilter, localStatuses]);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: localSubs.length };
    for (const s of localSubs) {
      counts[s.status] = (counts[s.status] || 0) + 1;
    }
    return counts;
  }, [localSubs]);

  async function handleStatusChange(id: number, newStatus: string) {
    const prev = localStatuses[id];
    setLocalStatuses((m) => ({ ...m, [id]: newStatus }));
    try {
      const res = await fetch(
        `/api/admin/submissions/${id + 10000}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!res.ok) throw new Error();
    } catch {
      setLocalStatuses((m) => ({ ...m, [id]: prev }));
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
          {isUrdu ? "فرنچائز درخواستیں" : "Franchise Requests"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--admin-text-muted)" }}>
          {isUrdu
            ? `${localSubs.length} درخواستیں`
            : `${localSubs.length} franchise applications`
          }
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
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
            placeholder={isUrdu ? "نام، شہر یا فون تلاش کریں..." : "Search by name, city or phone..."}
            className="w-full rounded-xl border px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--admin-input)",
              borderColor: "var(--admin-input-border)",
              color: "var(--admin-text)",
            }}
          />
        </div>

        <div className="flex rounded-xl border p-0.5 flex-wrap" style={{ borderColor: "var(--admin-border)", backgroundColor: "var(--admin-surface)" }}>
          {["all", ...VALID_STATUSES].map((tab) => {
            const cfg = STATUS_CONFIG[tab];
            return (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  statusFilter === tab
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "hover:bg-[var(--admin-hover)]"
                }`}
                style={{ color: statusFilter === tab ? "#fff" : "var(--admin-text-secondary)" }}
              >
                {tab === "all"
                  ? `${isUrdu ? "سب" : "All"} (${statusCounts.all})`
                  : `${isUrdu ? cfg.labelUr : cfg.label} (${statusCounts[tab] || 0})`}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-card)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
            <svg className="w-7 h-7" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--admin-text-secondary)" }}>
            {isUrdu
              ? search || statusFilter !== "all" ? "کوئی درخواست نہیں ملی" : "ابھی تک کوئی درخواست نہیں"
              : search || statusFilter !== "all" ? "No requests match your filter" : "No franchise requests yet"
            }
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--admin-text-muted)" }}>
            {isUrdu
              ? "اپنی تلاش یا فلٹر تبدیل کریں"
              : search || statusFilter !== "all" ? "Try adjusting your search or filter." : "Applications will appear here."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => {
            const isExpanded = expandedId === s.id;
            const cfg = STATUS_CONFIG[localStatuses[s.id]] || STATUS_CONFIG.new;
            return (
              <div
                key={s.id}
                className="rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--admin-card)",
                  border: "1px solid var(--admin-border)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div className="p-5">
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                        {formatDate(s.createdAt)}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider ${cfg.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {isUrdu ? cfg.labelUr : cfg.label}
                      </span>
                    </div>
                  </div>

                  {/* Name & Contact */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold" style={{ color: "var(--admin-text)" }}>
                        {s.name}
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <a
                          href={`tel:${s.phone}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium hover:opacity-80 transition-opacity"
                          style={{ color: "var(--admin-text-secondary)" }}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                          </svg>
                          {s.phone}
                        </a>
                        <span className="inline-flex items-center gap-1.5 text-xs" style={{ color: "var(--admin-text-secondary)" }}>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                          </svg>
                          {s.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  {s.message && (
                    <div className="mb-4">
                      <p
                        className={`text-sm leading-relaxed whitespace-pre-wrap ${
                          !isExpanded ? "line-clamp-2" : ""
                        }`}
                        style={{ color: "var(--admin-text-secondary)" }}
                      >
                        {s.message}
                      </p>
                      {s.message.length > 120 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : s.id)}
                          className="mt-1 text-xs font-medium hover:opacity-80 transition-opacity cursor-pointer"
                          style={{ color: "var(--admin-text-muted)" }}
                        >
                          {isExpanded ? (isUrdu ? "کم دکھائیں" : "Show less") : (isUrdu ? "مزید دکھائیں" : "Show more")}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid var(--admin-border)" }}>
                    <a
                      href={`https://wa.me/${s.phone.replace(/[\s\-\(\)]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "var(--admin-surface)",
                        color: "var(--admin-text)",
                        border: "1px solid var(--admin-border)",
                      }}
                    >
                      <svg className="w-3.5 h-3.5 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${s.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                      style={{
                        backgroundColor: "var(--admin-surface)",
                        color: "var(--admin-text)",
                        border: "1px solid var(--admin-border)",
                      }}
                    >
                      <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                      Call
                    </a>
                    <div className="flex-1" />
                    <div className="relative">
                      <select
                        value={localStatuses[s.id]}
                        onChange={(e) => handleStatusChange(s.id, e.target.value)}
                        className="rounded-xl border px-3 py-1.5 text-xs font-semibold appearance-none cursor-pointer focus:outline-none focus:ring-2 transition-all"
                        style={{
                          backgroundColor: "var(--admin-surface)",
                          borderColor: "var(--admin-border)",
                          color: "var(--admin-text)",
                        }}
                      >
                        <option value="new">{isUrdu ? "نیا" : "New"}</option>
                        <option value="contacted">{isUrdu ? "رابطہ کیا گیا" : "Contacted"}</option>
                        <option value="closed">{isUrdu ? "بند شدہ" : "Closed"}</option>
                      </select>
                      <svg
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3"
                        style={{ color: "var(--admin-text-muted)" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
