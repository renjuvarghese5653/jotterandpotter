import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { navigate, catalog } = useStore();

  return (
    <footer className="bg-[#2B231D] text-[#EFE2D0] border-t border-[#43372E] no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand column */}
          <div className="md:col-span-4 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-[#FAF5EE]">
              Jotter &amp; Potter
            </h2>
            <p className="text-sm text-[#D7C7B4] leading-relaxed max-w-sm">
              {catalog.brand.tagline} Hands-on, screen-free 12-month design learning kits crafted
              in India for curious thinkers aged 6 to 12.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-[#E8D7C3]">
              <span className="inline-flex items-center gap-1.5 border border-[#5B4B3E] rounded-lg px-3 py-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#E66B54]" />
                Designed &amp; Made in India
              </span>
              <span className="text-[#B8A795]">FSC Kraft Paper &amp; Non-Toxic Inks</span>
            </div>
          </div>

          {/* Shop & Collections */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-base font-bold text-[#FAF5EE]">Explore</h3>
            <ul className="space-y-2 text-sm text-[#D7C7B4]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All 12 Monthly Packs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('combos')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Explorer, Designer &amp; Master Combos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works for Parents
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('resources')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Free Printable Sheets &amp; Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Policies & Support */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display text-base font-bold text-[#FAF5EE]">Parents &amp; Policies</h3>
            <ul className="space-y-2 text-sm text-[#D7C7B4]">
              <li>
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Our Story &amp; Craft Roots
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shipping Across India &amp; Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Age Suitability &amp; Safety Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate('checkout')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Your Bag &amp; Checkout
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-display text-base font-bold text-[#FAF5EE]">Studio Desk</h3>
            <div className="space-y-2 text-sm text-[#D7C7B4]">
              <a
                href={`mailto:${catalog.brand.supportEmail}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0 text-[#E66B54]" />
                <span className="truncate">{catalog.brand.supportEmail}</span>
              </a>
              <a
                href="https://wa.me/919845012345"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0 text-[#4CAF50]" />
                <span>{catalog.brand.whatsappNumber}</span>
              </a>
              <p className="text-xs text-[#B8A795] pt-1">
                Bengaluru, Karnataka · Mon–Sat, 10 AM – 6 PM IST
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#43372E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#B8A795]">
          <p>© {new Date().getFullYear()} Jotter &amp; Potter India. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="hover:text-[#FAF5EE] cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="hover:text-[#FAF5EE] cursor-pointer"
            >
              Shipping &amp; Returns
            </button>
            <button
              type="button"
              onClick={() => navigate('contact')}
              className="hover:text-[#FAF5EE] cursor-pointer"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
