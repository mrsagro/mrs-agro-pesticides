export type Product = {
  id: string;
  imageUrl: string;
  nameEn: string;
  nameUr: string;
  varietyEn: string;
  varietyUr: string;
  descriptionEn: string;
  descriptionUr: string;
};

export const products: Product[] = [
  {
    id: "hybrid-maize",
    imageUrl: "/images/products/placeholder.jpg",
    nameEn: "Hybrid Maize Seeds",
    nameUr: "ہائبرڈ مکئی کے بیج",
    varietyEn: "NK-8711",
    varietyUr: "این کے-8711",
    descriptionEn:
      "High-yield hybrid maize variety with excellent drought tolerance and disease resistance. Suitable for both spring and autumn sowing across all major maize-growing regions of Pakistan.",
    descriptionUr:
      "اعلی پیداوار دینے والی ہائبرڈ مکئی کی قسم جو خشک سالی اور بیماریوں کے خلاف بہترین مزاحمت رکھتی ہے۔ پاکستان کے تمام اہم مکئی اگانے والے علاقوں میں موسم بہار اور خزاں دونوں میں کاشت کے لیے موزوں۔",
  },
  {
    id: "wheat-seeds",
    imageUrl: "/images/products/placeholder.jpg",
    nameEn: "Wheat Seeds",
    nameUr: "گندم کے بیج",
    varietyEn: "Faisalabad-2008",
    varietyUr: "فیصل آباد-2008",
    descriptionEn:
      "Certified wheat seed variety known for its high protein content and uniform growth. Performs exceptionally well in irrigated and rain-fed conditions of Punjab and Sindh.",
    descriptionUr:
      "تصدیق شدہ گندم کے بیج کی قسم جو اعلی پروٹین مواد اور یکساں نشوونما کے لیے مشہور ہے۔ پنجاب اور سندھ کے آبپاشی اور بارانی دونوں حالات میں شاندار کارکردگی دکھاتی ہے۔",
  },
  {
    id: "cotton-seeds",
    imageUrl: "/images/products/placeholder.jpg",
    nameEn: "Cotton Seeds",
    nameUr: "کپاس کے بیج",
    varietyEn: "Bt-Cotton MNH-886",
    varietyUr: "بی ٹی کپاس ایم این ایچ-886",
    descriptionEn:
      "Bt cotton hybrid with built-in pest resistance and high staple length. Delivers consistent yields under the climatic conditions of southern Punjab and Sindh.",
    descriptionUr:
      "بی ٹی کپاس کی ہائبرڈ قسم جو کیڑوں سے قدرتی مزاحمت اور لمبے ریشے کی حامل ہے۔ جنوبی پنجاب اور سندھ کے موسمی حالات میں مسلسل پیداوار دیتی ہے۔",
  },
  {
    id: "rice-seeds",
    imageUrl: "/images/products/placeholder.jpg",
    nameEn: "Rice Seeds",
    nameUr: "چاول کے بیج",
    varietyEn: "Super Basmati",
    varietyUr: "سپر باسمتی",
    descriptionEn:
      "Premium Basmati rice seed with exceptional grain length, aroma, and cooking quality. Adapted to the traditional rice-growing basins of Punjab with excellent export-grade output.",
    descriptionUr:
      "اعلیٰ ترین باسمتی چاول کے بیج جو غیر معمولی دانے کی لمبائی، خوشبو اور پکانے کے معیار کے لیے مشہور ہیں۔ پنجاب کے روایتی چاول اگانے والے علاقوں کے لیے موزوں اور برآمدی معیار کی شاندار پیداوار۔",
  },
];
