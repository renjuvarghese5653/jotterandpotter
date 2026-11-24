import React from 'react';
import { ArrowRight, CheckCircle2, HeartHandshake, Leaf, MapPin } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { catalog, navigate } = useStore();

  return (
    <main className="py-12 lg:py-16 bg-[#FAF5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
              Our Story · Designed &amp; Made in India
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2B231D] leading-tight">
              Raising Makers Who Notice, Care &amp; Build
            </h1>
            <p className="text-base text-[#5C4E42] leading-relaxed">
              Jotter &amp; Potter began around a dining table in Bengaluru with a simple worry: why
              were children&rsquo;s craft boxes either flimsy plastic toys or mindless copy-paste
              worksheets?
            </p>
            <p className="text-base text-[#5C4E42] leading-relaxed">
              We created <strong>The Little Designer</strong>—a 12-month hands-on series where
              children step into the shoes of architects, engineers, urban planners, folk artists,
              and storytellers. Every month starts with a real person&rsquo;s need and ends with a
              tangible creation signed off by the client.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-[#DFCBB2] bg-[#EFE2D0]">
              <img
                src={catalog.images.familyCraft}
                alt="Child and grandmother building a cardboard home together"
                referrerPolicy="no-referrer"
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDF1EE] text-[#E66B54] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#2B231D]">
              Rooted in Indian Neighbourhoods
            </h2>
            <p className="text-sm text-[#5C4E42] leading-relaxed">
              From courtyard cross-ventilation and balcony sunbirds to Karnataka&rsquo;s
              Channapatna woodcraft and Chittara grids, kids design for the world outside their
              own window.
            </p>
          </div>

          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF8EE] text-[#2E6F40] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#2B231D]">
              Tactile Kraft Over Plastic Clutter
            </h2>
            <p className="text-sm text-[#5C4E42] leading-relaxed">
              Every kit is printed in India on sturdy unbleached kraft and cream card stock, paired
              with wooden tools, cotton fabric swatches, and household cardboard reuse.
            </p>
          </div>

          <div className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#2B231D]">
              Screen-Free Family Connection
            </h2>
            <p className="text-sm text-[#5C4E42] leading-relaxed">
              Designed for grandparents, parents, siblings, and neighbours to participate as real
              clients—sparking unhurried conversations across generations.
            </p>
          </div>
        </section>

        {/* Made in India Guarantee */}
        <section className="kraft-surface rounded-3xl border border-[#D4BC9F] p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#2B231D]">
              Ready to Start Month 01?
            </h2>
            <p className="text-sm sm:text-base text-[#43372E]">
              Begin with The Little Architect or collect all 12 colour-coded kraft folders across
              the year.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate('shop')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2B231D] text-white text-sm font-bold hover:bg-[#43372E] cursor-pointer"
            >
              <span>Shop All Packs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};
