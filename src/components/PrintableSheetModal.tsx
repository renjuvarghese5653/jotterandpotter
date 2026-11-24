import React from 'react';
import { Compass, Printer, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PrintableSheetModal: React.FC = () => {
  const { catalog, isPrintableOpen, setIsPrintableOpen } = useStore();

  if (!isPrintableOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B231D]/55 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Meet the Architect Free Printable Sheet"
    >
      <div
        className="absolute inset-0 no-print"
        onClick={() => setIsPrintableOpen(false)}
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF5EE] rounded-2xl border border-[#E3D5C3] shadow-2xl">
        {/* Top bar */}
        <div className="sticky top-0 z-10 px-6 py-4 bg-[#FFFDF9] border-b border-[#E3D5C3] flex items-center justify-between gap-4 no-print">
          <div>
            <p className="text-xs font-bold text-[#E66B54] uppercase tracking-wider">
              Free Sample Sheet · Month 01
            </p>
            <h2 className="font-display text-xl font-bold text-[#2B231D]">
              Meet the Architect – Floor Plan Activity
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#E66B54] text-white text-sm font-bold hover:bg-[#D55942] cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print A4 Sheet</span>
            </button>
            <button
              type="button"
              onClick={() => setIsPrintableOpen(false)}
              aria-label="Close printable preview"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[#5C4E42] hover:bg-[#EFE2D0] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Sheet Preview Image */}
            <div className="md:col-span-5 rounded-xl overflow-hidden border border-[#E3D5C3] bg-white no-print">
              <img
                src={catalog.images.meetArchitectSheet}
                alt="Meet the Architect sample activity worksheet on kraft desk"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Crisp Printable Interactive Worksheet Layout */}
            <div className="md:col-span-7 bg-white rounded-xl border-2 border-[#E66B54] p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-[#E66B54]/30 pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#E66B54]" />
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#E66B54]">
                      Jotter &amp; Potter · Month 01 Sample
                    </p>
                    <h3 className="font-display text-xl font-extrabold text-[#2B231D]">
                      Meet the Architect: My Dream Home Plan
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#66574A]">Ages 6–12</span>
              </div>

              <p className="text-sm text-[#43372E] leading-relaxed">
                <strong>Your Mission:</strong> Imagine looking straight down into a home with the
                roof lifted off. Ask one person in your family what makes their day peaceful, then
                draw rooms, windows for cross-breeze, and a shaded verandah on the grid below.
              </p>

              {/* Printable Drawing Grid */}
              <div className="h-56 rounded-lg border border-[#E66B54]/50 paper-grid relative p-3 flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-[#9B7149]">
                  1 square = 1 big footstep
                </span>
                <div className="flex items-center justify-between text-[11px] text-[#9B7149] border-t border-dashed border-[#E66B54]/40 pt-1.5">
                  <span>Architect Name: ________________________</span>
                  <span>Client: ___________________</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-[#5C4E42] pt-1">
                <div className="p-2 rounded-lg bg-[#FAF5EE] border border-[#E3D5C3]">
                  <strong className="block text-[#2B231D]">1. Doorway</strong>
                  Leave a wide gap with a curved swing arc.
                </div>
                <div className="p-2 rounded-lg bg-[#FAF5EE] border border-[#E3D5C3]">
                  <strong className="block text-[#2B231D]">2. Breeze</strong>
                  Place windows on two opposite walls.
                </div>
                <div className="p-2 rounded-lg bg-[#FAF5EE] border border-[#E3D5C3]">
                  <strong className="block text-[#2B231D]">3. Verandah</strong>
                  Add a sunny spot for morning tea.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
