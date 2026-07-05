"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/useTranslation";

const overviewItems = [
  { labelKey: "about.foundedLabel", valueKey: "about.foundedValue" },
  { labelKey: "about.headOfficeLabel", valueKey: "about.headOfficeValue" },
  { labelKey: "about.coreBusinessLabel", valueKey: "about.coreBusinessValue" },
  { labelKey: "about.keyBrandsLabel", valueKey: "about.keyBrandsValue" },
  { labelKey: "about.coverageLabel", valueKey: "about.coverageValue" },
];

const missionKeys = ["mission1", "mission2", "mission3", "mission4"];

const coreValues = [
  { titleKey: "coreValue1Title", textKey: "coreValue1Text" },
  { titleKey: "coreValue2Title", textKey: "coreValue2Text" },
  { titleKey: "coreValue3Title", textKey: "coreValue3Text" },
];

export default function AboutContent() {
  const { t } = useTranslation();
  const [ceoImgError, setCeoImgError] = useState(false);

  return (
    <div className="bg-brand-cream">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-brand-dark-green md:text-5xl">
            {t("about.pageTitle")}
          </h1>
          <p className="mt-3 text-lg text-brand-wheat-gold/80">
            {t("about.tagline")}
          </p>
        </div>

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

        <div className="mb-16 flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="shrink-0">
            {ceoImgError ? (
              <div className="flex h-[200px] w-[200px] items-center justify-center rounded-full bg-gray-200">
                <span className="text-center text-sm text-gray-500">
                  {t("about.ceoImageAlt")}
                </span>
              </div>
            ) : (
              <Image
                src="/images/ceo.jpg"
                alt={t("about.ceoImageAlt")}
                width={200}
                height={200}
                className="rounded-full object-cover"
                onError={() => setCeoImgError(true)}
              />
            )}
          </div>
          <div className="flex-1">
            <h2 className="mb-4 text-3xl font-bold text-brand-dark-green">
              {t("about.ceoMessageHeading")}
            </h2>
            <p className="text-lg leading-relaxed text-brand-charcoal/80">
              {t("about.ceoMessageText")}
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {t("about.companyOverviewHeading")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {overviewItems.map((item) => (
              <div
                key={item.labelKey}
                className="rounded-2xl border border-brand-light-green/30 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="mb-2 text-lg font-semibold text-brand-dark-green">
                  {t(item.labelKey)}
                </h3>
                <p className="text-brand-charcoal/80">
                  {t(item.valueKey)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16 rounded-2xl border-l-4 border-brand-orange bg-brand-light-green/10 p-8">
          <h2 className="mb-4 text-3xl font-bold text-brand-dark-green">
            {t("about.visionHeading")}
          </h2>
          <p className="text-lg italic leading-relaxed text-brand-charcoal/90">
            {t("about.visionText")}
          </p>
        </div>

        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-bold text-brand-dark-green">
            {t("about.missionHeading")}
          </h2>
          <ul className="space-y-4">
            {missionKeys.map((key, i) => (
              <li key={key} className="flex items-start gap-3">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-orange text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="pt-1 text-lg leading-relaxed text-brand-charcoal/80">
                  {t(`about.${key}`)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {t("about.coreValuesHeading")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {coreValues.map((v) => (
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
