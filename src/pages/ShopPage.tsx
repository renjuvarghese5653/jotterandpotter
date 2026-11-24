import React, { useMemo, useState } from 'react';
import { CheckCircle2, Heart, Scissors, Search, ShoppingBag, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { formatPrice } from '../utils/formatPrice';

type TypeFilter = 'all' | 'collections' | 'combos' | 'starter';
type AgeFilter = 'all' | '6-8' | '9-12';
type SortOption = 'month' | 'rating' | 'price-asc' | 'price-desc';

export const ShopPage: React.FC = () => {
  const {
    catalog,
    navigate,
    addToCart,
    isWishlisted,
    toggleWishlist,
  } = useStore();

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [skillFilter, setSkillFilter] = useState<string>('all');
  const [ageFilter, setAgeFilter] = useState<AgeFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('month');

  const skillOptions = useMemo(() => {
    const skills = Array.from(new Set(catalog.collections.map((c) => c.skillFocus)));
    return ['all', ...skills];
  }, [catalog.collections]);

  const filteredCollections = useMemo(() => {
    if (typeFilter === 'combos' || typeFilter === 'starter') return [];
    const q = query.trim().toLowerCase();

    const list = catalog.collections.filter((c) => {
      if (skillFilter !== 'all' && c.skillFocus !== skillFilter) return false;
      // All kits support 6-12, and age tabs highlight matching guidance
      if (ageFilter === '6-8' && c.ageGroup === '9-12') return false;
      if (ageFilter === '9-12' && c.ageGroup === '6-8') return false;
      if (q) {
        const hay = `${c.title} ${c.tagline} ${c.skillFocus} ${c.colourName} month ${c.monthCode}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') {
        return (a.priceInr ?? Number.MAX_SAFE_INTEGER) - (b.priceInr ?? Number.MAX_SAFE_INTEGER);
      }
      if (sortBy === 'price-desc') {
        return (b.priceInr ?? -1) - (a.priceInr ?? -1);
      }
      return a.month - b.month;
    });
  }, [catalog.collections, typeFilter, skillFilter, ageFilter, query, sortBy]);

  const filteredCombos = useMemo(() => {
    if (typeFilter === 'collections' || typeFilter === 'starter') return [];
    const q = query.trim().toLowerCase();
    return catalog.combos.filter((cb) => {
      if (!q) return true;
      return `${cb.name} ${cb.subtitle} ${cb.description}`.toLowerCase().includes(q);
    });
  }, [catalog.combos, typeFilter, query]);

  const showStarterKit = useMemo(() => {
    if (typeFilter === 'collections' || typeFilter === 'combos') return false;
    if (!query.trim()) return true;
    return `${catalog.starterKit.name} ${catalog.starterKit.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  }, [catalog.starterKit, typeFilter, query]);

  return (
    <main className="py-10 lg:py-14 bg-[#FAF5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E3D5C3] pb-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
              The Little Designer Catalog · Currency INR
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2B231D]">
              Shop Monthly Packs &amp; Combos
            </h1>
            <p className="text-base text-[#5C4E42]">
              Pick an individual monthly mission folder, or save with a 3, 6, or 12-month combo
              box (Starter Kit included free).
            </p>
          </div>

          {/* Search input */}
          <div className="w-full md:w-80 relative">
            <Search className="w-4 h-4 text-[#66574A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search architect, Karnataka, combo..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#D4BC9F] text-sm text-[#2B231D] placeholder-[#8C7B6B] focus:outline-none focus:border-[#E66B54]"
            />
          </div>
        </div>

        {/* Filter & Sort Controls Bar */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#66574A] mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Type:
            </span>
            {(
              [
                ['all', 'All Products'],
                ['collections', 'Monthly Packs (12)'],
                ['combos', 'Combo Boxes (3)'],
                ['starter', 'Starter Kit'],
              ] as [TypeFilter, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTypeFilter(key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  typeFilter === key
                    ? 'bg-[#2B231D] text-white'
                    : 'bg-[#FAF5EE] text-[#5C4E42] hover:bg-[#EFE2D0]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Skill dropdown */}
            <label className="inline-flex items-center gap-2 text-xs font-bold text-[#66574A]">
              <span>Focus:</span>
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#D4BC9F] text-xs font-semibold text-[#2B231D] focus:outline-none"
              >
                {skillOptions.map((s) => (
                  <option key={s} value={s}>
                    {s === 'all' ? 'All Disciplines' : s}
                  </option>
                ))}
              </select>
            </label>

            {/* Age selector */}
            <label className="inline-flex items-center gap-2 text-xs font-bold text-[#66574A]">
              <span>Age:</span>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value as AgeFilter)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#D4BC9F] text-xs font-semibold text-[#2B231D] focus:outline-none"
              >
                <option value="all">All Ages (6–12 yrs)</option>
                <option value="6-8">Ages 6–8 (Guided Play)</option>
                <option value="9-12">Ages 9–12 (Independent)</option>
              </select>
            </label>

            {/* Sort selector */}
            <label className="inline-flex items-center gap-2 text-xs font-bold text-[#66574A]">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 rounded-lg bg-[#FAF5EE] border border-[#D4BC9F] text-xs font-semibold text-[#2B231D] focus:outline-none"
              >
                <option value="month">Month Order (01–12)</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </label>
          </div>
        </div>

        {/* Combo Boxes Section */}
        {filteredCombos.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-extrabold text-[#2B231D]">
                Multi-Month Combo Boxes
              </h2>
              <button
                type="button"
                onClick={() => navigate('combos')}
                className="text-xs font-bold text-[#9B5139] hover:underline cursor-pointer"
              >
                Compare Explorer vs Designer vs Master
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredCombos.map((cb) => {
                const saved = isWishlisted(cb.id);
                return (
                  <div
                    key={cb.id}
                    className="bg-[#FFFDF9] rounded-2xl border border-[#DFCBB2] p-6 flex flex-col justify-between gap-5 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-bold text-[#9B5139]">{cb.subtitle}</p>
                          <h3 className="font-display text-xl font-extrabold text-[#2B231D]">
                            {cb.name}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(cb.id)}
                          aria-label={`Save ${cb.name}`}
                          className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                            saved
                              ? 'bg-[#E66B54] text-white'
                              : 'bg-[#FAF5EE] text-[#66574A] hover:text-[#E66B54]'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                        </button>
                      </div>

                      <p className="text-sm text-[#5C4E42] leading-relaxed">{cb.description}</p>

                      {/* Mini colour swatches for included months */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cb.monthsIncluded.map((m) => {
                          const col = catalog.collections.find((c) => c.month === m);
                          return (
                            <span
                              key={m}
                              title={col ? `Month ${col.monthCode}: ${col.title}` : ''}
                              className="w-5 h-5 rounded-md text-[10px] font-bold flex items-center justify-center tabular-nums"
                              style={{
                                backgroundColor: col?.heroHex ?? '#8B5A2B',
                                color: col?.heroTextOnColor ?? '#FFFFFF',
                              }}
                            >
                              {m}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#EFE2D0] flex items-center justify-between gap-3">
                      <div>
                        <span className="text-lg font-extrabold text-[#2B231D] tabular-nums">
                          {formatPrice(cb.priceInr, cb.pricePlaceholder)}
                        </span>
                        <p className="text-[11px] font-semibold text-[#2E6F40]">
                          Starter Kit Included
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          addToCart({
                            productId: cb.id,
                            slug: cb.slug,
                            kind: 'combo',
                            title: cb.name,
                            subtitle: cb.monthsLabel,
                            accentHex: '#8B5A2B',
                            priceInr: cb.priceInr,
                            pricePlaceholder: cb.pricePlaceholder,
                          })
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2B231D] text-white text-xs font-bold hover:bg-[#43372E] cursor-pointer whitespace-nowrap"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add Combo</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Single Monthly Packs Grid */}
        {filteredCollections.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-extrabold text-[#2B231D]">
                Individual Monthly Folders ({filteredCollections.length})
              </h2>
              {ageFilter !== 'all' && (
                <p className="text-xs font-semibold text-[#66574A]">
                  Showing packs suited for ages {ageFilter} with parent guidance notes
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCollections.map((col) => (
                <ProductCard
                  key={col.id}
                  collection={col}
                  preferPhoto={col.month === 1}
                />
              ))}
            </div>
          </section>
        )}

        {/* Starter Kit Card */}
        {showStarterKit && (
          <section className="kraft-surface rounded-3xl border border-[#D4BC9F] p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9B5139]">
                  <Scissors className="w-4 h-4" />
                  <span>Essential Desk Tools · Included Free in Every Combo</span>
                </div>
                <h2 className="font-display text-2xl font-extrabold text-[#2B231D]">
                  {catalog.starterKit.name}
                </h2>
                <p className="text-sm text-[#43372E] leading-relaxed max-w-2xl">
                  {catalog.starterKit.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {catalog.starterKit.contents.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-xs text-[#43372E]">
                      <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#FFFDF9] rounded-2xl border border-[#DFCBB2] p-5 flex flex-col justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#66574A]">Standalone Price</p>
                  <p className="text-2xl font-extrabold text-[#2B231D] tabular-nums">
                    {formatPrice(
                      catalog.starterKit.priceInr,
                      catalog.starterKit.pricePlaceholder
                    )}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      productId: catalog.starterKit.id,
                      slug: catalog.starterKit.slug,
                      kind: 'starter',
                      title: catalog.starterKit.name,
                      subtitle: 'Safety scissors, pencils, wooden ruler, glue & binder strap',
                      accentHex: '#9B7149',
                      priceInr: catalog.starterKit.priceInr,
                      pricePlaceholder: catalog.starterKit.pricePlaceholder,
                    })
                  }
                  className="w-full py-3 rounded-xl bg-[#2B231D] text-white text-sm font-bold hover:bg-[#43372E] cursor-pointer"
                >
                  Add Starter Kit to Bag
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Empty filter state */}
        {filteredCollections.length === 0 &&
          filteredCombos.length === 0 &&
          !showStarterKit && (
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-12 text-center space-y-3">
              <p className="font-display text-xl font-bold text-[#2B231D]">
                No kits matched your current filters
              </p>
              <p className="text-sm text-[#66574A]">
                Clear your search or reset filters to view all 12 collections and 3 combo boxes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setTypeFilter('all');
                  setSkillFilter('all');
                  setAgeFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-[#2B231D] text-white text-sm font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
      </div>
    </main>
  );
};
