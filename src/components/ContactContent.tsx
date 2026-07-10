"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import { contactInfo } from "@/lib/contactInfo";
import ContactForm from "@/components/ContactForm";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function ContactContent() {
  const { t, language } = useTranslation();
  const isUrdu = language === "ur";

  const contactChannels = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      title: t("contact.phoneLabel"),
      value: contactInfo.phone,
      href: contactInfo.phoneLink,
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      title: isUrdu ? "واٹس ایپ" : "WhatsApp",
      value: isUrdu ? "واٹس ایپ پر رابطہ کریں" : "Chat on WhatsApp",
      href: contactInfo.whatsappLink,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      ),
      title: t("contact.emailLabel"),
      value: contactInfo.email,
      href: contactInfo.emailLink,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-br from-brand-dark-green to-[#0F2B12]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMHYyMEgwdjBIMjB2MjBIMjBWMjBoMjB2MEgyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpIi8+PC9zdmc+')] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold mb-4"
          >
            {isUrdu ? "ہم سے رابطہ کریں" : "Contact Us"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-white font-fraunces leading-tight"
          >
            {isUrdu ? "ہم آپ کی مدد کے لیے حاضر ہیں" : "Get in Touch"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            {isUrdu
              ? "کسی بھی سوال یا معلومات کے لیے ہم سے رابطہ کرنے میں تامل نہ کریں۔"
              : "We'd love to hear from you. Reach out through any of the channels below."}
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left - Contact Details */}
            <div className="lg:col-span-2 space-y-8">
              {contactChannels.map((channel, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <a
                    href={channel.href}
                    className="group flex items-start gap-5 p-5 rounded-2xl bg-gradient-to-b from-brand-cream to-white border border-brand-dark-green/5 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(27,94,32,0.1)] hover:-translate-y-0.5"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-dark-green/10 text-brand-dark-green group-hover:bg-brand-dark-green group-hover:text-white transition-all duration-300">
                      {channel.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase text-brand-charcoal/40 mb-1">{channel.title}</p>
                      <p className="text-sm font-medium text-brand-charcoal group-hover:text-brand-dark-green transition-colors">
                        {channel.value}
                      </p>
                    </div>
                  </a>
                </FadeUp>
              ))}

              <FadeUp delay={0.3}>
                <div className="p-5 rounded-2xl bg-gradient-to-b from-brand-cream to-white border border-brand-dark-green/5">
                  <h4 className="text-xs font-bold tracking-widest uppercase text-brand-wheat-gold mb-3">
                    {isUrdu ? "ہمارا پتہ" : "Our Address"}
                  </h4>
                  <p className="text-sm text-brand-charcoal/60 leading-relaxed mb-4">
                    {contactInfo.address}
                  </p>
                  <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-brand-dark-green/10">
                    <iframe
                      src={`https://maps.google.com/maps?q=${contactInfo.addressMapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="MRS Agro Chemicals Location"
                    />
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* Right - Form */}
            <div className="lg:col-span-3">
              <FadeUp delay={0.15}>
                <div className="rounded-[32px] bg-gradient-to-b from-brand-cream to-white border border-brand-dark-green/5 p-8 lg:p-12 shadow-xl shadow-brand-dark-green/5">
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-dark-green font-fraunces mb-2">
                    {t("contact.formHeading")}
                  </h3>
                  <p className="text-brand-charcoal/50 text-sm mb-8">
                    {isUrdu
                      ? "ہمیں ایک پیغام بھیجیں اور ہم جلد از جلد جواب دیں گے۔"
                      : "Send us a message and we'll get back to you within 24 hours."}
                  </p>
                  <ContactForm
                    endpoint="/api/contact"
                    fields={[
                      { name: "name", label: t("contact.formNameLabel"), type: "text" },
                      { name: "email", label: t("contact.formEmailLabel"), type: "email" },
                      { name: "message", label: t("contact.formMessageLabel"), type: "textarea" },
                    ]}
                    submitLabel={t("contact.formSubmitButton")}
                    successMessage={t("contact.formSuccessMessage")}
                    errorMessage={t("contact.formErrorMessage")}
                  />
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
