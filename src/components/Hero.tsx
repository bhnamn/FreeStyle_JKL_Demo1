import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Star, Calendar, ArrowRight, ExternalLink, Clock, MapPin, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO } from '../data/barberData';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
  onScrollToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking, onScrollToServices }) => {
  const t = translations[lang].hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-[#1b1e26] bg-gradient-to-b from-[#0b0c0e] via-[#101217] to-[#0d0f13]">
      {/* Background aesthetic glow & subtle radial accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c89d56]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -top-40 right-[-10%] w-[500px] h-[500px] bg-[#3b4252]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Decorative Barber Pole Line accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c89d56] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-7"
          >
            {/* Top Location & Quality Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#161820] border border-[#272b38] text-xs font-medium text-[#c89d56] shadow-inner">
              <MapPin className="w-3.5 h-3.5 text-[#c89d56]" />
              <span className="tracking-wide">{t.badge}</span>
              <span className="w-1 h-1 rounded-full bg-[#c89d56]/50"></span>
              <span className="text-[#a5abb8]">Jyväskylä</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                <span className="block">{t.titleLine1}</span>
                <span className="bg-gradient-to-r from-[#e5a93c] via-[#d4af37] to-[#f3cb6d] bg-clip-text text-transparent">
                  {t.titleLine2}
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[#a5abb8] text-base sm:text-lg max-w-2xl leading-relaxed font-normal">
              {t.description}
            </p>

            {/* Quick Status / Rating Bar */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs sm:text-sm text-[#8f94a3]">
              <div className="flex items-center gap-1.5 bg-[#14161e] px-3 py-1.5 rounded-md border border-[#222530]">
                <div className="flex text-[#f59e0b]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#f59e0b]" />
                  ))}
                </div>
                <span className="font-bold text-white ml-1">{SHOP_INFO.rating}</span>
                <span className="text-[#6d7280]">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#14161e] px-3 py-1.5 rounded-md border border-[#222530]">
                <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
                <span className="text-[#c8cbd5] font-medium">{t.walkinsPill}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                id="hero-book-primary-btn"
                className="group flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c89d56] to-[#b88c42] hover:brightness-110 text-black font-bold text-base shadow-xl shadow-[#c89d56]/20 transition-all cursor-pointer active:scale-98"
              >
                <Calendar className="w-5 h-5 text-black" />
                <span>{t.ctaBook}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onScrollToServices}
                id="hero-view-services-btn"
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#151720] hover:bg-[#1a1d28] border border-[#2a2e3d] text-white font-semibold text-sm transition-all cursor-pointer hover:border-[#c89d56]/50"
              >
                <span>{t.ctaServices}</span>
              </button>

              <a
                href={SHOP_INFO.aika24BookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-aika24-link"
                className="flex items-center justify-center gap-1.5 px-4 py-4 rounded-xl text-xs font-medium text-[#9da3b2] hover:text-[#c89d56] transition-colors border border-dashed border-[#252834] hover:border-[#c89d56]/40"
                title="Aika24.fi ajanvarausjärjestelmä"
              >
                <span>{t.ctaAika24}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Key highlights row */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#1a1d26] max-w-lg">
              <div>
                <div className="font-display text-2xl font-bold text-white">12+</div>
                <div className="text-xs text-[#7e8392] mt-0.5">{lang === 'fi' ? 'Vuotta Kokemusta' : 'Years Experience'}</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[#c89d56]">30€</div>
                <div className="text-xs text-[#7e8392] mt-0.5">{lang === 'fi' ? 'Leikkaus alk.' : 'Haircut from'}</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white">4.9★</div>
                <div className="text-xs text-[#7e8392] mt-0.5">{lang === 'fi' ? 'Yli 380 Arviota' : '380+ Google Reviews'}</div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Barber Visual & Feature Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-[#2b2f3d] bg-[#12141a] shadow-2xl group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80"
                  alt="FreeStyle Barbershop Interior & Craft"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90 contrast-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/30 to-transparent"></div>
              </div>

              {/* Floating Barber badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b0c0e]/80 backdrop-blur-md border border-[#2b2f3d] text-xs font-semibold text-white">
                <Scissors className="w-3.5 h-3.5 text-[#c89d56]" />
                <span>Master Barber Aziz Gholami</span>
              </div>

              {/* Bottom Card Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#0b0c0e] to-[#0b0c0e]/85 backdrop-blur-sm border-t border-[#1f222a]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-[#c89d56] font-semibold tracking-wider uppercase">
                      <Sparkles className="w-3 h-3" />
                      {lang === 'fi' ? 'Kauppakatu 8 • Jyväskylä' : 'Kauppakatu 8 • Jyväskylä'}
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {lang === 'fi' ? 'Tarkat saksityöt, fadet & parranajot' : 'Precision fades, cuts & hot towel shaves'}
                    </div>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="p-3 rounded-xl bg-[#c89d56] text-black hover:bg-[#d4af37] transition-all cursor-pointer font-bold shadow-md hover:scale-105 active:scale-95"
                    title={t.ctaBook}
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Quick Card: Today's Availability */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3 p-3.5 rounded-xl bg-[#14161f]/95 border border-[#2c303f] backdrop-blur-md shadow-xl text-xs max-w-xs">
              <div className="w-9 h-9 rounded-lg bg-[#1f2330] flex items-center justify-center text-[#22c55e] shrink-0 font-bold">
                ✓
              </div>
              <div>
                <p className="font-semibold text-white">
                  {lang === 'fi' ? 'Aikoja vapaana tälle viikolle' : 'Slots available this week'}
                </p>
                <p className="text-[#8e93a0] mt-0.5">
                  {lang === 'fi' ? 'Varaa verkossa tai soita 040 962 4311' : 'Book online or call 040 962 4311'}
                </p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
