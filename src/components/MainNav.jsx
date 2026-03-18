import { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import './MainNav.css';

const DROPDOWN_LABELS = [
  'Parks & Facilities', 'Things to Do', 'Residential Opportunities', 'Photo Gallery',
  'Events & Calendar', 'Libraries', 'Recreation', 'Community Center', 'Senior Services',
  'Housing', 'Neighborhoods', 'Volunteer', 'Business Resources', 'Permits', 'Public Safety',
  'Streets & Roads', 'Water & Sewer', 'Trash & Recycling', 'Pay a Bill', 'Report a Concern',
  'Documents', 'Minutes & Agendas', 'Elections', 'City Council', 'Boards & Commissions',
  'Code of Ordinances', 'Budget', 'Employment', 'Permits & Licenses', 'Building & Zoning',
];

function pickRandomItems(min = 5, max = 15) {
  const count = min + Math.floor(Math.random() * (max - min + 1));
  const shuffled = [...DROPDOWN_LABELS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const MAIN_NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/community', label: 'Community', end: false, hasDropdown: true },
  { to: '/government', label: 'Government', end: false, hasDropdown: true },
  { to: '/departments-services', label: 'Departments & Services', end: false, hasDropdown: true },
  { to: '/utilities', label: 'Utilities', end: false, hasDropdown: true },
  { to: '/contact', label: 'Contact', end: false },
];

function slug(str) {
  return str.toLowerCase().replace(/\s*&\s*/g, '-').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function MainNav() {
  const dropdowns = useMemo(() => {
    return MAIN_NAV.filter((item) => item.hasDropdown).map(() => pickRandomItems(5, 15));
  }, []);

  let dropdownIndex = 0;
  return (
    <nav className="main-nav" aria-label="Main navigation">
      <div className="main-nav__inner">
        {MAIN_NAV.map(({ to, label, end, hasDropdown }) => {
          const items = hasDropdown ? dropdowns[dropdownIndex++] : null;
          const half = items ? Math.ceil(items.length / 2) : 0;
          const col1 = items ? items.slice(0, half) : [];
          const col2 = items ? items.slice(half) : [];

          if (hasDropdown && items?.length) {
            return (
              <div key={to} className="main-nav__item main-nav__item--has-dropdown">
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `main-nav__link ${isActive ? 'main-nav__link--active' : ''}`
                  }
                >
                  {label}
                </NavLink>
                <div className="main-nav__dropdown" role="menu">
                  <div className="main-nav__dropdown-inner">
                    <div className="main-nav__dropdown-col">
                      {col1.map((itemLabel) => (
                        <NavLink
                          key={itemLabel}
                          to={`${to}/${slug(itemLabel)}`}
                          className="main-nav__dropdown-link"
                          role="menuitem"
                        >
                          {itemLabel}
                        </NavLink>
                      ))}
                    </div>
                    <div className="main-nav__dropdown-col">
                      {col2.map((itemLabel) => (
                        <NavLink
                          key={itemLabel}
                          to={`${to}/${slug(itemLabel)}`}
                          className="main-nav__dropdown-link"
                          role="menuitem"
                        >
                          {itemLabel}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          return (
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
          );
        })}
      </div>
    </nav>
  );
}
