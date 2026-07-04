"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/lib/useTranslation";

const navItems: { key: string; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "franchise", href: "#" },
  { key: "contact", href: "#" },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark-green text-brand-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <a href="/">
            <Image
              src="/images/logo.jpeg"
              alt={t("nav.logoAlt")}
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
          </a>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="transition-colors hover:text-brand-orange"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="rounded border border-brand-cream px-3 py-1 text-sm transition-colors hover:bg-brand-cream hover:text-brand-dark-green"
          >
            {language === "en" ? t("nav.toggleToUrdu") : t("nav.toggleToEnglish")}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-brand-cream transition-transform ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-brand-cream transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-brand-cream transition-transform ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-brand-cream/20 px-4 pb-4 pt-2 md:hidden">
          {navItems.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="py-2 transition-colors hover:text-brand-orange"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
