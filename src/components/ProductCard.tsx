import React from 'react';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CollectionPack } from '../types/catalog';
import { formatPrice } from '../utils/formatPrice';
import { KraftFolderVisual } from './KraftFolderVisual';

interface ProductCardProps {
  collection: CollectionPack;
  preferPhoto?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  collection,
  preferPhoto = false,
}) => {
  const { navigate, addToCart, isWishlisted, toggleWishlist } = useStore();
  const saved = isWishlisted(collection.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: collection.id,
      slug: collection.slug,
      kind: 'collection',
      title: `Month ${collection.monthCode}: ${collection.title}`,
      subtitle: `${collection.colourName} Folder · ${collection.tagline}`,
      accentHex: collection.heroHex,
      priceInr: collection.priceInr,
      pricePlaceholder: collection.pricePlaceholder,
    });
  };

  return (
    <article
      onClick={() => navigate('product', collection.slug)}
      className="group bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] overflow-hidden flex flex-col cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(43,35,29,0.14)]"
    >
      {/* Top 4:3 visual */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <KraftFolderVisual
          collection={collection}
          preferPhoto={preferPhoto}
          className="w-full h-full"
        />

        {/* Wishlist toggle */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(collection.id);
          }}
          aria-label={saved ? `Remove ${collection.title} from wishlist` : `Save ${collection.title} to wishlist`}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer shadow-sm ${
            saved
              ? 'bg-[#E66B54] text-white'
              : 'bg-[#FAF5EE]/90 text-[#5C4E42] hover:bg-white hover:text-[#E66B54]'
          }`}
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
        </button>

        {/* Subtle bottom color bar */}
        <div
          className="absolute bottom-0 inset-x-0 h-1.5"
          style={{ backgroundColor: collection.heroHex }}
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          {/* Unboxed typographic metadata (Zero-Pill Discipline) */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#66574A] mb-1.5">
            <span className="tabular-nums">Month {collection.monthCode}</span>
            <span aria-hidden="true">·</span>
            <span>Ages {collection.ageGroup}</span>
            <span aria-hidden="true">·</span>
            <span>{collection.colourName}</span>
          </div>

          <h3 className="font-display text-lg font-bold text-[#2B231D] leading-snug group-hover:text-[#9B5139] transition-colors">
            {collection.title}
          </h3>
          <p className="mt-1 text-sm text-[#5C4E42] line-clamp-2 leading-relaxed">
            {collection.tagline}. Client: {collection.clientRole}.
          </p>
        </div>

        <div className="pt-3 border-t border-[#EFE2D0] flex items-center justify-between gap-3">
          <div>
            <div className="text-base font-bold text-[#2B231D] tabular-nums">
              {formatPrice(collection.priceInr, collection.pricePlaceholder)}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#66574A] tabular-nums">
              <Star className="w-3.5 h-3.5 text-[#EAB308] fill-[#EAB308]" />
              <span>{collection.rating.toFixed(1)}</span>
              <span>({collection.reviewCount})</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
            style={{
              backgroundColor: collection.heroHex,
              color: collection.heroTextOnColor,
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};
