// ⚠️ GENERIC DESCRIPTIONS — PENDING OFFICIAL LABEL VERIFICATION
// ============================================================
// The product descriptions, highlights, and category labels in this file
// are SAFE, GENERIC marketing placeholders only. They do NOT include:
//   • Exact active ingredient percentages
//   • DRAP (Pakistan) registration numbers
//   • Specific application or dosage rates
//   • Withholding periods or pre-harvest intervals
//
// Before this data is used for real customers, labels, or regulatory
// submissions, the client MUST verify every description against their
// official DRAP-approved product labels and insert the precise technical
// information. Nothing here should be treated as a substitute for an
// approved label.

export type Product = {
  id: string;
  slug: string;
  imageUrl: string;
  nameEn: string;
  nameUr: string;
  categoryEn: string;
  categoryUr: string;
  descriptionEn: string;
  descriptionUr: string;
  highlightsEn: string[];
  highlightsUr: string[];
};

export const products: Product[] = [
  {
    id: "emamectin",
    slug: "emamectin",
    imageUrl: "/images/products/product1.jpeg",
    nameEn: "Emamectin",
    nameUr: "ایمیمیکٹن",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A trusted insecticide formulated to control caterpillar and bollworm infestations in cotton and vegetable crops, helping protect yield from early-stage pest damage.",
    descriptionUr:
      "ایک معروف کیڑے مار دوا جو کپاس اور سبزیوں کی فصلوں میں سنڈی اور بول ورم کے حملے کو کنٹرول کرنے کے لیے تیار کی گئی ہے، جو ابتدائی مراحل میں کیڑوں کے نقصان سے پیداوار کو بچانے میں مدد دیتی ہے۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "perfect-clean",
    slug: "perfect-clean",
    imageUrl: "/images/products/product2.png",
    nameEn: "Perfect Clean",
    nameUr: "پرفیکٹ کلین",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A broad-spectrum insecticide designed to control sucking insect pests across cotton and vegetable crops, supporting cleaner, healthier fields.",
    descriptionUr:
      "ایک وسیع اثر کیڑے مار دوا جو کپاس اور سبزیوں کی فصلوں میں چوسنے والے کیڑوں پر قابو پانے کے لیے ڈیزائن کی گئی ہے، جو صاف ستھرے اور صحت مند کھیتوں کو یقینی بناتی ہے۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "insect-guard",
    slug: "insect-guard",
    imageUrl: "/images/products/product3.png",
    nameEn: "Insect Guard",
    nameUr: "انسیکٹ گارڈ",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "An effective insecticide solution for managing common sucking and chewing pests in field crops, formulated for reliable field performance.",
    descriptionUr:
      "کھیت کی فصلوں میں عام چبانے اور چوسنے والے کیڑوں کے انتظام کے لیے ایک موثر کیڑے مار دوا، جو قابل اعتماد کھیتی کارکردگی کے لیے تیار کی گئی ہے۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "agro-cut",
    slug: "agro-cut",
    imageUrl: "/images/products/product4.png",
    nameEn: "Agro Cut",
    nameUr: "ایگرو کٹ",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A dependable insecticide formulated to cut down pest pressure on field crops, targeting both chewing and sucking insects for improved crop health.",
    descriptionUr:
      "کھیت کی فصلوں پر کیڑوں کے دباؤ کو کم کرنے کے لیے تیار کردہ ایک قابل اعتماد کیڑے مار دوا، جو چبانے اور چوسنے والے دونوں قسم کے کیڑوں کو نشانہ بناتی ہے اور فصل کی صحت کو بہتر بناتی ہے۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "sulphur-sp",
    slug: "sulphur-sp",
    imageUrl: "/images/products/product5.png",
    nameEn: "Sulphur SP",
    nameUr: "سلفر ایس پی",
    categoryEn: "Fungicide / Miticide",
    categoryUr: "فنگس سائیڈ / مائٹ سائیڈ",
    descriptionEn:
      "A sulfur-based fungicide and miticide that helps manage fungal disease and mite infestations across a range of field and vegetable crops.",
    descriptionUr:
      "سلفر پر مبنی ایک فنگس سائیڈ اور مائٹ سائیڈ جو کھیت اور سبزیوں کی مختلف فصلوں میں فنگل بیماریوں اور زِرّہ کے حملے پر قابو پانے میں مدد دیتی ہے۔",
    highlightsEn: [
      "Controls fungal diseases and mite infestations",
      "Suitable for field and vegetable crops",
      "Sulfur-based formulation for dual protection",
    ],
    highlightsUr: [
      "فنگل بیماریوں اور زِرّہ کے حملے پر قابو پاتا ہے",
      "کھیت اور سبزیوں کی فصلوں کے لیے موزوں",
      "دوہری حفاظت کے لیے سلفر پر مبنی فارمولیشن",
    ],
  },
  {
    id: "coral",
    slug: "coral",
    imageUrl: "/images/products/product6.png",
    nameEn: "Coral",
    nameUr: "کورل",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A general-purpose insecticide formulated for effective pest control across a variety of field crops.",
    descriptionUr:
      "مختلف کھیت کی فصلوں پر موثر کیڑوں پر قابو پانے کے لیے تیار کردہ ایک عمومی مقصد کی کیڑے مار دوا۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "migrat",
    slug: "migrat",
    imageUrl: "/images/products/product7.png",
    nameEn: "Migrat",
    nameUr: "مائیگریٹ",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "An insecticide targeted at controlling aphids, jassids, and other common sap-sucking pests that affect crop vigor and yield.",
    descriptionUr:
      "ایک کیڑے مار دوا جو افڈس، جیسڈ اور دیگر عام رس چوسنے والے کیڑوں پر قابو پانے کے لیے تیار کی گئی ہے جو فصل کی توانائی اور پیداوار کو متاثر کرتے ہیں۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "spectral",
    slug: "spectral",
    imageUrl: "/images/products/product8.png",
    nameEn: "Spectral",
    nameUr: "اسپیکٹرل",
    categoryEn: "Fungicide",
    categoryUr: "فنگس سائیڈ",
    descriptionEn:
      "A fungicide formulated to protect maize and other field crops from fungal disease, supporting healthier stalks and improved grain quality.",
    descriptionUr:
      "مکئی اور دیگر کھیت کی فصلوں کو فنگل بیماریوں سے بچانے کے لیے تیار کردہ ایک فنگس سائیڈ، جو صحت مند تنوں اور بہتر دانے کے معیار کو یقینی بناتی ہے۔",
    highlightsEn: [
      "Protects crops from fungal disease",
      "Supports healthier plant growth",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "فصلوں کو فنگل بیماریوں سے بچاتا ہے",
      "صحت مند پودوں کی نشوونما میں مدد دیتا ہے",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "rebeen",
    slug: "rebeen",
    imageUrl: "/images/products/product9.png",
    nameEn: "Rebeen",
    nameUr: "ریبین",
    categoryEn: "Herbicide",
    categoryUr: "جڑی بوٹی مار دوا",
    descriptionEn:
      "A herbicide formulated for effective weed control in field crops, helping reduce competition for nutrients, water, and sunlight.",
    descriptionUr:
      "کھیت کی فصلوں میں جڑی بوٹیوں پر مؤثر کنٹرول کے لیے تیار کردہ ایک جڑی بوٹی مار دوا، جو غذائی اجزاء، پانی اور سورج کی روشنی کے مقابلے کو کم کرنے میں مدد دیتی ہے۔",
    highlightsEn: [
      "Effective weed control for cleaner fields",
      "Reduces competition for nutrients and water",
      "Supports better crop establishment",
    ],
    highlightsUr: [
      "صاف ستھرے کھیتوں کے لیے جڑی بوٹیوں کا مؤثر کنٹرول",
      "غذائی اجزاء اور پانی کے مقابلے کو کم کرتا ہے",
      "بہتر فصلوں کو یقینی بناتا ہے",
    ],
  },
  {
    id: "caddie",
    slug: "caddie",
    imageUrl: "/images/products/product10.jpeg",
    nameEn: "Caddie",
    nameUr: "کیڈی",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A combination insecticide solution developed for comprehensive cotton pest management, targeting whitefly, jassid, and other key cotton pests.",
    descriptionUr:
      "کپاس کے کیڑوں کے جامع انتظام کے لیے تیار کردہ ایک امتزاجی کیڑے مار دوا، جو وائٹ فلائی، جیسڈ اور دیگر اہم کپاس کے کیڑوں کو نشانہ بناتی ہے۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "aluminium-phosphide-tablet",
    slug: "aluminium-phosphide-tablet",
    imageUrl: "/images/products/product11.png",
    nameEn: "Aluminium Phosphide (Tablet)",
    nameUr: "ایلومینیم فاسفائیڈ (گولی)",
    categoryEn: "Fumigant",
    categoryUr: "فیومی گینٹ",
    descriptionEn:
      "A phosphine-releasing fumigant tablet used for the protection of stored grain against insect infestation during storage.",
    descriptionUr:
      "ذخیرہ شدہ اناج کو ذخیرہ کرنے کے دوران کیڑوں کے حملے سے بچانے کے لیے استعمال ہونے والی فاسفین خارج کرنے والی فیومی گینٹ گولی۔",
    highlightsEn: [
      "Protects stored grain from insect infestation",
      "Phosphine-releasing formulation",
      "Effective in storage environments",
    ],
    highlightsUr: [
      "ذخیرہ شدہ اناج کو کیڑوں سے بچاتا ہے",
      "فاسفین خارج کرنے والی فارمولیشن",
      "ذخیرہ کرنے کے ماحول میں موثر",
    ],
  },
  {
    id: "aluminium-phosphide-can",
    slug: "aluminium-phosphide-can",
    imageUrl: "/images/products/product12.jpeg",
    nameEn: "Aluminium Phosphide (Can Pack)",
    nameUr: "ایلومینیم فاسفائیڈ (کین پیک)",
    categoryEn: "Fumigant",
    categoryUr: "فیومی گینٹ",
    descriptionEn:
      "A larger-format phosphine fumigant packaging designed for stored grain protection in bulk storage settings.",
    descriptionUr:
      "بڑے ذخیرہ کرنے والے مقامات پر ذخیرہ شدہ اناج کی حفاظت کے لیے ڈیزائن کردہ فاسفین فیومی گینٹ کا بڑے فارمیٹ کا پیکیج۔",
    highlightsEn: [
      "Protects stored grain from insect infestation",
      "Phosphine-releasing formulation",
      "Effective in storage environments",
    ],
    highlightsUr: [
      "ذخیرہ شدہ اناج کو کیڑوں سے بچاتا ہے",
      "فاسفین خارج کرنے والی فارمولیشن",
      "ذخیرہ کرنے کے ماحول میں موثر",
    ],
  },
  {
    id: "alkan",
    slug: "alkan",
    imageUrl: "/images/products/product13.png",
    nameEn: "Alkan",
    nameUr: "الکان",
    categoryEn: "Fumigant",
    categoryUr: "فیومی گینٹ",
    descriptionEn:
      "A phosphine-based fumigant formulated for effective control of insect pests in stored grain and warehousing environments.",
    descriptionUr:
      "ذخیرہ شدہ اناج اور گوداموں میں کیڑوں پر مؤثر کنٹرول کے لیے تیار کردہ فاسفین پر مبنی فیومی گینٹ۔",
    highlightsEn: [
      "Protects stored grain from insect infestation",
      "Phosphine-releasing formulation",
      "Effective in storage environments",
    ],
    highlightsUr: [
      "ذخیرہ شدہ اناج کو کیڑوں سے بچاتا ہے",
      "فاسفین خارج کرنے والی فارمولیشن",
      "ذخیرہ کرنے کے ماحول میں موثر",
    ],
  },
  {
    id: "solomix",
    slug: "solomix",
    imageUrl: "/images/products/product14.png",
    nameEn: "Solomix",
    nameUr: "سولومکس",
    categoryEn: "Herbicide",
    categoryUr: "جڑی بوٹی مار دوا",
    descriptionEn:
      "A herbicide formulated to control broadleaf weeds in field crops, supporting cleaner fields and improved crop establishment.",
    descriptionUr:
      "کھیت کی فصلوں میں چوڑی پتی والی جڑی بوٹیوں پر قابو پانے کے لیے تیار کردہ ایک جڑی بوٹی مار دوا، جو صاف ستھرے کھیتوں اور بہتر فصلوں کو یقینی بناتی ہے۔",
    highlightsEn: [
      "Effective weed control for cleaner fields",
      "Reduces competition for nutrients and water",
      "Supports better crop establishment",
    ],
    highlightsUr: [
      "صاف ستھرے کھیتوں کے لیے جڑی بوٹیوں کا مؤثر کنٹرول",
      "غذائی اجزاء اور پانی کے مقابلے کو کم کرتا ہے",
      "بہتر فصلوں کو یقینی بناتا ہے",
    ],
  },
  {
    id: "glyphosate",
    slug: "glyphosate",
    imageUrl: "/images/products/product15.png",
    nameEn: "Glyphosate",
    nameUr: "گلائیفوسٹی",
    categoryEn: "Herbicide",
    categoryUr: "جڑی بوٹی مار دوا",
    descriptionEn:
      "A widely trusted systemic, non-selective herbicide used for comprehensive weed control ahead of planting or in non-crop areas.",
    descriptionUr:
      "پودے لگانے سے پہلے یا غیر کاشتہ علاقوں میں جامع جڑی بوٹیوں پر قابو پانے کے لیے استعمال ہونے والی ایک وسیع پیمانے پر معروف نظامی، غیر انتخابی جڑی بوٹی مار دوا۔",
    highlightsEn: [
      "Effective weed control for cleaner fields",
      "Reduces competition for nutrients and water",
      "Supports better crop establishment",
    ],
    highlightsUr: [
      "صاف ستھرے کھیتوں کے لیے جڑی بوٹیوں کا مؤثر کنٹرول",
      "غذائی اجزاء اور پانی کے مقابلے کو کم کرتا ہے",
      "بہتر فصلوں کو یقینی بناتا ہے",
    ],
  },
  {
    id: "cypermethrin",
    slug: "cypermethrin",
    imageUrl: "/images/products/product16.jpeg",
    nameEn: "Cypermethrin",
    nameUr: "سائپرمیتھرن",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A broad-spectrum insecticide effective against a wide range of chewing and sucking insect pests across multiple crop types.",
    descriptionUr:
      "متعدد فصلوں میں چبانے اور چوسنے والے کیڑوں کی ایک وسیع رینج کے خلاف موثر ایک وسیع اثر کیڑے مار دوا۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "golden-shine",
    slug: "golden-shine",
    imageUrl: "/images/products/product17.jpeg",
    nameEn: "Golden Shine",
    nameUr: "گولڈن شائن",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A crop protection insecticide formulated to help maintain healthy, vigorous plant growth by controlling key insect pests.",
    descriptionUr:
      "ایک فصلوں کی حفاظتی کیڑے مار دوا جو اہم کیڑوں پر قابو پا کر صحت مند اور توانا پودوں کی نشوونما کو برقرار رکھنے میں مدد دیتی ہے۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "opterhrin",
    slug: "opterhrin",
    imageUrl: "/images/products/product18.jpeg",
    nameEn: "Opterhrin",
    nameUr: "اپٹیرتھرن",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "An insecticide formulated for general pest control needs across a variety of field and vegetable crops.",
    descriptionUr:
      "کھیت اور سبزیوں کی مختلف فصلوں پر عام کیڑوں پر قابو پانے کے لیے تیار کردہ ایک کیڑے مار دوا۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "chlorpyrifos",
    slug: "chlorpyrifos",
    imageUrl: "/images/products/product19.jpeg",
    nameEn: "Chlorpyrifos",
    nameUr: "کلورپائیریفوس",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A well-established insecticide used for the control of soil-dwelling and foliar insect pests across a range of crops.",
    descriptionUr:
      "مختلف فصلوں میں مٹی میں رہنے والے اور پتوں پر لگنے والے کیڑوں پر قابو پانے کے لیے استعمال ہونے والی ایک معروف کیڑے مار دوا۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "xtra-star",
    slug: "xtra-star",
    imageUrl: "/images/products/product20.jpeg",
    nameEn: "Xtra-Star",
    nameUr: "ایکسٹرا سٹار",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "An enhanced insecticide formulation designed to deliver strong, dependable pest control performance in the field.",
    descriptionUr:
      "کھیت میں مضبوط اور قابل اعتماد کیڑوں پر قابو پانے کی کارکردگی فراہم کرنے کے لیے ڈیزائن کردہ ایک بہتر فارمولیشن والی کیڑے مار دوا۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "cropza",
    slug: "cropza",
    imageUrl: "/images/products/product21.png",
    nameEn: "Cropza",
    nameUr: "کروپزا",
    categoryEn: "Plant Growth Regulator",
    categoryUr: "نشوونما بڑھانے والا ریگولیٹر",
    descriptionEn:
      "A plant growth regulator formulated to support healthy crop development, improved fruiting/flowering, and better overall yield potential.",
    descriptionUr:
      "صحت مند فصلوں کی نشوونما، بہتر پھل/پھول اور بہتر پیداواری صلاحیت کے لیے تیار کردہ ایک پودوں کی افزائش کا ریگولیٹر۔",
    highlightsEn: [
      "Supports healthy crop development",
      "Improves fruiting and flowering",
      "Enhances overall yield potential",
    ],
    highlightsUr: [
      "صحت مند فصلوں کی نشوونما میں مدد دیتا ہے",
      "پھل اور پھول کو بہتر بناتا ہے",
      "پیداواری صلاحیت کو بڑھاتا ہے",
    ],
  },
  {
    id: "mr-jin",
    slug: "mr-jin",
    imageUrl: "/images/products/product22.png",
    nameEn: "Mr. Jin",
    nameUr: "مسٹر جِن",
    categoryEn: "Insecticide",
    categoryUr: "کیڑے مار دوا",
    descriptionEn:
      "A broad-spectrum insecticide formulated to provide dependable crop protection against a wide range of common insect pests.",
    descriptionUr:
      "کیڑوں کی ایک وسیع رینج کے خلاف قابل اعتماد فصلوں کی حفاظت فراہم کرنے کے لیے تیار کردہ ایک وسیع اثر کیڑے مار دوا۔",
    highlightsEn: [
      "Effective against a broad range of pests",
      "Suitable for multiple crop types",
      "Formulated for reliable field performance",
    ],
    highlightsUr: [
      "کیڑوں کی ایک وسیع رینج کے خلاف موثر",
      "متعدد فصلوں کے لیے موزوں",
      "قابل اعتماد کھیتی کارکردگی کے لیے تیار کردہ",
    ],
  },
  {
    id: "sop",
    slug: "sop",
    imageUrl: "/images/products/product23.jpeg",
    nameEn: "SOP (Sulphate of Potash)",
    nameUr: "ایس او پی (سلفیٹ آف پوٹاش)",
    categoryEn: "Fertilizer",
    categoryUr: "کھاد",
    descriptionEn:
      "A potassium-rich fertilizer that supports strong root development, improved fruit/grain quality, and better crop resilience.",
    descriptionUr:
      "پوٹاشیم سے بھرپور کھاد جو مضبوط جڑوں کی نشوونما، بہتر پھل/اناج کے معیار اور فصل کی بہتر برداشت میں مدد دیتی ہے۔",
    highlightsEn: [
      "Potassium-rich for strong root development",
      "Improves fruit and grain quality",
      "Enhances crop resilience",
    ],
    highlightsUr: [
      "مضبوط جڑوں کے لیے پوٹاشیم سے بھرپور",
      "پھل اور اناج کے معیار کو بہتر بناتا ہے",
      "فصل کی برداشت کو بڑھاتا ہے",
    ],
  },
  {
    id: "agrisulf",
    slug: "agrisulf",
    imageUrl: "/images/products/product24.jpeg",
    nameEn: "Agrisulf",
    nameUr: "ایگری سلف",
    categoryEn: "Fungicide / Fertilizer",
    categoryUr: "فنگس سائیڈ / کھاد",
    descriptionEn:
      "A sulfur-based product that serves the dual role of disease control and sulfur nutrition, supporting healthier crops and improved soil sulfur levels.",
    descriptionUr:
      "سلفر پر مبنی ایک پروڈکٹ جو بیماریوں پر قابو پانے اور سلفر کی غذائیت کا دوہرا کردار ادا کرتی ہے، صحت مند فصلوں اور مٹی میں سلفر کی بہتر سطح کو یقینی بناتی ہے۔",
    highlightsEn: [
      "Dual disease control and sulfur nutrition",
      "Supports healthier crop growth",
      "Improves soil sulfur levels",
    ],
    highlightsUr: [
      "بیماریوں پر قابو اور سلفر کی غذائیت کا دوہرا فائدہ",
      "صحت مند فصلوں کی نشوونما میں مدد دیتا ہے",
      "مٹی میں سلفر کی سطح کو بہتر بناتا ہے",
    ],
  },
  {
    id: "mr-11330",
    slug: "mr-11330",
    imageUrl: "/images/products/product25.jpeg",
    nameEn: "MR-11330",
    nameUr: "ایم آر-11330",
    categoryEn: "Seed",
    categoryUr: "بیج",
    descriptionEn:
      "A premium hybrid corn seed variety from M.R. Seeds, engineered to deliver exceptional germination rates, uniform plant growth, and outstanding yield potential in local soil conditions.",
    descriptionUr:
      "ایم آر سیڈز کا ایک اعلیٰ معیار کا ہائبرڈ مکئی کا بیج، جو مقامی مٹی میں غیر معمولی شرحِ اگاؤ، یکساں نشوونما اور شاندار پیداواری صلاحیت فراہم کرنے کے لیے تیار کیا گیا ہے۔",
    highlightsEn: [
      "High germination rates and early seedling vigor",
      "Robust disease resistance and crop uniform performance",
      "Packed in high-quality 10KG bags for maximum protection",
    ],
    highlightsUr: [
      "غیر معمولی شرحِ اگاؤ اور پودوں کی ابتدائی توانائی",
      "بیماریوں کے خلاف مضبوط مدافعت اور فصل کی یکساں کارکردگی",
      "تازگی اور حفاظت کے لیے اعلیٰ معیار کے 10 کلوگرام بیگز میں دستیاب",
    ],
  },
];
