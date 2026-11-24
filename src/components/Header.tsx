import React, { useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PageName } from '../types/catalog';

const NAV_ITEMS: { label: string; page: PageName }[] = [
  { label: 'Shop', page: 'shop' },
  { label: 'Combos', page: 'combos' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Resources', page: 'resources' },
  { label: 'About', page: 'about' },
];

export const Header: React.FC = () => {
  const {
    route,
    navigate,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    setIsWishlistOpen,
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: PageName) => {
    setMobileMenuOpen(false);
    navigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EE]/95 backdrop-blur-sm border-b border-[#E3D5C3] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#2B231D] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E66B54]"
        >
          Jotter &amp; Potter
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#5C4E42]"
        >
          {NAV_ITEMS.map((item) => {
            const active = route.page === item.page;
            return (
              <button
                key={item.page}
                type="button"
                onClick={() => handleNav(item.page)}
                className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors hover:text-[#2B231D] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E66B54] ${
                  active ? 'text-[#2B231D] underline decoration-[#E66B54] decoration-2 underline-offset-8' : ''
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Search, Wishlist, and Primary Cart Action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search packs and guides"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-[#5C4E42] hover:bg-[#EFE2D0] hover:text-[#2B231D] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            aria-label={`Saved wishlist (${wishlist.length} items)`}
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-[#5C4E42] hover:bg-[#EFE2D0] hover:text-[#2B231D] transition-colors cursor-pointer"
          >
            <Heart className="w-4 h-4" strokeWidth={2} />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#E66B54] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2B231D] text-[#FAF5EE] text-sm font-semibold hover:bg-[#43372E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" strokeWidth={2} />
            <span>Cart</span>
            <span className="tabular-nums text-[#E66B54] font-bold">({cartCount})</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#2B231D] hover:bg-[#EFE2D0] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3D5C3] bg-[#FAF5EE] px-4 py-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              type="button"
              onClick={() => handleNav(item.page)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                route.page === item.page
                  ? 'bg-[#EFE2D0] text-[#2B231D]'
                  : 'text-[#5C4E42] hover:bg-[#F2E7D8]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNav('contact')}
            className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-[#5C4E42] hover:bg-[#F2E7D8] cursor-pointer"
          >
            Contact &amp; FAQ
          </button>
        </div>
      )}
    </header>
  );
};
