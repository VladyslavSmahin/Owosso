import { Link } from 'react-router-dom';
import './Footer.css';

const FOOTER_NAV = [
  { to: '/', label: 'Home' },
  { to: '/bids', label: 'Bids' },
  { to: '/community', label: 'Community' },
  { to: '/government', label: 'Government' },
  { to: '/departments-services', label: 'Departments & Services' },
  { to: '/utilities', label: 'Utilities' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="app-container">
        <h2 className="footer__brand">City of Owosso</h2>
        <div className="footer__row">
          <div className="footer__col footer__col--contact">
            <address className="footer__address">
              301 W. Main Street<br />
              Owosso, MI 48867<br />
              <a href="tel:+19897250599">(989) 725-0599</a>
            </address>
          </div>
          <nav className="footer__col footer__col--nav" aria-label="Footer navigation">
            <div className="footer__nav">
              {FOOTER_NAV.map(({ to, label }) => (
                <Link key={to} to={to} className="footer__nav-link">{label}</Link>
              ))}
            </div>
          </nav>
          <div className="footer__col footer__col--copy">
            <p className="footer__copyright">
              &copy; {new Date().getFullYear()} City of Owosso. All rights reserved.
            </p>
            <p className="footer__credit">
              Website by <a href="https://webascender.com" target="_blank" rel="noopener noreferrer">Web Ascender</a>
            </p>
            <div className="footer__links footer__links--copy">
              <Link to="/contact">Contact Us &raquo;</Link>
              <Link to="/sitemap">Sitemap &raquo;</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
