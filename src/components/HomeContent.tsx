"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <span ref={ref} className="tabular-nums">
      {inView ? end : 0}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 24, label: "Products", suffix: "+" },
  { value: 20, label: "Districts Covered", suffix: "+" },
  { value: 98, label: "Satisfaction", suffix: "%" },
];

const features = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Quality Assurance",
    description: "Every product undergoes rigorous testing to ensure effectiveness and safety for local conditions.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Proven Results",
    description: "Trusted by farmers across Punjab for consistent, dependable crop protection performance.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Nationwide Network",
    description: "Authorized franchise partners across Pakistan making quality pesticides accessible to every region.",
  },
];

export default function HomeContent() {
  const { language } = useTranslation();
  const isUrdu = language === "ur";
  const heroRef = useRef(null);

  return (
    <>
      {/* ========== HERO ========== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0A1F0C] via-[#0F2B12] to-[#1B5E20]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-60" />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-wheat-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-light-green/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 lg:pt-40 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white/80 border border-white/10"
              >
                <span className="h-2 w-2 rounded-full bg-brand-wheat-gold animate-pulse" />
                {isUrdu ? "پاکستان کا قابل اعتماد ایگرو پارٹنر" : "Pakistan's Trusted Agro Partner"}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight font-fraunces"
              >
                {isUrdu ? "پاکستان کے مستقبل کی آبیاری" : "Growing Pakistan's"}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-wheat-gold to-brand-orange">
                  {isUrdu ? "ایک کھیت ایک وقت میں" : "Future, One Field"}
                </span>
                <br />
                {isUrdu ? "" : "at a Time"}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg sm:text-xl text-white/60 max-w-xl leading-relaxed font-light"
              >
                {isUrdu
                  ? "ایم آر ایس ایگرو کیمیکلز آپ کے لیے معیاری کیڑے مار ادویات لاتا ہے جن پر ملک بھر کے کسان بھروسہ کرتے ہیں۔"
                  : "Premium quality pesticides trusted by farmers across the country. Science-backed solutions for higher yields."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-wheat-gold px-8 py-4 text-sm font-bold text-[#0A1F0C] transition-all hover:bg-brand-wheat-gold/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-wheat-gold/20"
                >
                  {isUrdu ? "ہماری مصنوعات دیکھیں" : "Explore Products"}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/30"
                >
                  {isUrdu ? "ہم سے رابطہ کریں" : "Contact Us"}
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="flex flex-wrap gap-6 pt-4"
              >
                {["DRAP Compliant", "Lab Tested", "Farmer Trusted"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-white/40 text-xs font-medium tracking-wide uppercase">
                    <svg className="w-4 h-4 text-brand-wheat-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {badge}
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative hidden lg:flex items-center justify-center"
            >
              <div className="relative w-full max-w-lg aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-wheat-gold/10 via-transparent to-brand-light-green/10 rounded-[40px]" />
                <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/images/products/product1.jpeg"
                    alt="Product showcase"
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-[#0F2B12] bg-gradient-to-br from-brand-wheat-gold/20 to-brand-wheat-gold/10" />
                      ))}
                    </div>
                    <div className="text-white">
                      <p className="text-sm font-semibold">{isUrdu ? "مصدقہ شدہ" : "Certified"}</p>
                      <p className="text-xs text-white/50">{isUrdu ? "اور تصدیق شدہ" : "& Verified"}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-brand-wheat-gold/20 backdrop-blur-xl rounded-2xl px-4 py-3 border border-brand-wheat-gold/20">
                  <p className="text-white text-sm font-bold">{isUrdu ? "اعلیٰ معیار" : "Premium Quality"}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-cream to-transparent pointer-events-none" />
      </section>

      {/* ========== STATS BANNER ========== */}
      <section className="relative -mt-20 z-10 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-brand-dark-green/5"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative bg-white px-8 py-12 lg:py-16 text-center group hover:bg-gradient-to-b hover:from-white hover:to-brand-cream transition-all duration-500"
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-dark-green to-brand-light-green scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-${isUrdu ? 'right' : 'left'}`} />
                <p className="text-4xl lg:text-5xl font-bold text-brand-dark-green font-fraunces tracking-tight mb-2">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-brand-charcoal/50 font-medium tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold mb-4">
              {isUrdu ? "ہمیں کیوں منتخب کریں" : "Why Choose Us"}
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight">
              {isUrdu ? "ہم کسانوں کے ساتھ کھڑے ہیں" : "Built for the Fields"}
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <FadeUp key={feature.title} delay={i * 0.15}>
                <div className="group relative h-full rounded-3xl bg-gradient-to-b from-white to-brand-cream border border-brand-dark-green/5 p-8 lg:p-10 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(27,94,32,0.15)] hover:border-brand-dark-green/10 hover:-translate-y-1">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-dark-green/5 to-brand-light-green/5 text-brand-dark-green group-hover:from-brand-dark-green group-hover:to-brand-light-green group-hover:text-white transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark-green font-fraunces mb-3">{feature.title}</h3>
                  <p className="text-brand-charcoal/60 leading-relaxed text-sm">{feature.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BRAND STORY / CTA ========== */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-gradient-to-br from-brand-dark-green to-[#0F2B12]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMHYyMEgwdjBIMjB2MjBIMjBWMjBoMjB2MEgyMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMjUpIi8+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeUp>
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold mb-4">
                {isUrdu ? "ہماری کہانی" : "Our Story"}
              </p>
              <h2 className="text-3xl lg:text-5xl font-bold text-white font-fraunces leading-tight mb-6">
                {isUrdu ? "معیار سے شروع ہونے والا سفر" : "A Journey Rooted in"}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-wheat-gold to-brand-orange">
                  {isUrdu ? "معیار اور اعتماد" : "Quality & Trust"}
                </span>
              </h2>
              <p className="text-white/60 leading-relaxed text-base lg:text-lg mb-8">
                {isUrdu
                  ? "ہم پاکستان کے کسانوں کو جدید، قابلِ بھروسہ اور سستی فصل تحفظ کی مصنوعات فراہم کرنے کے لیے پرعزم ہیں۔ معیار، دیانت داری اور کسان دوست خدمت ہمارے اصول ہیں۔"
                  : "We are committed to delivering high-quality, effective pesticide solutions backed by agricultural expertise and a nationwide franchise network."}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-brand-wheat-gold px-8 py-4 text-sm font-bold text-[#0A1F0C] transition-all hover:bg-brand-wheat-gold/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                {isUrdu ? "مزید جانیں" : "Learn More"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="relative aspect-square lg:aspect-[4/3] rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="/images/products/product22.png"
                  alt="MRS Agro products"
                  fill
                  className="object-contain p-12 bg-gradient-to-br from-white/5 to-white/[0.02]"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="py-20 bg-brand-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="text-sm font-bold tracking-[0.2em] uppercase text-brand-wheat-gold mb-4">
              {isUrdu ? "آج ہی شروع کریں" : "Get Started Today"}
            </p>
            <h2 className="text-3xl lg:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight mb-6 max-w-3xl mx-auto">
              {isUrdu ? "ایم آر ایس ایگرو کیمیکلز کے ساتھ شراکت داری کریں" : "Partner with MRS Agro Chemicals"}
            </h2>
            <p className="text-brand-charcoal/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              {isUrdu
                ? "ہماری فرنچائز نیٹ ورک کا حصہ بنیں اور پاکستان بھر کے کسانوں کو معیاری مصنوعات فراہم کریں۔"
                : "Join our franchise network and bring premium crop protection solutions to farmers across Pakistan."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/franchise"
                className="inline-flex items-center gap-2 rounded-full bg-brand-dark-green px-8 py-4 text-sm font-bold text-white transition-all hover:bg-brand-dark-green/90 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-brand-dark-green/20"
              >
                {isUrdu ? "فرنچائز کے لیے درخواست دیں" : "Apply for Franchise"}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-brand-dark-green/20 px-8 py-4 text-sm font-medium text-brand-dark-green transition-all hover:bg-brand-dark-green/5 hover:border-brand-dark-green/30"
              >
                {isUrdu ? "ہم سے رابطہ کریں" : "Contact Us"}
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
