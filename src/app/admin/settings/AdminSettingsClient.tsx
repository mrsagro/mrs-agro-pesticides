"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function AdminSettingsClient({
  adminUser,
  subscriberCount,
  contactInfo,
}: {
  adminUser: { username: string } | null;
  subscriberCount: number;
  contactInfo: {
    phone: string;
    email: string;
    whatsappNumber: string;
    address: string;
  };
}) {
  const { language } = useLanguage();
  const isUrdu = language === "ur";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--admin-text)" }}>
          {isUrdu ? "ترتیبات" : "Settings"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--admin-text-muted)" }}>
          {isUrdu ? "اپنی ترتیبات کا نظم کریں" : "Manage your platform settings"}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--admin-card)", border: "1px solid var(--admin-border)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: "var(--admin-text)" }}>
                {isUrdu ? "کمپنی کی معلومات" : "Company Information"}
              </h2>
              <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "MRS Agro Chemicals" : "MRS Agro Chemicals"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--admin-border)" }}>
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "سی ای او" : "CEO"}</span>
              <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>Malik Umer Rafique</span>
            </div>
            <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--admin-border)" }}>
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "فون" : "Phone"}</span>
              <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--admin-border)" }}>
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "ای میل" : "Email"}</span>
              <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>{contactInfo.email}</span>
            </div>
            <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--admin-border)" }}>
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "واٹس ایپ" : "WhatsApp"}</span>
              <span className="text-sm font-medium" style={{ color: "var(--admin-text)" }}>{contactInfo.whatsappNumber}</span>
            </div>
            <div className="flex items-start justify-between py-2">
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "پتہ" : "Address"}</span>
              <span className="text-sm font-medium text-right max-w-xs" style={{ color: "var(--admin-text)" }}>{contactInfo.address}</span>
            </div>
          </div>
        </div>

        {/* Admin Account */}
        <div className="rounded-2xl p-6" style={{ backgroundColor: "var(--admin-card)", border: "1px solid var(--admin-border)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-600/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: "var(--admin-text)" }}>
                {isUrdu ? "منتظم کھاتہ" : "Admin Account"}
              </h2>
              <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "لاگ ان کی اسناد" : "Login credentials"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--admin-border)" }}>
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "صارف نام" : "Username"}</span>
              <span className="text-sm font-mono font-medium" style={{ color: "var(--admin-text)" }}>
                {adminUser?.username || "N/A"}
              </span>
            </div>
            <div className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid var(--admin-border)" }}>
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "پاس ورڈ" : "Password"}</span>
              <span className="text-sm font-mono" style={{ color: "var(--admin-text-muted)" }}>••••••••</span>
            </div>
            <p className="text-xs mt-2" style={{ color: "var(--admin-text-muted)" }}>
              {isUrdu
                ? "پاس ورڈ تبدیل کرنے کے لیے، seed فائل کو اپ ڈیٹ کریں اور seed دوبارہ چلائیں۔"
                : "To change password, update the seed file and re-run seed."}
            </p>
          </div>

          {/* Stats */}
          <div className="mt-6 pt-6" style={{ borderTop: "1px solid var(--admin-border)" }}>
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "نیوز لیٹر سبسکرائبرز" : "Newsletter Subscribers"}
              </span>
              <span className="text-2xl font-bold" style={{ color: "var(--admin-text)" }}>
                {subscriberCount}
              </span>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="lg:col-span-2 rounded-2xl p-6" style={{ backgroundColor: "var(--admin-card)", border: "1px solid var(--admin-border)" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stone-500/10 to-stone-600/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ color: "var(--admin-text)" }}>
                {isUrdu ? "سسٹم کی معلومات" : "System Information"}
              </h2>
              <p className="text-xs" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "پلیٹ فارم کی تفصیلات" : "Platform details"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "فنٹ اینڈ" : "Frontend"}
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>Next.js 15</p>
              <p className="text-[10px]" style={{ color: "var(--admin-text-muted)" }}>React 19 · Tailwind v4</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "بیک اینڈ" : "Backend"}
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>SQLite</p>
              <p className="text-[10px]" style={{ color: "var(--admin-text-muted)" }}>Prisma ORM</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "مصنوعات" : "Products"}
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>24</p>
              <p className="text-[10px]" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "مختلف زمرے" : "Across multiple categories"}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ backgroundColor: "var(--admin-surface)", border: "1px solid var(--admin-border)" }}>
              <p className="text-xs font-medium uppercase tracking-wider mb-1" style={{ color: "var(--admin-text-muted)" }}>
                {isUrdu ? "حالت" : "Status"}
              </p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <p className="text-sm font-semibold" style={{ color: "var(--admin-text)" }}>
                  {isUrdu ? "فعال" : "Active"}
                </p>
              </div>
              <p className="text-[10px]" style={{ color: "var(--admin-text-muted)" }}>{isUrdu ? "عام آپریشن" : "Normal operation"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
