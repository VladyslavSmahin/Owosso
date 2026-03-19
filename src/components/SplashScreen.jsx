import { useEffect, useState } from 'react';
import { preloadGallerySequential } from './Gallery';
import './SplashScreen.css';

function getTimeOfDay(hour) {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export default function SplashScreen({ onComplete }) {
  const [loaderDone, setLoaderDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const hour = now.getHours();
  const isDay = hour >= 6 && hour < 17;
  const timeOfDay = getTimeOfDay(hour);
  const timeString = formatTime(now);

  useEffect(() => {
    preloadGallerySequential();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!loaderDone) return;
    setFadeOut(true);
    const t = setTimeout(() => onComplete(), 600);
    return () => clearTimeout(t);
  }, [loaderDone, onComplete]);

  return (
    <div className={`splash ${fadeOut ? 'splash--out' : ''}`} aria-hidden={fadeOut}>
      <div className="splash__inner">
        <div className="splash__icon" aria-hidden="true">
          {isDay ? (
            <div className="splash__sky">
              <svg className="splash__sun" viewBox="0 0 48 48" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="24" cy="24" r="8" />
                <path d="M24 4v4M24 40v4M4 24h4M40 24h4M8.5 8.5l2.8 2.8M36.7 36.7l2.8 2.8M8.5 39.5l2.8-2.8M36.7 11.3l2.8-2.8" />
              </svg>
              <svg className="splash__cloud splash__cloud--day" viewBox="0 0 64 32" width="56" height="28" fill="currentColor">
                <ellipse cx="16" cy="22" rx="14" ry="8" />
                <ellipse cx="32" cy="18" rx="16" ry="10" />
                <ellipse cx="48" cy="22" rx="14" ry="8" />
              </svg>
            </div>
          ) : (
            <div className="splash__sky">
              <svg className="splash__moon" viewBox="0 0 48 48" width="48" height="48" fill="currentColor">
                <path d="M24 4c-2 4-4 10-4 16s2 12 4 16c-6-2-12-8-12-16S18 6 24 4z" />
              </svg>
              <svg className="splash__cloud splash__cloud--night" viewBox="0 0 64 32" width="56" height="28" fill="currentColor">
                <ellipse cx="16" cy="22" rx="14" ry="8" />
                <ellipse cx="32" cy="18" rx="16" ry="10" />
                <ellipse cx="48" cy="22" rx="14" ry="8" />
              </svg>
            </div>
          )}
        </div>
        <div className="splash__logo">
          <img src="/logo-bg.png" alt="" />
        </div>
        <div className="splash__time" aria-live="polite">
          {timeString}
        </div>
        <p className="splash__greeting">
          Good {timeOfDay} in City of Owosso
        </p>
        <div className="splash__loader">
          <div className="splash__loader-bar" />
        </div>
      </div>
    </div>
  );
}
