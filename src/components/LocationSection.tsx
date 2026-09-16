import React, { useMemo } from 'react';
import { MapPin, Phone, Clock, ExternalLink, Navigation, CheckCircle, Calendar } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { SHOP_INFO } from '../data/barberData';

interface LocationSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang].location;

  // Check if currently open according to Finland time
  const isOpenNow = useMemo(() => {
    try {
      const now = new Date();
      // Get hour and day in Helsinki timezone
      const helsinkiTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Helsinki',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'short',
      }).formatToParts(now);

      const hourPart = helsinkiTime.find((p) => p.type === 'hour')?.value;
      const dayPart = helsinkiTime.find((p) => p.type === 'weekday')?.value;

      if (!hourPart || !dayPart) return false;
      const hour = parseInt(hourPart, 10);

      // Mon-Fri: 9-18
      if (['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(dayPart)) {
        return hour >= 9 && hour < 18;
      }
      // Sat: 10-14
      if (dayPart === 'Sat') {
        return hour >= 10 && hour < 14;
      }
      return false;
    } catch {
      return true;
    }
  }, []);

  return (
    <section id="location-section" className="py-20 sm:py-28 bg-[#0e1015] border-b border-[#1b1e26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-[1px] bg-[#c89d56]"></span>
            {t.tag}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-[#8e94a4] text-sm sm:text-base mt-3">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact & Hours Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 p-7 rounded-2xl bg-[#12141a] border border-[#222533] shadow-xl">
            
            {/* Live Open Status Ribbon */}
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#181b24] border border-[#292d3b]">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isOpenNow ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
                    }`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isOpenNow ? 'bg-[#22c55e]' : 'bg-[#ef4444]'
                    }`}
                  ></span>
                </span>
                <span
                  className={`font-bold text-xs tracking-wider uppercase ${
                    isOpenNow ? 'text-[#22c55e]' : 'text-[#f87171]'
                  }`}
                >
                  {isOpenNow ? t.openNow : t.closedNow}
                </span>
              </div>
              <span className="text-xs text-[#8e93a0]">Jyväskylä, Finland</span>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-wider">
                <MapPin className="w-4 h-4 text-[#c89d56]" />
                <span>{t.addressTitle}</span>
              </div>
              <p className="text-lg font-bold text-white pl-6">{t.addressVal}</p>
              <p className="text-xs text-[#828898] pl-6">{t.parkingInfo}</p>
            </div>

            {/* Phone */}
            <div className="space-y-1.5 border-t border-[#1c1f2a] pt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-wider">
                <Phone className="w-4 h-4 text-[#c89d56]" />
                <span>{t.phoneTitle}</span>
              </div>
              <div className="pl-6 flex items-center justify-between">
                <a
                  href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-lg font-bold text-white hover:text-[#c89d56] transition-colors"
                >
                  {t.phoneVal}
                </a>
                <a
                  href={`tel:${SHOP_INFO.phone.replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-[#1a1d28] hover:bg-[#c89d56] text-[#c89d56] hover:text-black text-xs font-bold transition-all"
                >
                  {t.callNow}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="space-y-2 border-t border-[#1c1f2a] pt-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-wider">
                <Clock className="w-4 h-4 text-[#c89d56]" />
                <span>{t.hoursTitle}</span>
              </div>
              <div className="pl-6 space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-[#d6dae5]">
                  <span>Ma – Pe (Mon – Fri)</span>
                  <span className="font-semibold text-white">09:00 – 18:00</span>
                </div>
                <div className="flex items-center justify-between text-[#d6dae5]">
                  <span>La (Saturday)</span>
                  <span className="font-semibold text-white">10:00 – 14:00</span>
                </div>
                <div className="flex items-center justify-between text-[#828898]">
                  <span>Su (Sunday)</span>
                  <span className="italic">{lang === 'fi' ? 'Sopimuksen mukaan' : 'By appointment'}</span>
                </div>
              </div>
            </div>

            {/* Actions Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1c1f2a]">
              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#171a24] hover:bg-[#202432] border border-[#2b2f3d] text-white text-xs font-bold transition-all shadow-sm group"
              >
                <Navigation className="w-3.5 h-3.5 text-[#c89d56] group-hover:rotate-12 transition-transform" />
                <span>{t.openInMaps}</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#c89d56] hover:bg-[#d4af37] text-black text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === 'fi' ? 'Varaa Aika' : 'Book Now'}</span>
              </button>
            </div>

          </div>

          {/* Interactive Visual Map & Landmark Area */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#222533] bg-[#12141a] relative min-h-[380px] flex flex-col justify-between shadow-xl">
            
            {/* Stylized Dark Barbershop Map Graphic */}
            <div className="relative flex-1 bg-[#101217] p-6 flex flex-col justify-center items-center overflow-hidden">
              
              {/* Geometric Map Grid lines */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3a4055_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Simulated Jyväskylä street routes */}
              <svg className="absolute inset-0 w-full h-full opacity-30 stroke-[#474e64]" fill="none" strokeWidth="2">
                <path d="M-50,80 Q200,90 500,70 T900,100" />
                <path d="M-20,240 Q180,210 400,230 T850,220" strokeWidth="4" />
                <path d="M220,-20 L240,400" strokeWidth="3" />
                <path d="M420,-30 L400,420" strokeWidth="2" />
                <path d="M120,40 L380,320" strokeDasharray="4 4" />
              </svg>

              {/* Central Pin */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-[#c89d56]/20 animate-ping absolute inset-0" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#996f26] p-0.5 shadow-2xl shadow-[#c89d56]/40 flex items-center justify-center">
                    <div className="w-full h-full bg-[#0b0c0e] rounded-2xl flex items-center justify-center text-[#c89d56]">
                      <MapPin className="w-8 h-8 fill-[#c89d56]/20" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 px-4 py-2 rounded-xl bg-[#0b0c0e]/90 border border-[#2c3140] backdrop-blur-md text-center shadow-xl">
                  <div className="text-white font-display font-bold text-sm">FreeStyle Barbershop</div>
                  <div className="text-xs text-[#c89d56] font-medium">Kauppakatu 8, 40100 Jyväskylä</div>
                  <div className="text-[10px] text-[#7d8291] mt-0.5">
                    {lang === 'fi' ? 'Torikeskuksen & Kirkkopuiston läheisyydessä' : 'Near Torikeskus & Kirkkopuisto park'}
                  </div>
                </div>
              </div>

              {/* Nearby reference points */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#161822]/80 border border-[#262a38] text-[11px] text-[#8e94a4]">
                📍 Kirkkopuisto (200m)
              </div>
              <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-[#161822]/80 border border-[#262a38] text-[11px] text-[#8e94a4]">
                📍 Torikeskus (150m)
              </div>
            </div>

            {/* Bottom bar inside map */}
            <div className="p-4 bg-[#14161f] border-t border-[#222533] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#9da2b2]">
                <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                <span>{lang === 'fi' ? 'Helppo esteetön sisäänkäynti katutasosta' : 'Street-level easy accessibility'}</span>
              </div>
              <a
                href={SHOP_INFO.aika24CompanyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#c89d56] hover:underline font-medium"
              >
                <span>{t.directAika24}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
