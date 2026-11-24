import React, { useState } from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Palette,
  Puzzle,
  Scissors,
  ShieldAlert,
  Hammer,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HowItWorksPage: React.FC = () => {
  const { navigate, showToast } = useStore();
  const [phone, setPhone] = useState('');
  const [optedIn, setOptedIn] = useState(false);

  const handleWhatsappOptIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setOptedIn(true);
    showToast('Subscribed to optional Monday morning WhatsApp parent prompts!');
  };

  return (
    <main className="py-12 lg:py-16 bg-[#FAF5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Intro */}
        <section className="max-w-3xl space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
            How It Works for Parents
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2B231D]">
            A Calm Weekly Rhythm Designed Around Indian Family Life
          </h1>
          <p className="text-base sm:text-lg text-[#5C4E42] leading-relaxed">
            No marathon weekend stress. Each monthly folder breaks naturally into four gentle
            weeks: 3 word-and-colouring card pairs plus 3 mission sheets per week.
          </p>
        </section>

        {/* The Weekly Rhythm */}
        <section className="bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
                4 Weeks · 12 Mission Sheets · 24 Cards
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B231D]">
                The Weekly Rhythm
              </h2>
            </div>
            <span className="text-sm font-bold text-[#66574A]">
              ~15 min weekday cards + ~35 min weekend build
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                week: 'Week 1',
                title: 'Listen & Explore',
                body: 'Unseal the client letter, interview your client, and colour + match Card Pairs 1–3.',
              },
              {
                week: 'Week 2',
                title: 'Measure & Sketch',
                body: 'Observe light, space, or safety outdoors, sketch first plans, and finish Card Pairs 4–6.',
              },
              {
                week: 'Week 3',
                title: 'Cut, Fold & Build',
                body: 'Work side-by-side on sturdy cutting steps, build the 3D prototype, and match Card Pairs 7–9.',
              },
              {
                week: 'Week 4',
                title: 'Test & Present',
                body: 'Improve details, finish Card Pairs 10–12, present to your client, and get your badge signed off!',
              },
            ].map((item) => (
              <div
                key={item.week}
                className="rounded-2xl bg-[#FAF5EE] border border-[#E3D5C3] p-5 space-y-2"
              >
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#E66B54]">
                  {item.week}
                </span>
                <h3 className="font-display text-xl font-bold text-[#2B231D]">{item.title}</h3>
                <p className="text-sm text-[#5C4E42] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Three Ways to Play: Colour, Match, Build */}
        <section className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
              Multisensory Learning
            </p>
            <h2 className="font-display text-3xl font-extrabold text-[#2B231D]">
              Three Ways to Play Every Week
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#FDF1EE] text-[#E66B54] flex items-center justify-center">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#2B231D]">1. Colour</h3>
              <p className="text-sm text-[#5C4E42] leading-relaxed">
                Twelve illustrated picture cards inside the kraft pouch invite relaxed colouring
                sessions—ideal for winding down after school without screens.
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
                <Puzzle className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#2B231D]">2. Match</h3>
              <p className="text-sm text-[#5C4E42] leading-relaxed">
                Pair each picture card with its 12 matching design-vocabulary word cards (like
                &ldquo;Ventilation&rdquo;, &ldquo;Truss&rdquo;, or &ldquo;Chittara&rdquo;) as a
                quick dining-table memory game.
              </p>
            </div>

            <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#EEF8EE] text-[#2E6F40] flex items-center justify-center">
                <Hammer className="w-5 h-5" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#2B231D]">3. Build</h3>
              <p className="text-sm text-[#5C4E42] leading-relaxed">
                Put those ideas to work across 12 Mission Sheets using cardboard, wood sticks,
                fabric, or clay—culminating in a real object built for a real client.
              </p>
            </div>
          </div>
        </section>

        {/* Optional WhatsApp Monday Prompt + Safety & Adult Help */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 kraft-surface rounded-3xl border border-[#D4BC9F] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25894B]">
              <MessageCircle className="w-4 h-4" />
              <span>Optional Parent Nudge</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B231D]">
              The Monday Morning WhatsApp Prompt
            </h2>
            <p className="text-sm text-[#43372E] leading-relaxed">
              Busy weeks happen. Opt in to receive one gentle 2-line message every Monday morning
              telling you which 3 card pairs and 3 mission steps are up next—zero spam, opt out
              anytime.
            </p>

            {/* Sample WhatsApp message preview */}
            <div className="bg-white rounded-2xl border border-[#D4BC9F] p-4 text-xs text-[#2B231D] space-y-1">
              <p className="font-bold text-[#25894B]">Sample Monday Prompt (Week 2):</p>
              <p>
                &ldquo;Good morning! This week in Month 01 (Architect): match Cards 4–6
                (Ventilation, Threshold, Courtyard) and walk around your home to spot where the
                morning breeze enters.&rdquo;
              </p>
            </div>

            {optedIn ? (
              <p className="text-sm font-bold text-[#2E6F40]">
                Saved! You will receive Monday prompts on {phone}.
              </p>
            ) : (
              <form onSubmit={handleWhatsappOptIn} className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#C8B49B] text-sm"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#25894B] text-white text-sm font-bold hover:bg-[#1E723E] cursor-pointer whitespace-nowrap"
                >
                  Enable Monday Prompt
                </button>
              </form>
            )}
          </div>

          {/* Safety & Adult-Help Guidance */}
          <div className="lg:col-span-6 bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B84A39]">
              <ShieldAlert className="w-4 h-4" />
              <span>Safety &amp; Supervision</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B231D]">
              Adult-Help Guidance for Cutting &amp; Ages 6–12
            </h2>
            <ul className="space-y-3 text-sm text-[#43372E]">
              <li className="flex items-start gap-2.5">
                <Scissors className="w-4 h-4 text-[#B84A39] shrink-0 mt-1" />
                <span>
                  <strong>Cutting Support:</strong> Every Mission Sheet marks scissor/cutter steps
                  clearly. While children use blunt-tip scissors on paper, adults should assist
                  with thick corrugated cardboard, pot drainage holes, and needle threading.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0 mt-1" />
                <span>
                  <strong>Ages 6–8 vs Ages 9–12:</strong> Younger makers thrive with parent
                  read-aloud interviews and colouring cards; older kids measure independently in
                  centimetres and lead client presentations.
                </span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('shop')}
                className="px-5 py-2.5 rounded-xl bg-[#2B231D] text-white text-sm font-bold hover:bg-[#43372E] cursor-pointer"
              >
                Explore All 12 Monthly Kits
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
