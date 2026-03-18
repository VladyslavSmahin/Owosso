import { Link } from 'react-router-dom';
import './CTAWidgets.css';

const WIDGETS = [
  {
    to: '/report-concern',
    title: 'Report a Concern',
    description: 'Use our online form to report a complaint or issues.',
    icon: '!',
    variant: 'teal',
  },
  {
    to: '/pay',
    title: 'Pay Here',
    description: 'Pay tax, utility and ambulance bills online and set up automatic bill pay.',
    icon: '$',
    variant: 'green',
  },
];

export default function CTAWidgets() {
  return (
    <section className="cta-widgets" aria-label="Quick actions">
      <div className="cta-widgets__inner">
        {WIDGETS.map((w) => (
          <Link
            key={w.to}
            to={w.to}
            className={`cta-widget cta-widget--${w.variant}`}
          >
            <span className="cta-widget__icon" aria-hidden="true">
              {w.icon}
            </span>
            <span className="cta-widget__text">
              <span className="cta-widget__title">{w.title}</span>
              <span className="cta-widget__desc">
                {w.description} <span className="cta-widget__more">more »</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
