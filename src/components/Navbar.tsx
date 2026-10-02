import React, { useState } from 'react';
import { Menu, X, Calendar, MapPin, Phone } from 'lucide-react';
import freestyleLogo from '../assets/images/freestyle_barber_logo_1790579001841.jpg';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO } from '../data/barberData';
import { useMapLink } from '../utils/mapUtils';

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang].nav;
  const mapInfo = useMapLink();

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
      <div className="flex items-center justify-between px-3 sm:px-8 py-1.5 bg-[#12141a] text-xs text-[#a0a4b0] border-b border-[#1a1d24]">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <a
            href={mapInfo.url}
            target={mapInfo.target}
            rel={mapInfo.rel}
            aria-label={t.openInMapsAria || (lang === 'fi' ? 'Avaa sijaintimme karttasovelluksessa' : 'Open our location in Maps')}
            id="header-location-link"
            className="group/loc inline-flex items-center gap-1.5 text-[#a0a4b0] hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c89d56] active:scale-[0.98] active:text-[#c89d56] transition-all cursor-pointer truncate rounded-sm py-0.5 select-none"
          >
            <MapPin className="w-3.5 h-3.5 text-[#c89d56] group-hover/loc:text-[#e5ba73] group-hover/loc:scale-110 group-active/loc:scale-95 transition-transform shrink-0" />
            <span className="border-b border-transparent group-hover/loc:border-[#c89d56]/70 transition-colors truncate">
              {SHOP_INFO.fullAddress}
            </span>
          </a>
          <span className="hidden md:inline text-[#323642]">|</span>
          <a
            href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
            className="hidden md:flex items-center gap-1.5 hover:text-[#c89d56] active:text-[#e5ba73] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#c89d56] shrink-0" />
            <span>{SHOP_INFO.phone}</span>
          </a>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 text-[#22c55e] font-medium text-[11px] sm:text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
            </span>
            <span className="hidden xs:inline">{lang === 'fi' ? 'Avoinna Ma–Pe 09–18, La 10–14' : 'Open Mon–Fri 09–18, Sat 10–14'}</span>
            <span className="xs:hidden">{lang === 'fi' ? 'Avoinna 09–18' : 'Open 09–18'}</span>
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
          <div className="w-11 h-11 rounded-lg bg-[#14161f] border border-[#2b2f3d] flex items-center justify-center overflow-hidden shadow-md group-hover:border-[#c89d56]/60 transition-all duration-300 shrink-0">
            <img
              src={freestyleLogo}
              alt="Parturi-Kampaamo FreeStyle Jyväskylä logo"
              width="44"
              height="44"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white flex items-center gap-1.5">
              FREESTYLE
              <span className="w-1.5 h-1.5 rounded-full bg-[#c89d56] inline-block"></span>
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#8e93a0] uppercase block font-medium -mt-0.5">
              Jyväskylä • Parturi-Kampaamo
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#b3b7c2]">
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
          <button
            onClick={() => scrollTo('faq-section')}
            className="hover:text-white transition-colors cursor-pointer"
            id="nav-faq-btn"
          >
            {t.faq}
          </button>
          <button
            onClick={() => scrollTo('social-media-section')}
            className="hover:text-white transition-colors cursor-pointer"
            id="nav-social-btn"
          >
            {t.social}
          </button>
        </nav>

        {/* Action controls */}
        <div className="hidden sm:flex items-center gap-3">
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
            <button
              onClick={() => scrollTo('faq-section')}
              className="text-left py-2 px-3 rounded-md text-[#dcdfe6] hover:bg-[#181a22]"
            >
              {t.faq}
            </button>
            <button
              onClick={() => scrollTo('social-media-section')}
              className="text-left py-2 px-3 rounded-md text-[#dcdfe6] hover:bg-[#181a22]"
            >
              {t.social}
            </button>
          </div>

          <div className="pt-2 border-t border-[#1f222a] space-y-2">
            <a
              href={mapInfo.url}
              target={mapInfo.target}
              rel={mapInfo.rel}
              aria-label={t.openInMapsAria || (lang === 'fi' ? 'Avaa sijaintimme karttasovelluksessa' : 'Open our location in Maps')}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 px-3 rounded-lg bg-[#151720] border border-[#272b38] text-xs text-[#a0a4b0] hover:text-white active:bg-[#1d202c] active:scale-[0.99] flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-[#c89d56] shrink-0" />
                <span className="truncate">{SHOP_INFO.fullAddress}</span>
              </div>
              <span className="text-[10px] text-[#c89d56] font-semibold shrink-0 uppercase tracking-wider pl-2">
                {mapInfo.provider === 'apple' ? 'Apple Maps' : 'Google Maps'}
              </span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#c89d56] text-black font-bold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98 transition-all"
            >
              <Calendar className="w-4 h-4" />
              {t.bookNow}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
