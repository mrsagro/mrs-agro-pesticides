"use client";

import { useState, type FormEvent } from "react";
import { useTranslation } from "@/lib/useTranslation";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea";
  required: boolean;
};

type ContactFormProps = {
  endpoint: string;
  submitLabel: string;
  successMessage: string;
  errorMessage: string;
  fields: FormField[];
};

export default function ContactForm({
  endpoint,
  submitLabel,
  successMessage,
  errorMessage,
  fields,
}: ContactFormProps) {
  const { language } = useTranslation();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || errorMessage);
      } else {
        setSuccess(successMessage);
        setFormData({});
      }
    } catch {
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full space-y-6"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-start text-sm font-semibold text-brand-dark-green font-work-sans"
          >
            {field.label}
            {field.required && (
              <span className="ms-1 text-brand-orange font-bold">*</span>
            )}
          </label>
          
          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              rows={4}
              className="w-full rounded-2xl border border-brand-dark-green/20 bg-brand-cream/40 px-4 py-3 text-start text-brand-charcoal placeholder:text-brand-charcoal/40 transition-all duration-300 focus:border-brand-dark-green focus:ring-2 focus:ring-brand-light-green/30 focus:outline-none font-work-sans"
              dir={language === "ur" ? "rtl" : "ltr"}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              className="w-full rounded-2xl border border-brand-dark-green/20 bg-brand-cream/40 px-4 py-3 text-start text-brand-charcoal placeholder:text-brand-charcoal/40 transition-all duration-300 focus:border-brand-dark-green focus:ring-2 focus:ring-brand-light-green/30 focus:outline-none font-work-sans"
              dir={language === "ur" ? "rtl" : "ltr"}
            />
          )}
        </div>
      ))}

      {/* Premium CTA Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full group rounded-full bg-brand-orange py-4 px-6 text-sm font-bold text-brand-cream transition-all duration-300 hover:bg-brand-orange/95 hover:scale-[1.01] active:scale-[0.99] shadow-md hover:shadow-brand-orange/25 disabled:opacity-50 disabled:pointer-events-none font-work-sans cursor-pointer"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{language === "ur" ? "بھیجا جا رہا ہے..." : "Submitting..."}</span>
          </span>
        ) : (
          submitLabel
        )}
      </button>

      {/* Styled Validation Alerts */}
      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50/60 p-4 text-start text-green-800 flex items-start gap-3 animate-fade-in-up">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium font-work-sans">{success}</span>
        </div>
      )}
      
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4 text-start text-red-800 flex items-start gap-3 animate-fade-in-up">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm font-medium font-work-sans">{error}</span>
        </div>
      )}
    </form>
  );
}
