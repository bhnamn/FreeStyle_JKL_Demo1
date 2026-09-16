import React, { useState } from 'react';
import { Scissors, Globe, BarChart3, Menu, X, Calendar, MapPin, Phone } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO } from '../data/barberData';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenAnalytics: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenBooking,
  onOpenAnalytics,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0c0e]/90 backdrop-blur-md border-b border-[#1f222a] transition-colors">
      {/* Top micro announcement bar */}
      <div className="hidden sm:flex items-center justify-between px-4 sm:px-8 py-1.5 bg-[#12141a] text-xs text-[#a0a4b0] border-b border-[#1a1d24]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#c89d56]" />
            {SHOP_INFO.fullAddress}
          </span>
          <span className="hidden md:inline text-[#323642]">|</span>
          <a
            href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
            className="hidden md:flex items-center gap-1.5 hover:text-[#c89d56] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c89d56]" />
            {SHOP_INFO.phone}
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#22c55e] font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            {lang === 'fi' ? 'Avoinna Ma–Pe 09–18, La 10–14' : 'Open Mon–Fri 09–18, Sat 10–14'}
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
          id="brand-logo-link"
        >
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-[#1a1c24] to-[#121318] border border-[#2b2f3d] flex items-center justify-center text-[#c89d56] shadow-md group-hover:border-[#c89d56]/60 transition-all duration-300">
            <Scissors className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white flex items-center gap-1.5">
              FREESTYLE
              <span className="w-1.5 h-1.5 rounded-full bg-[#c89d56] inline-block"></span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8e93a0] uppercase block font-medium -mt-0.5">
              Jyväskylä • Barbershop
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#b3b7c2]">
          <button
            onClick={() => scrollTo('about-section')}
            className="hover:text-white transition-colors cursor-pointer"
            id="nav-about-btn"
          >
            {t.about}
          </button>
          <button
            onClick={() => scrollTo('services-section')}
            className="hover:text-white transition-colors cursor-pointer"
            id="nav-services-btn"
          >
            {t.services}
          </button>
          <button
            onClick={() => scrollTo('team-section')}
            className="hover:text-white transition-colors cursor-pointer"
            id="nav-team-btn"
          >
            {t.team}
          </button>
          <button
            onClick={() => scrollTo('location-section')}
            className="hover:text-white transition-colors cursor-pointer"
            id="nav-location-btn"
          >
            {t.location}
          </button>
          <button
            onClick={() => scrollTo('reviews-section')}
            className="hover:text-white transition-colors cursor-pointer"
            id="nav-reviews-btn"
          >
            {t.reviews}
          </button>
        </nav>

        {/* Action controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Live Analytics Button */}
          <button
            onClick={onOpenAnalytics}
            id="open-analytics-nav-btn"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#151720] hover:bg-[#1c1f2b] border border-[#272b38] hover:border-[#c89d56]/40 text-xs font-medium text-[#c8cbd5] transition-all cursor-pointer shadow-sm group"
            title={t.analytics}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
            </span>
            <BarChart3 className="w-3.5 h-3.5 text-[#c89d56] group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">{lang === 'fi' ? 'Live Analytiikka' : 'Live Analytics'}</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center p-1 bg-[#151720] border border-[#272b38] rounded-lg">
            <button
              onClick={() => onLanguageChange('fi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                lang === 'fi'
                  ? 'bg-[#c89d56] text-black shadow-sm'
                  : 'text-[#8e93a0] hover:text-white'
              }`}
              id="lang-fi-btn"
            >
              FI
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded transition-all ${
                lang === 'en'
                  ? 'bg-[#c89d56] text-black shadow-sm'
                  : 'text-[#8e93a0] hover:text-white'
              }`}
              id="lang-en-btn"
            >
              EN
            </button>
          </div>

          {/* Book Now primary CTA */}
          <button
            onClick={onOpenBooking}
            id="nav-book-now-cta"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#c89d56] to-[#b88c42] hover:brightness-110 text-[#0b0c0e] font-bold text-sm tracking-wide shadow-lg shadow-[#c89d56]/15 hover:shadow-[#c89d56]/30 transition-all cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>{t.bookNow}</span>
          </button>
        </div>

        {/* Mobile controls & toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Language switch on mobile */}
          <button
            onClick={() => onLanguageChange(lang === 'fi' ? 'en' : 'fi')}
            className="p-2 rounded-lg bg-[#151720] border border-[#272b38] text-xs font-bold text-[#c89d56]"
            id="mobile-lang-toggle"
          >
            {lang === 'fi' ? 'EN' : 'FI'}
          </button>

          <button
            onClick={onOpenAnalytics}
            className="p-2 rounded-lg bg-[#151720] border border-[#272b38] text-[#c89d56]"
            id="mobile-analytics-btn"
          >
            <BarChart3 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg bg-[#151720] border border-[#272b38] text-white"
            aria-label="Toggle menu"
            id="mobile-menu-toggle-btn"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0e1014] border-b border-[#252830] px-5 pt-3 pb-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3 pt-2 text-sm font-medium">
            <button
              onClick={() => scrollTo('about-section')}
              className="text-left py-2 px-3 rounded-md text-[#dcdfe6] hover:bg-[#181a22]"
            >
              {t.about}
            </button>
            <button
              onClick={() => scrollTo('services-section')}
              className="text-left py-2 px-3 rounded-md text-[#dcdfe6] hover:bg-[#181a22]"
            >
              {t.services}
            </button>
            <button
              onClick={() => scrollTo('team-section')}
              className="text-left py-2 px-3 rounded-md text-[#dcdfe6] hover:bg-[#181a22]"
            >
              {t.team}
            </button>
            <button
              onClick={() => scrollTo('location-section')}
              className="text-left py-2 px-3 rounded-md text-[#dcdfe6] hover:bg-[#181a22]"
            >
              {t.location}
            </button>
            <button
              onClick={() => scrollTo('reviews-section')}
              className="text-left py-2 px-3 rounded-md text-[#dcdfe6] hover:bg-[#181a22]"
            >
              {t.reviews}
            </button>
          </div>

          <div className="pt-2 border-t border-[#1f222a] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c89d56] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar className="w-4 h-4" />
              {t.bookNow}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAnalytics();
              }}
              className="w-full py-2.5 rounded-lg bg-[#151720] border border-[#272b38] text-[#c89d56] text-xs font-semibold flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              {t.analytics}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
