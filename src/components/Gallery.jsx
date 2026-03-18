import { useState, useEffect } from 'react';
import './Gallery.css';

const INTERVAL_MS = 2000;
const MAX_SLIDES = 100;

function discoverSlides(callback) {
  const found = [];
  let current = 1;

  function tryNext() {
    if (current > MAX_SLIDES) {
      callback(found);
      return;
    }
    const img = new Image();
    const num = current;
    img.onload = () => {
      found.push({
        id: num,
        src: `/${num}.jpg`,
        alt: `Owosso ${num}`,
      });
      current++;
      tryNext();
    };
    img.onerror = () => {
      callback(found);
    };
    img.src = `/${num}.jpg`;
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
