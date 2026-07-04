"use client";

import { useTranslation } from "@/lib/useTranslation";
import { contactInfo } from "@/lib/contactInfo";
import ContactForm from "@/components/ContactForm";
import type { FormField } from "@/components/ContactForm";

const contactFields: FormField[] = [
  { name: "name", label: "", type: "text", required: true },
  { name: "email", label: "", type: "email", required: true },
  { name: "message", label: "", type: "textarea", required: true },
];

export default function ContactContent() {
  const { t } = useTranslation();

  const fieldsWithLabels = contactFields.map((f) => ({
    ...f,
    label: t(`contact.form${f.name.charAt(0).toUpperCase() + f.name.slice(1)}Label`),
  }));

  return (
    <div className="bg-brand-cream">
      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-brand-dark-green md:text-5xl">
            {t("contact.pageTitle")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-brand-charcoal/80">
            {t("contact.pageSubtitle")}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-brand-light-green/30 bg-white p-6 text-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-3 h-6 w-6 text-brand-orange"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <p className="mb-1 text-sm font-medium text-brand-dark-green">
              {t("contact.phoneLabel")}
            </p>
            <a
              href={contactInfo.phoneLink}
              className="text-sm text-brand-charcoal/80 transition-colors hover:text-brand-orange"
            >
              {contactInfo.phone}
            </a>
          </div>

          <div className="rounded-lg border border-brand-light-green/30 bg-white p-6 text-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-3 h-6 w-6 text-brand-orange"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="mb-1 text-sm font-medium text-brand-dark-green">
              {t("contact.whatsappLabel")}
            </p>
            <a
              href={contactInfo.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-charcoal/80 transition-colors hover:text-brand-orange"
            >
              {t("footer.whatsapp")}
            </a>
          </div>

          <div className="rounded-lg border border-brand-light-green/30 bg-white p-6 text-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-3 h-6 w-6 text-brand-orange"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <p className="mb-1 text-sm font-medium text-brand-dark-green">
              {t("contact.emailLabel")}
            </p>
            <a
              href={contactInfo.emailLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-brand-charcoal/80 transition-colors hover:text-brand-orange"
            >
              {contactInfo.email}
            </a>
          </div>

          <div className="rounded-lg border border-brand-light-green/30 bg-white p-6 text-center shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-3 h-6 w-6 text-brand-orange"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <p className="mb-1 text-sm font-medium text-brand-dark-green">
              {t("contact.addressLabel")}
            </p>
            <p className="text-sm text-brand-charcoal/80">
              {contactInfo.address}
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-8 text-center text-3xl font-bold text-brand-dark-green">
            {t("contact.formHeading")}
          </h2>
          <ContactForm
            endpoint="/api/contact"
            submitLabel={t("contact.formSubmitButton")}
            successMessage={t("contact.formSuccessMessage")}
            errorMessage={t("contact.formErrorMessage")}
            fields={fieldsWithLabels}
          />
        </div>
      </section>
    </div>
  );
}
