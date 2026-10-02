import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scissors,
  Droplets,
  Palette,
  Sparkles,
  Crown,
  Waves,
  Eye,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { translations } from '../data/translations';
import { SERVICE_CATEGORIES, SHOP_INFO } from '../data/barberData';

interface ServicesSectionProps {
  lang: Language;
  onSelectService?: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ lang, onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const t = translations[lang].services;

  const getCategoryIcon = (iconName: string, active?: boolean) => {
    const props = { className: `w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${active ? 'text-black' : 'text-[#c89d56]'}` };
    switch (iconName) {
      case 'Scissors':
        return <Scissors {...props} />;
      case 'Droplets':
        return <Droplets {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Crown':
        return <Crown {...props} />;
      case 'Waves':
        return <Waves {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      default:
        return <Scissors {...props} />;
    }
  };

  const displayedCategories =
    activeCategory === 'all'
      ? SERVICE_CATEGORIES
      : SERVICE_CATEGORIES.filter((c) => c.id === activeCategory);

  return (
    <section id="services-section" className="py-10 sm:py-14 bg-[#0e1015] border-b border-[#1b1e26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-[1px] bg-[#c89d56]"></span>
            {t.tag}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-[#8e94a4] text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Category Navigation Pills - Responsive Grid (3x3 on mobile/tablet, 1x9 on wide desktop) */}
        <div className="w-full max-w-4xl xl:max-w-7xl mx-auto mb-10">
          <div className="grid grid-cols-3 xl:grid-cols-9 gap-1.5 sm:gap-2.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex items-center justify-center px-2 sm:px-3.5 py-2.5 rounded-xl text-center font-semibold transition-all cursor-pointer select-none min-h-[44px] ${
                activeCategory === 'all'
                  ? 'bg-[#c89d56] text-black shadow-lg shadow-[#c89d56]/20'
                  : 'bg-[#14161f] text-[#8e93a0] hover:text-white border border-[#232734] hover:border-[#2f3545]'
              }`}
            >
              <span className="text-[11px] xs:text-xs sm:text-xs xl:text-xs 2xl:text-sm leading-tight text-center">
                {t.allTab}
              </span>
            </button>
            {SERVICE_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-2.5 rounded-xl text-center font-semibold transition-all cursor-pointer select-none min-h-[44px] ${
                    isActive
                      ? 'bg-[#c89d56] text-black shadow-lg shadow-[#c89d56]/20'
                      : 'bg-[#14161f] text-[#8e93a0] hover:text-white border border-[#232734] hover:border-[#2f3545]'
                  }`}
                >
                  <span className="shrink-0">
                    {getCategoryIcon(cat.icon, isActive)}
                  </span>
                  <span className="text-[11px] xs:text-xs sm:text-xs xl:text-xs 2xl:text-sm leading-tight text-center">
                    {lang === 'fi' ? cat.nameFi : cat.nameEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories and Services List */}
        <div className="space-y-12">
          {displayedCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#1e222e]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#181a24] border border-[#262b3a] flex items-center justify-center">
                    {getCategoryIcon(category.icon)}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {lang === 'fi' ? category.nameFi : category.nameEn}
                    </h3>
                  </div>
                </div>
                <span className="text-xs text-[#717786] font-medium">
                  {category.services.length} {lang === 'fi' ? 'palvelua' : 'services'}
                </span>
              </div>

              {/* Service Cards Grid for this Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {category.services.map((service) => (
                  <a
                    key={service.id}
                    href={service.aika24Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (onSelectService) {
                        onSelectService(service);
                      }
                    }}
                    className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-[#13151c] hover:bg-[#161822] border transition-all duration-300 shadow-sm cursor-pointer ${
                      service.popular
                        ? 'border-[#c89d56]/40 hover:border-[#c89d56] shadow-md shadow-[#c89d56]/5'
                        : 'border-[#212430] hover:border-[#c89d56]/60'
                    }`}
                  >
                    {/* Top Row: Service Name & Price */}
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-[#c89d56] transition-colors leading-snug">
                          {lang === 'fi' ? service.nameFi : service.nameEn}
                        </h4>
                        <div className="text-right shrink-0">
                          <span className="font-display text-base sm:text-lg font-bold text-[#c89d56] group-hover:scale-105 inline-block transition-transform">
                            {service.priceDisplay}
                          </span>
                        </div>
                      </div>

                      {/* Service description subtitle */}
                      <p className="text-xs text-[#7d8394] truncate" title={lang === 'fi' ? service.descFi : service.descEn}>
                        {(lang === 'fi' ? service.descFi : service.descEn) || (lang === 'fi' ? category.nameFi : category.nameEn)}
                      </p>
                    </div>

                    {/* Bottom CTA Row */}
                    <div className="pt-4 mt-4 border-t border-[#1e222e] flex items-center justify-between">
                      <span className="text-[11px] text-[#63697a] group-hover:text-[#8e94a5] transition-colors">
                        {lang === 'fi' ? 'Suora ajanvaraus' : 'Direct booking'}
                      </span>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1b1e2a] group-hover:bg-[#c89d56] text-[#c89d56] group-hover:text-black font-semibold text-xs transition-all shadow-sm">
                        <span>{t.bookBtn}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-14 p-5 rounded-2xl bg-[#13151c] border border-[#212430] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-sm font-semibold text-white">
              {lang === 'fi' ? 'Etkö löytänyt sopivaa aikaa tai haluatko kysyä erikoistyöstä?' : 'Need a custom appointment or have special requests?'}
            </p>
            <p className="text-xs text-[#828898] mt-1">
              {lang === 'fi'
                ? 'Soita suoraan parturiin tai vieraile liikkeessämme Kauppakatu 8:ssa.'
                : 'Call us directly or stop by our salon at Kauppakatu 8.'}
            </p>
          </div>
          <a
            href={`tel:${SHOP_INFO.internationalPhone.replace(/\s+/g, '')}`}
            className="shrink-0 px-4 py-2.5 rounded-xl bg-[#1a1d28] hover:bg-[#c89d56] text-white hover:text-black text-xs font-semibold border border-[#2a2e3d] hover:border-[#c89d56] transition-all"
          >
            {SHOP_INFO.phone}
          </a>
        </div>

      </div>
    </section>
  );
};
