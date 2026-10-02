import React from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
import { Language, Barber } from '../types';
import { translations } from '../data/translations';
import { BARBERS } from '../data/barberData';

interface TeamSectionProps {
  lang: Language;
  onSelectBarber: (barber: Barber) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ lang, onSelectBarber }) => {
  const t = translations[lang].team;
  // Keep only Aziz Gholami as staff member
  const aziz = BARBERS.find((b) => b.id === 'aziz-gholami') || BARBERS[0];

  if (!aziz) return null;

  return (
    <section id="team-section" className="py-10 sm:py-14 bg-[#0b0c0e] border-b border-[#1b1e26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-[1px] bg-[#c89d56]"></span>
            {t.tag}
            <span className="w-5 h-[1px] bg-[#c89d56]"></span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.title}
          </h2>
          <p className="text-[#8e94a4] text-sm sm:text-base mt-3">
            {t.subtitle}
          </p>
        </div>

        {/* Barber Card Container */}
        <div className="max-w-md mx-auto">
          <motion.div
            key={aziz.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between rounded-2xl bg-[#12141a] border border-[#212430] hover:border-[#c89d56]/40 transition-all overflow-hidden group shadow-xl"
          >
            {/* Image */}
            <div className="relative aspect-[4/4] overflow-hidden bg-[#1a1c24]">
              <img
                src={aziz.image}
                alt={`${aziz.name} – Parturi-Kampaamo FreeStyle Jyväskylä`}
                loading="lazy"
                width="600"
                height="600"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-transparent opacity-90" />

              {/* Bottom of image: Name overlay */}
              <div className="absolute bottom-3 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:text-[#c89d56] transition-colors">
                      {aziz.name}
                    </h3>
                    <p className="text-xs text-[#c89d56] font-medium">
                      {lang === 'fi' ? aziz.roleFi : aziz.roleEn}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-[#8b91a0]">
                      {aziz.experienceYears} {t.experienceSuffix}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio & Specialties */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
              <p className="text-xs sm:text-sm text-[#9da3b2] leading-relaxed">
                {lang === 'fi' ? aziz.bioFi : aziz.bioEn}
              </p>

              <div>
                <div className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">
                  {lang === 'fi' ? 'Erikoisosaaminen' : 'Specialties'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(lang === 'fi' ? aziz.specialtiesFi : aziz.specialtiesEn).map((spec, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-[#191c26] border border-[#252a39] text-[11px] text-[#c2c6d4]"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Book with this barber button */}
              <div className="pt-4 border-t border-[#1e222e]">
                <button
                  onClick={() => onSelectBarber(aziz)}
                  className="w-full py-2.5 rounded-xl bg-[#1b1e2a] hover:bg-[#c89d56] text-[#c89d56] hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:border-[#c89d56]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.bookWith} ({aziz.name.split(' ')[0]})</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
};
