"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { contactInfo } from "@/lib/contactInfo";

export default function Footer() {
  const { t, language } = useTranslation();
  const isUrdu = language === "ur";
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Franchise", href: "/franchise" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0A1F0C] to-[#071308] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMHYyMEgwdjBIMjB2MjBIMjBWMjBoMjB2MEgyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMTUpIi8+PC9zdmc+')] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pt-20 lg:pt-28 pb-16 lg:pb-20">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 min-w-0">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                <Image
                  src="/images/logo.jpeg"
                  alt={t("nav.logoAlt")}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xl font-bold text-white font-fraunces tracking-tight leading-tight whitespace-nowrap">
                  MRS Agro Chemicals
                </span>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              {isUrdu
                ? "پاکستان کے کسانوں کے لیے معیاری اور قابلِ اعتماد زرعی حل فراہم کرنے والے۔"
                : "Premium quality pesticides and crop protection solutions for farmers across Pakistan."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-brand-wheat-gold/60 mb-6">
              {isUrdu ? "فوری روابط" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-brand-wheat-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-brand-wheat-gold/60 mb-6">
              {isUrdu ? "رابطہ" : "Contact"}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={contactInfo.phoneLink} className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-brand-wheat-gold shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <span>{isUrdu ? contactInfo.phone : contactInfo.phone}</span>
                </a>
              </li>
              <li>
                <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span className="hover:text-white transition-colors">{isUrdu ? "واٹس ایپ" : "WhatsApp"}</span>
                </a>
              </li>
              <li>
                <a href={contactInfo.emailLink} className="text-sm text-white/50 hover:text-white transition-colors duration-200 block">
                  <span className="text-xs text-white/30 block mb-0.5">{t("contact.emailLabel")}</span>
                  {contactInfo.email}
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-white/30 block mb-0.5">{t("contact.addressLabel")}</p>
                <p className="text-sm text-white/50 leading-relaxed">{contactInfo.address}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter + Bottom */}
        <div className="border-t border-white/5 pt-10 pb-8 lg:pt-12 lg:pb-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-base font-semibold text-white mb-1">
                {isUrdu ? "ہمارے نیوز لیٹر کو سبسکرائب کریں" : "Subscribe to our Newsletter"}
              </h4>
              <p className="text-sm text-white/30">
                {isUrdu ? "نئی مصنوعات اور زرعی مشورے کے لیے" : "Get the latest updates and agri insights."}
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("newsletter.placeholder")}
                required
                className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-brand-wheat-gold/40 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-xl bg-brand-wheat-gold px-6 py-3 text-sm font-bold text-[#0A1F0C] transition-all hover:bg-brand-wheat-gold/90 disabled:opacity-50 shrink-0"
              >
                {status === "loading" ? "..." : t("newsletter.button")}
              </button>
            </form>
            {status === "success" && (
              <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-green-400 lg:col-span-2 lg:-mt-4">
                {t("newsletter.success")}
              </motion.p>
            )}
            {status === "error" && (
              <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-red-400 lg:col-span-2 lg:-mt-4">
                {t("newsletter.error")}
              </motion.p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 pt-8 border-t border-white/5">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} MRS Agro Chemicals. {t("footer.rights")}
            </p>
            <p className="text-xs text-white/20">
              {isUrdu ? "اعلیٰ معیار کی زرعی مصنوعات" : "Premium Quality Pesticides"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
