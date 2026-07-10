import { groq } from "next-sanity";

export const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  shortDescription,
  publishedAt,
  readingTime,
  featured,
  "image": image.asset->{
    _id,
    url,
    metadata { dimensions, lqip }
  },
  "categoryIds": categories[]._ref,
  categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  author->{
    _id,
    name,
    "slug": slug.current,
    "image": image.asset->{
      _id,
      url,
      metadata { dimensions, lqip }
    },
    bio
  },
  tags
`;

export const allPostsQuery = groq`
  *[_type == "post" && (!defined($search) || title match $search || shortDescription match $search || pt::text(body) match $search) && (!defined($category) || $category in categories[]->slug.current)]
  | order(publishedAt desc)
  {
    ${postFields}
  }
`;

export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true]
  | order(publishedAt desc)
  [0...3]
  {
    ${postFields}
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post"]
  | order(publishedAt desc)
  [0...6]
  {
    ${postFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]
  {
    ${postFields},
    body,
    seoTitle,
    seoDescription
  }
`;

export const relatedPostsQuery = groq`
  *[_type == "post" && slug.current != $slug && count(categories[@._ref in $categoryIds]) > 0]
  | order(publishedAt desc)
  [0...3]
  {
    ${postFields}
  }
`;

export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`;

export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)]
  {
    "slug": slug.current
  }
`;
