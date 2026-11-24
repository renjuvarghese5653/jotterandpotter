import React from 'react';
import { Heart, ShoppingBag, Trash2, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatPrice';

export const WishlistDrawer: React.FC = () => {
  const {
    catalog,
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    navigate,
  } = useStore();

  if (!isWishlistOpen) return null;

  const savedCollections = catalog.collections.filter((c) => wishlist.includes(c.id));
  const savedCombos = catalog.combos.filter((cb) => wishlist.includes(cb.id));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#2B231D]/45 backdrop-blur-[1px] no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Wishlist"
    >
      <div
        className="absolute inset-0"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="relative w-full max-w-md bg-[#FAF5EE] h-full shadow-2xl border-l border-[#E3D5C3] flex flex-col">
        <div className="px-6 py-5 border-b border-[#E3D5C3] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#E66B54]" />
            <h2 className="font-display text-xl font-bold text-[#2B231D]">
              Saved Packs
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5C4E42] hover:bg-[#EFE2D0] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {savedCollections.length === 0 && savedCombos.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-[#EFE2D0] flex items-center justify-center text-[#9B7149]">
                <Heart className="w-5 h-5" />
              </div>
              <p className="font-display text-lg font-bold text-[#2B231D]">
                No saved kits yet
              </p>
              <p className="text-sm text-[#66574A]">
                Tap the heart icon on any monthly folder or combo box to shortlist it for birthdays or term breaks.
              </p>
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="px-4 py-2 rounded-xl bg-[#2B231D] text-white text-sm font-semibold hover:bg-[#43372E] cursor-pointer"
              >
                Explore All Packs
              </button>
            </div>
          ) : (
            <>
              {savedCollections.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#FFFDF9] rounded-xl border border-[#E3D5C3] p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('product', c.slug)}
                      className="text-left cursor-pointer"
                    >
                      <p className="text-xs font-semibold text-[#66574A]">
                        Month {c.monthCode} · {c.colourName}
                      </p>
                      <h3 className="font-display text-base font-bold text-[#2B231D] hover:underline">
                        {c.title}
                      </h3>
                      <p className="text-xs text-[#5C4E42] mt-0.5">{c.tagline}</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(c.id)}
                      aria-label={`Remove ${c.title}`}
                      className="text-[#8B7968] hover:text-[#B84A39] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#EFE2D0]">
                    <span className="text-sm font-bold text-[#2B231D] tabular-nums">
                      {formatPrice(c.priceInr, c.pricePlaceholder)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          productId: c.id,
                          slug: c.slug,
                          kind: 'collection',
                          title: `Month ${c.monthCode}: ${c.title}`,
                          subtitle: `${c.colourName} Folder · ${c.tagline}`,
                          accentHex: c.heroHex,
                          priceInr: c.priceInr,
                          pricePlaceholder: c.pricePlaceholder,
                        });
                        setIsWishlistOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer"
                      style={{
                        backgroundColor: c.heroHex,
                        color: c.heroTextOnColor,
                      }}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}

              {savedCombos.map((cb) => (
                <div
                  key={cb.id}
                  className="bg-[#FFFDF9] rounded-xl border border-[#E3D5C3] p-4 flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-[#66574A]">{cb.subtitle}</p>
                      <h3 className="font-display text-base font-bold text-[#2B231D]">
                        {cb.name}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(cb.id)}
                      aria-label={`Remove ${cb.name}`}
                      className="text-[#8B7968] hover:text-[#B84A39] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#EFE2D0]">
                    <span className="text-sm font-bold text-[#2B231D] tabular-nums">
                      {formatPrice(cb.priceInr, cb.pricePlaceholder)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          productId: cb.id,
                          slug: cb.slug,
                          kind: 'combo',
                          title: cb.name,
                          subtitle: cb.monthsLabel,
                          accentHex: '#8B5A2B',
                          priceInr: cb.priceInr,
                          pricePlaceholder: cb.pricePlaceholder,
                        });
                        setIsWishlistOpen(false);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2B231D] text-white text-xs font-bold cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Move to Cart
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
