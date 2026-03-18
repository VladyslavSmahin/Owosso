import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const TOP_LINKS = [
  { to: '/bids', label: 'Bids' },
  { to: '/news', label: 'News' },
  { to: '/calendar', label: 'Calendar' },
  { to: '/forms-documents', label: 'Forms & Documents' },
  { to: '/minutes-agendas', label: 'Minutes & Agendas' },
  { to: '/faq', label: 'FAQ' },
];

export default function Header() {
  return (
    <header className="header">
      <div className="app-container">
        <div className="header__top">
          <nav className="header__nav-top" aria-label="Quick links">
            {TOP_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} className="header__nav-link header__nav-link--top">
                {label}
              </Link>
            ))}
          </nav>
          <div className="header__right">
            <div className="header__search">
              <input
                type="search"
                placeholder="Search..."
                className="header__search-input"
                aria-label="Search site"
              />
            </div>
            <ThemeToggle />
            <address className="header__contact">
              <span>301 W. Main Street</span>
              <span>Owosso, MI 48867</span>
              <a href="tel:+19897250599">(989) 725-0599</a>
            </address>
          </div>
        </div>
      </div>
    </header>
  );
}
