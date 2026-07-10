"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import { useTranslation } from "@/lib/useTranslation";
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { urlFor } from "@/sanity/image";
import { postBySlugQuery, relatedPostsQuery, latestPostsQuery } from "@/sanity/lib/queries";
import BlogCard from "@/components/BlogCard";
import type { PostFull, PostSummary } from "@/sanity/lib/types";

const portableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 id={children?.toString().toLowerCase().replace(/\s+/g, "-")} className="text-2xl sm:text-3xl font-bold text-brand-dark-green font-fraunces mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={children?.toString().toLowerCase().replace(/\s+/g, "-")} className="text-xl sm:text-2xl font-bold text-brand-dark-green font-fraunces mt-10 mb-3 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg sm:text-xl font-bold text-brand-dark-green font-fraunces mt-8 mb-2">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-orange bg-brand-cream pl-6 py-4 my-8 rounded-r-2xl text-lg italic text-brand-charcoal/80 font-light">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-base sm:text-lg leading-relaxed text-brand-charcoal/80 mb-5 font-light font-work-sans">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-2 my-6 list-disc list-inside text-brand-charcoal/80 font-work-sans">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="space-y-2 my-6 list-decimal list-inside text-brand-charcoal/80 font-work-sans">
        {children}
      </ol>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
          {value.asset && urlFor(value) && (
            <Image
              src={urlFor(value)!.width(1200).height(675).url()}
              alt={value.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          )}
        </div>
        {value.caption && (
          <figcaption className="mt-3 text-center text-sm text-brand-charcoal/50 font-work-sans italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noopener noreferrer" : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;
      return (
        <a href={value.href} rel={rel} target={target} className="text-brand-dark-green underline underline-offset-2 decoration-brand-light-green/40 hover:decoration-brand-light-green transition-all font-medium">
          {children}
        </a>
      );
    },
  },
};

function extractHeadings(body: unknown): { id: string; text: string; level: number }[] {
  if (!Array.isArray(body)) return [];
  return body
    .filter((block): block is { _type: "block"; style: string; children: { text: string }[] } =>
      block?._type === "block" && (block.style === "h2" || block.style === "h3") && Array.isArray(block.children)
    )
    .map((block) => ({
      id: block.children.map((c) => c.text).join("").toLowerCase().replace(/\s+/g, "-"),
      text: block.children.map((c) => c.text).join(""),
      level: block.style === "h2" ? 2 : 3,
    }));
}

