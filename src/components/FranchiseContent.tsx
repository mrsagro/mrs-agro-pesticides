"use client";

import { useTranslation } from "@/lib/useTranslation";
import ContactForm from "@/components/ContactForm";
import type { FormField } from "@/components/ContactForm";

const benefitKeys = ["benefit1", "benefit2", "benefit3"];

const franchiseFields: FormField[] = [
  { name: "name", label: "", type: "text", required: true },
  { name: "phone", label: "", type: "tel", required: true },
  { name: "city", label: "", type: "text", required: true },
  { name: "message", label: "", type: "textarea", required: false },
];

export default function FranchiseContent() {
  const { t } = useTranslation();

  const fieldsWithLabels = franchiseFields.map((f) => ({
    ...f,
    label: t(`franchise.form${f.name.charAt(0).toUpperCase() + f.name.slice(1)}Label`),
  }));

  return (
    <div className="bg-brand-cream">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-brand-dark-green md:text-5xl">
            {t("franchise.pageTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-charcoal/80">
            {t("franchise.pageSubtitle")}
          </p>
        </div>

        <div className="mb-16">
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {t("franchise.benefitsHeading")}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {benefitKeys.map((key) => (
              <div
                key={key}
                className="rounded-lg border border-brand-light-green/30 bg-white p-6 shadow-sm"
              >
                <p className="text-brand-charcoal/80">{t(`franchise.${key}`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {t("franchise.formHeading")}
          </h2>
          <ContactForm
            endpoint="/api/franchise"
            submitLabel={t("franchise.formSubmitButton")}
            successMessage={t("franchise.formSuccessMessage")}
            errorMessage={t("franchise.formErrorMessage")}
            fields={fieldsWithLabels}
          />
        </div>
      </section>
    </div>
  );
}
