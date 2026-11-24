import React, { useState } from 'react';
import { Award, Check, Gift, PackageCheck, ShoppingBag, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/formatPrice';

export const CombosPage: React.FC = () => {
  const { catalog, addToCart, navigate } = useStore();
  const [giftNote, setGiftNote] = useState('');

  return (
    <main className="py-12 lg:py-16 bg-[#FAF5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#E3D5C3] pb-10">
          <div className="lg:col-span-6 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
              Side-by-Side Comparison · Starter Kit Included Free
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2B231D]">
              Combo Boxes: 3, 6 &amp; 12 Months
            </h1>
            <p className="text-base text-[#5C4E42] leading-relaxed">
              Every combo includes our Starter Kit inside Box 1 so your child can begin building on
              Day 1, plus an optional handwritten gift tag message.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-[#DFCBB2] bg-[#FFFDF9]">
              <img
                src={catalog.images.comboBoxes}
                alt="Explorer, Designer, and Master Designer kraft gift boxes"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Gift Message Customizer */}
        <div className="bg-[#FFFDF9] rounded-2xl border border-[#DFCBB2] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Gift className="w-5 h-5 text-[#E66B54] shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-lg font-bold text-[#2B231D]">
                Sending as a Gift? Add a Personal Tag Message
              </h2>
              <p className="text-xs text-[#66574A]">
                We print or hand-write your note onto warm kraft cardstock tucked on top of Box 1.
              </p>
            </div>
          </div>
          <input
            type="text"
            value={giftNote}
            onChange={(e) => setGiftNote(e.target.value)}
            placeholder="Optional gift tag message (e.g. Happy Birthday, Meera!)"
            className="w-full md:w-96 px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm text-[#2B231D] placeholder-[#8C7B6B] focus:outline-none focus:border-[#E66B54]"
          />
        </div>

        {/* 3 Combo Cards Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {catalog.combos.map((combo) => (
            <div
              key={combo.id}
              className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between gap-6 ${
                combo.id === 'combo-master'
                  ? 'kraft-surface border-[#9B7149] shadow-md'
                  : 'bg-[#FFFDF9] border-[#E3D5C3]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-[#9B5139]">
                  <span>{combo.subtitle}</span>
                  <span>{combo.savingsNote}</span>
                </div>

                <div>
                  <h2 className="font-display text-3xl font-extrabold text-[#2B231D]">
                    {combo.name}
                  </h2>
                  <p className="mt-1 text-2xl font-extrabold text-[#2B231D] tabular-nums">
                    {formatPrice(combo.priceInr, combo.pricePlaceholder)}
                  </p>
                </div>

                <p className="text-sm text-[#43372E] leading-relaxed">{combo.description}</p>

                {/* Shipping Rhythm */}
                <div className="p-3.5 rounded-xl bg-white/80 border border-[#DFCBB2] text-xs text-[#43372E]">
                  <strong className="block text-[#2B231D] mb-0.5">Shipping Rhythm</strong>
                  {combo.shippingRhythm}
                </div>

                {/* Months Included Grid */}
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#66574A]">
                    Included Collections ({combo.monthsIncluded.length} of 12)
                  </p>
                  <div className="grid grid-cols-4 gap-1.5">
                    {catalog.collections.map((col) => {
                      const included = combo.monthsIncluded.includes(col.month);
                      return (
                        <button
                          key={col.id}
                          type="button"
                          onClick={() => navigate('product', col.slug)}
                          className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-left truncate cursor-pointer transition-opacity ${
                            included ? 'opacity-100' : 'opacity-25 bg-[#E3D5C3] text-[#5C4E42]'
                          }`}
                          style={
                            included
                              ? { backgroundColor: col.heroHex, color: col.heroTextOnColor }
                              : undefined
                          }
                          title={`Month ${col.monthCode}: ${col.title}`}
                        >
                          {col.monthCode} {col.shortTitle.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

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
                    giftMessage: giftNote.trim() || undefined,
                  })
                }
                className="w-full py-3.5 rounded-xl bg-[#2B231D] text-white text-sm font-bold hover:bg-[#43372E] inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {combo.name} to Cart</span>
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E3D5C3]">
            <h2 className="font-display text-2xl font-extrabold text-[#2B231D]">
              Detailed Feature Comparison
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F2E7D8]/70 text-xs font-bold uppercase text-[#5C4E42]">
                <tr>
                  <th className="py-3.5 px-6">Feature</th>
                  <th className="py-3.5 px-6">Explorer (3 Months)</th>
                  <th className="py-3.5 px-6">Designer (6 Months)</th>
                  <th className="py-3.5 px-6">Master Box (12 Months)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE2D0] text-[#43372E]">
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#2B231D]">Months Covered</td>
                  <td className="py-3.5 px-6 tabular-nums">Months 01–03</td>
                  <td className="py-3.5 px-6 tabular-nums">Months 01–06</td>
                  <td className="py-3.5 px-6 tabular-nums">All Months 01–12</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#2B231D]">Starter Kit Included Free</td>
                  <td className="py-3.5 px-6"><Check className="w-4 h-4 text-[#2E6F40]" /></td>
                  <td className="py-3.5 px-6"><Check className="w-4 h-4 text-[#2E6F40]" /></td>
                  <td className="py-3.5 px-6"><Check className="w-4 h-4 text-[#2E6F40]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#2B231D]">Keepsake Gift Box</td>
                  <td className="py-3.5 px-6"><X className="w-4 h-4 text-[#B8A795]" /></td>
                  <td className="py-3.5 px-6"><X className="w-4 h-4 text-[#B8A795]" /></td>
                  <td className="py-3.5 px-6"><Check className="w-4 h-4 text-[#2E6F40]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#2B231D]">Master Designer Certificate</td>
                  <td className="py-3.5 px-6"><X className="w-4 h-4 text-[#B8A795]" /></td>
                  <td className="py-3.5 px-6"><X className="w-4 h-4 text-[#B8A795]" /></td>
                  <td className="py-3.5 px-6"><Check className="w-4 h-4 text-[#2E6F40]" /></td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-[#2B231D]">Shipping Schedule</td>
                  <td className="py-3.5 px-6">Single upfront box</td>
                  <td className="py-3.5 px-6">2 dispatches (Months 1–3, 4–6)</td>
                  <td className="py-3.5 px-6">Quarterly (3 packs per quarter)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};
