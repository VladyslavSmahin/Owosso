import { useState, useEffect } from 'react';
import './Gallery.css';

const INTERVAL_MS = 10000;

/** Список картинок галереи — только существующие пути, без проверки через запросы. */
const GALLERY_SLIDES = [
  { id: '1', src: '/1.webp', alt: 'Owosso 1' },
  { id: '2', src: '/2.webp', alt: 'Owosso 2' },
  { id: '3', src: '/3.webp', alt: 'Owosso 3' },
  { id: '4', src: '/4.webp', alt: 'Owosso 4' },
  { id: '5', src: '/5.webp', alt: 'Owosso 5' },
  { id: '6', src: '/6.webp', alt: 'Owosso 6' },
];

/** Для HomePage (пины на карте): отдаём список синхронно. */
export function discoverSlides(callback) {
  callback(GALLERY_SLIDES);
}

/** Предзагрузка во время сплеша — только известные пути, по одному. */
export function preloadGallerySequential(onProgress) {
  let i = 0;
  function next() {
    if (i >= GALLERY_SLIDES.length) {
      onProgress?.({ done: true });
      return;
    }
    const slide = GALLERY_SLIDES[i];
    const img = new Image();
    img.onload = () => {
      i++;
      onProgress?.({ num: i, src: slide.src });
      next();
    };
    img.onerror = () => {
      i++;
      next();
    };
    img.src = slide.src;
  }
  next();
}

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const slides = GALLERY_SLIDES;

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="gallery" aria-label="Photo gallery">
      <div className="gallery__track">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={`gallery__slide ${i === index ? 'gallery__slide--active' : ''}`}
          >
            <img src={slide.src} alt={slide.alt} className="gallery__img" />
          </div>
        ))}
      </div>
    </section>
  );
}
