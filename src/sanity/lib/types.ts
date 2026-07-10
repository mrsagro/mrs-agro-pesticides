export interface SanityImageRef {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: { width: number; height: number };
    lqip?: string;
  };
}

export interface CategorySummary {
  _id: string;
  title: string;
  slug: string;
}

export interface AuthorSummary {
  _id: string;
  name: string;
  slug: string;
  image?: SanityImageRef;
  bio?: string;
}

export interface PostSummary {
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  publishedAt: string;
  readingTime?: number;
  featured?: boolean;
  image?: SanityImageRef;
  categories?: CategorySummary[];
  author?: AuthorSummary;
  tags?: string[];
}

export interface PostFull extends PostSummary {
  body: unknown;
  seoTitle?: string;
  seoDescription?: string;
  categoryIds?: string[];
}
