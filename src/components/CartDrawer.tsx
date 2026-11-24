import React from 'react';
import { ArrowRight, Minus, Plus, Scissors, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { calculateCartTotal, formatPrice } from '../utils/formatPrice';

export const CartDrawer: React.FC = () => {
  const {
    catalog,
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    hasStarterKitInCart,
    addStarterKitToCart,
    navigate,
  } = useStore();

  if (!isCartOpen) return null;

  const totals = calculateCartTotal(cart);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2B231D]/45 backdrop-blur-[1px] no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      <div
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="relative w-full max-w-md bg-[#FAF5EE] h-full shadow-2xl border-l border-[#E3D5C3] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E3D5C3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#2B231D]" />
            <h2 className="font-display text-xl font-bold text-[#2B231D]">
              Your Craft Bag
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5C4E42] hover:bg-[#EFE2D0] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EFE2D0] flex items-center justify-center text-[#9B7149]">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-[#2B231D]">
                  Your bag is empty
                </p>
                <p className="mt-1 text-sm text-[#66574A]">
                  Start with Month 01: The Little Architect or explore our 3, 6, and 12-month combos.
                </p>
              </div>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('shop')}
                  className="px-4 py-2 rounded-xl bg-[#2B231D] text-white text-sm font-semibold hover:bg-[#43372E] cursor-pointer"
                >
                  Browse Packs
                </button>
                <button
                  type="button"
                  onClick={() => navigate('combos')}
                  className="px-4 py-2 rounded-xl border border-[#C8B49B] text-[#2B231D] text-sm font-semibold hover:bg-[#EFE2D0] cursor-pointer"
                >
                  View Combos
                </button>
              </div>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="bg-[#FFFDF9] rounded-xl border border-[#E3D5C3] p-4 flex gap-3.5"
                >
                  <div
                    className="w-3 rounded-lg shrink-0"
                    style={{ backgroundColor: item.accentHex }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-base font-bold text-[#2B231D] leading-snug">
                        {item.title}
                      </h3>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        aria-label={`Remove ${item.title}`}
                        className="text-[#8B7968] hover:text-[#B84A39] p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#66574A] mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                    {item.giftMessage && (
                      <p className="mt-1.5 text-xs text-[#7E57C2] font-medium">
                        Gift note: &ldquo;{item.giftMessage}&rdquo;
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center border border-[#DFCBB2] rounded-lg bg-[#FAF5EE]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, -1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-[#5C4E42] hover:text-[#2B231D] cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.productId, 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-[#5C4E42] hover:text-[#2B231D] cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-sm font-bold text-[#2B231D] tabular-nums">
                        {formatPrice(
                          item.priceInr !== null ? item.priceInr * item.quantity : null,
                          item.pricePlaceholder
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Starter Kit Bundle Upsell */}
              {!hasStarterKitInCart && (
                <div className="rounded-xl kraft-surface border border-[#D4BC9F] p-4 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF5EE] border border-[#DFCBB2] flex items-center justify-center text-[#9B7149] shrink-0">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display text-sm font-bold text-[#2B231D]">
                        Add the Starter Kit
                      </h4>
                      <p className="text-xs text-[#5C4E42] leading-relaxed">
                        Safety scissors, 12 colour pencils, wooden scale, glue &amp; binder strap. (Included free if you switch to a Combo!)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-bold text-[#2B231D] tabular-nums">
                      {formatPrice(
                        catalog.starterKit.priceInr,
                        catalog.starterKit.pricePlaceholder
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={addStarterKitToCart}
                      className="px-3 py-1.5 rounded-lg bg-[#2B231D] text-white text-xs font-semibold hover:bg-[#43372E] cursor-pointer"
                    >
                      Add Starter Kit
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E3D5C3] bg-[#FFFDF9] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#5C4E42] font-semibold">Subtotal (INR)</span>
              <span className="text-lg font-extrabold text-[#2B231D] tabular-nums">
                {totals.formattedTotal}
              </span>
            </div>
            <p className="text-xs text-[#66574A]">
              Shipping across India &amp; gift tag message can be chosen at checkout.
            </p>
            <button
              type="button"
              onClick={() => navigate('checkout')}
              className="w-full py-3 px-4 rounded-xl bg-[#E66B54] text-white font-bold text-sm hover:bg-[#D55942] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
