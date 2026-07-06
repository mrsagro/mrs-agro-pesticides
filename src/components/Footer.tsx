"use client";

import { useTranslation } from "@/lib/useTranslation";
import { contactInfo } from "@/lib/contactInfo";

export default function Footer() {
  const { t, language } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-brand-dark-green text-brand-cream border-t border-brand-wheat-gold/20 relative overflow-hidden">
      {/* Subtle repeating field pattern in footer background */}
      <div className="absolute inset-0 bg-field-pattern opacity-[0.015] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start text-start mb-12">
          
          {/* Column 1: Company Profile */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-bold font-fraunces text-brand-cream">
              {t("footer.companyName")}
            </h3>
            <p className="text-sm leading-relaxed text-brand-cream/70 font-light max-w-sm font-work-sans">
              {language === "ur" 
                ? "پاکستان بھر میں کاشتکاروں کو پریمیم اور اعلیٰ پیداواری کیڑے مار ادویات کی فراہمی جو فصلوں کو بیماریوں سے محفوظ اور خوشحالی کو یقینی بناتے ہیں۔"
                : "Empowering Pakistan's agricultural community with certified, high-yield Pesticide varieties optimized for local climate and soil conditions."}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-brand-wheat-gold uppercase tracking-widest font-work-sans">
              {language === "ur" ? "فوری روابط" : "Quick Navigation"}
            </h4>
            <ul className="space-y-2 text-sm font-work-sans font-medium text-brand-cream/80">
              <li>
                <a href="/" className="hover:text-brand-orange hover:translate-x-0.5 transition-all duration-300 inline-block">
                  {t("nav.home")}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-brand-orange hover:translate-x-0.5 transition-all duration-300 inline-block">
                  {t("nav.about")}
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-brand-orange hover:translate-x-0.5 transition-all duration-300 inline-block">
                  {t("nav.products")}
                </a>
              </li>
              <li>
                <a href="/franchise" className="hover:text-brand-orange hover:translate-x-0.5 transition-all duration-300 inline-block">
                  {t("nav.franchise")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-brand-orange hover:translate-x-0.5 transition-all duration-300 inline-block">
                  {t("nav.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Channels */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold text-brand-wheat-gold uppercase tracking-widest font-work-sans">
              {language === "ur" ? "رابطہ کی معلومات" : "Primary Channels"}
            </h4>
            <div className="space-y-3 text-sm text-brand-cream/85 font-work-sans">
              
              <a
                href={contactInfo.phoneLink}
                className="flex items-center gap-3 group hover:text-brand-orange transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-brand-orange/15 transition-colors text-brand-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>{contactInfo.phone}</span>
              </a>

              <a
                href={contactInfo.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group hover:text-brand-orange transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-brand-orange/15 transition-colors text-brand-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span>{t("footer.whatsapp")}</span>
              </a>

              <a
                href={contactInfo.emailLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group hover:text-brand-orange transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-brand-orange/15 transition-colors text-brand-orange">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>{contactInfo.email}</span>
              </a>

            </div>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="border-t border-brand-wheat-gold/15 pt-8 text-center text-xs tracking-wider uppercase font-semibold text-brand-cream/50 font-work-sans">
          &copy; {year} {t("footer.companyName")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
