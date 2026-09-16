import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { REVIEWS, SHOP_INFO } from '../data/barberData';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = translations[lang].reviews;

  return (
    <section id="reviews-section" className="py-20 sm:py-28 bg-[#0b0c0e] border-b border-[#1b1e26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
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

          {/* Rating Summary Box */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#12141a] border border-[#212532] shadow-md shrink-0">
            <div className="font-display text-3xl font-bold text-[#c89d56]">
              {SHOP_INFO.rating}
            </div>
            <div>
              <div className="flex text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
                ))}
              </div>
              <div className="text-xs text-[#8e93a0] mt-0.5">
                {SHOP_INFO.reviewCount}+ {lang === 'fi' ? 'arvostelua' : 'reviews'}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-[#12141a] border border-[#222533] hover:border-[#32384a] transition-all shadow-md relative group"
            >
              <Quote className="absolute top-5 right-5 w-8 h-8 text-[#222635] pointer-events-none group-hover:text-[#c89d56]/20 transition-colors" />

              <div>
                {/* Stars */}
                <div className="flex text-[#f59e0b] mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[#c2c6d4] text-sm leading-relaxed mb-6">
                  "{lang === 'fi' ? review.commentFi : review.commentEn}"
                </p>
              </div>

              {/* Author & Service */}
              <div className="pt-4 border-t border-[#1e222e]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-bold text-sm">{review.author}</h4>
                    <p className="text-xs text-[#828898]">{review.city}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#22c55e]">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.verified}
                    </span>
                    <p className="text-[10px] text-[#717684]">
                      {lang === 'fi' ? review.dateFi : review.dateEn}
                    </p>
                  </div>
                </div>

                <div className="mt-2.5">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#181a24] text-[10px] text-[#c89d56] border border-[#252838]">
                    {review.service}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
