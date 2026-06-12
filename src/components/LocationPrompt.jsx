'use client';
import { useEffect, useState } from 'react';

/**
 * Prompts the user for geolocation permission on page load.
 * If granted, silently sends lat/lng to the server.
 * Shows a subtle, non-intrusive toast-style prompt that auto-dismisses.
 */
export default function LocationPrompt() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't prompt if already captured this session
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('loc_captured')) return;

    // Small delay so the page loads first
    const timer = setTimeout(() => {
      if (!navigator.geolocation) return;
      setVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleAllow = () => {
    setVisible(false);
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
        // User denied or error — just dismiss
        sessionStorage.setItem('loc_captured', '1');
      },
      { timeout: 10000, maximumAge: 300000 }
    );
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('loc_captured', '1');
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible) return null;

  return (
    <div className={`loc-prompt${dismissed ? ' loc-prompt-out' : ''}`}>
      <div className="loc-prompt-inner">
        <div className="loc-prompt-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <div className="loc-prompt-text">
          <strong>Enable location</strong>
          <span>Help us serve your area better</span>
        </div>
        <div className="loc-prompt-actions">
          <button className="loc-btn-allow" onClick={handleAllow}>Allow</button>
          <button className="loc-btn-dismiss" onClick={handleDismiss}>Not now</button>
        </div>
      </div>
    </div>
  );
}
