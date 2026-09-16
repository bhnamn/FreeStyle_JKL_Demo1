import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Scissors,
  User,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Phone,
  Mail,
  Download,
} from 'lucide-react';
import { Language, ServiceItem, Barber, Booking } from '../types';
import { translations } from '../data/translations';
import { SERVICES, BARBERS, SHOP_INFO } from '../data/barberData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialService?: ServiceItem | null;
  initialBarber?: Barber | null;
  onBookingCreated: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialService,
  initialBarber,
  onBookingCreated,
}) => {
  const t = translations[lang].bookingModal;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Initialize dates
  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setSelectedService(initialService);
        setStep(2);
      } else {
        setSelectedService(SERVICES[0]);
      }

      if (initialBarber) {
        setSelectedBarber(initialBarber);
      }

      // Default to tomorrow or next business day
      const d = new Date();
      d.setDate(d.getDate() + 1);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setSelectedDate(`${yyyy}-${mm}-${dd}`);
      setSelectedTime('11:00');
      setConfirmedBooking(null);
      setErrorMessage('');
    }
  }, [isOpen, initialService, initialBarber]);

  if (!isOpen) return null;

  // Available time slots
  const morningSlots = ['09:00', '09:45', '10:30', '11:15', '12:00'];
  const afternoonSlots = ['13:00', '13:45', '14:30', '15:15', '16:00', '16:45', '17:15'];

  const handleNext = () => {
    setErrorMessage('');
    if (step === 1 && !selectedService) {
      setErrorMessage(lang === 'fi' ? 'Valitse palvelu jatkaaksesi.' : 'Please select a service.');
      return;
    }
    if (step === 3 && !selectedTime) {
      setErrorMessage(lang === 'fi' ? 'Valitse sopiva kellonaika.' : 'Please choose a time slot.');
      return;
    }
    if (step < 4) {
      setStep((step + 1) as 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3);
    }
  };

  const handleConfirm = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      setErrorMessage(t.requiredError);
      return;
    }

    const newBooking: Booking = {
      id: `FS-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: selectedService?.id || 'mens-cut',
      serviceName: lang === 'fi' ? selectedService?.nameFi || 'Hiustenleikkaus' : selectedService?.nameEn || 'Haircut',
      barberId: selectedBarber?.id || 'any',
      barberName: selectedBarber?.name || (lang === 'fi' ? 'Kuka tahansa' : 'Any Barber'),
      date: selectedDate,
      time: selectedTime,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim(),
      price: selectedService?.price || 30,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    onBookingCreated(newBooking);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#c89d56', '#ffffff', '#4ade80'],
      });
    } catch {
      // Ignore in test environments
    }
  };

  // Generate .ics calendar file download
  const handleDownloadCalendar = () => {
    if (!confirmedBooking) return;
    const [year, month, day] = confirmedBooking.date.split('-');
    const [hours, minutes] = confirmedBooking.time.split(':');
    const startDate = `${year}${month}${day}T${hours}${minutes}00`;
    
    // Assume 45 min duration
    const endH = String(Number(hours) + 1).padStart(2, '0');
    const endDate = `${year}${month}${day}T${endH}${minutes}00`;

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//FreeStyle Barbershop//Jyvaskyla Finland//FI',
      'BEGIN:VEVENT',
      `SUMMARY:FreeStyle Barbershop: ${confirmedBooking.serviceName}`,
      `DESCRIPTION:Parturi-Kampaamo FreeStyle\\nTekijä: ${confirmedBooking.barberName}\\nVarauskoodi: ${confirmedBooking.id}\\nPuh: 040 962 4311`,
      `LOCATION:Kauppakatu 8\\, 40100 Jyväskylä\\, Finland`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `freestyle-booking-${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-2xl rounded-2xl bg-[#12141a] border border-[#272b38] shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Top Banner */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#212532] bg-[#161822]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#c89d56] uppercase tracking-wider">
              <Scissors className="w-3.5 h-3.5 text-[#c89d56]" />
              <span>FreeStyle • Jyväskylä</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-0.5">
              {t.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1d202c] hover:bg-[#282d3e] text-[#8e94a4] hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (when not confirmed) */}
        {!confirmedBooking && (
          <div className="grid grid-cols-4 border-b border-[#212532] text-xs font-semibold text-center bg-[#14161f]">
            <div
              className={`py-2.5 border-b-2 transition-colors ${
                step >= 1 ? 'border-[#c89d56] text-[#c89d56]' : 'border-transparent text-[#6b7280]'
              }`}
            >
              {t.step1}
            </div>
            <div
              className={`py-2.5 border-b-2 transition-colors ${
                step >= 2 ? 'border-[#c89d56] text-[#c89d56]' : 'border-transparent text-[#6b7280]'
              }`}
            >
              {t.step2}
            </div>
            <div
              className={`py-2.5 border-b-2 transition-colors ${
                step >= 3 ? 'border-[#c89d56] text-[#c89d56]' : 'border-transparent text-[#6b7280]'
              }`}
            >
              {t.step3}
            </div>
            <div
              className={`py-2.5 border-b-2 transition-colors ${
                step >= 4 ? 'border-[#c89d56] text-[#c89d56]' : 'border-transparent text-[#6b7280]'
              }`}
            >
              {t.step4}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[70vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* CONFIRMED STATE */}
          {confirmedBooking ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e] mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display text-2xl font-bold text-white">
                  {t.successTitle}
                </h4>
                <p className="text-sm text-[#9da3b2] mt-1 max-w-md mx-auto">
                  {t.successMsg}
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-5 rounded-xl bg-[#161822] border border-[#272b38] max-w-md mx-auto text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#222635]">
                  <span className="text-xs text-[#7e8494]">{t.bookingCode}</span>
                  <span className="font-mono font-bold text-sm text-[#c89d56]">
                    {confirmedBooking.id}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e94a4]">{t.servicePrice}</span>
                  <span className="font-semibold text-white">
                    {confirmedBooking.serviceName} ({confirmedBooking.price}€)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e94a4]">{t.barberLabel}</span>
                  <span className="font-semibold text-white">{confirmedBooking.barberName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e94a4]">{t.bookedFor}</span>
                  <span className="font-semibold text-white">
                    {confirmedBooking.date} klo {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8e94a4]">{t.nameLabel}</span>
                  <span className="font-semibold text-white">{confirmedBooking.customerName}</span>
                </div>
              </div>

              {/* Actions on Confirmation */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadCalendar}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1f2230] hover:bg-[#282c3e] border border-[#2e3344] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#c89d56]" />
                  <span>{t.addToCalendar}</span>
                </button>

                <a
                  href={SHOP_INFO.aika24BookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1f2230] hover:bg-[#282c3e] border border-[#2e3344] text-[#c89d56] text-xs font-semibold transition-colors"
                >
                  <span>{t.openAika24}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#c89d56] hover:bg-[#d4af37] text-black font-bold text-xs transition-colors cursor-pointer"
                >
                  {t.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* STEP 1: SERVICE SELECTION */}
              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-[#8e94a4] uppercase tracking-wider">
                    {t.selectServicePrompt}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => setSelectedService(srv)}
                        className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          selectedService?.id === srv.id
                            ? 'bg-[#1e2230] border-[#c89d56] ring-1 ring-[#c89d56]/50 shadow-md'
                            : 'bg-[#151720] border-[#222533] hover:border-[#353a4c]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="font-semibold text-sm text-white">
                            {lang === 'fi' ? srv.nameFi : srv.nameEn}
                          </span>
                          <span className="font-display font-bold text-sm text-[#c89d56] shrink-0">
                            {srv.price}€
                          </span>
                        </div>
                        <span className="text-[11px] text-[#7d8291]">
                          {srv.durationMinutes} min • {srv.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: BARBER SELECTION */}
              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-[#8e94a4] uppercase tracking-wider">
                    {t.selectBarberPrompt}
                  </p>

                  {/* Any barber option */}
                  <button
                    type="button"
                    onClick={() => setSelectedBarber(null)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      selectedBarber === null
                        ? 'bg-[#1e2230] border-[#c89d56] ring-1 ring-[#c89d56]/50'
                        : 'bg-[#151720] border-[#222533] hover:border-[#353a4c]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#222533] flex items-center justify-center text-[#c89d56]">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{t.anyBarber}</div>
                        <div className="text-xs text-[#828898]">
                          {lang === 'fi' ? 'Nopein saatavilla oleva ammattilainen' : 'Fastest available barber'}
                        </div>
                      </div>
                    </div>
                    {selectedBarber === null && (
                      <CheckCircle2 className="w-5 h-5 text-[#c89d56]" />
                    )}
                  </button>

                  {/* Specific Barbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {BARBERS.map((barber) => (
                      <button
                        key={barber.id}
                        type="button"
                        onClick={() => setSelectedBarber(barber)}
                        className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center ${
                          selectedBarber?.id === barber.id
                            ? 'bg-[#1e2230] border-[#c89d56] ring-1 ring-[#c89d56]/50 shadow-md'
                            : 'bg-[#151720] border-[#222533] hover:border-[#353a4c]'
                        }`}
                      >
                        <img
                          src={barber.image}
                          alt={barber.name}
                          className="w-16 h-16 rounded-full object-cover mb-2 border border-[#2b2f3d]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="font-bold text-sm text-white">{barber.name}</div>
                        <div className="text-[11px] text-[#c89d56] mt-0.5">
                          {lang === 'fi' ? barber.roleFi : barber.roleEn}
                        </div>
                        <div className="text-[10px] text-[#717684] mt-1">
                          {barber.experienceYears} {lang === 'fi' ? 'v. kokemusta' : 'yrs experience'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: DATE & TIME SELECTION */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#8e94a4] uppercase tracking-wider mb-2">
                      {t.selectDatePrompt}
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#151720] border border-[#282c3c] text-white text-sm focus:outline-none focus:border-[#c89d56]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-[#8e94a4] uppercase tracking-wider">
                        {t.selectTimePrompt}
                      </span>
                      <span className="text-[11px] text-[#c89d56]">
                        {lang === 'fi' ? 'Aukioloajat: 09:00 - 18:00' : 'Hours: 09:00 - 18:00'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[11px] text-[#717684] block mb-1.5 font-medium">
                          {lang === 'fi' ? 'Aamupäivä' : 'Morning'}
                        </span>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {morningSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                selectedTime === time
                                  ? 'bg-[#c89d56] text-black shadow-md'
                                  : 'bg-[#181a24] text-[#d6dae5] hover:bg-[#222533] border border-[#252838]'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] text-[#717684] block mb-1.5 font-medium">
                          {lang === 'fi' ? 'Iltapäivä' : 'Afternoon'}
                        </span>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                          {afternoonSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                selectedTime === time
                                  ? 'bg-[#c89d56] text-black shadow-md'
                                  : 'bg-[#181a24] text-[#d6dae5] hover:bg-[#222533] border border-[#252838]'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CUSTOMER DETAILS & SUMMARY */}
              {step === 4 && (
                <div className="space-y-4">
                  {/* Summary recap chip */}
                  <div className="p-3.5 rounded-xl bg-[#161822] border border-[#272b38] flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white">
                        {lang === 'fi' ? selectedService?.nameFi : selectedService?.nameEn}
                      </span>
                      <span className="text-[#8e94a4] block">
                        {selectedDate} klo {selectedTime} • {selectedBarber?.name || t.anyBarber}
                      </span>
                    </div>
                    <span className="font-display font-bold text-base text-[#c89d56]">
                      {selectedService?.price}€
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-[#8e94a4] uppercase tracking-wider">
                    {t.customerDetailsPrompt}
                  </p>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-[#a0a5b4] mb-1 font-medium">{t.nameLabel} *</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#717684] absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder={t.namePlaceholder}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#151720] border border-[#292d3b] text-white focus:outline-none focus:border-[#c89d56]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#a0a5b4] mb-1 font-medium">{t.phoneLabel} *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#717684] absolute left-3 top-3" />
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder={t.phonePlaceholder}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#151720] border border-[#292d3b] text-white focus:outline-none focus:border-[#c89d56]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#a0a5b4] mb-1 font-medium">{t.emailLabel}</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#717684] absolute left-3 top-3" />
                        <input
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder={t.emailPlaceholder}
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#151720] border border-[#292d3b] text-white focus:outline-none focus:border-[#c89d56]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#a0a5b4] mb-1 font-medium">{t.notesLabel}</label>
                      <textarea
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder={t.notesPlaceholder}
                        rows={2}
                        className="w-full px-3 py-2 rounded-xl bg-[#151720] border border-[#292d3b] text-white focus:outline-none focus:border-[#c89d56]"
                      />
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!confirmedBooking && (
          <div className="flex items-center justify-between p-4 sm:p-6 border-t border-[#212532] bg-[#14161f]">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1a1d28] hover:bg-[#232736] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{t.backBtn}</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#c89d56] hover:bg-[#d4af37] text-black text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <span>{t.nextBtn}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c89d56] hover:brightness-110 text-black text-xs font-bold transition-all cursor-pointer shadow-lg shadow-[#c89d56]/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t.confirmBookingBtn}</span>
              </button>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
