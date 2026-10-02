import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Calendar, Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO } from '../data/barberData';

interface FAQSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section id="faq-section" className="py-10 sm:py-14 bg-[#0b0c0e] border-b border-[#1b1e26] relative">
      {/* Schema.org FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-[1px] bg-[#c89d56]"></span>
            {t.tag}
            <span className="w-5 h-[1px] bg-[#c89d56]"></span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-[#8e94a4] text-sm sm:text-base mt-3 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-[#14161f] border-[#c89d56]/50 shadow-md shadow-[#c89d56]/5'
                    : 'bg-[#101217] border-[#222533] hover:border-[#2f3547]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 cursor-pointer select-none group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="w-6 h-6 rounded-full bg-[#1b1e28] border border-[#2b3040] text-[#c89d56] text-xs font-bold flex items-center justify-center shrink-0 group-hover:border-[#c89d56]/50 transition-colors">
                      {idx + 1}
                    </span>
                    <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-[#c89d56] transition-colors leading-snug">
                      {item.q}
                    </h3>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#c89d56] text-black' : 'bg-[#181a24] text-[#8e93a0] group-hover:text-white'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    isOpen ? 'pb-5 opacity-100 max-h-96' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <div className="pt-2 border-t border-[#1c202d] text-[#c0c5d2] text-sm leading-relaxed">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Help / Booking prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-[#12141a] border border-[#222533] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#181a24] border border-[#272b38] flex items-center justify-center text-[#c89d56] shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">
                {lang === 'fi' ? 'Haluatko varata ajan suoraan?' : 'Ready to book your appointment?'}
              </p>
              <p className="text-xs text-[#8e93a0] mt-0.5">
                {lang === 'fi' ? 'Ajanvaraus vahvistetaan heti Aika24:ssä ilman välikäsiä.' : 'Instant real-time booking directly on Aika24.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
              className="px-4 py-2 rounded-xl bg-[#181a24] hover:bg-[#202330] border border-[#282d3c] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#c89d56]" />
              <span>{SHOP_INFO.phone}</span>
            </a>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl bg-[#c89d56] hover:bg-[#d4af37] text-black text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{lang === 'fi' ? 'Varaa Aika' : 'Book Now'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
