"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";

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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold mb-4">{children}</p>;
}

const timeline = [
  { year: "2025", title: "Founded in Multan", description: "MRS Agro Chemicals established with a vision to serve Pakistan's farmers with premium crop protection solutions.", icon: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  )},
  { year: "2025", title: "DRAP Compliance", description: "All formulations certified and registered with the Department of Plant Protection (DRAP), ensuring safety and efficacy.", icon: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )},
  { year: "2025", title: "Franchise Network Launch", description: "Authorized franchise network launched across Punjab, bringing quality products closer to farming communities.", icon: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
    </svg>
  )},
  { year: "2025+", title: "Expanding Horizons", description: "Continuous R&D for climate-resilient solutions, with plans to expand across all provinces of Pakistan.", icon: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  )},
];

const coreValues = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Trust",
    description: "What's on the label is what's in the bottle — uncompromising honesty in every product.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: "Service",
    description: "Dealers and farmers are family — responsive support at every step of the way.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    title: "Growth",
    description: "We win when our partners win — shared success through quality and innovation.",
  },
];

export default function AboutContent() {
  const { language } = useTranslation();
  const isUrdu = language === "ur";

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
            {isUrdu ? "ہمارا تعارف" : "About Us"}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-6xl font-bold text-white font-fraunces leading-tight"
          >
            {isUrdu ? "اعتماد پر مبنی سفر" : "A Journey of"}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-wheat-gold to-brand-orange">
              {isUrdu ? "معیار اور ترقی" : "Quality & Growth"}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mx-auto mt-6 leading-relaxed"
          >
            {isUrdu
              ? "ایم آر ایس ایگرو کیمیکلز کا قیام اس عزم کے ساتھ کیا گیا کہ پاکستان کے کسانوں کو قابلِ بھروسہ اور موثر زرعی حل فراہم کیے جائیں۔"
              : "Founded with a commitment to deliver reliable, effective crop protection solutions to farmers across Pakistan."}
          </motion.p>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/3.5] rounded-[32px] overflow-hidden bg-gradient-to-br from-brand-cream via-white to-brand-wheat-gold/5 border border-brand-dark-green/5">
                <Image
                  src="/images/ceo.jpeg"
                  alt={isUrdu ? "مالک عمرر رفیق" : "Malik Umer Rafique"}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-dark-green/80 to-transparent p-8">
                  <p className="text-white text-xl font-bold font-fraunces">Malik Umer Rafique</p>
                  <p className="text-white/60 text-sm">{isUrdu ? "سی ای او" : "Chief Executive Officer"}</p>
                </div>
              </div>
            </FadeUp>
            <div className="space-y-8">
              <FadeUp>
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold">
                  {isUrdu ? "سی ای او کا پیغام" : "Message from the CEO"}
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark-green font-fraunces leading-tight">
                  {isUrdu ? "ہمارا مشن: کسانوں کو بااختیار بنانا" : "Empowering Farmers,"}
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-wheat-gold to-brand-orange">
                    {isUrdu ? "معیار اور دیانت داری کے ساتھ" : "One Field at a Time"}
                  </span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-brand-charcoal/60 leading-relaxed text-base lg:text-lg">
                  {isUrdu
                    ? "ایم آر ایس ایگرو کیمیکلز میں ہمارا مشن سادہ مگر واضح ہے: پاکستان کے کسانوں کو جدید، قابلِ بھروسہ اور سستی فصل تحفظ کی مصنوعات فراہم کرنا۔ آغاز سے لے کر آج تک، ہم معیار، دیانت داری اور کسان اول خدمت کے اصولوں پر کاربند رہے ہیں۔ ہم صرف مصنوعات نہیں بیچتے — ہم ڈیلرز اور کسانوں کے ساتھ شراکت داری قائم کرتے ہیں۔"
                    : "At MRS Agro Chemicals, our mission is simple: empower Pakistan's farmers with innovative, reliable, and affordable crop protection solutions. Since inception, we've grown from a single-district operation to a trusted name in agro-inputs, driven by quality, integrity, and farmer-first service. We don't just sell products — we build partnerships with dealers and farmers to ensure higher yields and sustainable agriculture."}
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp>
              <SectionLabel>{isUrdu ? "وژن اور مشن" : "Vision & Mission"}</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark-green font-fraunces leading-tight">
                {isUrdu ? "ہمارا مقصد" : "Our Purpose"}
              </h2>
            </FadeUp>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <FadeUp delay={0.1}>
              <div className="h-full rounded-3xl bg-gradient-to-b from-brand-dark-green to-[#0F2B12] p-8 lg:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-brand-wheat-gold">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white font-fraunces mb-4">{isUrdu ? "ہمارا وژن" : "Our Vision"}</h3>
                <p className="text-white/60 leading-relaxed text-sm">
                  {isUrdu
                    ? "پاکستان کی سب سے قابلِ اعتماد ایگرو کیمیکل کمپنی بننا، جو سائنس اور خدمت کے ذریعے غذائی تحفظ کو ممکن بنائے۔"
                    : "To be Pakistan's most trusted agro chemical company, enabling food security through science and service."}
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="h-full rounded-3xl bg-gradient-to-b from-white to-brand-cream border border-brand-dark-green/5 p-8 lg:p-10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark-green/10 text-brand-dark-green">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-brand-dark-green font-fraunces mb-4">{isUrdu ? "ہمارا مشن" : "Our Mission"}</h3>
                <ul className="space-y-3">
                  {(isUrdu
                    ? ["معیار اول: ڈریپ کے مطابق، لیب میں جانچے گئے فارمولیشنز", "کسان کی تعلیم: محفوظ استعمال پر کھیتوں میں تربیت", "ڈیلر کی ترقی: منافع بخش فرنچائز ماڈل", "جدت: موسمیاتی تبدیلیوں سے ہم آہنگ حل"]
                    : ["Quality First: DRAP-compliant, lab-tested formulations", "Farmer Education: On-ground training on safe usage", "Dealer Growth: Profitable franchise model with support", "Innovation: R&D for climate-resilient solutions"]
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg className="w-4 h-4 text-brand-dark-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-brand-charcoal/60 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 lg:py-24 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp>
              <SectionLabel>{isUrdu ? "ہمارا سفر" : "Our Journey"}</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark-green font-fraunces leading-tight">
                {isUrdu ? "چند مہینوں میں ایک قابل اعتماد نام" : "From Vision to Reality"}
              </h2>
            </FadeUp>
          </div>
          <div className="relative">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-dark-green via-brand-wheat-gold to-transparent" />
            <div className="space-y-8 lg:space-y-10">
              {timeline.map((item, i) => (
                <FadeUp key={i} delay={i * 0.12}>
                  <div className={`relative flex flex-col lg:flex-row gap-6 lg:gap-0 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                    <div className="lg:w-1/2 flex lg:justify-end lg:pr-12">
                      {i % 2 === 0 && (
                        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-brand-dark-green/5 shadow-sm max-w-lg w-full">
                          <div className="flex items-start gap-4">
                            <div className="shrink-0 h-12 w-12 rounded-xl bg-brand-dark-green/10 text-brand-dark-green flex items-center justify-center">
                              {item.icon}
                            </div>
                            <div>
                              <span className="text-xs font-bold tracking-widest text-brand-wheat-gold uppercase">{item.year}</span>
                              <h3 className="text-lg font-bold text-brand-dark-green font-fraunces mt-1 mb-2">{item.title}</h3>
                              <p className="text-brand-charcoal/50 text-sm leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="absolute left-8 lg:left-1/2 w-4 h-4 rounded-full bg-brand-dark-green border-4 border-brand-cream -translate-x-1/2 mt-2" />
                    <div className="lg:w-1/2 lg:pl-12">
                      {i % 2 !== 0 && (
                        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-brand-dark-green/5 shadow-sm max-w-lg w-full">
                          <div className="flex items-start gap-4">
                            <div className="shrink-0 h-12 w-12 rounded-xl bg-brand-dark-green/10 text-brand-dark-green flex items-center justify-center">
                              {item.icon}
                            </div>
                            <div>
                              <span className="text-xs font-bold tracking-widest text-brand-wheat-gold uppercase">{item.year}</span>
                              <h3 className="text-lg font-bold text-brand-dark-green font-fraunces mt-1 mb-2">{item.title}</h3>
                              <p className="text-brand-charcoal/50 text-sm leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp>
              <SectionLabel>{isUrdu ? "بنیادی اقدار" : "Core Values"}</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark-green font-fraunces leading-tight">
                {isUrdu ? "جو چیز ہمیں منفرد بناتی ہے" : "What Sets Us Apart"}
              </h2>
            </FadeUp>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {coreValues.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.15}>
                <div className="group h-full rounded-3xl bg-gradient-to-b from-white to-brand-cream border border-brand-dark-green/5 p-8 lg:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(27,94,32,0.15)] hover:border-brand-dark-green/10 hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-dark-green/5 to-brand-light-green/5 text-brand-dark-green group-hover:from-brand-dark-green group-hover:to-brand-light-green group-hover:text-white transition-all duration-500">
                    {v.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark-green font-fraunces mb-3">{v.title}</h3>
                  <p className="text-brand-charcoal/60 leading-relaxed text-sm">{v.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-brand-dark-green to-[#0F2B12]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <FadeUp>
              <SectionLabel>{isUrdu ? "کمپنی کا جائزہ" : "Company Overview"}</SectionLabel>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-bold text-white font-fraunces leading-tight">
                {isUrdu ? "ہمارے بارے میں حقائق" : "Facts & Figures"}
              </h2>
            </FadeUp>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {[
              { label: isUrdu ? "تاسیس" : "Founded", value: "2025, Multan" },
              { label: isUrdu ? "صدر دفتر" : "Head Office", value: "Plot 106, Phase II, Industrial Estate, Multan" },
              { label: isUrdu ? "بنیادی کاروبار" : "Core Business", value: "Manufacturing, formulation & distribution of pesticides" },
              { label: isUrdu ? "اہم برانڈز" : "Key Brands", value: "Mr. Jin, Golden Shine, Xtra Star, Cropza & more" },
              { label: isUrdu ? "کاروباری حد" : "Coverage", value: "Authorized franchise network across Punjab" },
              { label: isUrdu ? "معیار" : "Quality", value: "DRAP-compliant, lab-tested formulations" },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 lg:p-8 hover:bg-white/10 transition-all duration-300">
                  <p className="text-xs font-bold tracking-widest uppercase text-brand-wheat-gold/60 mb-2">{item.label}</p>
                  <p className="text-white font-medium text-sm lg:text-base leading-relaxed">{item.value}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
