import React from 'react';
import { Scissors, MapPin, Phone, Clock, ExternalLink, Globe, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO } from '../data/barberData';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
  onOpenAnalytics: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onOpenBooking,
  onOpenAnalytics,
}) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  const scrollTo = (id: string) => {
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
    <footer className="bg-[#08090b] text-[#8e94a4] border-t border-[#1b1e26] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#181b24]">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#161822] border border-[#272b38] flex items-center justify-center text-[#c89d56]">
                <Scissors className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                FREESTYLE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#828898] leading-relaxed max-w-sm">
              {t.tagline}
            </p>
            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={() => onLanguageChange('fi')}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  lang === 'fi' ? 'bg-[#c89d56] text-black font-bold' : 'bg-[#151722] text-[#828898] hover:text-white'
                }`}
              >
                Suomi (FI)
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  lang === 'en' ? 'bg-[#c89d56] text-black font-bold' : 'bg-[#151722] text-[#828898] hover:text-white'
                }`}
              >
                English (EN)
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">
              {t.linksHeader}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('about-section')}
                  className="hover:text-[#c89d56] transition-colors cursor-pointer"
                >
                  {nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services-section')}
                  className="hover:text-[#c89d56] transition-colors cursor-pointer"
                >
                  {nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('team-section')}
                  className="hover:text-[#c89d56] transition-colors cursor-pointer"
                >
                  {nav.team}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('location-section')}
                  className="hover:text-[#c89d56] transition-colors cursor-pointer"
                >
                  {nav.location}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAnalytics}
                  className="text-[#c89d56] font-semibold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>{nav.analytics}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                </button>
              </li>
            </ul>
          </div>

          {/* Address & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">
              {t.addressHeader}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c89d56] shrink-0 mt-0.5" />
                <span>{SHOP_INFO.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c89d56] shrink-0" />
                <a href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {SHOP_INFO.phone}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={SHOP_INFO.aika24BookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#c89d56] hover:underline text-xs"
                >
                  <span>Aika24 Ajanvarausjärjestelmä</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-white">
              {t.hoursHeader}
            </h4>
            <div className="space-y-1.5 text-xs text-[#a0a5b4]">
              <div className="flex justify-between">
                <span>Ma – Pe:</span>
                <span className="text-white font-medium">09:00 – 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Lauantai:</span>
                <span className="text-white font-medium">10:00 – 14:00</span>
              </div>
              <div className="flex justify-between">
                <span>Sunnuntai:</span>
                <span className="italic">{lang === 'fi' ? 'Sopimuksen mukaan' : 'By appointment'}</span>
              </div>
              <div className="pt-3">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-xl bg-[#c89d56] hover:bg-[#d4af37] text-black font-bold text-xs transition-colors cursor-pointer shadow-md"
                >
                  {nav.bookNow}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#5e6371] gap-4">
          <div>
            © {new Date().getFullYear()} {SHOP_INFO.name}. {t.rights}
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SHOP_INFO.aika24CompanyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c89d56] transition-colors"
            >
              Aika24.fi/yritys/FreeStyle
            </a>
            <span>•</span>
            <span className="text-[#8e94a4]">{SHOP_INFO.fullAddress}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
