import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Sparkles,
  Scissors,
  CheckCircle2,
  AlertCircle,
  Play,
  RefreshCw,
  X,
  Radio,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { Language, AnalyticsSummary, Barber, Booking } from '../types';
import { translations } from '../data/translations';
import { BARBERS } from '../data/barberData';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  analyticsData: AnalyticsSummary;
  onSimulateNewBooking: () => void;
  onOpenBooking: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  isOpen,
  onClose,
  lang,
  analyticsData,
  onSimulateNewBooking,
  onOpenBooking,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'today' | 'week' | 'month'>('today');
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const t = translations[lang].analytics;

  if (!isOpen) return null;

  // Scale data based on timeframe
  const revenueMultiplier = activeTimeframe === 'today' ? 1 : activeTimeframe === 'week' ? 6.2 : 25;
  const bookingsMultiplier = activeTimeframe === 'today' ? 1 : activeTimeframe === 'week' ? 5.8 : 24;

  const currentRevenue = Math.round(analyticsData.todayRevenue * revenueMultiplier);
  const currentBookings = Math.round(analyticsData.totalBookingsToday * bookingsMultiplier);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="relative w-full max-w-6xl rounded-2xl bg-[#0f1117] border border-[#262b3a] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]"
      >
        {/* Dashboard Top Header */}
        <div className="flex flex-wrap items-center justify-between p-5 sm:p-6 border-b border-[#1f2330] bg-[#141722] gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#1b1f2d] border border-[#2b3245] flex items-center justify-center text-[#c89d56] shadow-inner">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  {t.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 text-[10px] font-bold tracking-wider uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
                  </span>
                  LIVE FEED
                </span>
              </div>
              <p className="text-xs text-[#8f95a5] mt-0.5">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Top Actions: Timeframe & Close */}
          <div className="flex items-center gap-3">
            {/* Timeframe selector */}
            <div className="flex items-center p-1 rounded-xl bg-[#1a1d28] border border-[#272c3d] text-xs">
              <button
                onClick={() => setActiveTimeframe('today')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTimeframe === 'today'
                    ? 'bg-[#c89d56] text-black shadow-sm'
                    : 'text-[#8e94a4] hover:text-white'
                }`}
              >
                {t.filterToday}
              </button>
              <button
                onClick={() => setActiveTimeframe('week')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTimeframe === 'week'
                    ? 'bg-[#c89d56] text-black shadow-sm'
                    : 'text-[#8e94a4] hover:text-white'
                }`}
              >
                {t.filterWeek}
              </button>
              <button
                onClick={() => setActiveTimeframe('month')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  activeTimeframe === 'month'
                    ? 'bg-[#c89d56] text-black shadow-sm'
                    : 'text-[#8e94a4] hover:text-white'
                }`}
              >
                {t.filterMonth}
              </button>
            </div>

            {/* Simulate Booking Button */}
            <button
              onClick={onSimulateNewBooking}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#1b2130] hover:bg-[#252c42] border border-[#2d3650] text-[#c89d56] hover:text-[#f3cb6d] text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title={t.simulatedNotice}
            >
              <Play className="w-3.5 h-3.5 fill-[#c89d56]" />
              <span>{t.triggerBooking}</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#1a1d28] hover:bg-[#272c3d] text-[#8e94a4] hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Key Metric KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Revenue */}
            <div className="p-5 rounded-xl bg-[#14161f] border border-[#222634] shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#8e94a4] mb-2">
                <span>{activeTimeframe === 'today' ? t.todayRevenue : t.weeklyRevenue}</span>
                <span className="p-1.5 rounded-lg bg-[#22c55e]/10 text-[#22c55e]">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                {currentRevenue} €
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-[#22c55e]">
                <span>+14.2%</span>
                <span className="text-[#6d7280]">{lang === 'fi' ? 'vs. edellinen jakso' : 'vs. previous period'}</span>
              </div>
            </div>

            {/* Bookings */}
            <div className="p-5 rounded-xl bg-[#14161f] border border-[#222634] shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#8e94a4] mb-2">
                <span>{t.bookingsToday}</span>
                <span className="p-1.5 rounded-lg bg-[#c89d56]/10 text-[#c89d56]">
                  <Calendar className="w-4 h-4" />
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                {currentBookings}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-[#8e94a4]">
                <span className="text-[#22c55e] font-semibold">{analyticsData.completedToday}</span>
                <span>{lang === 'fi' ? 'valmiina tänään' : 'completed today'}</span>
              </div>
            </div>

            {/* Occupancy Rate */}
            <div className="p-5 rounded-xl bg-[#14161f] border border-[#222634] shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#8e94a4] mb-2">
                <span>{t.occupancyRate}</span>
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                  <Scissors className="w-4 h-4" />
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[#c89d56]">
                {analyticsData.occupancyRate}%
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-[#8e94a4]">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]"></span>
                <span>{analyticsData.activeChairs} / {analyticsData.totalChairs} {lang === 'fi' ? 'tuolia työssä' : 'chairs active'}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="p-5 rounded-xl bg-[#14161f] border border-[#222634] shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-[#8e94a4] mb-2">
                <span>{t.avgRating}</span>
                <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                  ★
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-white flex items-center gap-1">
                <span>{analyticsData.averageSatisfaction}</span>
                <span className="text-sm font-normal text-[#6d7280]">/ 5.0</span>
              </div>
              <div className="mt-2 flex items-center gap-1 text-[11px] text-[#8e94a4]">
                <span>{analyticsData.totalReviews}</span>
                <span>{lang === 'fi' ? 'arvostelua Jyväskylästä' : 'verified client reviews'}</span>
              </div>
            </div>

          </div>

          {/* Section 2: Hourly Demand Chart & Station Occupancy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Hourly Traffic Chart (09:00 - 18:00) */}
            <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-[#14161f] border border-[#222634] shadow-md">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    {t.hourlyTrafficTitle}
                  </h4>
                  <p className="text-xs text-[#8e94a4] mt-0.5">
                    {t.hourlyTrafficDesc}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#c89d56] px-2.5 py-1 rounded-md bg-[#c89d56]/10 border border-[#c89d56]/30">
                  {lang === 'fi' ? 'Huippu: 14:00 - 17:00' : 'Peak: 14:00 - 17:00'}
                </span>
              </div>

              {/* Bespoke Interactive SVG Bar Chart */}
              <div className="mt-6 pt-2">
                <div className="h-44 flex items-end justify-between gap-2 sm:gap-3 border-b border-[#242836] pb-2">
                  {analyticsData.hourlyTraffic.map((bar, index) => {
                    const heightPercent = Math.round((bar.bookings / bar.capacity) * 100);
                    const isPeak = bar.bookings >= 3;
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-pointer"
                      >
                        {/* Hover Tooltip */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-12 px-2 py-1 rounded-md bg-[#0b0c0e] text-[10px] text-white whitespace-nowrap shadow-lg pointer-events-none border border-[#353a4c] z-10">
                          {bar.hour}: {bar.bookings} / {bar.capacity} {t.bookingsUnit}
                        </div>

                        {/* Bar */}
                        <div className="w-full max-w-[28px] h-full flex items-end justify-center">
                          <div
                            style={{ height: `${Math.max(heightPercent, 20)}%` }}
                            className={`w-full rounded-t-md transition-all duration-500 group-hover:brightness-125 ${
                              isPeak
                                ? 'bg-gradient-to-t from-[#9b7529] to-[#d4af37] shadow-md shadow-[#c89d56]/20'
                                : 'bg-gradient-to-t from-[#1f2330] to-[#3a4156]'
                            }`}
                          />
                        </div>

                        {/* Hour Label */}
                        <span className="text-[10px] sm:text-xs font-medium text-[#7a8090] group-hover:text-white transition-colors">
                          {bar.hour.split(':')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-between text-xs text-[#717684] pt-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#d4af37]"></span>
                      {lang === 'fi' ? 'Täysi kapasiteetti (3 tuolia)' : 'Full capacity (3 chairs)'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm bg-[#3a4156]"></span>
                      {lang === 'fi' ? 'Normaali varaus' : 'Normal capacity'}
                    </span>
                  </div>
                  <span>{lang === 'fi' ? 'Auki 09–18' : 'Open 09–18'}</span>
                </div>
              </div>
            </div>

            {/* Live Station Occupancy & Barbers */}
            <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#14161f] border border-[#222634] shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-display text-lg font-bold text-white">
                    {t.chairsStatusTitle}
                  </h4>
                  <span className="text-xs text-[#22c55e] font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
                    {lang === 'fi' ? 'Reaaliaikainen' : 'Live Status'}
                  </span>
                </div>

                <div className="space-y-3">
                  {BARBERS.map((barber) => (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedStation(barber.stationNumber)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedStation === barber.stationNumber
                          ? 'bg-[#1c202d] border-[#c89d56]'
                          : 'bg-[#161923] border-[#222634] hover:border-[#32384a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={barber.image}
                            alt={barber.name}
                            className="w-9 h-9 rounded-full object-cover border border-[#2c3140]"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{barber.name}</span>
                              <span className="text-[10px] text-[#787e8e]">#{t.chairLabel} {barber.stationNumber}</span>
                            </div>
                            <div className="text-[11px] text-[#8e94a4]">
                              {barber.status === 'busy' && barber.currentClient
                                ? barber.currentClient
                                : barber.status === 'available'
                                ? (lang === 'fi' ? 'Vapaa uudelle asiakkaalle' : 'Ready for next client')
                                : (lang === 'fi' ? 'Kahvitauko' : 'Coffee break')}
                            </div>
                          </div>
                        </div>

                        {/* Status Tag */}
                        <div>
                          {barber.status === 'available' ? (
                            <span className="px-2.5 py-1 rounded-md bg-[#22c55e]/15 text-[#22c55e] text-[10px] font-bold uppercase">
                              {t.available}
                            </span>
                          ) : barber.status === 'busy' ? (
                            <span className="px-2.5 py-1 rounded-md bg-[#f59e0b]/15 text-[#f59e0b] text-[10px] font-bold uppercase">
                              {t.cutting}
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-md bg-[#6b7280]/15 text-[#9ca3af] text-[10px] font-bold uppercase">
                              {t.onBreak}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Prompt to book an open chair */}
              <div className="mt-4 pt-3 border-t border-[#1f222e] flex items-center justify-between">
                <span className="text-xs text-[#828796]">
                  {lang === 'fi' ? 'Haluatko varata vapaan tuolin?' : 'Looking to book an open chair?'}
                </span>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#c89d56] text-black text-xs font-bold hover:bg-[#d4af37] transition-colors cursor-pointer"
                >
                  {lang === 'fi' ? 'Varaa Nyt' : 'Book Chair'}
                </button>
              </div>
            </div>

          </div>

          {/* Section 3: Popular Services & Real-time Live Activity Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Popular Services Share */}
            <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-[#14161f] border border-[#222634] shadow-md">
              <h4 className="font-display text-lg font-bold text-white mb-4">
                {t.serviceShareTitle}
              </h4>
              <div className="space-y-3.5">
                {analyticsData.popularServices.map((service, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-[#d4d8e4]">
                        {lang === 'fi' ? service.nameFi : service.nameEn}
                      </span>
                      <span className="font-bold text-[#c89d56]">{service.percentage}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#1e2230] overflow-hidden">
                      <div
                        style={{ width: `${service.percentage}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#b88c42] to-[#d4af37]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-Time Live Activity Feed */}
            <div className="lg:col-span-7 p-5 sm:p-6 rounded-2xl bg-[#14161f] border border-[#222634] shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-white">
                    {t.realtimeFeedTitle}
                  </h4>
                  <p className="text-xs text-[#8e94a4] mt-0.5">
                    {t.simulatedNotice}
                  </p>
                </div>

                <button
                  onClick={onSimulateNewBooking}
                  className="sm:hidden flex items-center gap-1 text-xs text-[#c89d56] font-bold"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Simuloi</span>
                </button>
              </div>

              <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                {analyticsData.recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-3 rounded-xl bg-[#171a24] border border-[#232736] flex items-center justify-between text-xs animate-in fade-in duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#202434] flex items-center justify-center text-[#c89d56] shrink-0">
                        {activity.type === 'booking' ? (
                          <Calendar className="w-4 h-4 text-[#c89d56]" />
                        ) : activity.type === 'complete' ? (
                          <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                        ) : (
                          <Users className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {activity.customerName}{' '}
                          <span className="font-normal text-[#8e94a4]">
                            • {activity.serviceName}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#717684]">
                          {lang === 'fi' ? 'Tekijä' : 'Barber'}: {activity.barberName}
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] text-[#8e94a4] shrink-0">
                      {activity.timeAgo}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Dashboard Footer */}
        <div className="p-4 sm:p-5 border-t border-[#1f2330] bg-[#141722] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#8e94a4]">
            <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
            <span>
              {lang === 'fi'
                ? 'Data synkronoituu reaaliaikaisesti Parturi-Kampaamo FreeStylen varausjärjestelmän kanssa.'
                : 'Data synchronizes in real-time with FreeStyle Barbershop booking engine.'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1b1f2d] hover:bg-[#252a3d] text-white font-semibold transition-colors cursor-pointer"
          >
            {t.closeDashboard}
          </button>
        </div>

      </motion.div>
    </div>
  );
};
