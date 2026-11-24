import React, { useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  Gift,
  Minus,
  Plus,
  Scissors,
  ShoppingBag,
  Trash2,
  Truck,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { calculateCartTotal, formatPrice } from '../utils/formatPrice';

const INDIAN_STATES = [
  'Karnataka',
  'Maharashtra',
  'Delhi NCR',
  'Tamil Nadu',
  'Telangana',
  'Gujarat',
  'Kerala',
  'West Bengal',
  'Rajasthan',
  'Uttar Pradesh',
  'Other Indian State / UT',
];

export const CheckoutPage: React.FC = () => {
  const {
    catalog,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    hasStarterKitInCart,
    addStarterKitToCart,
    lastOrder,
    setLastOrder,
    navigate,
  } = useStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [pincode, setPincode] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Razorpay' | 'Cash on Delivery'>('Razorpay');

  const totals = calculateCartTotal(cart);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `JP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setLastOrder({
      orderId,
      createdAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      customerName: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      state: stateName,
      pincode: pincode.trim(),
      paymentMethod,
      giftTagMessage: giftMessage.trim() || undefined,
      items: [...cart],
      totalFormatted: totals.formattedTotal,
    });
    clearCart();
  };

  if (lastOrder && cart.length === 0) {
    return (
      <main className="py-12 lg:py-16 bg-[#FAF5EE] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#DFCBB2] p-8 sm:p-10 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF8EE] text-[#2E6F40] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#2E6F40]">
                  Order {lastOrder.orderId} Confirmed · Preparing Shipment
                </p>
                <h1 className="font-display text-3xl font-extrabold text-[#2B231D]">
                  Thank you, {lastOrder.customerName}!
                </h1>
                <p className="text-sm text-[#5C4E42] mt-1">
                  Your craft folders are being packed at our Bengaluru studio. Order details have
                  been recorded for {lastOrder.email || lastOrder.phone}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#FAF5EE] border border-[#E3D5C3] text-sm">
              <div>
                <p className="text-xs font-bold uppercase text-[#66574A]">Delivering To</p>
                <p className="font-bold text-[#2B231D] mt-1">{lastOrder.customerName}</p>
                <p className="text-xs text-[#5C4E42]">
                  {lastOrder.address}, {lastOrder.city}, {lastOrder.state} – {lastOrder.pincode}
                </p>
                <p className="text-xs text-[#5C4E42] mt-0.5">{lastOrder.phone}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-[#66574A]">Payment &amp; Total</p>
                <p className="font-bold text-[#2B231D] mt-1">{lastOrder.paymentMethod}</p>
                <p className="text-lg font-extrabold text-[#2B231D] tabular-nums">
                  {lastOrder.totalFormatted}
                </p>
                {lastOrder.giftTagMessage && (
                  <p className="text-xs text-[#7E57C2] mt-1">
                    Gift Tag: &ldquo;{lastOrder.giftTagMessage}&rdquo;
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#66574A]">
                Items Ordered
              </p>
              {lastOrder.items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between py-2 border-b border-[#EFE2D0] text-sm"
                >
                  <span className="font-semibold text-[#2B231D]">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-bold tabular-nums">
                    {formatPrice(
                      item.priceInr !== null ? item.priceInr * item.quantity : null,
                      item.pricePlaceholder
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setLastOrder(null);
                  navigate('shop');
                }}
                className="px-5 py-3 rounded-xl bg-[#2B231D] text-white text-sm font-bold hover:bg-[#43372E] cursor-pointer"
              >
                Continue Browsing Packs
              </button>
              <button
                type="button"
                onClick={() => {
                  setLastOrder(null);
                  navigate('home');
                }}
                className="px-5 py-3 rounded-xl border border-[#C8B49B] text-sm font-bold text-[#2B231D] hover:bg-[#EFE2D0] cursor-pointer"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 lg:py-16 bg-[#FAF5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
            Made in India · Pan-India Dispatch
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2B231D]">
            Cart &amp; Checkout
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-12 text-center space-y-4">
            <ShoppingBag className="w-10 h-10 text-[#9B7149] mx-auto" />
            <h2 className="font-display text-2xl font-bold text-[#2B231D]">
              Your shopping bag is currently empty
            </h2>
            <p className="text-sm text-[#66574A] max-w-md mx-auto">
              Add a monthly design folder or a 3, 6, or 12-month combo box to proceed with
              checkout.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="px-5 py-2.5 rounded-xl bg-[#E66B54] text-white text-sm font-bold cursor-pointer"
              >
                Shop Monthly Packs
              </button>
              <button
                type="button"
                onClick={() => navigate('combos')}
                className="px-5 py-2.5 rounded-xl border border-[#C8B49B] text-sm font-bold text-[#2B231D] cursor-pointer"
              >
                View Combos
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Delivery & Payment Form */}
            <form
              onSubmit={handlePlaceOrder}
              className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-6 sm:p-8 space-y-6"
            >
              <h2 className="font-display text-2xl font-bold text-[#2B231D]">
                1. Delivery Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block space-y-1 text-xs font-bold text-[#5C4E42]">
                  <span>Parent / Recipient Full Name *</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Deshmukh"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm font-normal text-[#2B231D]"
                  />
                </label>

                <label className="block space-y-1 text-xs font-bold text-[#5C4E42]">
                  <span>Mobile / WhatsApp Number *</span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98XXX XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm font-normal text-[#2B231D]"
                  />
                </label>
              </div>

              <label className="block space-y-1 text-xs font-bold text-[#5C4E42]">
                <span>Email Address (for order updates &amp; tracking) *</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.in"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm font-normal text-[#2B231D]"
                />
              </label>

              <label className="block space-y-1 text-xs font-bold text-[#5C4E42]">
                <span>Street Address, Flat / House No., Landmark *</span>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat 402, Tamarind Residency, Indiranagar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm font-normal text-[#2B231D]"
                />
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="block space-y-1 text-xs font-bold text-[#5C4E42]">
                  <span>City *</span>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bengaluru"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm font-normal text-[#2B231D]"
                  />
                </label>

                <label className="block space-y-1 text-xs font-bold text-[#5C4E42]">
                  <span>State *</span>
                  <select
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm font-normal text-[#2B231D]"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-1 text-xs font-bold text-[#5C4E42]">
                  <span>PIN Code *</span>
                  <input
                    type="text"
                    required
                    pattern="[0-9]{6}"
                    title="Enter 6-digit Indian PIN code"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="560038"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm font-normal text-[#2B231D] tabular-nums"
                  />
                </label>
              </div>

              {/* Gift Tag */}
              <div className="pt-2 border-t border-[#EFE2D0] space-y-2">
                <label className="flex items-center gap-2 text-xs font-bold text-[#2B231D]">
                  <Gift className="w-4 h-4 text-[#E66B54]" />
                  <span>Optional Handwritten Kraft Gift Tag Message</span>
                </label>
                <input
                  type="text"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Write a personal note for the young designer (free)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm text-[#2B231D]"
                />
              </div>

              {/* Payment Method */}
              <div className="pt-2 border-t border-[#EFE2D0] space-y-3">
                <h2 className="font-display text-2xl font-bold text-[#2B231D]">
                  2. Payment Method
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Razorpay')}
                    className={`p-4 rounded-2xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'Razorpay'
                        ? 'border-[#E66B54] bg-[#FDF1EE]'
                        : 'border-[#D4BC9F] bg-[#FAF5EE]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#2B231D]">
                      <CreditCard className="w-4 h-4 text-[#E66B54]" />
                      <span>Razorpay (UPI / Cards / Netbanking)</span>
                    </div>
                    <p className="text-xs text-[#66574A] mt-1">
                      [Razorpay Gateway Placeholder] Instant confirmation
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`p-4 rounded-2xl border text-left transition-colors cursor-pointer ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#2E6F40] bg-[#EEF8EE]'
                        : 'border-[#D4BC9F] bg-[#FAF5EE]'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-sm text-[#2B231D]">
                      <Truck className="w-4 h-4 text-[#2E6F40]" />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-xs text-[#66574A] mt-1">
                      Pay in cash or UPI upon delivery across India
                    </p>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#E66B54] text-white text-base font-bold hover:bg-[#D55942] transition-colors cursor-pointer"
              >
                Place Order ({totals.formattedTotal})
              </button>
            </form>

            {/* Right Order Summary */}
            <aside className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-6 sm:p-8 space-y-5 lg:sticky lg:top-24">
              <h2 className="font-display text-2xl font-bold text-[#2B231D]">
                Order Summary
              </h2>

              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-start justify-between gap-3 py-3 border-b border-[#EFE2D0]"
                  >
                    <div className="space-y-1 min-w-0">
                      <p className="font-display text-base font-bold text-[#2B231D]">
                        {item.title}
                      </p>
                      <p className="text-xs text-[#66574A]">{item.subtitle}</p>
                      <div className="inline-flex items-center gap-2 pt-1">
                        <div className="inline-flex items-center border border-[#DFCBB2] rounded-lg bg-[#FAF5EE]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, -1)}
                            className="w-7 h-7 flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.productId, 1)}
                            className="w-7 h-7 flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-xs text-[#8B7968] hover:text-[#B84A39] cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <span className="text-sm font-bold text-[#2B231D] tabular-nums shrink-0">
                      {formatPrice(
                        item.priceInr !== null ? item.priceInr * item.quantity : null,
                        item.pricePlaceholder
                      )}
                    </span>
                  </div>
                ))}
              </div>

              {!hasStarterKitInCart && (
                <div className="p-4 rounded-2xl kraft-surface border border-[#D4BC9F] flex items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <Scissors className="w-4 h-4 text-[#9B7149] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#2B231D]">Need Starter Tools?</p>
                      <p className="text-[11px] text-[#5C4E42]">
                        Add safety scissors, scale &amp; colour pencils
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addStarterKitToCart}
                    className="px-3 py-1.5 rounded-lg bg-[#2B231D] text-white text-xs font-bold cursor-pointer shrink-0"
                  >
                    + Add
                  </button>
                </div>
              )}

              <div className="space-y-2 pt-2 text-sm">
                <div className="flex justify-between text-[#5C4E42]">
                  <span>Pan-India Kraft Shipping</span>
                  <span className="font-bold text-[#2E6F40]">Included</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-[#2B231D] pt-2 border-t border-[#E3D5C3]">
                  <span>Total (INR)</span>
                  <span className="tabular-nums">{totals.formattedTotal}</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
