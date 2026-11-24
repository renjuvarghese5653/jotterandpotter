import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  FileText,
  Layers,
  Mail,
  MessageSquare,
  Package,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatPrice';
import { ProductCard } from '../components/ProductCard';
import { MotifIcon } from '../components/KraftFolderVisual';

const FIVE_STEPS = [
  {
    step: '01',
    title: 'Open your client letter',
    detail: 'Break the seal on a real design brief written from a grandparent, sibling, or neighbour.',
  },
  {
    step: '02',
    title: 'Meet your client',
    detail: 'Ask thoughtful questions and observe real needs—sunlight, reach, safety, or comfort.',
  },
  {
    step: '03',
    title: 'Design, build & test',
    detail: 'Work through 12 mission sheets and 24 word-and-colouring cards using hands-on tools.',
  },
  {
    step: '04',
    title: 'Present to your client',
    detail: 'Walk your client through the finished house, reading nook, bridge, or shop sign.',
  },
  {
    step: '05',
    title: 'Get signed off & earn your badge',
    detail: 'Receive a formal client signature on your certificate and add your woven badge.',
  },
];

const OUTCOMES = [
  {
    title: 'Creativity',
    detail: 'Open-ended Indian briefs with no single "right" answer—every child designs differently.',
  },
  {
    title: 'Logical Thinking',
    detail: 'Measuring rooms, testing triangle trusses, and iterating Version 1 into Version 2.',
  },
  {
    title: 'Fine Motor Skills',
    detail: 'Scale ruling, paper scoring, hand stitching, dot-grid art, and booklet binding.',
  },
  {
    title: 'Empathy',
    detail: 'Designing for an elder grandparent, local birds, or a busy neighbourhood shopkeeper.',
  },
  {
    title: 'Presenting',
    detail: 'Explaining design choices clearly aloud during the end-of-month client handover.',
  },
  {
    title: 'Real-World Result',
    detail: 'A physical organizer, bird garden, memory book, or signboard used long after craft day.',
  },
];