export default function BlogDetailContent({ slug }: { slug: string }) {
  const { language } = useTranslation();
  const isUrdu = language === "ur";
  const [post, setPost] = useState<PostFull | null>(null);
  const [related, setRelated] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [tocOpen, setTocOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (!isSanityConfigured || !client) {
          setPost(null);
          return;
        }
        const data = await client.fetch<PostFull>(postBySlugQuery, { slug });
        setPost(data);
        if (data?.categoryIds) {
          const relatedData = await client.fetch<PostSummary[]>(relatedPostsQuery, {
            slug,
            categoryIds: data.categoryIds,
          });
          setRelated(relatedData);
        }
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.seoTitle || post?.title || "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  if (loading) {
    return (
      <div className="bg-brand-cream min-h-screen pt-20 pb-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="aspect-[16/9] skeleton rounded-3xl mb-10" />
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="h-4 w-32 skeleton" />
            <div className="h-10 w-full skeleton" />
            <div className="h-10 w-3/4 skeleton" />
            <div className="h-4 w-48 skeleton" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-5 w-full skeleton" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-brand-cream min-h-screen pt-20 pb-20 flex items-center justify-center">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-brand-charcoal/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <h1 className="text-2xl font-bold text-brand-dark-green font-fraunces mb-2">
            {isUrdu ? "مضمون نہیں ملا" : "Article Not Found"}
          </h1>
          <p className="text-brand-charcoal/60 mb-6 font-work-sans">
            {isUrdu ? "یہ مضمون حذف ہو سکتا ہے یا دستیاب نہیں ہے" : "This article may have been removed or is not available."}
          </p>
          <Link
            href="/knowledge-center"
            className="inline-flex items-center gap-2 rounded-full bg-brand-dark-green px-6 py-3 text-sm font-bold text-brand-cream transition-all hover:bg-brand-dark-green/90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {isUrdu ? "علمی مرکز پر واپس جائیں" : "Back to Knowledge Center"}
          </Link>
        </div>
      </div>
    );
  }

  const date = new Date(post.publishedAt).toLocaleDateString(isUrdu ? "ur-PK" : "en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const headings = extractHeadings(post.body);

  return (
    <div className="bg-brand-cream min-h-screen">
      <article>
        <div className="relative bg-gradient-to-br from-brand-dark-green via-brand-dark-green to-[#0D2E10]/95 text-brand-cream overflow-hidden">
          <div className="absolute inset-0 bg-field-pattern opacity-[0.02] pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 lg:py-24">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/knowledge-center"
                className="inline-flex items-center gap-2 text-sm text-brand-cream/60 hover:text-brand-orange transition-colors mb-8 font-work-sans"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                {isUrdu ? "علمی مرکز پر واپس جائیں" : "Back to Knowledge Center"}
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                {post.categories?.map((cat) => (
                  <span key={cat._id} className="rounded-full bg-brand-wheat-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-wheat-gold">
                    {cat.title}
                  </span>
                ))}
                {post.readingTime && (
                  <span className="text-xs text-brand-cream/50 font-work-sans">{post.readingTime} min read</span>
                )}
                <span className="text-xs text-brand-cream/50 font-work-sans">{date}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-fraunces leading-tight mb-6">
                {post.title}
              </h1>

              {post.shortDescription && (
                <p className="text-lg sm:text-xl text-brand-cream/75 leading-relaxed font-light max-w-3xl">
                  {post.shortDescription}
                </p>
              )}

              {post.author && (
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-brand-cream/10">
                  {post.author.image?.url && (
                    <div className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-brand-wheat-gold/20">
                      <Image
                        src={post.author.image.url}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold font-work-sans">{post.author.name}</p>
                    {post.author.bio && (
                      <p className="text-xs text-brand-cream/50 font-work-sans">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {post.image?.url && (
          <div className="mx-auto max-w-7xl px-4 -mt-16 relative z-10 mb-12">
            <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={post.image.url}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
          </div>
        )}

        <div className="mx-auto max-w-7xl px-4 pb-24">
          <div className="flex gap-12 lg:gap-16 relative">
            {headings.length > 0 && (
              <>
                <button
                  onClick={() => setTocOpen(!tocOpen)}
                  className="lg:hidden fixed bottom-6 right-6 z-40 rounded-full bg-brand-dark-green text-brand-cream p-3 shadow-2xl transition-all hover:bg-brand-dark-green/90"
                  aria-label="Table of contents"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </button>

                <aside className={`fixed lg:sticky top-24 right-0 z-30 w-72 h-full lg:h-auto bg-white lg:bg-transparent shadow-2xl lg:shadow-none rounded-l-2xl lg:rounded-none p-6 lg:p-0 transition-transform duration-300 ${
                  tocOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
                } lg:block lg:w-64 shrink-0`}>
                  <div className="lg:sticky lg:top-28">
                    <button onClick={() => setTocOpen(false)} className="lg:hidden absolute top-4 right-4 text-brand-charcoal/50 hover:text-brand-charcoal">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <h4 className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold font-work-sans mb-4">
                      {isUrdu ? "فہرست" : "On this page"}
                    </h4>
                    <nav className="space-y-2">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className={`block text-sm font-work-sans transition-colors hover:text-brand-dark-green ${
                            h.level === 2
                              ? "text-brand-charcoal/70 font-medium pl-0"
                              : "text-brand-charcoal/50 pl-4"
                          }`}
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-brand-wheat-gold/10">
                      <h4 className="text-xs uppercase tracking-widest text-brand-charcoal/40 font-bold font-work-sans mb-3">
                        {isUrdu ? "شیئر کریں" : "Share"}
                      </h4>
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all"
                          aria-label="Share on WhatsApp"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                        </a>
                        <button
                          onClick={copyLink}
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-charcoal/5 text-brand-charcoal/50 hover:bg-brand-charcoal/10 hover:text-brand-charcoal transition-all"
                          aria-label="Copy link"
                        >
                          {copied ? (
                            <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </aside>
              </>
            )}

            <div className="flex-1 min-w-0 max-w-3xl">
              {!!post.body && (
                <div className="prose-custom">
                  <PortableText value={post.body as any} components={portableComponents} />
                </div>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-brand-wheat-gold/15">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-brand-cream border border-brand-wheat-gold/15 px-3 py-1 text-xs text-brand-charcoal/60 font-work-sans">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-brand-wheat-gold/15">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl bg-white border border-brand-wheat-gold/10 shadow-sm">
                  {post.author?.image?.url && (
                    <div className="relative h-16 w-16 rounded-full overflow-hidden ring-2 ring-brand-wheat-gold/20 shrink-0">
                      <Image
                        src={post.author.image.url}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-bold text-brand-dark-green font-fraunces">{post.author?.name}</p>
                    {post.author?.bio && (
                      <p className="text-sm text-brand-charcoal/60 font-work-sans mt-1">{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-white border-t border-brand-wheat-gold/15 px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold text-brand-dark-green font-fraunces mb-8">
              {isUrdu ? "متعلقہ مضامین" : "Related Articles"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
