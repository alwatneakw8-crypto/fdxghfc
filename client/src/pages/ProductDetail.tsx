import { useState } from "react";
import { Link, useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const { data: product, isLoading, isError } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: Boolean(productId),
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="h-96 rounded-xl bg-muted animate-pulse" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold">المنتج غير موجود</h1>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium"
        >
          <ArrowRight className="w-4 h-4" />
          العودة للمتجر
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowRight className="w-4 h-4" />
        العودة لجميع المنتجات
      </Link>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="aspect-square rounded-xl overflow-hidden border border-border bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-sm bg-secondary text-secondary-foreground text-xs font-semibold mb-3">
              {product.categoryLabel}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              {product.name}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {product.nameEn} • {product.volume}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="inline-flex items-center gap-1 text-foreground font-semibold">
              <Star className="w-4 h-4 fill-accent text-accent" />
              {product.rating}
            </div>
            <span className="text-muted-foreground">
              ({product.reviewCount} تقييم)
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="text-base text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <div>
            <h2 className="font-bold text-sm text-foreground mb-2.5">
              المكونات العطرية
            </h2>
            <div className="flex flex-wrap gap-2">
              {product.notes.map((note) => (
                <span
                  key={note}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-card border border-border text-xs font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-primary" />
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border flex flex-wrap items-center gap-4">
            <div className="inline-flex items-center border border-border rounded-md bg-card">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 hover:bg-secondary"
                aria-label="إنقاص الكمية"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-3 hover:bg-secondary"
                aria-label="زيادة الكمية"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => addItem(product, quantity)}
              className="flex-1 min-w-48 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-md bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>أضف إلى السلة</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
