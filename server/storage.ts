import { type Product, type InsertOrder, type Order } from "@shared/schema";

export interface IStorage {
  getProducts(filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
  }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
}

const SEED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "عود ملكي معتق",
    nameEn: "Royal Aged Oud",
    description:
      "مزيج فاخر من دهن العود الكمبودي المعتق مع نفحات العنبر الدافئ والزعفران الإيراني، يمنحك حضوراً مهيباً وثباتاً يدوم طوال اليوم.",
    price: 480,
    originalPrice: 560,
    category: "oud",
    categoryLabel: "العود الفاخر",
    volume: "100 مل",
    notes: ["دهن العود الكمبودي", "الزعفران", "العنبر الملكي", "خشب الصندل"],
    imageUrl:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: true,
    rating: "4.9",
    reviewCount: 142,
  },
  {
    id: 2,
    name: "دخون الأصالة الفاخر",
    nameEn: "Asalah Luxury Bakhoor",
    description:
      "أقراص بخور يدوية الصنع مشبعة بأجود أنواع العود المطحون ودهن الورد الطائفي والمسك الأبيض لتعطير المجالس والمناسبات.",
    price: 245,
    originalPrice: 290,
    category: "incense",
    categoryLabel: "الدخون والبخور",
    volume: "70 غرام",
    notes: ["عود هندي مطحون", "الورد الطائفي", "المسك الأبيض", "اللبان العماني"],
    imageUrl:
      "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: true,
    rating: "5.0",
    reviewCount: 98,
  },
  {
    id: 3,
    name: "عنبر الليل",
    nameEn: "Amber Nocturne",
    description:
      "عطر شرقي ساحر يجمع بين حرارة الفلفل الوردي وعمق العنبر الأسود مع لمسة ناعمة من الفانيليا والباتشولي.",
    price: 390,
    originalPrice: null,
    category: "oriental",
    categoryLabel: "العطور الشرقية",
    volume: "100 مل",
    notes: ["العنبر الأسود", "الفلفل الوردي", "الباتشولي", "الفانيليا المدغشقرية"],
    imageUrl:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: true,
    rating: "4.8",
    reviewCount: 76,
  },
  {
    id: 4,
    name: "مسك الغزال الصافي",
    nameEn: "Pure Velvet Musk",
    description:
      "تركيبة مخملية نقية من المسك الأبيض والورود الدمشقية تمنح البشرة انتعاشاً ونعومة استثنائية تدوم لساعات طويلة.",
    price: 210,
    originalPrice: 250,
    category: "musk",
    categoryLabel: "المسك والزيوت",
    volume: "12 مل (تولة)",
    notes: ["المسك الأبيض", "الورد الدمشقي", "الياسمين", "زهرة السوسن"],
    imageUrl:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: true,
    rating: "4.9",
    reviewCount: 114,
  },
  {
    id: 5,
    name: "ورد الطائف السلطاني",
    nameEn: "Taif Rose Imperial",
    description:
      "خلاصة الورد الطائفي المقطر على الحطب ممزوجة بلمسات العود الهندي الخفيف وخشب الأرز لتجربة عطرية آسرة.",
    price: 420,
    originalPrice: null,
    category: "oriental",
    categoryLabel: "العطور الشرقية",
    volume: "75 مل",
    notes: ["الورد الطائفي", "عود هندي", "البرغموت", "خشب الأرز"],
    imageUrl:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: false,
    rating: "4.9",
    reviewCount: 64,
  },
  {
    id: 6,
    name: "مبثوث الشيوخ",
    nameEn: "Mabthooth Al Shuyukh",
    description:
      "نشارة عود مروكي فاخرة مغمورة بدهن العنبر وزيوت عطرية فرنسية وشرقية مختارة بعناية لرائحة فواحة تملأ المكان.",
    price: 185,
    originalPrice: 220,
    category: "incense",
    categoryLabel: "الدخون والبخور",
    volume: "50 غرام",
    notes: ["عود مروكي", "العنبر", "الزعفران", "خشب الكشمير"],
    imageUrl:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: false,
    rating: "4.7",
    reviewCount: 53,
  },
  {
    id: 7,
    name: "خشب الأرز والبرغموت",
    nameEn: "Cedar & Bergamot",
    description:
      "عطر عصري منعش يوازن بين حموضة البرغموت الإيطالي ودفء خشب الأرز الأطلسي مع قاعدة من نجيل الهند.",
    price: 340,
    originalPrice: null,
    category: "international",
    categoryLabel: "العطور العالمية",
    volume: "100 مل",
    notes: ["البرغموت الإيطالي", "خشب الأرز", "نجيل الهند", "الهيل"],
    imageUrl:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: false,
    rating: "4.8",
    reviewCount: 89,
  },
  {
    id: 8,
    name: "طقم هدايا دخون الملكي",
    nameEn: "Dukhoon Royal Gift Set",
    description:
      "صندوق فاخر مبطن بالمخمل يضم عطر عود ملكي 100 مل، تولة مسك صافي، وعلبة دخون الأصالة، مثالي للإهداء في المناسبات.",
    price: 750,
    originalPrice: 890,
    category: "gifts",
    categoryLabel: "أطقم الهدايا",
    volume: "مجموعة متكاملة",
    notes: ["عود كمبودي", "مسك أبيض", "ورد طائفي", "عنبر"],
    imageUrl:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    featured: true,
    rating: "5.0",
    reviewCount: 131,
  },
];

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private nextOrderId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.nextOrderId = 1001;

    for (const product of SEED_PRODUCTS) {
      this.products.set(product.id, product);
    }
  }

  async getProducts(filters?: {
    category?: string;
    search?: string;
    featured?: boolean;
  }): Promise<Product[]> {
    let items = Array.from(this.products.values());

    if (filters?.category && filters.category !== "all") {
      items = items.filter((p) => p.category === filters.category);
    }

    if (filters?.featured) {
      items = items.filter((p) => p.featured);
    }

    if (filters?.search && filters.search.trim().length > 0) {
      const q = filters.search.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.notes.some((n) => n.toLowerCase().includes(q)),
      );
    }

    return items;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.nextOrderId++;
    const order: Order = {
      id,
      customerName: insertOrder.customerName,
      customerPhone: insertOrder.customerPhone,
      customerCity: insertOrder.customerCity,
      customerAddress: insertOrder.customerAddress,
      notes: insertOrder.notes ?? null,
      items: insertOrder.items,
      totalAmount: insertOrder.totalAmount,
      status: "confirmed",
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