export const HomePage: React.FC = () => {
  const {
    catalog,
    navigate,
    addToCart,
    setIsPrintableOpen,
    showToast,
  } = useStore();

  const [selectedSpineMonth, setSelectedSpineMonth] = useState(1);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const activeSpineCollection =
    catalog.collections.find((c) => c.month === selectedSpineMonth) ??
    catalog.collections[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    showToast('Welcome! Opening your free Meet the Architect sample sheet.');
    setIsPrintableOpen(true);
  };

  return (
    <main>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-[#E3D5C3] bg-[#FAF5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wide uppercase text-[#9B5139]">
                <span>The Little Designer Series</span>
                <span aria-hidden="true">·</span>
                <span>Ages 6–12</span>
                <span aria-hidden="true">·</span>
                <span>Made in India</span>
              </div>

              <h1
                className="font-display font-extrabold text-[#2B231D] leading-[1.08] tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', textWrap: 'balance' }}
              >
                Imagine. Design. Create.
              </h1>

              <p className="text-base sm:text-lg text-[#5C4E42] leading-relaxed max-w-xl">
                Not another colouring book. Every month, your child opens a sealed brief from a
                real client—a grandparent, a sibling, or a local shopkeeper—solves 12 hands-on
                mission sheets, builds something real, and earns a client-signed badge.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => navigate('shop')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E66B54] text-white font-bold text-base shadow-sm hover:bg-[#D55942] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Shop Packs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigate('how-it-works')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#EFE2D0] text-[#2B231D] border border-[#D4BC9F] font-bold text-base hover:bg-[#E7D4BC] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>See How It Works</span>
                </button>
              </div>

              {/* Trust metadata row */}
              <div className="pt-4 border-t border-[#E3D5C3] grid grid-cols-3 gap-4 max-w-lg text-sm">
                <div>
                  <p className="font-display font-bold text-[#2B231D] tabular-nums">12 Months</p>
                  <p className="text-xs text-[#66574A]">12 design disciplines</p>
                </div>
                <div>
                  <p className="font-display font-bold text-[#2B231D]">100% Screen-Free</p>
                  <p className="text-xs text-[#66574A]">Tactile kraft &amp; wood</p>
                </div>
                <div>
                  <p className="font-display font-bold text-[#2B231D]">Indian Context</p>
                  <p className="text-xs text-[#66574A]">Homes, birds &amp; crafts</p>
                </div>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6 flex">
              <div className="relative w-full rounded-3xl overflow-hidden border border-[#DFCBB2] bg-[#EFE2D0] shadow-[0_18px_40px_-16px_rgba(43,35,29,0.18)]">
                <img
                  src={catalog.images.heroFolder}
                  alt="Month 01 The Little Architect kraft folder with coral band, wooden scale ruler, sealed client letter, and floor plan blueprint"
                  referrerPolicy="no-referrer"
                  className="w-full h-full min-h-[320px] object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2B231D]/85 via-[#2B231D]/45 to-transparent p-6 text-white">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#FDE0D9]">
                        Featured Opening Pack · Month 01
                      </p>
                      <p className="font-display text-2xl font-bold leading-tight">
                        The Little Architect
                      </p>
                      <p className="text-sm text-white/90">
                        Design a home for someone you love
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('product', 'the-little-architect')}
                      className="px-4 py-2 rounded-xl bg-white text-[#2B231D] text-xs font-bold hover:bg-[#FAF5EE] cursor-pointer whitespace-nowrap"
                    >
                      Peek Inside Month 01
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS IN 5 STEPS */}
      <section className="py-14 lg:py-16 bg-[#F2E7D8]/70 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139] mb-1">
                A Real-World Design Cycle
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2B231D]">
                How Every Monthly Mission Works
              </h2>
            </div>
            <button
              type="button"
              onClick={() => navigate('how-it-works')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#9B5139] hover:text-[#2B231D] cursor-pointer whitespace-nowrap"
            >
              <span>Parent guide &amp; weekly rhythm</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FIVE_STEPS.map((item) => (
              <div
                key={item.step}
                className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-5 flex flex-col justify-between gap-3"
              >
                <div>
                  <span className="font-display text-2xl font-extrabold text-[#E66B54] tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#2B231D] mt-1">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#5C4E42] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COLLECT THEM ALL BINDER + 12 COLLECTIONS GRID */}
      <section className="py-16 bg-[#FAF5EE] border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139] mb-1">
                12 Months · 12 Colour-Coded Kraft Folders
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2B231D]">
                The 12 Little Designer Collections
              </h2>
              <p className="mt-2 text-base text-[#5C4E42]">
                Collect all 12 monthly folders to assemble a colour-coded design portfolio binder
                on your child&rsquo;s bookshelf.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#C8B49B] bg-[#FFFDF9] text-sm font-bold text-[#2B231D] hover:bg-[#EFE2D0] cursor-pointer whitespace-nowrap"
            >
              <span>Filter &amp; Shop All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Collect-Them-All Binder Spine Visual */}
          <div className="rounded-3xl kraft-surface border border-[#D4BC9F] p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* 12 Colour-Coded Spines */}
              <div className="lg:col-span-7">
                <p className="text-xs font-bold uppercase tracking-wider text-[#5A422B] mb-3">
                  Collect Them All · Tap any spine to preview
                </p>
                <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 sm:gap-2 items-end bg-[#FAF5EE] p-4 rounded-2xl border border-[#D4BC9F]">
                  {catalog.collections.map((col) => {
                    const isSelected = col.month === selectedSpineMonth;
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedSpineMonth(col.month)}
                        title={`Month ${col.monthCode}: ${col.title}`}
                        className={`group relative rounded-lg transition-all duration-150 flex flex-col items-center justify-between py-2.5 px-1 cursor-pointer ${
                          isSelected
                            ? 'h-44 -translate-y-2 shadow-lg ring-2 ring-[#2B231D]'
                            : 'h-36 hover:h-40 opacity-90 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: col.heroHex,
                          color: col.heroTextOnColor,
                        }}
                      >
                        <span className="text-[11px] font-extrabold tabular-nums">
                          {col.monthCode}
                        </span>
                        <span
                          className="text-[10px] font-bold tracking-tight whitespace-nowrap hidden sm:block"
                          style={{
                            writingMode: 'vertical-rl',
                            transform: 'rotate(180deg)',
                          }}
                        >
                          {col.shortTitle}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-white/40" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Spine Spotlight */}
              <div className="lg:col-span-5 bg-[#FFFDF9] rounded-2xl border border-[#DFCBB2] p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#66574A] tabular-nums">
                    Month {activeSpineCollection.monthCode} · {activeSpineCollection.colourName} Spine
                  </span>
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: activeSpineCollection.heroHex,
                      color: activeSpineCollection.heroTextOnColor,
                    }}
                  >
                    <MotifIcon motif={activeSpineCollection.motif} className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#2B231D]">
                    {activeSpineCollection.title}
                  </h3>
                  <p className="text-sm font-semibold text-[#9B5139]">
                    {activeSpineCollection.tagline}
                  </p>
                </div>

                <p className="text-sm text-[#5C4E42] leading-relaxed">
                  {activeSpineCollection.missionGoal}
                </p>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-base font-extrabold text-[#2B231D] tabular-nums">
                    {formatPrice(
                      activeSpineCollection.priceInr,
                      activeSpineCollection.pricePlaceholder
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('product', activeSpineCollection.slug)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2B231D] text-white text-xs font-bold hover:bg-[#43372E] cursor-pointer"
                  >
                    <span>Explore Month {activeSpineCollection.monthCode}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 12 Collections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {catalog.collections.map((col) => (
              <ProductCard
                key={col.id}
                collection={col}
                preferPhoto={col.month === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT'S INSIDE EVERY MONTHLY PACK */}
      <section className="py-16 bg-[#F2E7D8]/60 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-3xl overflow-hidden border border-[#DFCBB2] bg-[#FFFDF9] shadow-sm">
                <img
                  src={catalog.images.packContents}
                  alt="Flat-lay contents of Month 01 pack showing kraft folder, sealed letter, 12 mission sheets, kraft word-card pouch, wooden ruler, badge patches, and parent guide"
                  referrerPolicy="no-referrer"
                  className="w-full h-full min-h-[320px] object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139] mb-1">
                  Thoughtfully Packed in India
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2B231D]">
                  What&rsquo;s Inside Every Monthly Pack
                </h2>
                <p className="mt-2 text-base text-[#5C4E42]">
                  Every month arrives in a sturdy, colour-coded kraft folder with a QR link to a
                  3-minute mission introduction video.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {catalog.packStandardContents.map((part, index) => (
                  <div
                    key={part.title}
                    className="bg-[#FFFDF9] rounded-xl border border-[#E3D5C3] p-4"
                  >
                    <p className="text-xs font-bold text-[#E66B54] tabular-nums mb-0.5">
                      0{index + 1}
                    </p>
                    <h3 className="font-display text-base font-bold text-[#2B231D]">
                      {part.title}
                    </h3>
                    <p className="text-xs text-[#5C4E42] mt-1 leading-relaxed">
                      {part.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FFFDF9] border border-[#DFCBB2] text-sm text-[#43372E]">
                <ShieldCheck className="w-5 h-5 text-[#2E6F40] shrink-0 mt-0.5" />
                <p>
                  <strong>Safety &amp; Adult-Help Note:</strong> Children handle drawing, matching,
                  and planning independently, while adult help is needed for cutting thick
                  cardboard or punching binding holes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY IT WORKS FOR KIDS + PARENT TESTIMONIALS (Adjacent Claim-to-Proof) */}
      <section className="py-16 bg-[#FAF5EE] border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139] mb-1">
                  Built Around Real Skill Growth
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2B231D]">
                  Why Parents &amp; Kids Love The Series
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OUTCOMES.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-5"
                  >
                    <h3 className="font-display text-lg font-bold text-[#2B231D]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#5C4E42] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-3xl overflow-hidden border border-[#DFCBB2] bg-[#EFE2D0]">
                <img
                  src={catalog.images.familyCraft}
                  alt="Indian child building a cardboard model house alongside his grandmother at a sunny dining table"
                  referrerPolicy="no-referrer"
                  className="w-full h-full min-h-[300px] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Attributed Parent Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {catalog.testimonials.map((t) => (
              <blockquote
                key={t.id}
                className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 flex flex-col justify-between gap-4"
              >
                <p className="text-sm text-[#43372E] leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="pt-3 border-t border-[#EFE2D0]">
                  <p className="font-display text-base font-bold text-[#2B231D]">
                    {t.parentName}
                  </p>
                  <p className="text-xs text-[#66574A]">
                    {t.role} · {t.city} · {t.monthCompleted}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMBO PACKS SHOWCASE */}
      <section className="py-16 bg-[#F2E7D8]/70 border-b border-[#E3D5C3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
                Save &amp; Get the Starter Kit Free
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#2B231D]">
                Choose a Multi-Month Combo Box
              </h2>
              <p className="text-base text-[#5C4E42] leading-relaxed">
                Every combo includes our Starter Kit inside Box 1, optional handwritten gift tag
                messaging, and reliable dispatch across India.
              </p>
              <button
                type="button"
                onClick={() => navigate('combos')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#2B231D] underline decoration-[#E66B54] decoration-2 underline-offset-4 cursor-pointer"
              >
                <span>Compare all 3 combos side by side</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-[#DFCBB2] bg-[#FFFDF9]">
                <img
                  src={catalog.images.comboBoxes}
                  alt="Three Jotter and Potter kraft combo gift boxes showing Explorer, Designer, and Master Designer sets"
                  referrerPolicy="no-referrer"
                  className="w-full h-56 sm:h-64 object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {catalog.combos.map((combo) => (
              <div
                key={combo.id}
                className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#9B5139]">
                    <span>{combo.subtitle}</span>
                    <span>{combo.savingsNote}</span>
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-[#2B231D]">
                    {combo.name}
                  </h3>
                  <p className="text-sm text-[#5C4E42] leading-relaxed">
                    {combo.description}
                  </p>
                  <ul className="space-y-2 pt-2">
                    {combo.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-[#43372E]">
                        <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#EFE2D0] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#66574A]">
                      {combo.monthsIncluded.length} Monthly Folders
                    </span>
                    <span className="text-lg font-extrabold text-[#2B231D] tabular-nums">
                      {formatPrice(combo.priceInr, combo.pricePlaceholder)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => navigate('combos')}
                      className="py-2.5 px-3 rounded-xl border border-[#C8B49B] text-xs font-bold text-[#2B231D] hover:bg-[#EFE2D0] cursor-pointer"
                    >
                      Compare
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          productId: combo.id,
                          slug: combo.slug,
                          kind: 'combo',
                          title: combo.name,
                          subtitle: combo.monthsLabel,
                          accentHex: '#8B5A2B',
                          priceInr: combo.priceInr,
                          pricePlaceholder: combo.pricePlaceholder,
                        })
                      }
                      className="py-2.5 px-3 rounded-xl bg-[#2B231D] text-white text-xs font-bold hover:bg-[#43372E] cursor-pointer"
                    >
                      Add Combo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ PREVIEW & NEWSLETTER WITH FREE SAMPLE SHEET */}
      <section className="py-16 bg-[#FAF5EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Free Printable + Newsletter */}
            <div className="lg:col-span-7 kraft-surface rounded-3xl border border-[#D4BC9F] p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 rounded-xl overflow-hidden border border-[#D4BC9F] bg-white shadow-sm">
                  <img
                    src={catalog.images.meetArchitectSheet}
                    alt="Meet the Architect sample printable activity sheet"
                    referrerPolicy="no-referrer"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </div>
                <div className="sm:col-span-7 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
                    Try Month 01 Free Tonight
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B231D] leading-tight">
                    Get the &ldquo;Meet the Architect&rdquo; Printable Sheet
                  </h2>
                  <p className="text-sm text-[#43372E] leading-relaxed">
                    Join our parent notes list for screen-free weekend prompts and instant access
                    to our printable A4 floor-plan mission sheet.
                  </p>

                  {subscribed ? (
                    <div className="p-3.5 rounded-xl bg-[#FFFDF9] border border-[#2E6F40]/40 space-y-2">
                      <p className="text-sm font-bold text-[#2E6F40]">
                        You&rsquo;re subscribed! Your sheet is ready.
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsPrintableOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E66B54] text-white text-xs font-bold hover:bg-[#D55942] cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Open &amp; Print Sample Sheet</span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Parent email address"
                          className="flex-1 px-4 py-2.5 rounded-xl bg-[#FFFDF9] border border-[#C8B49B] text-sm text-[#2B231D] placeholder-[#8C7B6B] focus:outline-none focus:border-[#E66B54]"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-[#E66B54] text-white text-sm font-bold hover:bg-[#D55942] transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Send Sheet
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPrintableOpen(true)}
                        className="text-xs font-bold text-[#5C4E42] underline underline-offset-4 hover:text-[#2B231D] cursor-pointer"
                      >
                        Or preview the sample sheet directly
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* FAQ Preview */}
            <div className="lg:col-span-5 bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-extrabold text-[#2B231D]">
                    Common Parent Questions
                  </h2>
                  <button
                    type="button"
                    onClick={() => navigate('contact')}
                    className="text-xs font-bold text-[#9B5139] hover:underline cursor-pointer"
                  >
                    View all FAQs
                  </button>
                </div>

                <div className="divide-y divide-[#EFE2D0]">
                  {catalog.faqs.slice(0, 3).map((faq) => (
                    <div key={faq.id} className="py-3.5 first:pt-1">
                      <h3 className="font-display text-base font-bold text-[#2B231D]">
                        {faq.question}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#5C4E42] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('contact')}
                className="w-full py-3 rounded-xl bg-[#EFE2D0] text-[#2B231D] text-sm font-bold hover:bg-[#E3D5C3] transition-colors cursor-pointer"
              >
                Ask Our Studio Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
