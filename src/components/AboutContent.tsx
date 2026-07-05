"use client";

import { useTranslation } from "@/lib/useTranslation";

const values = [
  { titleKey: "value1Title", textKey: "value1Text" },
  { titleKey: "value2Title", textKey: "value2Text" },
  { titleKey: "value3Title", textKey: "value3Text" },
];

export default function AboutContent() {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-cream">
      <section className="mx-auto max-w-5xl px-4 py-16 text-start">
        <h1 className="mb-12 text-4xl font-bold text-brand-dark-green md:text-5xl">
          {t("about.pageTitle")}
        </h1>

        <div className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-brand-dark-green">
            {t("about.heading")}
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-brand-charcoal/80">
            {t("about.paragraph1")}
          </p>
          <p className="text-lg leading-relaxed text-brand-charcoal/80">
            {t("about.paragraph2")}
          </p>
        </div>

        <div>
          <h2 className="mb-8 text-3xl font-bold text-brand-dark-green">
            {t("about.valuesHeading")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.titleKey}
                className="rounded-2xl border border-brand-light-green/30 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:p-8"
              >
                <h3 className="mb-3 text-xl font-semibold text-brand-dark-green">
                  {t(`about.${v.titleKey}`)}
                </h3>
                <p className="text-brand-charcoal/80">
                  {t(`about.${v.textKey}`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
