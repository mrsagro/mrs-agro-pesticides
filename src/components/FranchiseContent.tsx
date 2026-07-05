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
  const { t, language } = useTranslation();

  const fieldsWithLabels = franchiseFields.map((f) => ({
    ...f,
    label: t(`franchise.form${f.name.charAt(0).toUpperCase() + f.name.slice(1)}Label`),
  }));

  return (
    <div className="bg-brand-cream overflow-hidden">
      {/* Page Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 lg:py-0 lg:h-[calc(100vh-80px)] min-h-[550px] lg:min-h-0 flex flex-col justify-center animate-fade-in-up">
        
        {/* Main Title Block */}
        <div className="mb-16 text-center">
          <span className="mb-3 text-xs uppercase tracking-widest text-brand-wheat-gold font-bold font-work-sans block">
            {language === "ur" ? "کاروباری شراکت داری" : "Corporate Partnership"}
          </span>
          <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight">
            {t("franchise.pageTitle")}
          </h1>
          <div className="mx-auto mb-6 h-0.5 w-12 bg-brand-orange" />
          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-brand-charcoal/80 leading-relaxed font-light">
            {t("franchise.pageSubtitle")}
          </p>
        </div>

        {/* Asymmetrical Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-start">
          
          {/* Column 1: Benefits List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="border-s-4 border-brand-light-green ps-5 mb-8 py-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark-green font-fraunces leading-tight">
                {t("franchise.benefitsHeading")}
              </h2>
            </div>
            
            <div className="space-y-6">
              {benefitKeys.map((key, index) => (
                <div
                  key={key}
                  className="group flex gap-4 rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-light-green/40"
                >
                  {/* Large Stylized Digit */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-wheat-gold font-fraunces text-xl font-bold">
                    0{index + 1}
                  </div>
                  <div className="pt-1">
                    <p className="text-base leading-relaxed text-brand-charcoal/80 font-light font-work-sans">
                      {t(`franchise.${key}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Application Form Framed Box */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-brand-wheat-gold/25 bg-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
              {/* Subtle visual strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-brand-orange" />
              
              <h3 className="mb-6 text-2xl font-bold text-brand-dark-green font-fraunces">
                {t("franchise.formHeading")}
              </h3>
              
              <ContactForm
                endpoint="/api/franchise"
                submitLabel={t("franchise.formSubmitButton")}
                successMessage={t("franchise.formSuccessMessage")}
                errorMessage={t("franchise.formErrorMessage")}
                fields={fieldsWithLabels}
              />
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
