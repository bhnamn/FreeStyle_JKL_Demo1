import { useState, useEffect } from 'react';
import { SHOP_INFO } from '../data/barberData';

export type DevicePlatform = 'ios' | 'mac' | 'android' | 'windows' | 'other';
export type MapProvider = 'apple' | 'google';

export interface MapLinkInfo {
  url: string;
  target?: string;
  rel?: string;
  platform: DevicePlatform;
  provider: MapProvider;
  isMobileDevice: boolean;
}

/**
 * Detects the user's platform/operating system based on user-agent,
 * navigator.platform, and touch capabilities (e.g. for modern iPads).
 */
export function detectUserPlatform(): DevicePlatform {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'other';
  }

  const ua = navigator.userAgent || '';
  const platform =
    (navigator as unknown as { userAgentData?: { platform?: string }; platform?: string })
      ?.platform || '';

  // 1. iOS check: iPhone, iPad, iPod
  // Note: Modern iPadOS in Safari reports "Macintosh" in userAgent and "MacIntel" in platform,
  // but has maxTouchPoints > 1.
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    ((/Macintosh|MacIntel/i.test(platform) || /Macintosh/i.test(ua)) &&
      navigator.maxTouchPoints > 1);

  if (isIOS) {
    return 'ios';
  }

  // 2. Android check: Android phones and tablets
  const isAndroid = /Android/i.test(ua);
  if (isAndroid) {
    return 'android';
  }

  // 3. macOS check: MacBooks, iMacs, Mac mini/Studio/Pro (non-touch)
  const isMac =
    (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(platform) || /Mac OS X/i.test(ua)) &&
    navigator.maxTouchPoints <= 1;

  if (isMac) {
    return 'mac';
  }

  // 4. Windows PC check
  const isWindows =
    /Win32|Win64|Windows|WinCE/i.test(platform) || /Windows NT/i.test(ua);

  if (isWindows) {
    return 'windows';
  }

  return 'other';
}

/**
 * Computes the exact map URL and target options based on device platform
 * using the business's exact latitude and longitude.
 */
export function getMapLinkInfo(): MapLinkInfo {
  const platform = detectUserPlatform();
  const { lat, lng } = SHOP_INFO.coordinates;
  const placeName = encodeURIComponent(SHOP_INFO.name);
  const addressEncoded = encodeURIComponent(SHOP_INFO.fullAddress);

  switch (platform) {
    case 'ios': {
      // iPhone / iPad: Apple Maps Universal Link
      // Following normal mobile behavior: no target="_blank" so iOS directly hands off to the native Apple Maps app.
      return {
        url: `https://maps.apple.com/?q=${placeName}&ll=${lat},${lng}&address=${addressEncoded}`,
        target: undefined,
        rel: undefined,
        platform: 'ios',
        provider: 'apple',
        isMobileDevice: true,
      };
    }

    case 'mac': {
      // MacBook / macOS: Apple Maps with fallback to Apple Maps web / system map handler
      // Opened in a new tab/window on desktop
      return {
        url: `https://maps.apple.com/?q=${placeName}&ll=${lat},${lng}&address=${addressEncoded}`,
        target: '_blank',
        rel: 'noopener noreferrer',
        platform: 'mac',
        provider: 'apple',
        isMobileDevice: false,
      };
    }

    case 'android': {
      // Android phone / tablet: Google Maps with exact latitude and longitude
      // Following normal mobile behavior: no target="_blank" so Android intent filter opens Google Maps app.
      return {
        url: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
        target: undefined,
        rel: undefined,
        platform: 'android',
        provider: 'google',
        isMobileDevice: true,
      };
    }

    case 'windows':
    default: {
      // Windows PC and other platforms (Linux, ChromeOS, web fallbacks): Google Maps with exact coordinates in new tab
      return {
        url: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
        target: '_blank',
        rel: 'noopener noreferrer',
        platform,
        provider: 'google',
        isMobileDevice: false,
      };
    }
  }
}

/**
 * React hook to retrieve client-resolved map link information.
 */
export function useMapLink(): MapLinkInfo {
  const [mapLink, setMapLink] = useState<MapLinkInfo>(() => getMapLinkInfo());

  useEffect(() => {
    // Recompute on client mount to guarantee fresh device detection
    setMapLink(getMapLinkInfo());
  }, []);

  return mapLink;
}
