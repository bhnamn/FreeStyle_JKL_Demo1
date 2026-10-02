import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  ExternalLink,
  ArrowUpRight,
  Scissors,
  Droplets,
  Palette,
  Sparkles,
  Crown,
  Waves,
  Eye,
  UserCheck,
  Phone,
  Calendar,
} from 'lucide-react';
import { Language, ServiceItem } from '../types';
import { translations } from '../data/translations';
import { SERVICE_CATEGORIES, SERVICES, SHOP_INFO } from '../data/barberData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialService?: ServiceItem | null;
  onSelectServiceUrl?: (serviceName: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  onSelectServiceUrl,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const t = translations[lang].bookingModal;

  const categoryBarRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const dragMovedRef = useRef(false);

  // Smooth mouse wheel horizontal scrolling on desktop
  const handleCategoryWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!categoryBarRef.current) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      categoryBarRef.current.scrollLeft += e.deltaY;
    }
  };

  // Mouse drag-to-scroll support for desktop
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!categoryBarRef.current) return;
    isDraggingRef.current = true;
    dragMovedRef.current = false;
    startXRef.current = e.pageX - categoryBarRef.current.offsetLeft;
    scrollLeftRef.current = categoryBarRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !categoryBarRef.current) return;
    const x = e.pageX - categoryBarRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    if (Math.abs(walk) > 4) {
      dragMovedRef.current = true;
    }
    categoryBarRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleCategorySelect = (categoryId: string) => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    setSelectedCategory(categoryId);
  };

  const getCategoryIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4 text-[#c89d56]' };
    switch (iconName) {
      case 'Scissors':
        return <Scissors {...props} />;
      case 'Droplets':
        return <Droplets {...props} />;
      case 'Palette':
        return <Palette {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'Crown':
        return <Crown {...props} />;
      case 'Waves':
        return <Waves {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      case 'UserCheck':
        return <UserCheck {...props} />;
      default:
        return <Scissors {...props} />;
    }
  };

  // Filter services by search query and category
  const filteredServices = useMemo(() => {
    return SERVICES.filter((s) => {
      const matchesCategory =
        selectedCategory === 'all' || s.categoryId === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText =
        s.nameFi.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.categoryNameFi.toLowerCase().includes(q) ||
        s.categoryNameEn.toLowerCase().includes(q) ||
        s.fullTitleFi.toLowerCase().includes(q);

      return matchesCategory && matchesText;
    });
  }, [searchQuery, selectedCategory]);

  const handleServiceClick = (service: ServiceItem) => {
    if (onSelectServiceUrl) {
      onSelectServiceUrl(lang === 'fi' ? service.nameFi : service.nameEn);
    }
    // Open Aika24 directly in a clean new window/tab
    window.open(service.aika24Url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl bg-[#101218] border border-[#232734] rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#1d212d] flex items-start justify-between gap-4 bg-[#141620]">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-[#c89d56] uppercase tracking-[0.2em] mb-1">
              <span className="w-4 h-[1px] bg-[#c89d56]"></span>
              {lang === 'fi' ? 'Ajanvaraus' : 'Online Booking'}
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#8c92a2] mt-1">
              {t.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#191c26] text-[#8e93a0] hover:text-white hover:bg-[#222634] transition-colors cursor-pointer shrink-0"
            aria-label={t.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-[#1d212d] bg-[#12141c] space-y-3">
          {/* Search box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#757b8b] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#171922] border border-[#262b3a] focus:border-[#c89d56] text-white text-xs sm:text-sm placeholder-[#616675] outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#757b8b] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="relative w-full max-w-full overflow-hidden">
            <div
              ref={categoryBarRef}
              onWheel={handleCategoryWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="flex flex-nowrap items-center gap-2 overflow-x-auto pb-2 pt-0.5 px-0.5 w-full max-w-full overscroll-x-contain touch-pan-x custom-horizontal-bar select-none cursor-grab active:cursor-grabbing"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <button
                type="button"
                onClick={() => handleCategorySelect('all')}
                className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#c89d56] text-black shadow-sm'
                    : 'bg-[#181a24] text-[#848a9b] hover:text-white border border-[#232735]'
                }`}
              >
                {t.allCategories}
              </button>
              {SERVICE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-[#c89d56] text-black shadow-sm'
                      : 'bg-[#181a24] text-[#848a9b] hover:text-white border border-[#232735]'
                  }`}
                >
                  {lang === 'fi' ? cat.nameFi : cat.nameEn}
                </button>
              ))}
              {/* Trailing spacer ensures the rightmost button is fully reachable and never clipped */}
              <div className="shrink-0 w-2 h-1 pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Services List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {filteredServices.length === 0 ? (
            <div className="text-center py-10 text-[#717786]">
              <p className="text-sm">
                {lang === 'fi'
                  ? 'Ei hakutuloksia. Kokeile toista hakusanaa tai valitse kategoria.'
                  : 'No services match your search. Try another query or select all categories.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-3 text-xs text-[#c89d56] font-semibold hover:underline"
              >
                {lang === 'fi' ? 'Näytä kaikki palvelut' : 'Show all services'}
              </button>
            </div>
          ) : (
            filteredServices.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service)}
                className="group p-3.5 sm:p-4 rounded-xl bg-[#14161f] hover:bg-[#181b26] border border-[#212532] hover:border-[#c89d56]/60 transition-all flex items-center justify-between gap-3 cursor-pointer shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#1a1d28] border border-[#292e3e] flex items-center justify-center shrink-0 group-hover:border-[#c89d56]/40 transition-colors">
                    {getCategoryIcon(
                      SERVICE_CATEGORIES.find((c) => c.id === service.categoryId)?.icon || 'Scissors'
                    )}
                  </div>
                  <div className="truncate">
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#c89d56] transition-colors truncate">
                      {lang === 'fi' ? service.nameFi : service.nameEn}
                    </h3>
                    <p className="text-[11px] text-[#73798a] truncate" title={lang === 'fi' ? service.descFi : service.descEn}>
                      {(lang === 'fi' ? service.descFi : service.descEn) || (lang === 'fi' ? service.categoryNameFi : service.categoryNameEn)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-display text-sm sm:text-base font-bold text-[#c89d56]">
                    {service.priceDisplay}
                  </span>
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#1f2230] group-hover:bg-[#c89d56] text-[#c89d56] group-hover:text-black text-xs font-semibold transition-all">
                    <span className="hidden sm:inline">{t.bookNowBtn}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#1d212d] bg-[#12141c] flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={SHOP_INFO.aika24BookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#8e94a5] hover:text-[#c89d56] transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c89d56]" />
            <span>{t.openGeneralBooking}</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>

          <div className="flex items-center gap-2 text-xs text-[#717786]">
            <span>{t.phoneBookingNotice}</span>
            <a
              href={`tel:${SHOP_INFO.internationalPhone.replace(/\s+/g, '')}`}
              className="text-[#c89d56] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {SHOP_INFO.phone}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
