import React, { useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatPrice';

export const SearchModal: React.FC = () => {
  const { catalog, isSearchOpen, setIsSearchOpen, navigate } = useStore();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        collections: catalog.collections.slice(0, 4),
        combos: catalog.combos,
        resources: catalog.resources.slice(0, 2),
      };
    }

    return {
      collections: catalog.collections.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.skillFocus.toLowerCase().includes(q) ||
          c.clientRole.toLowerCase().includes(q) ||
          `month ${c.monthCode}`.includes(q)
      ),
      combos: catalog.combos.filter(
        (cb) =>
          cb.name.toLowerCase().includes(q) ||
          cb.description.toLowerCase().includes(q)
      ),
      resources: catalog.resources.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.summary.toLowerCase().includes(q)
      ),
    };
  }, [query, catalog]);

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-[#2B231D]/50 backdrop-blur-[1px] no-print"
      role="dialog"
      aria-modal="true"
      aria-label="Search Jotter and Potter"
    >
      <div
        className="absolute inset-0"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#FAF5EE] rounded-2xl border border-[#E3D5C3] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E3D5C3] bg-[#FFFDF9]">
          <Search className="w-5 h-5 text-[#66574A] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search monthly packs, skills (architect, bridge, Karnataka), or combos..."
            className="w-full bg-transparent text-sm sm:text-base text-[#2B231D] placeholder-[#8C7B6B] focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#5C4E42] hover:bg-[#EFE2D0] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-5 space-y-6">
          {/* Monthly Packs */}
          {results.collections.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7A6857]">
                Monthly Design Packs
              </p>
              <div className="space-y-1.5">
                {results.collections.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => navigate('product', c.slug)}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E3D5C3] hover:border-[#9B7149] flex items-center justify-between gap-3 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className="w-3 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: c.heroHex }}
                      />
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold text-[#2B231D] truncate">
                          Month {c.monthCode}: {c.title}
                        </p>
                        <p className="text-xs text-[#66574A] truncate">
                          {c.tagline} · {c.skillFocus}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2B231D] tabular-nums shrink-0">
                      {formatPrice(c.priceInr, c.pricePlaceholder)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Combos */}
          {results.combos.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7A6857]">
                Combo Gift Boxes
              </p>
              <div className="space-y-1.5">
                {results.combos.map((cb) => (
                  <button
                    key={cb.id}
                    type="button"
                    onClick={() => navigate('combos')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E3D5C3] hover:border-[#9B7149] flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-[#2B231D]">
                        {cb.name}
                      </p>
                      <p className="text-xs text-[#66574A]">{cb.monthsLabel}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#66574A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {results.resources.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#7A6857]">
                Free Printables &amp; Guides
              </p>
              <div className="space-y-1.5">
                {results.resources.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => navigate('resources')}
                    className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#E3D5C3] hover:border-[#9B7149] flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-[#2B231D]">
                        {r.title}
                      </p>
                      <p className="text-xs text-[#66574A]">{r.readTimeOrPages}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#66574A]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {results.collections.length === 0 &&
            results.combos.length === 0 &&
            results.resources.length === 0 && (
              <p className="text-center py-6 text-sm text-[#66574A]">
                No packs matched &ldquo;{query}&rdquo;. Try searching &ldquo;Architect&rdquo;,
                &ldquo;Karnataka&rdquo;, or &ldquo;Combo&rdquo;.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};
