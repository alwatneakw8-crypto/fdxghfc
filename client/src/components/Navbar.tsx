import { Link } from "wouter";
import { Search, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const NAV_CATEGORIES = [
  { id: "all", label: "جميع المنتجات" },
  { id: "oud", label: "العود الفاخر" },
  { id: "incense", label: "الدخون والبخور" },
  { id: "oriental", label: "العطور الشرقية" },
  { id: "musk", label: "المسك والزيوت" },
  { id: "gifts", label: "أطقم الهدايا" },
];

export function Navbar({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}: NavbarProps) {
  const { totalItems, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="bg-foreground text-background text-xs py-2 px-4 text-center">
        <span>شحن مجاني للطلبات فوق 350 ر.س • تغليف هدايا فاخر مجاناً</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18 py-3">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight block leading-none">
                دخون
              </span>
              <span className="text-[11px] text-muted-foreground tracking-widest uppercase">
                DUKHOON
              </span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-muted-foreground absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن العود، الدخون، المسك..."
              className="w-full h-10 pr-10 pl-4 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium text-sm transition-colors"
            aria-label="سلة التسوق"
          >
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span>السلة</span>
            {totalItems > 0 && (
              <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar">
          {NAV_CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
