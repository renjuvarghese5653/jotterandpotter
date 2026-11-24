import React, { useState } from 'react';
import { ChevronDown, Mail, MessageCircle, Send } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { catalog, showToast } = useStore();
  const [openFaq, setOpenFaq] = useState<string | null>(catalog.faqs[0]?.id ?? null);
  const [faqCategory, setFaqCategory] = useState<string>('All');
  const [sent, setSent] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Shipping & Combos',
    message: '',
  });

  const categories = ['All', 'Shipping', 'Returns', 'Age & Safety', 'Packs & Combos'];

  const visibleFaqs =
    faqCategory === 'All'
      ? catalog.faqs
      : catalog.faqs.filter((f) => f.category === faqCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Message received! Our Bengaluru team replies within 1 business day.');
  };

  return (
    <main className="py-12 lg:py-16 bg-[#FAF5EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="max-w-2xl space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#9B5139]">
            Studio Support &amp; Answers
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-[#2B231D]">
            Contact Us &amp; Parent FAQs
          </h1>
          <p className="text-base text-[#5C4E42]">
            Questions on age suitability, bulk school gifting, returns, or pan-India shipping?
            Reach us directly or browse answers below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form & WhatsApp Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="kraft-surface rounded-3xl border border-[#D4BC9F] p-6 space-y-4">
              <h2 className="font-display text-xl font-bold text-[#2B231D]">
                Quick WhatsApp Support
              </h2>
              <p className="text-sm text-[#43372E]">
                Message our studio desk in Bengaluru for order tracking, missing parts, or age
                recommendations (Mon–Sat, 10 AM – 6 PM IST).
              </p>
              <a
                href="https://wa.me/919845012345"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25894B] text-white text-sm font-bold hover:bg-[#1E723E]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({catalog.brand.whatsappNumber})</span>
              </a>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#5A422B] pt-1">
                <Mail className="w-4 h-4" />
                <span>{catalog.brand.supportEmail}</span>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-[#FFFDF9] rounded-3xl border border-[#E3D5C3] p-6 space-y-4"
            >
              <h2 className="font-display text-2xl font-bold text-[#2B231D]">
                Send Us a Note
              </h2>

              {sent ? (
                <div className="p-4 rounded-2xl bg-[#EEF8EE] border border-[#2E6F40]/30 text-sm text-[#2E6F40] font-semibold">
                  Thank you, {formState.name}! Our team will reply to {formState.email} shortly.
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                  />
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Email address"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                  />
                  <select
                    value={formState.topic}
                    onChange={(e) => setFormState({ ...formState, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                  >
                    <option>Shipping &amp; Combos</option>
                    <option>Age 6–12 Suitability</option>
                    <option>Returns &amp; Replacement Parts</option>
                    <option>Birthday / School Bulk Orders</option>
                  </select>
                  <textarea
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D4BC9F] text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#2B231D] text-white text-sm font-bold hover:bg-[#43372E] inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Categorized FAQs */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFaqCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    faqCategory === cat
                      ? 'bg-[#2B231D] text-white'
                      : 'bg-[#FFFDF9] border border-[#E3D5C3] text-[#5C4E42] hover:bg-[#EFE2D0]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {visibleFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-[#FFFDF9] rounded-2xl border border-[#E3D5C3] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#9B5139]">
                          {faq.category}
                        </span>
                        <h3 className="font-display text-lg font-bold text-[#2B231D]">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-[#66574A] shrink-0 transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-[#43372E] leading-relaxed border-t border-[#EFE2D0] pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
