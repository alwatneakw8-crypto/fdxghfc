import { useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import type { Order } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { apiRequest } from "@/lib/queryClient";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    totalPrice,
  } = useCart();

  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const orderMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        customerName,
        customerPhone,
        customerCity,
        customerAddress,
        notes: notes || undefined,
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          volume: item.product.volume,
          imageUrl: item.product.imageUrl,
        })),
        totalAmount: totalPrice,
      };
      const res = await apiRequest("POST", "/api/orders", payload);
      return (await res.json()) as Order;
    },
    onSuccess: (order) => {
      setConfirmedOrder(order);
      setStep("success");
      setErrorMessage(null);
      clearCart();
    },
    onError: (err: Error) => {
      setErrorMessage(err.message || "تعذر إتمام الطلب، يرجى التحقق من البيانات");
    },
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setIsOpen(false);
    if (step === "success") {
      setStep("cart");
      setConfirmedOrder(null);
    }
  };

  const handleCheckoutSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    orderMutation.mutate();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={handleClose}
      />

      <aside className="relative z-10 w-full max-w-md bg-background border-r border-border h-full flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-xl font-bold">
              {step === "cart" && "سلة التسوق"}
              {step === "checkout" && "إتمام الطلب"}
              {step === "success" && "تم تأكيد طلبك"}
            </h2>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground"
            aria-label="إغلاق السلة"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {step === "success" && confirmedOrder ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl font-bold">
                شكراً لثقتكم بمتجر دخون
              </h3>
              <p className="text-sm text-muted-foreground">
                تم استلام طلبك بنجاح وسيتم تجهيزه وتوصيله إلى{" "}
                <span className="font-semibold text-foreground">
                  {confirmedOrder.customerCity}
                </span>
                .
              </p>
              <div className="bg-card border border-border rounded-lg p-4 text-right space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الطلب</span>
                  <span className="font-bold">#{confirmedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">العميل</span>
                  <span className="font-medium">
                    {confirmedOrder.customerName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الإجمالي</span>
                  <span className="font-bold text-primary">
                    {formatPrice(confirmedOrder.totalAmount)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-medium text-sm"
              >
                متابعة التسوق
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-muted-foreground/50 mx-auto" />
              <p className="font-medium text-foreground">سلة التسوق فارغة</p>
              <p className="text-sm text-muted-foreground">
                تصفح مجموعتنا المختارة من العود والدخون والعطور الفاخرة.
              </p>
            </div>
          ) : step === "cart" ? (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 rounded-md object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif font-bold text-base truncate">
                        {product.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {product.volume}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-primary">
                        {formatPrice(product.price * quantity)}
                      </span>
                      <div className="inline-flex items-center border border-border rounded-md bg-background">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity - 1)
                          }
                          className="p-1.5 hover:bg-secondary"
                          aria-label="إنقاص"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-sm font-medium">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.id, quantity + 1)
                          }
                          className="p-1.5 hover:bg-secondary"
                          aria-label="زيادة"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <form
              id="checkout-form"
              onSubmit={handleCheckoutSubmit}
              className="space-y-4"
            >
              {errorMessage && (
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: عبدالله العتيبي"
                  className="w-full h-10 px-3 rounded-md border border-input bg-card text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  رقم الجوال
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="05XXXXXXXX"
                  className="w-full h-10 px-3 rounded-md border border-input bg-card text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  المدينة
                </label>
                <input
                  type="text"
                  required
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  placeholder="الرياض، جدة، الدمام..."
                  className="w-full h-10 px-3 rounded-md border border-input bg-card text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  العنوان التفصيلي
                </label>
                <textarea
                  required
                  rows={2}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="الحي، اسم الشارع، رقم المبنى"
                  className="w-full p-3 rounded-md border border-input bg-card text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  ملاحظات إضافية (اختياري)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="عبارة إهداء أو وقت التوصيل المفضل"
                  className="w-full h-10 px-3 rounded-md border border-input bg-card text-sm"
                />
              </div>
            </form>
          )}
        </div>

        {items.length > 0 && step !== "success" && (
          <div className="p-5 border-t border-border bg-card space-y-3">
            <div className="flex items-center justify-between text-base font-bold">
              <span>المجموع الكلي</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>

            {step === "cart" ? (
              <button
                type="button"
                onClick={() => setStep("checkout")}
                className="w-full py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                إتمام الطلب
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep("cart")}
                  className="px-4 py-3 rounded-md border border-border text-sm font-medium hover:bg-secondary"
                >
                  رجوع
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  disabled={orderMutation.isPending}
                  className="flex-1 py-3 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 disabled:opacity-60"
                >
                  {orderMutation.isPending ? "جاري التأكيد..." : "تأكيد الطلب"}
                </button>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
