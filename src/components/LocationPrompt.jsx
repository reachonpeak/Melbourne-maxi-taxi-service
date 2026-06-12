'use client';
import { useEffect } from 'react';

/**
 * Triggers the browser's native geolocation permission popup on first visit.
 * If the user grants permission, silently sends lat/lng to the server.
 * Renders nothing — relies entirely on the browser's built-in prompt.
 */
export default function LocationPrompt() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!navigator.geolocation) return;

    // Don't prompt again this session
    if (sessionStorage.getItem('loc_captured')) return;

    // Trigger the browser's native location permission popup immediately
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        sessionStorage.setItem('loc_captured', '1');
        try {
          await fetch('/api/visitor-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lat: latitude,
              lng: longitude,
              page: window.location.pathname,
              ua: navigator.userAgent,
            }),
          });
        } catch {
          // Silently fail — not critical
        }
      },
      () => {
        // User denied or error — mark as captured so we don't ask again
        sessionStorage.setItem('loc_captured', '1');
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  }, []);

  // No UI — the browser's native popup handles the permission prompt
  return null;
}
