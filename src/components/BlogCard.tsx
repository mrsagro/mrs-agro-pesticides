"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import { urlFor } from "@/sanity/image";
import { isSanityConfigured } from "@/sanity/env";
import type { PostSummary } from "@/sanity/lib/types";

export default function BlogCard({ post, featured = false }: { post: PostSummary; featured?: boolean }) {
  const { language } = useTranslation();
  const isUrdu = language === "ur";

  const date = new Date(post.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link
      href={isSanityConfigured ? `/knowledge-center/${post.slug}` : "#"}
      className={`group block rounded-3xl border border-brand-wheat-gold/20 bg-white shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-1.5 overflow-hidden ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className={`relative w-full overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[4/3]"} bg-gradient-to-br from-brand-cream via-white to-brand-wheat-gold/10`}>
        {post.image?.url ? (
          <Image
            src={post.image.url}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-dark-green/5 to-brand-orange/5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-wheat-gold/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          </div>
        )}
        {post.categories && post.categories.length > 0 && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {post.categories.slice(0, 1).map((cat) => (
              <span key={cat._id} className="rounded-full bg-brand-dark-green/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cream backdrop-blur-sm">
                {cat.title}
              </span>
            ))}
          </div>
        )}
        {post.featured && (
          <div className="absolute top-4 right-4 rounded-full bg-brand-orange/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-cream backdrop-blur-sm">
            Featured
          </div>
        )}
      </div>

      <div className={`p-5 ${featured ? "p-6" : ""}`}>
        <div className="flex items-center gap-3 text-[11px] text-brand-charcoal/50 font-medium font-work-sans mb-3">
          <span>{date}</span>
          {post.readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-brand-charcoal/30" />
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>

        <h3 className={`font-bold text-brand-dark-green font-fraunces leading-tight transition-colors duration-300 group-hover:text-brand-orange ${
          featured ? "text-2xl mb-3" : "text-lg mb-2"
        }`}>
          {post.title}
        </h3>

        {post.shortDescription && (
          <p className={`text-brand-charcoal/70 font-light leading-relaxed line-clamp-3 font-work-sans ${
            featured ? "text-base" : "text-sm"
          }`}>
            {post.shortDescription}
          </p>
        )}
      </div>
    </Link>
  );
}
