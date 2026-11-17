import { useState } from "react";
import { Route, Switch, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { CartProvider } from "./hooks/use-cart";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

function StoreLayout() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [location, setLocation] = useLocation();

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    if (location !== "/") {
      setLocation("/");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (location !== "/" && value.trim().length > 0) {
      setLocation("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <div className="flex-1">
        <Switch>
          <Route path="/">
            <Home
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </Route>
          <Route path="/product/:id" component={ProductDetail} />
          <Route>
            <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-3">
              <h1 className="font-serif text-3xl font-bold">
                الصفحة غير موجودة
              </h1>
              <button
                type="button"
                onClick={() => setLocation("/")}
                className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium"
              >
                العودة للرئيسية
              </button>
            </div>
          </Route>
        </Switch>
      </div>

      <footer className="border-t border-border bg-card py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-serif text-lg font-bold text-foreground">
            دخون للعطور الفاخرة
          </div>
          <p>© {new Date().getFullYear()} متجر دخون. جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <StoreLayout />
      </CartProvider>
    </QueryClientProvider>
  );
}
