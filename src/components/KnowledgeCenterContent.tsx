"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "@/lib/useTranslation";
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { allPostsQuery, featuredPostsQuery, allCategoriesQuery } from "@/sanity/lib/queries";
import BlogCard from "@/components/BlogCard";
import type { PostSummary, CategorySummary } from "@/sanity/lib/types";

export function KnowledgeCenterContent() {
  const { language } = useTranslation();
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<PostSummary[]>([]);
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      if (!isSanityConfigured || !client) {
        setPosts([]);
        setFeaturedPosts([]);
        setCategories([]);
        return;
      }
      const [allPosts, featPosts, cats] = await Promise.all([
        client.fetch(allPostsQuery, { search: search || null, category: activeCategory }),
        client.fetch(featuredPostsQuery),
        client.fetch(allCategoriesQuery),
      ]);
      setPosts(allPosts);
      setFeaturedPosts(featPosts);
      setCategories(cats);
    } catch {
      setPosts([]);
      setFeaturedPosts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, [search, activeCategory]);

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const nonFeatured = posts.filter((p) => !p.featured);
  const topFeatured = featuredPosts.slice(0, 3);

  return (
    <div className="bg-brand-cream">
      <section className="relative bg-gradient-to-br from-brand-dark-green via-brand-dark-green to-[#0D2E10]/95 px-4 py-16 lg:py-20 text-brand-cream overflow-hidden">
        <div className="absolute inset-0 bg-field-pattern opacity-[0.02] pointer-events-none" />
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-brand-light-green/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-5xl text-center relative">
          <p className="mb-3 text-xs uppercase tracking-[0.15em] text-brand-wheat-gold font-bold font-work-sans">
            {language === "ur" ? "علمی مرکز" : "Knowledge Center"}
          </p>
          <h1 className="mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold font-fraunces leading-tight">
            {language === "ur" ? "کاشتکاروں کے لیے رہنما" : "Guides & Insights for Growers"}
          </h1>
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-brand-cream/75 leading-relaxed font-light">
            {language === "ur"
              ? "ماہرین کے مشورے، جدید طریقے اور فصلوں کی بہتر پیداوار کے لیے مکمل رہنما"
              : "Expert advice, modern practices, and complete guides for better crop yield."}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 -mt-8 relative z-10 mb-8">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white rounded-2xl shadow-lg border border-brand-wheat-gold/10 p-3">
          <div className="relative flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === "ur" ? "مضامین تلاش کریں..." : "Search articles..."}
              className="w-full rounded-xl border border-brand-wheat-gold/15 bg-brand-cream/50 pl-10 pr-4 py-2.5 text-sm text-brand-charcoal placeholder:text-brand-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brand-light-green/30 transition-all font-work-sans"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all font-work-sans ${
                activeCategory === null
                  ? "bg-brand-dark-green text-brand-cream shadow-md"
                  : "bg-brand-cream text-brand-charcoal/70 hover:bg-white hover:shadow-sm border border-brand-wheat-gold/15"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(activeCategory === cat.slug ? null : cat.slug)}
                className={`rounded-full px-4 py-2 text-xs font-bold tracking-wider transition-all font-work-sans ${
                  activeCategory === cat.slug
                    ? "bg-brand-dark-green text-brand-cream shadow-md"
                    : "bg-brand-cream text-brand-charcoal/70 hover:bg-white hover:shadow-sm border border-brand-wheat-gold/15"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        {loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-3xl overflow-hidden">
                  <div className="aspect-[4/3] skeleton" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-24 skeleton" />
                    <div className="h-5 w-full skeleton" />
                    <div className="h-4 w-3/4 skeleton" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {topFeatured.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-brand-dark-green font-fraunces mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  {language === "ur" ? "نمایاں مضامین" : "Featured Articles"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topFeatured.map((post) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-brand-dark-green font-fraunces mb-6">
              {language === "ur" ? "تمام مضامین" : "All Articles"}
            </h2>
            {nonFeatured.length === 0 && posts.length === 0 ? (
              <div className="text-center py-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-brand-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <p className="text-brand-charcoal/50 text-lg font-work-sans">
                  {language === "ur" ? "کوئی مضمون نہیں ملا" : "No articles found"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(nonFeatured.length > 0 ? nonFeatured : posts).map((post, idx) => (
                  <div
                    key={post._id}
                    className="opacity-0 translate-y-8"
                    style={{ animation: `revealUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.05 * idx}s forwards` }}
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
