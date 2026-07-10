"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { useLanguage } from "@/lib/LanguageContext";

const navItems: { key: string; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "knowledgeCenter", href: "/knowledge-center" },
  { key: "franchise", href: "/franchise" },
  { key: "contact", href: "/contact" },
];

export default function Header() {
  const { t, language } = useTranslation();
  const { toggleLanguage } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isUrdu = language === "ur";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <Image
                src="/images/logo.jpeg"
                alt={t("nav.logoAlt")}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className={`text-2xl font-bold tracking-tight transition-colors duration-300 leading-tight whitespace-nowrap ${
                  transparent ? "text-white" : "text-brand-dark-green"
                } font-fraunces`}
              >
                MRS Agro Chemicals
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    transparent
                      ? "text-white/80 hover:text-white hover:bg-white/10"
                      : active
                        ? "text-brand-dark-green bg-brand-dark-green/5"
                        : "text-brand-charcoal/70 hover:text-brand-dark-green hover:bg-brand-dark-green/5"
                  }`}
                >
                  {t(`nav.${item.key}` as any)}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={`absolute inset-0 rounded-full ${
                        transparent
                          ? "bg-white/15"
                          : "bg-brand-dark-green/8"
                      } -z-10`}
                    />
                  )}
                </Link>
              );
            })}
            <div className="ml-4 pl-4 border-l border-brand-dark-green/10">
              <button
                onClick={toggleLanguage}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  transparent
                    ? "text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
                    : "text-brand-dark-green border border-brand-dark-green/20 hover:bg-brand-dark-green/5"
                }`}
              >
                {isUrdu ? "English" : "اردو"}
              </button>
            </div>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden relative h-10 w-10 flex items-center justify-center rounded-full transition-colors ${
              transparent
                ? "text-white hover:bg-white/10"
                : "text-brand-charcoal hover:bg-brand-dark-green/5"
            }`}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block h-0.5 w-5 rounded-full transition-colors ${
                  transparent ? "bg-white" : "bg-brand-charcoal"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block h-0.5 w-5 rounded-full transition-colors ${
                  transparent ? "bg-white" : "bg-brand-charcoal"
                }`}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block h-0.5 w-5 rounded-full transition-colors ${
                  transparent ? "bg-white" : "bg-brand-charcoal"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-xl border-t border-brand-dark-green/5"
          >
            <div className="px-4 py-6 space-y-1">
              {navItems.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-brand-dark-green/8 text-brand-dark-green"
                          : "text-brand-charcoal/70 hover:bg-brand-dark-green/5 hover:text-brand-dark-green"
                      }`}
                    >
                      {t(`nav.${item.key}` as any)}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-3"
              >
                <button
                  onClick={toggleLanguage}
                  className="w-full px-4 py-3 rounded-xl text-sm font-medium border border-brand-dark-green/15 text-brand-dark-green hover:bg-brand-dark-green/5 transition-all"
                >
                  {isUrdu ? "Switch to English" : "اردو میں دیکھیں"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
