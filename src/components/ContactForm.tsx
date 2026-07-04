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
      className="mx-auto max-w-xl space-y-5"
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1 block text-start text-sm font-medium text-brand-dark-green"
          >
            {field.label}
            {field.required && (
              <span className="ms-1 text-red-500">*</span>
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
              className="w-full rounded border border-brand-dark-green/30 bg-brand-cream px-4 py-2 text-start text-brand-charcoal placeholder:text-brand-charcoal/40 focus:border-brand-dark-green focus:outline-none"
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
              className="w-full rounded border border-brand-dark-green/30 bg-brand-cream px-4 py-2 text-start text-brand-charcoal placeholder:text-brand-charcoal/40 focus:border-brand-dark-green focus:outline-none"
              dir={language === "ur" ? "rtl" : "ltr"}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-brand-orange px-6 py-3 font-semibold text-brand-cream transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "..." : submitLabel}
      </button>

      {success && (
        <p className="rounded bg-green-100 px-4 py-3 text-start text-green-800">
          {success}
        </p>
      )}
      {error && (
        <p className="rounded bg-red-100 px-4 py-3 text-start text-red-800">
          {error}
        </p>
      )}
    </form>
  );
}
