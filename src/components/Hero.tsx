import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Star, Calendar, ArrowRight, ExternalLink, Clock, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO, SOCIAL_LINKS } from '../data/barberData';

// Official Facebook Icon
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

// Official Instagram Icon
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

// Official TikTok Icon
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.04.87.11V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.71a8.21 8.21 0 0 0 4.88 1.6v-3.62h-.98z" />
    </svg>
  );
}

const HERO_PHOTO_URL = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80';

interface HeroProps {
  lang: Language;
  onOpenBooking: () => void;
  onScrollToServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenBooking, onScrollToServices }) => {
  const t = translations[lang].hero;

  return (
    <section className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-14 border-b border-[#1b1e26] bg-gradient-to-b from-[#0b0c0e] via-[#101217] to-[#0d0f13]">
      {/* Mobile/Tablet Background Hero Image (hidden on desktop) */}
      <div className="absolute inset-0 lg:hidden overflow-hidden pointer-events-none">
        <img
          src={HERO_PHOTO_URL}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center filter brightness-[0.25] contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0e]/92 via-[#0b0c0e]/85 to-[#0b0c0e]" />
      </div>

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
            {/* Location & Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161822] border border-[#272b38] text-[#c89d56] text-xs font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#c89d56] animate-pulse shrink-0"></span>
              <span>{t.badge}</span>
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

            {/* Social Media Section: Only 3 clickable icons (Facebook, Instagram, TikTok) */}
            <div
              id="social-media-section"
              aria-label="Social Media"
              className="pt-3.5 flex items-center gap-3 max-w-lg"
            >
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#14161f] border border-[#232736] text-[#9da3b2] hover:text-[#1877F2] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10 transition-all duration-200 flex items-center justify-center shadow-sm hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#14161f] border border-[#232736] text-[#9da3b2] hover:text-[#E1306C] hover:border-[#E1306C]/60 hover:bg-[#E1306C]/10 transition-all duration-200 flex items-center justify-center shadow-sm hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#14161f] border border-[#232736] text-[#9da3b2] hover:text-[#25F4EE] hover:border-[#25F4EE]/60 hover:bg-[#25F4EE]/10 transition-all duration-200 flex items-center justify-center shadow-sm hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <TikTokIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

          </motion.div>

          {/* Right Column: Barber Visual & Feature Card (Desktop only, moves to background on mobile/tablet) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="hidden lg:block lg:col-span-5 relative"
          >
            {/* Visual Frame */}
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden border border-[#2b2f3d] bg-[#12141a] shadow-2xl group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={HERO_PHOTO_URL}
                  alt={lang === 'fi' ? 'Parturi-Kampaamo FreeStyle Jyväskylä Kauppakatu 8' : 'FreeStyle Barbershop Jyväskylä Kauppakatu 8'}
                  width="900"
                  height="1125"
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
                      {lang === 'fi' ? 'Missä ammattitaito ja tekniikka kohtaavat tyylin' : 'Where professionalism and technique meet style'}
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

          </motion.div>

        </div>
      </div>
    </section>
  );
};
