import React from 'react';
import { motion } from 'motion/react';
import { Scissors, Coffee, Award, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface AboutSectionProps {
  lang: Language;
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang, onOpenBooking }) => {
  const t = translations[lang].about;

  const features = [
    {
      icon: Scissors,
      title: t.feature1Title,
      desc: t.feature1Desc,
    },
    {
      icon: Award,
      title: t.feature2Title,
      desc: t.feature2Desc,
    },
    {
      icon: Sparkles,
      title: t.feature3Title,
      desc: t.feature3Desc,
    },
    {
      icon: Coffee,
      title: t.feature4Title,
      desc: t.feature4Desc,
    },
  ];

  return (
    <section id="about-section" className="py-20 sm:py-28 bg-[#0b0c0e] border-b border-[#1b1e26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-[0.2em] mb-3">
            <span className="w-5 h-[1px] bg-[#c89d56]"></span>
            {t.tag}
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.title}
          </h2>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Narrative text and values */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-[#c0c5d2] text-base sm:text-lg leading-relaxed">
              {t.p1}
            </p>
            <p className="text-[#8e94a4] text-base leading-relaxed">
              {t.p2}
            </p>

            {/* Values / Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#12141a] border border-[#21242f] hover:border-[#c89d56]/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1a1d26] flex items-center justify-center text-[#c89d56] mb-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-[#8e93a0] leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Trust bullet points */}
            <div className="pt-4 border-t border-[#1a1d26] flex flex-wrap gap-4 text-xs text-[#a0a5b4]">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#c89d56]" />
                {lang === 'fi' ? 'Aika24.fi luotettava järjestelmä' : 'Official Aika24.fi verified'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#c89d56]" />
                {lang === 'fi' ? 'Hygieeniset & steriloidut työvälineet' : 'Sanitized hospital-grade tools'}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#c89d56]" />
                {lang === 'fi' ? 'Ilmainen espresso & virvokkeet' : 'Complimentary espresso & water'}
              </span>
            </div>
          </div>

          {/* Right: Modern Barber Collage */}
          <div className="lg:col-span-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-[#212530] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80"
                  alt="Beard trim and hot shave"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-[#212530] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80"
                  alt="Barber scissor work"
                  className="w-full h-48 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#151722] to-[#101218] border border-[#262b3a] shadow-xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-[#c89d56]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#c89d56] uppercase tracking-wider">
                    {lang === 'fi' ? 'Klassista laatua' : 'Authentic Standards'}
                  </div>
                  <h4 className="text-white font-display text-xl font-bold mt-1">
                    {lang === 'fi' ? 'Tervetuloa Kauppakatu 8:aan' : 'Welcome to Kauppakatu 8'}
                  </h4>
                  <p className="text-xs text-[#8f94a2] mt-1 max-w-xs">
                    {lang === 'fi'
                      ? 'Varaa verkosta tai astu sisään suoraan Jyväskylän keskustassa.'
                      : 'Book your slot online or visit directly in central Jyväskylä.'}
                  </p>
                </div>
                <button
                  onClick={onOpenBooking}
                  className="px-4 py-2.5 rounded-xl bg-[#c89d56] text-black font-bold text-xs hover:bg-[#d4af37] transition-colors cursor-pointer shadow-md shrink-0"
                >
                  {lang === 'fi' ? 'Varaa Aika' : 'Book Now'}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
