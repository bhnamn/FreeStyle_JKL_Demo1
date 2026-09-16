/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Toast } from './components/Toast';
import { Language, ServiceItem, Barber, Booking, AnalyticsSummary } from './types';
import { INITIAL_ANALYTICS } from './data/barberData';
import { Calendar, BarChart3, Scissors } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('freestyle_lang');
    return saved === 'en' ? 'en' : 'fi';
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [preselectedBarber, setPreselectedBarber] = useState<Barber | null>(null);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsSummary>(INITIAL_ANALYTICS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize language changes
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('freestyle_lang', newLang);
    document.documentElement.lang = newLang;
    setToastMessage(newLang === 'fi' ? 'Kieli vaihdettu: Suomi' : 'Language switched: English');
  };

  // Open booking with optional service or barber
  const handleOpenBooking = () => {
    setPreselectedService(null);
    setPreselectedBarber(null);
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setPreselectedService(service);
    setPreselectedBarber(null);
    setIsBookingOpen(true);
  };

  const handleSelectBarber = (barber: Barber) => {
    setPreselectedBarber(barber);
    setPreselectedService(null);
    setIsBookingOpen(true);
  };

  // Handle newly created booking
  const handleBookingCreated = (newBooking: Booking) => {
    setAnalyticsData((prev) => {
      const updatedRevenue = prev.todayRevenue + newBooking.price;
      const updatedWeeklyRevenue = prev.weeklyRevenue + newBooking.price;
      const updatedTotal = prev.totalBookingsToday + 1;
      const updatedOccupancy = Math.min(96, Math.round(prev.occupancyRate + 2));

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'booking' as const,
        customerName: newBooking.customerName,
        serviceName: newBooking.serviceName,
        barberName: newBooking.barberName,
        timeAgo: lang === 'fi' ? 'Juuri nyt' : 'Just now',
        timestamp: Date.now(),
      };

      return {
        ...prev,
        todayRevenue: updatedRevenue,
        weeklyRevenue: updatedWeeklyRevenue,
        totalBookingsToday: updatedTotal,
        occupancyRate: updatedOccupancy,
        recentActivity: [newActivity, ...prev.recentActivity.slice(0, 7)],
      };
    });

    setToastMessage(
      lang === 'fi'
        ? `Ajanvaraus vahvistettu koodilla ${newBooking.id}!`
        : `Booking confirmed with ID ${newBooking.id}!`
    );
  };

  // Simulate an incoming booking in real-time
  const handleSimulateNewBooking = () => {
    const mockNames = ['Aleksi Mäkinen', 'Ville Korhonen', 'Oskari L.', 'Janne Koskela', 'Eetu Virtanen', 'Mikko H.'];
    const mockServices = [
      { nameFi: 'Hiustenleikkaus Fade', nameEn: 'Skin Fade Haircut', price: 35 },
      { nameFi: 'FreeStyle Täyspaketti', nameEn: 'The FreeStyle Combo', price: 45 },
      { nameFi: 'Parran muotoilu', nameEn: 'Beard Trim & Lines', price: 20 },
      { nameFi: 'Miesten hiustenleikkaus', nameEn: "Men's Classic Haircut", price: 30 },
    ];
    const mockBarbers = ['Aziz Gholami', 'Sami Virtanen', 'Elena Koskinen'];

    const chosenName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const chosenService = mockServices[Math.floor(Math.random() * mockServices.length)];
    const chosenBarber = mockBarbers[Math.floor(Math.random() * mockBarbers.length)];

    setAnalyticsData((prev) => ({
      ...prev,
      todayRevenue: prev.todayRevenue + chosenService.price,
      weeklyRevenue: prev.weeklyRevenue + chosenService.price,
      totalBookingsToday: prev.totalBookingsToday + 1,
      recentActivity: [
        {
          id: `sim-${Date.now()}`,
          type: 'booking',
          customerName: chosenName,
          serviceName: lang === 'fi' ? chosenService.nameFi : chosenService.nameEn,
          barberName: chosenBarber,
          timeAgo: lang === 'fi' ? 'Juuri nyt (live)' : 'Just now (live)',
          timestamp: Date.now(),
        },
        ...prev.recentActivity.slice(0, 7),
      ],
    }));

    setToastMessage(
      lang === 'fi'
        ? `Reaaliaikainen varaus: ${chosenName} (${chosenService.nameFi})`
        : `Real-time booking: ${chosenName} (${chosenService.nameEn})`
    );
  };

  // Auto-dismiss toasts
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const scrollToServices = () => {
    const element = document.getElementById('services-section');
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
    <div className="min-h-screen bg-[#0b0c0e] text-[#ededee] font-sans-custom selection:bg-[#d4af37] selection:text-black flex flex-col relative">
      
      {/* Top Navigation */}
      <Navbar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenBooking={handleOpenBooking}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          lang={lang}
          onOpenBooking={handleOpenBooking}
          onScrollToServices={scrollToServices}
        />

        {/* 2. Esittely (About) */}
        <AboutSection
          lang={lang}
          onOpenBooking={handleOpenBooking}
        />

        {/* 3. Palvelut & Hinnasto (Services) */}
        <ServicesSection
          lang={lang}
          onSelectService={handleSelectService}
        />

        {/* 4. Henkilöstö (Barbers) */}
        <TeamSection
          lang={lang}
          onSelectBarber={handleSelectBarber}
        />

        {/* 5. Sijainti & Aukioloajat (Location) */}
        <LocationSection
          lang={lang}
          onOpenBooking={handleOpenBooking}
        />

        {/* 6. Asiakaskokemukset (Reviews) */}
        <ReviewsSection
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenBooking={handleOpenBooking}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Floating Quick Navigation & Live Analytics Pill */}
      <div className="fixed bottom-5 left-5 z-30 flex items-center gap-2">
        <button
          onClick={() => setIsAnalyticsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#141620]/90 hover:bg-[#1c2030] text-[#c89d56] border border-[#2b3042] backdrop-blur-md shadow-xl text-xs font-semibold transition-all hover:scale-105 cursor-pointer group"
          id="floating-analytics-btn"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
          </span>
          <BarChart3 className="w-3.5 h-3.5 text-[#c89d56] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">
            {lang === 'fi' ? 'Live Analytiikka' : 'Live Dashboard'}
          </span>
        </button>
      </div>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        initialService={preselectedService}
        initialBarber={preselectedBarber}
        onBookingCreated={handleBookingCreated}
      />

      {/* Real-Time Analytics Dashboard */}
      <AnalyticsDashboard
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
        lang={lang}
        analyticsData={analyticsData}
        onSimulateNewBooking={handleSimulateNewBooking}
        onOpenBooking={() => {
          setIsAnalyticsOpen(false);
          handleOpenBooking();
        }}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />

    </div>
  );
}
