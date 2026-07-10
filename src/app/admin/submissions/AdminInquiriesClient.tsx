"use client";

import { useState, useMemo } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type Submission = {
  id: number;
  name: string;
  email: string;
  message: string;
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

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function AdminInquiriesClient({
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
      const emailMatch = s.email.toLowerCase().includes(search.toLowerCase());
      const statusMatch =
        statusFilter === "all" || localStatuses[s.id] === statusFilter;
      return (nameMatch || emailMatch) && statusMatch;
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
        `/api/admin/submissions/${id}/status`,
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

  async function handleDelete(id: number) {
    setLocalSubs((prev) => prev.filter((s) => s.id !== id));
    try {
      await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    } catch {
      setLocalSubs(submissions);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
          {isUrdu ? "انکوائریز" : "Inquiries"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--admin-text-muted)" }}>
          {isUrdu
            ? `${localSubs.length} پیغامات`
            : `${localSubs.length} contact messages`
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
            placeholder={isUrdu ? "نام یا ای میل تلاش کریں..." : "Search by name or email..."}
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

        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/api/admin/submissions/export"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
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
        </a>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl" style={{ border: "1px solid var(--admin-border)", backgroundColor: "var(--admin-card)" }}>
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
            <svg className="w-7 h-7" style={{ color: "var(--admin-text-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--admin-text-secondary)" }}>
            {isUrdu
              ? search || statusFilter !== "all" ? "کوئی پیغام نہیں ملا" : "ابھی تک کوئی پیغام نہیں"
              : search || statusFilter !== "all" ? "No messages match your filter" : "No inquiries yet"
            }
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--admin-text-muted)" }}>
            {isUrdu
              ? "اپنی تلاش یا فلٹر تبدیل کریں"
              : search || statusFilter !== "all" ? "Try adjusting your search or filter." : "Contact form submissions will appear here."
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((s) => {
            const isExpanded = expandedId === s.id;
            const cfg = STATUS_CONFIG[localStatuses[s.id]] || STATUS_CONFIG.new;
            const hasEmail = isEmail(s.email);
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

                  {/* Name & Email */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold" style={{ color: "var(--admin-text)" }}>
                        {s.name}
                      </h3>
                      <p className="text-sm mt-0.5 truncate" style={{ color: "var(--admin-text-secondary)" }}>
                        {s.email}
                      </p>
                    </div>
                  </div>

                  {/* Message */}
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

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid var(--admin-border)" }}>
                    {hasEmail && (
                      <a
                        href={`mailto:${s.email}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:-translate-y-0.5"
                        style={{
                          backgroundColor: "var(--admin-surface)",
                          color: "var(--admin-text)",
                          border: "1px solid var(--admin-border)",
                        }}
                      >
                        <svg className="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        Email
                      </a>
                    )}
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
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="p-2 rounded-xl transition-colors hover:bg-red-500/10 text-red-500/60 hover:text-red-500 cursor-pointer"
                      title={isUrdu ? "حذف کریں" : "Delete"}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
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
