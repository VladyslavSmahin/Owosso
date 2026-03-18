import { useEffect, useState } from 'react';
import './SplashScreen.css';

export default function SplashScreen({ onComplete }) {
  const [loaderDone, setLoaderDone] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
        <div className="splash__logo">
          <img src="/logo-bg.png" alt="City of Owosso" />
        </div>
        <div className="splash__title" aria-hidden="false">
          <svg viewBox="0 0 320 48" className="splash__svg-text" aria-label="City of Owosso">
            <text x="50%" y="32" textAnchor="middle" className="splash__svg-text-inner">
              City of Owosso
            </text>
          </svg>
        </div>
        <div className="splash__loader">
          <div className="splash__loader-bar" />
        </div>
      </div>
    </div>
  );
}
