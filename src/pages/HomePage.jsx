import { useState, useEffect, useRef } from 'react';
import Gallery, { discoverSlides } from '../components/Gallery';
import PopularLinks from '../components/PopularLinks';
import CTAWidgets from '../components/CTAWidgets';
import DashboardBlock from '../components/DashboardBlock';
import CommunityCalendar from '../components/CommunityCalendar';
import NewsBlock from '../components/NewsBlock';
import NewsletterForm from '../components/NewsletterForm';
import Footer from '../components/Footer';
import './HomePage.css';

const PIN_POSITIONS = [
  { left: 18, top: 22 },
  { left: 42, top: 18 },
  { left: 65, top: 25 },
  { left: 28, top: 45 },
  { left: 52, top: 42 },
  { left: 75, top: 48 },
  { left: 22, top: 68 },
  { left: 48, top: 65 },
  { left: 70, top: 72 },
  { left: 35, top: 82 },
];

export default function HomePage() {
  const [gallerySlides, setGallerySlides] = useState([]);
  const [addPlaceMode, setAddPlaceMode] = useState(false);
  const [newPinPos, setNewPinPos] = useState(null);
  const [addPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [addPlaceDescription, setAddPlaceDescription] = useState('');
  const addPlaceFileInputRef = useRef(null);

  useEffect(() => {
    discoverSlides(setGallerySlides);
  }, []);

  const pinImages = gallerySlides.slice(0, 10);
  while (pinImages.length < 10) {
    pinImages.push({ src: '', alt: '' });
  }

  const handleMapClick = (e) => {
    if (!addPlaceMode || addPlacePopupOpen) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const left = ((e.clientX - rect.left) / rect.width) * 100;
    const top = ((e.clientY - rect.top) / rect.height) * 100;
    setNewPinPos({ left, top });
    setAddPlacePopupOpen(true);
  };

  const closeAddPlace = () => {
    setAddPlacePopupOpen(false);
    setNewPinPos(null);
    setAddPlaceDescription('');
    setAddPlaceMode(false);
  };

  return (
    <main className="home-page">
      <section className="home-page__hero" aria-label="Hero">
        <div className="home-page__hero-gallery">
          <Gallery />
        </div>
        <h1 className="home-page__hero-title">City of Owosso</h1>
      </section>
      <section className="home-page__popular" aria-label="Popular links">
        <div className="app-container">
          <PopularLinks />
          <CTAWidgets />
        </div>
      </section>
      <div className="home-page__wrap">
        <div className="app-container home-page__content">
          <NewsBlock />
        </div>
        <div className="home-page__map-zone">
          <div className="home-page__map-sticky-stack">
          <div
            className={`home-page__map-viewport ${addPlaceMode ? 'home-page__map-viewport--fullscreen' : ''}`}
            aria-hidden="true"
          >
            {addPlaceMode && (
              <button
                type="button"
                className="home-page__map-close-btn"
                onClick={closeAddPlace}
                aria-label="Close"
              >
                Close
              </button>
            )}
            <div
              className="home-page__map-click-surface"
              role={addPlaceMode ? 'button' : undefined}
              tabIndex={addPlaceMode ? 0 : -1}
              onClick={handleMapClick}
              aria-label={addPlaceMode ? 'Click on map to place a pin' : undefined}
              style={{ pointerEvents: addPlaceMode ? 'auto' : 'none' }}
            />
            <div className="home-page__map-pins">
              {PIN_POSITIONS.map((pos, i) => (
                <div
                  key={i}
                  className="home-page__map-pin"
                  style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                  title="View photo"
                >
                  <span
                    className="home-page__map-pin-drop"
                    style={{ backgroundImage: pinImages[i]?.src ? `url(${pinImages[i].src})` : undefined }}
                    aria-hidden="true"
                  />
                </div>
              ))}
              {newPinPos && (
                <div
                  className="home-page__map-pin home-page__map-pin--new"
                  style={{ left: `${newPinPos.left}%`, top: `${newPinPos.top}%` }}
                >
                  <span className="home-page__map-pin-drop" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
          {addPlacePopupOpen && (
            <div className="home-page__add-place-popup-backdrop" onClick={closeAddPlace} aria-hidden="true">
              <div
                className="home-page__add-place-popup"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-labelledby="add-place-title"
                aria-modal="true"
              >
                <h3 id="add-place-title" className="home-page__add-place-popup-title">
                  New place
                </h3>
                <label className="home-page__add-place-label">
                  Description
                </label>
                <textarea
                  className="home-page__add-place-description"
                  value={addPlaceDescription}
                  onChange={(e) => setAddPlaceDescription(e.target.value)}
                  placeholder="Describe the place..."
                  rows={3}
                />
                <input
                  ref={addPlaceFileInputRef}
                  type="file"
                  accept="image/*"
                  className="home-page__add-place-file-input"
                  aria-label="Upload photo"
                  onChange={() => {}}
                />
                <div className="home-page__add-place-popup-actions">
                  <button
                    type="button"
                    className="home-page__add-place-upload-btn"
                    onClick={() => addPlaceFileInputRef.current?.click()}
                  >
                    Upload photo
                  </button>
                  <button type="button" className="home-page__add-place-cancel-btn" onClick={closeAddPlace}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="home-page__map-content">
            <div className="home-page__map-content-inner">
              <div className="home-page__map-caption-block">
                <p className="home-page__map-caption-text">
                  Suggest your photo for the city map —{' '}
                  <button
                    type="button"
                    className="home-page__map-caption-btn"
                    onClick={() => setAddPlaceMode(true)}
                    aria-label="Open map to add your photo"
                  >
                    click here
                  </button>
                </p>
              <p className="home-page__map-caption-hint">
                The map will open full screen. Click on the map where you want to add a spot—a window will open with a description field and an “Upload photo” button.
              </p>
              </div>
              <section className="home-page__dashboard-bg" aria-label="Dashboard and Calendar">
                <div className="home-page__dashboard-inner">
                <div className="home-page__dashboard-row">
                  <div className="home-page__dashboard-col home-page__dashboard-col--70">
                    <DashboardBlock />
                  </div>
                  <div className="home-page__dashboard-col home-page__dashboard-col--30">
                    <CommunityCalendar />
                  </div>
                  </div>
                </div>
              </section>
              <div className="home-page__content home-page__map-content-form">
                <NewsletterForm />
              </div>
            </div>
          </div>
          </div>
          <div className="home-page__map-footer-slot">
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
