import React from 'react';
import { Star, CheckCircle2, Quote, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { REVIEWS, SHOP_INFO } from '../data/barberData';

interface ReviewsSectionProps {
  lang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  const t = translations[lang].reviews;

  return (
    <section id="reviews-section" className="py-10 sm:py-14 bg-[#0b0c0e] border-b border-[#1b1e26] relative">
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
          <a
            href={SHOP_INFO.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-2xl bg-[#12141a] border border-[#212532] hover:border-[#c89d56]/50 transition-colors shadow-md shrink-0 group cursor-pointer"
            title={lang === 'fi' ? 'Avaa Google-arvostelut' : 'Open Google Reviews'}
          >
            <div className="font-display text-3xl font-bold text-[#c89d56]">
              {SHOP_INFO.rating.toFixed(1)}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#f59e0b]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
                ))}
                <span className="text-xs font-bold text-[#f59e0b] ml-1">5.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#8e93a0] mt-1 group-hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Google</span>
                <span className="text-[#555a68]">•</span>
                <span>{SHOP_INFO.reviewCount}+ {lang === 'fi' ? 'arvostelua' : 'reviews'}</span>
                <ExternalLink className="w-3 h-3 text-[#c89d56] opacity-70 group-hover:opacity-100 transition-opacity ml-0.5" />
              </div>
            </div>
          </a>
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
                {/* Rating & Source Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-[#f59e0b]">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#f59e0b]" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#f59e0b]">5/5</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[11px] text-[#9ca3af] font-medium bg-[#161822] px-2.5 py-1 rounded-full border border-[#25293a]">
                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                    </svg>
                    Google
                  </span>
                </div>

                {/* Comment */}
                <p className="text-[#c2c6d4] text-sm leading-relaxed mb-6">
                  "{lang === 'fi' ? review.commentFi : review.commentEn}"
                </p>
              </div>

              {/* Author & Service */}
              <div className="pt-4 border-t border-[#1e222e]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Google profile avatar */}
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${review.avatarBg} text-white font-bold flex items-center justify-center text-xs shadow-inner shrink-0`}>
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm leading-tight">{review.author}</h4>
                      <p className="text-[11px] text-[#828898] mt-0.5">
                        {lang === 'fi' ? review.dateFi : review.dateEn}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] text-[#22c55e]">
                      <CheckCircle2 className="w-3 h-3" />
                      {t.verified}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#181a24] text-[10px] text-[#c89d56] border border-[#252838]">
                    {lang === 'fi' ? review.serviceFi : review.serviceEn}
                  </span>

                  {review.googleReviewUrl && (
                    <a
                      href={review.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#8e94a4] hover:text-[#c89d56] transition-colors"
                      title={t.viewOnGoogle}
                    >
                      <span>{t.viewOnGoogle}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
