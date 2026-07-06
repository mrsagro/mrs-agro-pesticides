export type Product = {
  id: string;
  slug: string;
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
    slug: "hybrid-maize-pesticides",
    imageUrl: "/images/products/Product1.jpeg",
    nameEn: "Hybrid Maize Pesticides",
    nameUr: "ہائبرڈ مکئی کی کیڑے مار ادویات",
    varietyEn: "NK-8711",
    varietyUr: "این کے-8711",
    descriptionEn:
      "High-yield hybrid maize variety with excellent drought tolerance and disease resistance. Suitable for both spring and autumn sowing across all major maize-growing regions of Pakistan.",
    descriptionUr:
      "اعلی پیداوار دینے والی ہائبرڈ مکئی کی قسم جو خشک سالی اور بیماریوں کے خلاف بہترین مزاحمت رکھتی ہے۔ پاکستان کے تمام اہم مکئی اگانے والے علاقوں میں موسم بہار اور خزاں دونوں میں کاشت کے لیے موزوں۔",
  },
  {
    id: "wheat-pesticides",
    slug: "wheat-pesticides",
    imageUrl: "/images/products/product2.png",
    nameEn: "Wheat Pesticides",
    nameUr: "گندم کی کیڑے مار ادویات",
    varietyEn: "Faisalabad-2008",
    varietyUr: "فیصل آباد-2008",
    descriptionEn:
      "Certified wheat pesticide variety known for its high protein content and uniform growth. Performs exceptionally well in irrigated and rain-fed conditions of Punjab and Sindh.",
    descriptionUr:
      "تصدیق شدہ گندم کی کیڑے مار ادویات کی قسم جو اعلی پروٹین مواد اور یکساں نشوونما کے لیے مشہور ہے۔ پنجاب اور سندھ کے آبپاشی اور بارانی دونوں حالات میں شاندار کارکردگی دکھاتی ہے۔",
  },
  {
    id: "cotton-pesticides",
    slug: "cotton-pesticides",
    imageUrl: "/images/products/product3.png",
    nameEn: "Cotton Pesticides",
    nameUr: "کپاس کی کیڑے مار ادویات",
    varietyEn: "Bt-Cotton MNH-886",
    varietyUr: "بی ٹی کپاس ایم این ایچ-886",
    descriptionEn:
      "Bt cotton hybrid with built-in pest resistance and high staple length. Delivers consistent yields under the climatic conditions of southern Punjab and Sindh.",
    descriptionUr:
      "بی ٹی کپاس کی ہائبرڈ قسم جو کیڑوں سے قدرتی مزاحمت اور لمبے ریشے کی حامل ہے۔ جنوبی پنجاب اور سندھ کے موسمی حالات میں مسلسل پیداوار دیتی ہے۔",
  },
  {
    id: "rice-pesticides",
    slug: "rice-pesticides",
    imageUrl: "/images/products/product4.png",
    nameEn: "Rice Pesticides",
    nameUr: "چاول کی کیڑے مار ادویات",
    varietyEn: "Super Basmati",
    varietyUr: "سپر باسمتی",
    descriptionEn:
      "Premium Basmati rice pesticide with exceptional grain length, aroma, and cooking quality. Adapted to the traditional rice-growing basins of Punjab with excellent export-grade output.",
    descriptionUr:
      "اعلیٰ ترین باسمتی چاول کی کیڑے مار ادویات جو غیر معمولی دانے کی لمبائی، خوشبو اور پکانے کے معیار کے لیے مشہور ہیں۔ پنجاب کے روایتی چاول اگانے والے علاقوں کے لیے موزوں اور برآمدی معیار کی شاندار پیداوار۔",
  },
  {
    id: "sunflower-pesticides",
    slug: "sunflower-pesticides",
    imageUrl: "/images/products/product5.png",
    nameEn: "Sunflower Pesticides",
    nameUr: "سورج مکھی کی کیڑے مار ادویات",
    varietyEn: "Hybrid SMH-100",
    varietyUr: "ہائبرڈ ایس ایم ایچ-100",
    descriptionEn:
      "High-quality sunflower hybrid with excellent oil content and early maturity. Well-suited for the spring season across Punjab and Khyber Pakhtunkhwa.",
    descriptionUr:
      "اعلی معیار کا سورج مکھی کا ہائبرڈ جو شاندار تیل کی مقدار اور جلد پکنے کی خصوصیت رکھتا ہے۔ پنجاب اور خیبر پختونخوا میں موسم بہار کی کاشت کے لیے انتہائی موزوں۔",
  },
  {
    id: "canola-pesticides",
    slug: "canola-pesticides",
    imageUrl: "/images/products/product6.png",
    nameEn: "Canola Pesticides",
    nameUr: "کینولا کی کیڑے مار ادویات",
    varietyEn: "Canola Hybrid-402",
    varietyUr: "کینولا ہائبرڈ-402",
    descriptionEn:
      "Low-erucic acid canola variety with high yield potential and excellent oil quality. Performs reliably in the irrigated plains of Punjab.",
    descriptionUr:
      "کم ایروسک ایسڈ والی کینولا کی قسم جو زیادہ پیداواری صلاحیت اور بہترین تیل کے معیار کے لیے مشہور ہے۔ پنجاب کے آبپاشی میدانوں میں قابل اعتماد کارکردگی دکھاتی ہے۔",
  },
  {
    id: "mustard-pesticides",
    slug: "mustard-pesticides",
    imageUrl: "/images/products/product7.png",
    nameEn: "Mustard Pesticides",
    nameUr: "سرسوں کی کیڑے مار ادویات",
    varietyEn: "Mustard Raya-108",
    varietyUr: "سرسوں رایا-108",
    descriptionEn:
      "Premium mustard pesticide variety with bold grains and high oil recovery. Adaptable to rain-fed and low-input farming systems across Pakistan.",
    descriptionUr:
      "اعلیٰ قسم کے سرسوں کی کیڑے مار ادویات جو بڑے دانے اور زیادہ تیل کی خصوصیت رکھتے ہیں۔ پاکستان بھر میں بارانی اور کم وسائل والے کاشتکاری نظاموں میں کامیابی سے اگائے جا سکتے ہیں۔",
  },
  {
    id: "sesame-pesticides",
    slug: "sesame-pesticides",
    imageUrl: "/images/products/product8.png",
    nameEn: "Sesame Pesticides",
    nameUr: "تل کی کیڑے مار ادویات",
    varietyEn: "Sesame TS-5",
    varietyUr: "تل ٹی ایس-5",
    descriptionEn:
      "High-yielding sesame variety with uniform maturity and excellent export-grade grain quality. Thrives in warm climates with moderate rainfall.",
    descriptionUr:
      "زیادہ پیداوار دینے والے تل کی قسم جو یکساں پکنے اور شاندار برآمدی معیار کے دانوں کے لیے مشہور ہے۔ معتدل بارش والے گرم علاقوں میں بہترین نشوونما پاتی ہے۔",
  },
  {
    id: "chickpea-pesticides",
    slug: "chickpea-pesticides",
    imageUrl: "/images/products/product9.png",
    nameEn: "Chickpea Pesticides (Gram)",
    nameUr: "چنے کی کیڑے مار ادویات",
    varietyEn: "Chickpea Bhakkar-2011",
    varietyUr: "چنا بھکر-2011",
    descriptionEn:
      "Desi chickpea variety with excellent drought tolerance and bold, uniform grains. Well-suited for the barani (rain-fed) areas of Punjab and Khyber Pakhtunkhwa.",
    descriptionUr:
      "ديسی چنے کی قسم جو خشک سالی کے خلاف بہترین مزاحمت اور بڑے یکساں دانوں کے لیے مشہور ہے۔ پنجاب اور خیبر پختونخوا کے بارانی علاقوں کے لیے موزوں۔",
  },
  {
    id: "lentil-pesticides",
    slug: "lentil-pesticides",
    imageUrl: "/images/products/product10.jpeg",
    nameEn: "Lentil Pesticides (Masoor)",
    nameUr: "مسور کی دال کی کیڑے مار ادویات",
    varietyEn: "Lentil Masoor-2010",
    varietyUr: "مسور 2010-",
    descriptionEn:
      "High-protein lentil variety with good cooking quality and uniform grain size. Performs well in both irrigated and rain-fed conditions of central Punjab.",
    descriptionUr:
      "زیادہ پروٹین والی مسور کی قسم جو اچھی پکانے کی کیفیت اور یکساں دانے کے سائز کے لیے مشہور ہے۔ وسطی پنجاب کے آبپاشی اور بارانی دونوں حالات میں اچھی کارکردگی دکھاتی ہے۔",
  },
  {
    id: "mung-bean-pesticides",
    slug: "mung-bean-pesticides",
    imageUrl: "/images/products/product11.png",
    nameEn: "Mung Bean Pesticides",
    nameUr: "مونگ کی کیڑے مار ادویات",
    varietyEn: "Mung Bean NM-98",
    varietyUr: "مونگ این ایم-98",
    descriptionEn:
      "Short-duration mung bean variety with high yield potential and excellent cooking quality. Ideal for summer sowing in rice-wheat cropping systems.",
    descriptionUr:
      "کم عرصے میں پکنے والی مونگ کی قسم جو زیادہ پیداواری صلاحیت اور شاندار پکانے کے معیار کے لیے مشہور ہے۔ چاول گندم کی فصل کے نظام میں موسم گرما کی کاشت کے لیے موزوں۔",
  },
  {
    id: "mash-bean-pesticides",
    slug: "mash-bean-pesticides",
    imageUrl: "/images/products/product12.jpeg",
    nameEn: "Mash Bean Pesticides",
    nameUr: "ماش کی کیڑے مار ادویات",
    varietyEn: "Mash Bean Arooj-2022",
    varietyUr: "ماش عروج-2022",
    descriptionEn:
      "High-yielding mash bean variety with good resistance to yellow mosaic virus. Suitable for spring and summer cultivation across Punjab.",
    descriptionUr:
      "زیادہ پیداوار دینے والی ماش کی قسم جو زرد موزیک وائرس کے خلاف اچھی مزاحمت رکھتی ہے۔ پنجاب بھر میں موسم بہار اور گرما کی کاشت کے لیے موزوں۔",
  },
  {
    id: "fodder-maize-pesticides",
    slug: "fodder-maize-pesticides",
    imageUrl: "/images/products/product13.png",
    nameEn: "Fodder Maize Pesticides",
    nameUr: "چارہ مکئی کی کیڑے مار ادویات",
    varietyEn: "Fodder Maize Pak-Afgain",
    varietyUr: "چارہ مکئی پاک افگین",
    descriptionEn:
      "Fast-growing multicut fodder maize with high biomass and excellent palatability for livestock. Provides multiple cuttings throughout the growing season.",
    descriptionUr:
      "تیزی سے بڑھنے والی کثیر کٹائی والی چارہ مکئی جو زیادہ بایوماس اور مویشیوں کے لیے شاندار ذائقہ رکھتی ہے۔ پورے موسم میں متعدد کٹائیاں فراہم کرتی ہے۔",
  },
  {
    id: "alfalfa-pesticides",
    slug: "alfalfa-pesticides",
    imageUrl: "/images/products/product14.png",
    nameEn: "Alfalfa Pesticides (Lucerne)",
    nameUr: "ریفج کی کیڑے مار ادویات",
    varietyEn: "Alfalfa Sargodha-2020",
    varietyUr: "ریفج سرگودھا-2020",
    descriptionEn:
      "Perennial alfalfa variety with deep root system and high protein forage. Excellent for dairy and livestock operations with multiple cuts per season.",
    descriptionUr:
      "بارہماسی ريفج کی قسم جس کا جڑ کا نظام گہرا اور چارہ پروٹین سے بھرپور ہوتا ہے۔ ڈیری اور مویشی فارموں کے لیے شانرارہے، ہر موسم میں متعدد کٹائیاں دیتی ہے۔",
  },
  {
    id: "barley-pesticides",
    slug: "barley-pesticides",
    imageUrl: "/images/products/product15.png",
    nameEn: "Barley Pesticides",
    nameUr: "جو کی کیڑے مار ادویات",
    varietyEn: "Barley Haider-2021",
    varietyUr: "جو حیدر-2021",
    descriptionEn:
      "Dual-purpose barley variety suitable for both grain and fodder production. Shows excellent tolerance to saline and waterlogged conditions.",
    descriptionUr:
      "دوہری مقاصد والی جو کی قسم جو اناج اور چارہ دونوں کے لیے موزوں ہے۔ نمکین اور پانی بھری زمینوں میں شاندار برداشت کی صلاحیت رکھتی ہے۔",
  },
  {
    id: "oat-pesticides",
    slug: "oat-pesticides",
    imageUrl: "/images/products/product16.jpeg",
    nameEn: "Oat Pesticides",
    nameUr: "جئی کی کیڑے مار ادویات",
    varietyEn: "Oat Sargodha-2019",
    varietyUr: "جئی سرگودھا-2019",
    descriptionEn:
      "High-biomass oat variety ideal for winter fodder production. Provides nutritious green fodder during the lean winter months.",
    descriptionUr:
      "زیادہ بایوماس والی جئی کی قسم جو موسم سرما کے چارے کے لیے مثالی ہے۔ سردیوں کے مہینوں میں غذائیت سے بھرپور ہرا چارہ فراہم کرتی ہے۔",
  },
  {
    id: "sorghum-pesticides",
    slug: "sorghum-pesticides",
    imageUrl: "/images/products/product17.jpeg",
    nameEn: "Sorghum Pesticides",
    nameUr: "جوار کی کیڑے مار ادویات",
    varietyEn: "Sorghum JS-2022",
    varietyUr: "جوار جے ایس-2022",
    descriptionEn:
      "Multicut sorghum hybrid with excellent drought tolerance and high sugar content in stems. Ideal for summer green fodder production.",
    descriptionUr:
      "کثیر کٹائی والا جوار کا ہائبرڈ جو خشک سالی کے خلاف شاندار مزاحمت اور تنوں میں زیادہ شکر کی مقدار رکھتا ہے۔ موسم گرما کے ہرے چارے کے لیے مثالی۔",
  },
  {
    id: "millet-pesticides",
    slug: "millet-pesticides",
    imageUrl: "/images/products/product18.jpeg",
    nameEn: "Millet Pesticides (Bajra)",
    nameUr: "باجرے کی کیڑے مار ادویات",
    varietyEn: "Millet Yousafwali-2020",
    varietyUr: "باجرہ یوسفوالی-2020",
    descriptionEn:
      "Short-duration millet variety with excellent heat and drought tolerance. Suitable for grain and fodder production in arid regions.",
    descriptionUr:
      "کم عرصے میں پکنے والی باجرے کی قسم جو گرمی اور خشک سالی کے خلاف شاندار مزاحمت رکھتی ہے۔ خشک علاقوں میں اناج اور چارے کی پیداوار کے لیے موزوں۔",
  },
  {
    id: "onion-pesticides",
    slug: "onion-pesticides",
    imageUrl: "/images/products/product19.jpeg",
    nameEn: "Onion Pesticides",
    nameUr: "پیاز کی کیڑے مار ادویات",
    varietyEn: "Onion Phulkara-2021",
    varietyUr: "پیاز پھلکارہ-2021",
    descriptionEn:
      "High-yielding onion variety with excellent bulb size, firmness, and storage life. Suitable for both early and late sowing across Sindh and Punjab.",
    descriptionUr:
      "زیادہ پیداوار دینے والی پیاز کی قسم جو شاندار پیاز کے سائز، مضبوطی اور ذخیرہ کرنے کی صلاحیت کے لیے مشہور ہے۔ سندھ اور پنجاب میں جلدی اور دیر سے کاشت دونوں کے لیے موزوں۔",
  },
  {
    id: "tomato-pesticides",
    slug: "tomato-pesticides",
    imageUrl: "/images/products/product20.jpeg",
    nameEn: "Tomato Pesticides",
    nameUr: "ٹماٹر کی کیڑے مار ادویات",
    varietyEn: "Tomato Rio-Grande",
    varietyUr: "ٹماٹر ریو گرانڈے",
    descriptionEn:
      "Determinate tomato hybrid with high yield, uniform fruit size, and excellent disease resistance. Ideal for fresh market and processing.",
    descriptionUr:
      "معینہ نمو والا ٹماٹر کا ہائبرڈ جو زیادہ پیداوار، یکساں پھل کے سائز اور بیماریوں کے خلاف شاندار مزاحمت رکھتا ہے۔ تازہ بازار اور پروسیسنگ دونوں کے لیے مثالی۔",
  },
  {
    id: "chili-pesticides",
    slug: "chili-pesticides",
    imageUrl: "/images/products/product21.png",
    nameEn: "Chili Pesticides",
    nameUr: "مرچ کی کیڑے مار ادویات",
    varietyEn: "Chili Sanam-2022",
    varietyUr: "مرچ صنم-2022",
    descriptionEn:
      "Pungent chili hybrid with high yield potential and excellent dried red color. Adaptable to diverse agro-climatic conditions of Sindh and Punjab.",
    descriptionUr:
      "تیز ذائقے والی مرچ کا ہائبرڈ جو زیادہ پیداواری صلاحیت اور شاندار خشک سرخ رنگ کے لیے مشہور ہے۔ سندھ اور پنجاب کے متنوع موسمی حالات میں کامیابی سے اگتی ہے۔",
  },
  {
    id: "okra-pesticides",
    slug: "okra-pesticides",
    imageUrl: "/images/products/product22.png",
    nameEn: "Okra Pesticides (Bhindi)",
    nameUr: "بھنڈی کی کیڑے مار ادویات",
    varietyEn: "Okra Sabz-Pari-2021",
    varietyUr: "بھنڈی سبز پری-2021",
    descriptionEn:
      "High-yielding okra hybrid with tender, dark green pods and excellent viral disease tolerance. Suitable for multiple pickings throughout summer.",
    descriptionUr:
      "زیادہ پیداوار دینے والی بھنڈی کا ہائبرڈ جس میں نرم، گہرے سبز پھلیاں اور وائرل بیماریوں کے خلاف شاندار برداشت ہے۔ گرمیوں میں متعدد چنائی کے لیے موزوں۔",
  },
  {
    id: "cucumber-pesticides",
    slug: "cucumber-pesticides",
    imageUrl: "/images/products/product23.jpeg",
    nameEn: "Cucumber Pesticides",
    nameUr: "کھیرے کی کیڑے مار ادویات",
    varietyEn: "Cucumber Desi-2000",
    varietyUr: "کھیرا دیسی-2000",
    descriptionEn:
      "Open-pollinated cucumber variety with crisp texture and excellent flavor. Widely grown across Pakistan for fresh salad markets.",
    descriptionUr:
      "کھلے پولین والی کھیرے کی قسم جو کرنچی ساخت اور شاندار ذائقہ رکھتی ہے۔ پاکستان بھر میں تازہ سلاد کے لیے بڑے پیمانے پر کاشت کی جاتی ہے۔",
  },
  {
    id: "watermelon-pesticides",
    slug: "watermelon-pesticides",
    imageUrl: "/images/products/product24.jpeg",
    nameEn: "Watermelon Pesticides",
    nameUr: "تربوز کی کیڑے مار ادویات",
    varietyEn: "Watermelon Sugar Baby",
    varietyUr: "تربوز شوگر بیبی",
    descriptionEn:
      "Early-maturing watermelon variety with sweet, deep red flesh and excellent fruit set. Thrives in hot climates with proper irrigation management.",
    descriptionUr:
      "جلد پکنے والی تربوز کی قسم جو میٹھے، گہرے سرخ گودے اور شاندار پھل کے ساتھ مشہور ہے۔ مناسب آبپاشی کے ساتھ گرم علاقوں میں بہترین نشوونما پاتی ہے۔",
  },
];
