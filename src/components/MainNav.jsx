import { NavLink } from 'react-router-dom';
import './MainNav.css';

const MAIN_NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/community', label: 'Community', end: false },
  { to: '/government', label: 'Government', end: false },
  { to: '/departments-services', label: 'Departments & Services', end: false },
  { to: '/utilities', label: 'Utilities', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

export default function MainNav() {
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <div className="main-nav__inner">
        {MAIN_NAV.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `main-nav__link ${isActive ? 'main-nav__link--active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
