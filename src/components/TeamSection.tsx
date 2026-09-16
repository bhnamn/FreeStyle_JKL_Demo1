import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Award, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Language, Barber } from '../types';
import { translations } from '../data/translations';
import { BARBERS } from '../data/barberData';

interface TeamSectionProps {
  lang: Language;
  onSelectBarber: (barber: Barber) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ lang, onSelectBarber }) => {
  const t = translations[lang].team;

  return (
    <section id="team-section" className="py-20 sm:py-28 bg-[#0b0c0e] border-b border-[#1b1e26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BARBERS.map((barber, index) => (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col justify-between rounded-2xl bg-[#12141a] border border-[#212430] hover:border-[#c89d56]/40 transition-all overflow-hidden group shadow-xl"
            >
              {/* Image & Status Badge */}
              <div className="relative aspect-[4/4] overflow-hidden bg-[#1a1c24]">
                <img
                  src={barber.image}
                  alt={barber.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141a] via-transparent to-transparent opacity-90" />

                {/* Station & Status Pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0b0c0e]/85 backdrop-blur-md border border-[#272b38] text-[11px] text-white">
                  <span className="text-[#c89d56] font-bold">#{barber.stationNumber}</span>
                  <span className="text-[#7d8291]">|</span>
                  <span>{t.chair} {barber.stationNumber}</span>
                </div>

                {/* Live Status Indicator */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0b0c0e]/85 backdrop-blur-md border border-[#272b38] text-[11px]">
                  {barber.status === 'available' ? (
                    <span className="flex items-center gap-1 text-[#22c55e] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse"></span>
                      {t.statusAvailable}
                    </span>
                  ) : barber.status === 'busy' ? (
                    <span className="flex items-center gap-1 text-[#f59e0b] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                      {t.statusBusy}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[#9ca3af] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9ca3af]"></span>
                      {t.statusBreak}
                    </span>
                  )}
                </div>

                {/* Bottom of image: Name overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-[#c89d56] transition-colors">
                        {barber.name}
                      </h3>
                      <p className="text-xs text-[#c89d56] font-medium">
                        {lang === 'fi' ? barber.roleFi : barber.roleEn}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-[#8b91a0]">
                        {barber.experienceYears} {t.experienceSuffix}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio & Specialties */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-[#9da3b2] leading-relaxed">
                  {lang === 'fi' ? barber.bioFi : barber.bioEn}
                </p>

                <div>
                  <div className="text-[11px] font-bold text-[#6b7280] uppercase tracking-wider mb-2">
                    {lang === 'fi' ? 'Erikoisosaaminen' : 'Specialties'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === 'fi' ? barber.specialtiesFi : barber.specialtiesEn).map((spec, i) => (
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
                    onClick={() => onSelectBarber(barber)}
                    className="w-full py-2.5 rounded-xl bg-[#1b1e2a] hover:bg-[#c89d56] text-[#c89d56] hover:text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:border-[#c89d56]"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.bookWith} ({barber.name.split(' ')[0]})</span>
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
