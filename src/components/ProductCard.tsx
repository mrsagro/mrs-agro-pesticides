"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "@/lib/useTranslation";
import type { Product } from "@/lib/products";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { language } = useTranslation();
  const isUrdu = language === "ur";
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const name = isUrdu ? product.nameUr : product.nameEn;
  const category = isUrdu ? product.categoryUr : product.categoryEn;
  const description = isUrdu ? product.descriptionUr : product.descriptionEn;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block h-full"
      >
        <div className="relative h-full rounded-3xl bg-white border border-brand-dark-green/5 overflow-hidden transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(27,94,32,0.18)] hover:-translate-y-1.5">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-cream via-white to-brand-wheat-gold/5 overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={name}
              fill
              className="object-contain p-6 lg:p-8 transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute top-4 left-4">
              <span className="inline-block rounded-full bg-brand-dark-green/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                {category}
              </span>
            </div>
          </div>

          <div className="p-6 lg:p-7">
            <h3 className="text-lg font-bold text-brand-dark-green font-fraunces mb-2.5 leading-tight group-hover:text-brand-dark-green/80 transition-colors duration-300">
              {name}
            </h3>
            <p className="text-sm text-brand-charcoal/50 leading-relaxed line-clamp-2 mb-5">
              {description}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark-green group-hover:gap-3 transition-all duration-300">
              {isUrdu ? "مکمل تفصیل" : "View Details"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-dark-green via-brand-light-green to-brand-dark-green scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
        </div>
      </Link>
    </motion.div>
  );
}
