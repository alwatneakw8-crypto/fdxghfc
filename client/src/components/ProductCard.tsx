import { Link } from "wouter";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  return (
    <article className="group bg-card border border-card-border rounded-lg overflow-hidden flex flex-col transition-shadow hover:shadow-md">
      <Link
        href={`/product/${product.id}`}
        className="relative aspect-[4/3] overflow-hidden bg-muted block"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discount !== null && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-destructive text-destructive-foreground text-xs font-bold">
            خصم {discount}%
          </span>
        )}
        <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-sm bg-background/90 backdrop-blur text-foreground text-xs font-medium border border-border">
          {product.volume}
        </span>
      </Link>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.categoryLabel}</span>
          <span className="inline-flex items-center gap-1 text-foreground font-medium">
            <Star className="w-3.5 h-3.5 fill-accent text-accent" />
            {product.rating}
          </span>
        </div>

        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.nameEn}</p>
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
          <div>
            <div className="font-bold text-lg text-primary">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => addItem(product, 1)}
            disabled={!product.inStock}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>أضف للسلة</span>
          </button>
        </div>
      </div>
    </article>
  );
}
