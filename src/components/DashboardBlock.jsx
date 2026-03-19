import { Link } from 'react-router-dom';
import './DashboardBlock.css';

const DASHBOARD_LINKS = [
  { to: '/dashboard/revenue-sharing', label: '2023 City, Village and Township Revenue Sharing & County Incentive Program Reporting' },
  { to: '/dashboard/form-6056', label: '2023 Form 6056' },
  { to: '/dashboard/citizen-guide', label: "Citizen's Guide to Finances" },
  { to: '/dashboard/finance-docs', label: 'Finance Department Documents' },
  { to: '/dashboard/budget', label: 'Annual Budget Summary' },
  { to: '/dashboard/audit', label: 'Annual Audit Report' },
];

export default function DashboardBlock() {
  return (
    <section className="dashboard-block" aria-label="Owosso Dashboard">
      <h2 className="dashboard-block__title">Owosso Dashboard</h2>
      <hr className="dashboard-block__divider" />
      <ul className="dashboard-block__list">
        {DASHBOARD_LINKS.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className="dashboard-block__link">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
