import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Gift,
  Heart,
  MailOpen,
  Play,
  QrCode,
  ShoppingBag,
  Star,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatPrice';
import { KraftFolderVisual, MotifIcon } from '../components/KraftFolderVisual';
import { ProductCard } from '../components/ProductCard';

interface ProductPageProps {
  slug?: string;
}

export const ProductPage: React.FC<ProductPageProps> = ({ slug }) => {
  const {
    catalog,
    getCollectionBySlug,
    navigate,
    addToCart,
    isWishlisted,
    toggleWishlist,
    getReviewsForCollection,
    addReview,
  } = useStore();

  const collection =
    (slug ? getCollectionBySlug(slug) : undefined) ?? catalog.collections[0];

  const [letterOpened, setLetterOpened] = useState(false);
  const [giftEnabled, setGiftEnabled] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Review form state
  const [revName, setRevName] = useState('');
  const [revCity, setRevCity] = useState('');
  const [revAge, setRevAge] = useState('Age 8');
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState('');

  const reviews = getReviewsForCollection(collection);
  const saved = isWishlisted(collection.id);

  const related = catalog.collections
    .filter((c) => c.id !== collection.id)
    .slice(0, 3);

  const handleAdd = () => {
    addToCart({
      productId: collection.id,
      slug: collection.slug,
      kind: 'collection',
      title: `Month ${collection.monthCode}: ${collection.title}`,
      subtitle: `${collection.colourName} Folder · ${collection.tagline}`,
      accentHex: collection.heroHex,
      priceInr: collection.priceInr,
      pricePlaceholder: collection.pricePlaceholder,
      giftMessage: giftEnabled && giftMessage.trim() ? giftMessage.trim() : undefined,
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revName.trim() || !revComment.trim()) return;
    addReview(collection.id, {
      author: revName.trim(),
      city: revCity.trim() || 'India',
      childAge: revAge,
      rating: revRating,
      comment: revComment.trim(),
    });
    setRevName('');
    setRevCity('');
    setRevComment('');
  };

  return (
    <main className="bg-[#FAF5EE] min-h-screen">
      {/* Hero Colour Band matching Kraft Folder */}
      <section
        className="py-10 sm:py-14 border-b border-black/10"
        style={{
          backgroundColor: collection.heroHex,
          color: collection.heroTextOnColor,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <button
            type="button"
            onClick={() => navigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider opacity-90 hover:opacity-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Packs</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider opacity-90 tabular-nums">
                Month {collection.monthCode} · {collection.colourName} Edition ·{' '}
                {collection.skillFocus} · Ages {collection.ageGroup}
              </p>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                {collection.title}
              </h1>
              <p className="text-base sm:text-xl font-semibold opacity-95">
                {collection.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-xs rounded-2xl px-4 py-3 shrink-0">
              <MotifIcon motif={collection.motif} className="w-7 h-7" />
              <div className="text-xs">
                <p className="font-bold uppercase tracking-wider opacity-85">Monthly Client</p>
                <p className="font-bold text-sm">{collection.clientRole}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contiguous Purchase Module */}
      <section className="py-12 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Gallery / Folder Visual */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
              <div className="rounded-3xl overflow-hidden border border-[#DFCBB2] bg-[#FFFDF9] aspect-[4/3]">
                <KraftFolderVisual
                  collection={collection}
                  preferPhoto={collection.month === 1}
                  className="w-full h-full"
                />
              </div>

              {/* Monthly Extra Tool Callout */}
              <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
                    Special Monthly Tool Included
                  </p>
                  <p className="text-sm font-bold text-[#2B231D] mt-0.5">
                    {collection.monthlyToolItem}
                  </p>
                </div>
                <span
                  className="w-3 h-10 rounded-full shrink-0"
                  style={{ backgroundColor: collection.heroHex }}
                />
              </div>
            </div>

            {/* Right Purchase Controls */}
            <div className="lg:col-span-6 bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-6 sm:p-8 space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-[#66574A] tabular-nums mb-1">
                    <Star className="w-4 h-4 text-[#EAB308] fill-[#EAB308]" />
                    <span className="font-bold text-[#2B231D]">
                      {collection.rating.toFixed(1)}
                    </span>
                    <span>({reviews.length} parent reviews)</span>
                  </div>
                  <p className="text-3xl font-extrabold text-[#2B231D] tabular-nums">
                    {formatPrice(collection.priceInr, collection.pricePlaceholder)}
                  </p>
                  <p className="text-xs text-[#66574A] mt-0.5">
                    Includes all 12 mission sheets, 24 cards, tool, certificate &amp; kraft folder
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleWishlist(collection.id)}
                  aria-label="Toggle wishlist"
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center cursor-pointer transition-colors ${
                    saved
                      ? 'bg-[#E66B54] border-[#E66B54] text-white'
                      : 'border-[#D4BC9F] text-[#5C4E42] hover:bg-[#EFE2D0]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#43372E] leading-relaxed">
                {collection.missionGoal}
              </p>

              {/* Gift Option */}
              <div className="rounded-2xl bg-[#FAF5EE] border border-[#E3D5C3] p-4 space-y-3">
                <label className="flex items-center justify-between gap-3 cursor-pointer">
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-[#2B231D]">
                    <Gift className="w-4 h-4 text-[#E66B54]" />
                    Add a complimentary gift tag message
                  </span>
                  <input
                    type="checkbox"
                    checked={giftEnabled}
                    onChange={(e) => setGiftEnabled(e.target.checked)}
                    className="w-4 h-4 accent-[#E66B54]"
                  />
                </label>

                {giftEnabled && (
                  <textarea
                    rows={2}
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Write your handwritten gift note (e.g. Happy 8th Birthday, Aarav!)"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-[#D4BC9F] text-sm text-[#2B231D] placeholder-[#8C7B6B] focus:outline-none focus:border-[#E66B54]"
                  />
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-base shadow-sm inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-95 cursor-pointer"
                  style={{
                    backgroundColor: collection.heroHex,
                    color: collection.heroTextOnColor,
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add Month {collection.monthCode} Pack to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('combos')}
                  className="w-full py-3 px-6 rounded-xl bg-[#EFE2D0] text-[#2B231D] text-sm font-bold hover:bg-[#E3D5C3] transition-colors cursor-pointer"
                >
                  Or get Months 1–3 with Free Starter Kit in Explorer Combo
                </button>
              </div>

              {/* Safety Note */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FDF1EE] border border-[#E66B54]/30 text-xs sm:text-sm text-[#43372E]">
                <AlertTriangle className="w-4 h-4 text-[#B84A39] shrink-0 mt-0.5" />
                <p>
                  <strong>Safety &amp; Adult Help:</strong> {collection.safetyNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sealed Client Letter Teaser & QR Video Placeholder */}
      <section className="py-12 bg-[#F2E7D8]/60 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Interactive Client Letter */}
          <div className="lg:col-span-7 bg-[#FFFDF9] rounded-3xl border border-[#DFCBB2] p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
                  Sealed Client Letter Teaser
                </p>
                <h2 className="font-display text-2xl font-extrabold text-[#2B231D]">
                  From: {collection.clientRole}
                </h2>
              </div>
              <MailOpen className="w-6 h-6 text-[#9B7149]" />
            </div>

            {letterOpened ? (
              <div className="p-5 rounded-2xl kraft-surface border border-[#D4BC9F] space-y-3">
                <p className="text-base italic text-[#2B231D] leading-relaxed">
                  &ldquo;{collection.clientLetterTeaser}&rdquo;
                </p>
                <p className="text-xs font-bold text-[#66574A]">
                  — Signed inside your Month {collection.monthCode} sealed envelope
                </p>
              </div>
            ) : (
              <div className="p-6 rounded-2xl kraft-surface border border-dashed border-[#BA976B] text-center space-y-3">
                <p className="text-sm font-semibold text-[#5A422B]">
                  Your child breaks this wax-style seal on Day 1 to discover who they are designing for.
                </p>
                <button
                  type="button"
                  onClick={() => setLetterOpened(true)}
                  className="px-5 py-2.5 rounded-xl bg-[#2B231D] text-white text-xs font-bold hover:bg-[#43372E] cursor-pointer"
                >
                  Unseal Sample Client Letter
                </button>
              </div>
            )}
          </div>

          {/* QR Mission Video Preview */}
          <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl border border-[#DFCBB2] p-6 sm:p-8 flex flex-col justify-between gap-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
                  Printed Folder QR Code
                </p>
                <h2 className="font-display text-xl font-extrabold text-[#2B231D]">
                  {collection.qrVideoTitle}
                </h2>
                <p className="text-xs text-[#66574A] mt-1">
                  Optional {collection.qrVideoDuration} intro video for parents &amp; kids before screen-free play begins
                </p>
              </div>
              <QrCode className="w-10 h-10 text-[#2B231D] shrink-0" />
            </div>

            {videoPlaying ? (
              <div
                className="rounded-2xl p-5 space-y-2 text-sm"
                style={{
                  backgroundColor: collection.heroLightHex,
                  color: '#2B231D',
                }}
              >
                <p className="font-bold">Mission Video Preview Active ({collection.qrVideoDuration})</p>
                <p className="text-xs text-[#5C4E42] leading-relaxed">
                  Narrator walks your child through how real {collection.shortTitle.toLowerCase()}s
                  measure, observe, and sketch before turning off the phone for hands-on building.
                </p>
                <button
                  type="button"
                  onClick={() => setVideoPlaying(false)}
                  className="text-xs font-bold underline cursor-pointer"
                >
                  Close preview
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setVideoPlaying(true)}
                className="w-full py-4 rounded-2xl bg-[#FAF5EE] border border-[#D4BC9F] flex items-center justify-center gap-2.5 text-sm font-bold text-[#2B231D] hover:bg-[#EFE2D0] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Preview QR Mission Intro ({collection.qrVideoDuration})</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 12 Mission Steps Timeline + Week-by-Week Plan */}
      <section className="py-14 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139] mb-1">
              Step-by-Step Journey
            </p>
            <h2 className="font-display text-3xl font-extrabold text-[#2B231D]">
              12 Mission Sheets Timeline
            </h2>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {collection.missionSteps.map((step, i) => (
                <div
                  key={step}
                  className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-4 flex items-start gap-3.5"
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 tabular-nums"
                    style={{
                      backgroundColor: collection.heroHex,
                      color: collection.heroTextOnColor,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm text-[#2B231D] font-medium leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Week Plan */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B231D] mb-5">
              Week-by-Week Family Pacing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {collection.weeklyPlan.map((wk) => (
                <div
                  key={wk.week}
                  className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-5 space-y-2"
                >
                  <div className="text-xs font-bold text-[#9B5139] tabular-nums">
                    Week {wk.week} · {wk.cardPairs} · {wk.missionSteps}
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#2B231D]">
                    {wk.title}
                  </h3>
                  <p className="text-sm text-[#5C4E42] leading-relaxed">{wk.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12-Card Word & Colouring Set Preview */}
      <section className="py-14 bg-[#F2E7D8]/50 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139] mb-1">
              24 Cards in a Kraft Pouch (12 Pairs)
            </p>
            <h2 className="font-display text-3xl font-extrabold text-[#2B231D]">
              Word &amp; Colouring Card Set Preview
            </h2>
            <p className="mt-1 text-sm text-[#5C4E42]">
              Each pair matches a real design vocabulary word with a hand-drawn colouring picture.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {collection.cardPairs.map((pair) => (
              <div
                key={pair.id}
                className="bg-[#FFFDF9] rounded-xl border border-[#DFCBB2] p-4 space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px] font-bold text-[#9B7149] tabular-nums">
                  <span>Pair {String(pair.id).padStart(2, '0')}</span>
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: collection.heroHex }}
                  />
                </div>
                <h3 className="font-display text-base font-bold text-[#2B231D]">
                  {pair.word}
                </h3>
                <p className="text-xs text-[#5C4E42] leading-relaxed">{pair.concept}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills, Materials & What's in the Pack */}
      <section className="py-14 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
            <h3 className="font-display text-xl font-bold text-[#2B231D]">
              Skills Developed
            </h3>
            <ul className="space-y-2.5">
              {collection.skillsDeveloped.map((skill) => (
                <li key={skill} className="flex items-start gap-2 text-sm text-[#43372E]">
                  <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0 mt-0.5" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
            <h3 className="font-display text-xl font-bold text-[#2B231D]">
              Materials Needed at Home
            </h3>
            <ul className="space-y-2.5">
              {collection.materialsNeeded.map((mat) => (
                <li key={mat} className="flex items-start gap-2 text-sm text-[#43372E]">
                  <CheckCircle2 className="w-4 h-4 text-[#9B7149] shrink-0 mt-0.5" />
                  <span>{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
            <h3 className="font-display text-xl font-bold text-[#2B231D]">
              Inside Your Kraft Folder
            </h3>
            <ul className="space-y-2 text-xs text-[#43372E]">
              {catalog.packStandardContents.map((p) => (
                <li key={p.title} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E66B54] shrink-0 mt-0.5" />
                  <span>
                    <strong>{p.title}:</strong> {p.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Parent Reviews + Add Review */}
      <section className="py-14 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-display text-3xl font-extrabold text-[#2B231D]">
              Parent Reviews ({reviews.length})
            </h2>
            <div className="space-y-4">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-5 space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[#66574A]">
                    <span className="font-bold text-[#2B231D]">
                      {r.author} · {r.city} · {r.childAge}
                    </span>
                    <span>{r.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 text-[#EAB308] fill-[#EAB308]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#43372E] leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leave a Review Form */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleReviewSubmit}
              className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-4"
            >
              <h3 className="font-display text-xl font-bold text-[#2B231D]">
                Share Your Family&rsquo;s Experience
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  value={revName}
                  onChange={(e) => setRevName(e.target.value)}
                  placeholder="Parent name"
                  className="px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                />
                <input
                  type="text"
                  value={revCity}
                  onChange={(e) => setRevCity(e.target.value)}
                  placeholder="City (e.g. Pune)"
                  className="px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={revAge}
                  onChange={(e) => setRevAge(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                >
                  {['Age 6', 'Age 7', 'Age 8', 'Age 9', 'Age 10', 'Age 11', 'Age 12'].map(
                    (a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    )
                  )}
                </select>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(Number(e.target.value))}
                  className="px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                >
                  {[5, 4, 3].map((n) => (
                    <option key={n} value={n}>
                      {n} Stars
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                rows={3}
                required
                value={revComment}
                onChange={(e) => setRevComment(e.target.value)}
                placeholder="What did your child build for their client?"
                className="w-full px-3 py-2 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#2B231D] text-white text-sm font-bold hover:bg-[#43372E] cursor-pointer"
              >
                Post Review
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Related Packs */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B231D]">
            More Packs in The Little Designer Series
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((col) => (
              <ProductCard key={col.id} collection={col} preferPhoto={col.month === 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
