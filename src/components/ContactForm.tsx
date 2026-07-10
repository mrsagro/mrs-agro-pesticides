"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";

export type FormField = {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea";
  required?: boolean;
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
  const isUrdu = language === "ur";
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

  const inputClass = "w-full rounded-xl border border-brand-dark-green/15 bg-white px-4 py-3.5 text-sm text-brand-charcoal placeholder:text-brand-charcoal/30 transition-all duration-300 focus:border-brand-dark-green focus:ring-2 focus:ring-brand-dark-green/10 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-5"
      dir={isUrdu ? "rtl" : "ltr"}
    >
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-2 block text-sm font-medium text-brand-charcoal/60"
          >
            {field.label}
            {field.required !== false && (
              <span className="ms-1 text-brand-orange">*</span>
            )}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required !== false}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required !== false}
              className={inputClass}
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className="relative w-full rounded-xl bg-brand-dark-green py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-brand-dark-green/90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{isUrdu ? "بھیجا جا رہا ہے..." : "Submitting..."}</span>
          </span>
        ) : (
          <span>{submitLabel}</span>
        )}
      </button>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm text-green-800 flex items-start gap-3"
          >
            <svg className="w-5 h-5 shrink-0 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {success}
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800 flex items-start gap-3"
          >
            <svg className="w-5 h-5 shrink-0 text-red-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
