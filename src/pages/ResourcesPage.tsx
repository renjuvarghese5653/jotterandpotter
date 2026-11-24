import React, { useState } from 'react';
import { BookOpen, FileText, Printer, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ResourceItem } from '../types/catalog';

export const ResourcesPage: React.FC = () => {
  const { catalog, setIsPrintableOpen, navigate } = useStore();
  const [activeArticle, setActiveArticle] = useState<ResourceItem | null>(null);

  return (
    <main className="py-12 lg:py-16 bg-[#FAF5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
            Free Resources &amp; Parent Journal
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2B231D]">
            Free Printables &amp; Creativity Tips
          </h1>
          <p className="text-base text-[#5C4E42]">
            Try our hands-on design approach at home with downloadable A4 sheets and short reads
            on raising observant, confident young makers.
          </p>
        </div>

        {/* Featured Printable Hero Card */}
        <section className="kraft-surface rounded-3xl border border-[#D4BC9F] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#D4BC9F] bg-white max-w-sm mx-auto">
              <img
                src={catalog.images.meetArchitectSheet}
                alt="Meet the Architect sample printable activity sheet"
                referrerPolicy="no-referrer"
                className="w-full h-80 object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E66B54]">
              Featured Free Sample · Month 01
            </span>
            <h2 className="font-display text-3xl font-extrabold text-[#2B231D]">
              Meet the Architect – Floor Plan Activity Sheet
            </h2>
            <p className="text-base text-[#43372E] leading-relaxed">
              Give your child a wooden ruler and a pencil tonight. Our sample sheet walks them
              through interviewing a family member and sketching a scaled top-down room plan with
              doors and breeze windows.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsPrintableOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E66B54] text-white text-sm font-bold hover:bg-[#D55942] cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Open &amp; Print Free Sheet</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('product', 'the-little-architect')}
                className="px-5 py-3 rounded-xl bg-[#FFFDF9] border border-[#C8B49B] text-sm font-bold text-[#2B231D] hover:bg-[#EFE2D0] cursor-pointer"
              >
                See Full Month 01 Pack
              </button>
            </div>
          </div>
        </section>

        {/* Articles & Printables Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {catalog.resources.map((item) => (
            <article
              key={item.id}
              className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 flex flex-col justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#9B5139]">
                  {item.type === 'Printable Sheet' ? (
                    <FileText className="w-4 h-4" />
                  ) : (
                    <BookOpen className="w-4 h-4" />
                  )}
                  <span>{item.type}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#66574A]">{item.readTimeOrPages}</span>
                </div>
                <h3 className="font-display text-2xl font-bold text-[#2B231D]">
                  {item.title}
                </h3>
                <p className="text-sm text-[#5C4E42] leading-relaxed">{item.summary}</p>
              </div>

              <div className="pt-3 border-t border-[#EFE2D0] flex items-center gap-3">
                {item.isFeaturedPrintable ? (
                  <button
                    type="button"
                    onClick={() => setIsPrintableOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#2B231D] text-white text-xs font-bold hover:bg-[#43372E] cursor-pointer"
                  >
                    Open Printable Sheet
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveArticle(item)}
                    className="px-4 py-2 rounded-xl bg-[#EFE2D0] text-[#2B231D] text-xs font-bold hover:bg-[#E3D5C3] cursor-pointer"
                  >
                    Read Full Guide
                  </button>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B231D]/55"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0"
            onClick={() => setActiveArticle(null)}
          />
          <div className="relative w-full max-w-2xl bg-[#FAF5EE] rounded-3xl border border-[#DFCBB2] p-6 sm:p-8 max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-[#E3D5C3] pb-4">
              <div>
                <p className="text-xs font-bold text-[#9B5139]">{activeArticle.readTimeOrPages}</p>
                <h2 className="font-display text-2xl font-extrabold text-[#2B231D]">
                  {activeArticle.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#EFE2D0] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-base text-[#43372E] leading-relaxed">
              {activeArticle.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
