import { useLocation } from 'react-router-dom';
import './PlaceholderPage.css';

export default function PlaceholderPage() {
  const { pathname } = useLocation();
  const slug = pathname.slice(1) || 'home';
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <main className="placeholder-page">
      <div className="app-container">
        <h1 className="placeholder-page__title">{title}</h1>
        <p className="placeholder-page__text">This section is coming soon.</p>
      </div>
    </main>
  );
}
