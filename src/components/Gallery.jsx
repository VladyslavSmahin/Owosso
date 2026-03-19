import { useState, useEffect } from 'react';
import './Gallery.css';

const INTERVAL_MS = 10000;
const MAX_SLIDES = 100;
const EXTENSIONS = ['jpg', 'jpeg', 'webp', 'png', 'gif'];

/** Последовательная предзагрузка: одна картинка за раз, после загрузки — следующая (меньше 404 и нагрузка). */
export function preloadGallerySequential(onProgress) {
  let num = 1;
  let extIndex = 0;

  function tryNext() {
    if (num > MAX_SLIDES) {
      onProgress?.({ done: true });
      return;
    }
    const ext = EXTENSIONS[extIndex];
    const src = `/${num}.${ext}`;
    const img = new Image();
    img.onload = () => {
      num++;
      extIndex = 0;
      onProgress?.({ num: num - 1, src });
      tryNext();
    };
    img.onerror = () => {
      extIndex++;
      if (extIndex >= EXTENSIONS.length) {
        num++;
        extIndex = 0;
      }
      tryNext();
    };
    img.src = src;
  }
  tryNext();
}

export function discoverSlides(callback) {
  const found = [];
  let currentNum = 1;
  let currentExt = 0;

  function tryNext() {
    if (currentNum > MAX_SLIDES) {
      callback(found);
      return;
    }
    const ext = EXTENSIONS[currentExt];
    const src = `/${currentNum}.${ext}`;
    const img = new Image();
    const num = currentNum;
    img.onload = () => {
      found.push({
        id: `${num}-${ext}`,
        src,
        alt: `Owosso ${num}`,
      });
      currentNum++;
      currentExt = 0;
      tryNext();
    };
    img.onerror = () => {
      currentExt++;
      if (currentExt >= EXTENSIONS.length) {
        currentNum++;
        currentExt = 0;
      }
      tryNext();
    };
    img.src = src;
  }

  tryNext();
}

export default function Gallery() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    discoverSlides(setSlides);
  }, []);

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
