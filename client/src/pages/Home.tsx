import { useQuery } from "@tanstack/react-query";
import { Award, ShieldCheck, Sparkles, Truck } from "lucide-react";
import type { Product } from "@shared/schema";
import { ProductCard } from "@/components/ProductCard";

interface HomeProps {
  searchQuery: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

const FEATURES = [
  {
    icon: Sparkles,
    title: "أصالة العود الطبيعي",
    description: "مكونات منتقاة من أجود مصادر العود الكمبودي والهندي المعتق.",
  },
  {
    icon: ShieldCheck,
    title: "ضمان الثبات والتركيز",
    description: "تركيبات عطرية مركزة تمنحك ثباتاً وفوحاناً يدوم طويلاً.",
  },
  {
    icon: Award,
    title: "تغليف ملكي فاخر",
    description: "صناديق أنيقة مناسبة للإهداء في جميع المناسبات السعيدة.",
  },
  {
    icon: Truck,
    title: "توصيل سريع وآمن",
    description: "شحن مبرد وسريع لكافة مدن المملكة والخليج.",
  },
];

export default function Home({
  searchQuery,
  selectedCategory,
  onSelectCategory,
}: HomeProps) {
  const params = new URLSearchParams();
  if (selectedCategory && selectedCategory !== "all") {
    params.set("category", selectedCategory);
  }
  if (searchQuery.trim()) {
    params.set("search", searchQuery.trim());
  }
  const queryString = params.toString();
  const endpoint = queryString ? `/api/products?${queryString}` : "/api/products";

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: [endpoint],
  });

  return (
    <main>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-bl from-secondary via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-block px-3 py-1 rounded-sm bg-primary/10 text-primary text-xs font-bold tracking-wide">
              تشكيلة موسم 2026 الحصرية
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight text-foreground">
              عبق الأصالة والفخامة في كل قطرة عطر
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              اكتشف عالم دخون للعطور الشرقية الفاخرة، دهن العود المعتق، وأجود
              أنواع البخور المصنوعة يدوياً لتمنح لحظاتك طابعاً ملكياً لا يُنسى.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                تسوق المجموعة
              </a>
              <button
                type="button"
                onClick={() => onSelectCategory("gifts")}
                className="px-6 py-3 rounded-md border border-border bg-card hover:bg-secondary font-medium text-sm transition-colors"
              >
                أطقم الهدايا الملكية
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-xl bg-muted">
              <img
                src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1000&q=80"
                alt="عطور دخون الفاخرة"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section
        id="catalog"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground">
              مختارات دخون المميزة
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              اختر ما يناسب ذوقك من أرقى العطور الشرقية والعود والبخور
            </p>
          </div>
          <span className="text-sm text-muted-foreground">
            {products.length} منتج
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-96 rounded-lg bg-muted animate-pulse border border-border"
              />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-lg">
            <p className="font-medium text-foreground">
              لم يتم العثور على منتجات مطابقة لبحثك
            </p>
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              className="mt-4 px-4 py-2 rounded-md bg-secondary text-sm font-medium"
            >
              عرض جميع المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
