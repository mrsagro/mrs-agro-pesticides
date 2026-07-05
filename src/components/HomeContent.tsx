"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import FieldRowDivider from "@/components/FieldRowDivider";

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="bg-brand-dark-green px-4 py-24 text-center lg:py-32">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-8 flex items-center justify-center">
            <div className="relative h-[120px] w-[120px] overflow-hidden rounded-full">
              <Image
                src="/images/logo.jpeg"
                alt={t("nav.logoAlt")}
                fill
                className="object-cover"
                sizes="120px"
                priority
              />
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-brand-cream md:text-6xl lg:text-7xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mb-8 text-lg text-brand-cream/80 md:text-xl">
            {t("home.heroSubtitle")}
          </p>
          <Link
            href="/products"
            className="inline-block rounded-full bg-brand-orange px-8 py-4 text-lg font-semibold text-brand-cream transition-all duration-300 hover:scale-105 hover:bg-brand-orange/90"
          >
            {t("home.ctaButton")}
          </Link>
        </div>
      </section>

      <FieldRowDivider />

      <section className="bg-brand-cream px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold text-brand-dark-green">
            {t("home.introHeading")}
          </h2>
          <p className="text-lg leading-relaxed text-brand-charcoal/80">
            {t("home.introText")}
          </p>
        </div>
      </section>
    </>
  );
}
