import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Scissors, Sparkles, ExternalLink, ArrowRight, Check } from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { translations } from '../data/translations';
import { SERVICES, SHOP_INFO } from '../data/barberData';

interface ServicesSectionProps {
  lang: Language;
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'hair' | 'beard' | 'combo' | 'special'>('all');
  const t = translations[lang].services;

  const filteredServices = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeTab);

  const tabs = [
    { id: 'all', label: t.allTab },
    { id: 'hair', label: t.hairTab },
    { id: 'beard', label: t.beardTab },
    { id: 'combo', label: t.comboTab },
    { id: 'special', label: t.specialTab },
  ] as const;

  return (
    <section id="services-section" className="py-20 sm:py-28 bg-[#0e1015] border-b border-[#1b1e26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-[0.2em] mb-3">
              <span className="w-5 h-[1px] bg-[#c89d56]"></span>
              {t.tag}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              {t.title}
            </h2>
            <p className="text-[#8e94a4] text-sm sm:text-base mt-3 max-w-xl">
              {t.subtitle}
            </p>
          </div>

          {/* Direct link to Aika24 */}
          <div className="shrink-0">
            <a
              href={SHOP_INFO.aika24BookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#161822] hover:bg-[#1f2230] border border-[#272b38] text-xs font-medium text-[#c8cbd5] hover:text-[#c89d56] transition-colors shadow-sm group"
            >
              <span>{t.aika24Notice}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#c89d56] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#c89d56] text-black shadow-lg shadow-[#c89d56]/20'
                  : 'bg-[#14161f] text-[#8e93a0] hover:text-white border border-[#232734] hover:border-[#2f3545]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={`relative flex flex-col justify-between p-6 rounded-2xl bg-[#13151c] border transition-all group ${
                  service.popular
                    ? 'border-[#c89d56]/40 shadow-lg shadow-[#c89d56]/5'
                    : 'border-[#222532] hover:border-[#353b4d]'
                }`}
              >
                {/* Popular Pill */}
                {service.popular && (
                  <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#c89d56] text-black text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    {t.popularBadge}
                  </div>
                )}

                <div>
                  {/* Top row: Name and Price */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#c89d56] transition-colors leading-snug">
                      {lang === 'fi' ? service.nameFi : service.nameEn}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="font-display text-xl font-bold text-[#c89d56]">
                        {service.price}€
                      </span>
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="flex items-center gap-1.5 text-xs text-[#7e8494] mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#a0a5b4]" />
                    <span>{service.durationMinutes} {t.durationSuffix}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#9aa0b0] leading-relaxed line-clamp-3">
                    {lang === 'fi' ? service.descFi : service.descEn}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="pt-6 mt-4 border-t border-[#1d202b] flex items-center justify-between">
                  <span className="text-[11px] text-[#6b7280]">
                    {lang === 'fi' ? 'Sis. pesu & muotoilu' : 'Includes wash & styling'}
                  </span>
                  <button
                    onClick={() => onSelectService(service)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1b1e2a] hover:bg-[#c89d56] text-[#c89d56] hover:text-black font-semibold text-xs transition-all cursor-pointer shadow-sm group-hover:bg-[#c89d56] group-hover:text-black"
                  >
                    <span>{t.bookBtn}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
