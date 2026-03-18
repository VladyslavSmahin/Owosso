import { Link } from 'react-router-dom';
import './PopularLinks.css';

const LINKS = [
  { to: '/donate', label: 'Donate to Community Causes' },
  { to: '/garbage-brush', label: 'Garbage and Brush Pickup' },
  { to: '/jobs', label: 'Job Openings' },
  { to: '/foia', label: 'FOIA Requests' },
  { to: '/parks-facilities', label: 'Parks & Facilities' },
  { to: '/property', label: 'Property Information' },
];

export default function PopularLinks() {
  return (
    <aside className="popular-links">
      <h2 className="popular-links__title">Popular Links</h2>
      <ul className="popular-links__list">
        {LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className="popular-links__link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
