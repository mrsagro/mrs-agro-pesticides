import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { postBySlugQuery, allPostSlugsQuery } from "@/sanity/lib/queries";
import BlogDetailContent from "@/components/BlogDetailContent";
import type { PostFull } from "@/sanity/lib/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  if (!isSanityConfigured || !client) return [];
  const slugs = await client.fetch<{ slug: string }[]>(allPostSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isSanityConfigured || !client) return {};
  const post = await client.fetch<PostFull | null>(postBySlugQuery, { slug });

  if (!post) return {};

  const title = post.seoTitle || `${post.title} | MRS Agro Chemicals`;
  const description = post.seoDescription || post.shortDescription || "";
  const siteUrl = "https://mrs-agro-pesticides.vercel.app";
  const url = `${siteUrl}/knowledge-center/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      ...(post.image?.url && {
        images: [{ url: post.image.url, width: 1200, height: 630 }],
      }),
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(post.image?.url && { images: [post.image.url] }),
    },
    other: {
      "article:published_time": post.publishedAt,
    },
  };
}

export const revalidate = 60;

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!isSanityConfigured || !client) notFound();
  const post = await client.fetch<PostFull | null>(postBySlugQuery, { slug });

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.shortDescription,
    image: post.image?.url,
    datePublished: post.publishedAt,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "MRS Agro Chemicals",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mrs-agro-pesticides.vercel.app/knowledge-center/${slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogDetailContent slug={slug} />
    </>
  );
}
