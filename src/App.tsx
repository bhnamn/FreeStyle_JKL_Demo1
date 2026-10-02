/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { TeamSection } from './components/TeamSection';
import { LocationSection } from './components/LocationSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Toast } from './components/Toast';
import { Language, ServiceItem, Barber } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('freestyle_lang');
    return saved === 'en' ? 'en' : 'fi';
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<ServiceItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize document title and lang attribute for SEO
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title =
      lang === 'fi'
        ? 'Parturi-Kampaamo FreeStyle Jyväskylä | Parturi & Kampaamo Kauppakatu 8'
        : 'FreeStyle Barbershop & Salon Jyväskylä | Kauppakatu 8';
  }, [lang]);

  // Check URL hash for direct booking link
  useEffect(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#ajanvaraus' || hash === '#booking') {
      setIsBookingOpen(true);
    }
  }, []);

  // Synchronize language changes
  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('freestyle_lang', newLang);
    setToastMessage(newLang === 'fi' ? 'Kieli vaihdettu: Suomi' : 'Language switched: English');
  };

  // Open booking modal
  const handleOpenBooking = () => {
    setPreselectedService(null);
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setToastMessage(
      lang === 'fi'
        ? `Avataan Aika24 (${service.nameFi})...`
        : `Opening Aika24 (${service.nameEn})...`
    );
  };

  const handleSelectBarber = (_barber: Barber) => {
    setPreselectedService(null);
    setIsBookingOpen(true);
  };

  // Auto-dismiss toasts
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
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
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          lang={lang}
          onOpenBooking={handleOpenBooking}
          onScrollToServices={scrollToServices}
        />

        {/* 2. Palvelut & Hinnasto (Services) */}
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

        {/* 7. Usein Kysytyt Kysymykset (FAQ) & Local SEO Schema */}
        <FAQSection
          lang={lang}
          onOpenBooking={handleOpenBooking}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onLanguageChange={handleLanguageChange}
        onOpenBooking={handleOpenBooking}
      />

      {/* 1-Step Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        lang={lang}
        initialService={preselectedService}
        onSelectServiceUrl={(serviceName) => {
          setToastMessage(
            lang === 'fi'
              ? `Avataan Aika24 (${serviceName})...`
              : `Opening Aika24 (${serviceName})...`
          );
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
