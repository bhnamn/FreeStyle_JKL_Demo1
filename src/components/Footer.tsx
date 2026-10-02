import React from 'react';
import { Scissors, MapPin, Phone, Clock, ExternalLink, Globe, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO, SOCIAL_LINKS } from '../data/barberData';
import { useMapLink } from '../utils/mapUtils';

interface FooterProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onLanguageChange,
  onOpenBooking,
}) => {
  const t = translations[lang].footer;
  const nav = translations[lang].nav;
  const mapInfo = useMapLink();

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
    <footer className="bg-[#08090b] text-[#8e94a4] border-t border-[#1b1e26] pt-8 sm:pt-10 pb-10">
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

            {/* Social channels in footer */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold text-[#8e94a4] uppercase tracking-wider mb-2">
                {lang === 'fi' ? 'Viralliset somelinkit' : 'Official Socials'}
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook: Parturi kampaamo Freestyle"
                  className="w-9 h-9 rounded-lg bg-[#161822] border border-[#272b38] hover:border-[#1877F2] text-[#8e94a4] hover:text-[#1877F2] hover:bg-[#1877F2]/10 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram: @freestyle.aziz"
                  className="w-9 h-9 rounded-lg bg-[#161822] border border-[#272b38] hover:border-[#E1306C] text-[#8e94a4] hover:text-[#E1306C] hover:bg-[#E1306C]/10 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok: FreeStyle Barber"
                  className="w-9 h-9 rounded-lg bg-[#161822] border border-[#272b38] hover:border-[#25F4EE] text-[#8e94a4] hover:text-[#25F4EE] hover:bg-[#25F4EE]/10 flex items-center justify-center transition-all duration-200"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.04.87.11V9.4a6.33 6.33 0 0 0-.87-.06A6.34 6.34 0 0 0 3 15.68a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.71a8.21 8.21 0 0 0 4.88 1.6v-3.62h-.98z" />
                  </svg>
                </a>
              </div>
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
                  onClick={() => scrollTo('reviews-section')}
                  className="hover:text-[#c89d56] transition-colors cursor-pointer"
                >
                  {nav.reviews}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('faq-section')}
                  className="hover:text-[#c89d56] transition-colors cursor-pointer"
                >
                  {nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('social-media-section')}
                  className="hover:text-[#c89d56] transition-colors cursor-pointer"
                >
                  {nav.social}
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
              <a
                href={mapInfo.url}
                target={mapInfo.target}
                rel={mapInfo.rel}
                aria-label={lang === 'fi' ? 'Avaa sijaintimme karttasovelluksessa' : 'Open our location in Maps'}
                className="flex items-start gap-2 hover:text-white transition-colors group cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-[#c89d56] group-hover:scale-110 transition-transform shrink-0 mt-0.5" />
                <span className="group-hover:underline underline-offset-2">{SHOP_INFO.fullAddress}</span>
              </a>
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
