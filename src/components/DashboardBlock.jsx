import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPaginationItems, PAGINATION_ELLIPSIS } from '../utils/paginationItems';
import './DashboardBlock.css';

const DASHBOARD_LABEL_MAX = 70;
const ITEMS_PER_PAGE = 9;
const FADE_DURATION_MS = 280;

function truncateDashboardLabel(text) {
  if (text.length <= DASHBOARD_LABEL_MAX) return text;
  return `${text.slice(0, DASHBOARD_LABEL_MAX)}...`;
}

const DASHBOARD_LINKS = [
  { to: '/dashboard/revenue-sharing', label: '2023 City, Village and Township Revenue Sharing & County Incentive Program Reporting' },
  { to: '/dashboard/form-6056', label: '2023 Form 6056 — Annual Local Government Financial Report Filing Instructions, Deadlines, Supporting Schedules, and Where to Submit Completed Materials to the State Treasury' },
  { to: '/dashboard/citizen-guide', label: "Citizen's Guide to Finances" },
  { to: '/dashboard/finance-docs', label: 'Finance Department Documents — Monthly Treasurer Reports, Investment Policy Summaries, Debt Service Schedules, and Archived Monthly Financial Statements for Public Review and Download' },
  { to: '/dashboard/budget', label: 'Annual Budget Summary' },
  { to: '/dashboard/audit', label: 'Annual Audit Report' },
  { to: '/dashboard/foia', label: 'FOIA Forms and How to Submit a Request' },
  { to: '/dashboard/elections', label: 'Election Information and Polling Places — Voter Registration Deadlines, Absentee Ballot Rules, Sample Ballots, Ward Maps, and Accessibility Services for City and County Elections' },
  { to: '/dashboard/utility-bills', label: 'Pay Utility Bills Online and Auto Pay Setup' },
  { to: '/dashboard/parks', label: 'Parks Programs Field Rentals and Reservations' },
  { to: '/dashboard/public-works', label: 'Street Projects Snow Removal and Trash Schedule — Current Road Closures, Seasonal Plowing Priorities, Yard Waste Pickup Calendar, and How to Report a Missed Collection or Hazardous Spill' },
];

const totalPages = Math.max(1, Math.ceil(DASHBOARD_LINKS.length / ITEMS_PER_PAGE));

export default function DashboardBlock() {
  const [page, setPage] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  const goToPage = useCallback((nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setPage(nextPage);
      setIsExiting(false);
    }, FADE_DURATION_MS);
  }, [isExiting]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageLinks = DASHBOARD_LINKS.slice(start, start + ITEMS_PER_PAGE);
  const paginationItems = useMemo(
    () => getPaginationItems(page, totalPages),
    [page],
  );

  return (
    <section className="dashboard-block" aria-label="Owosso Dashboard">
      <h2 className="dashboard-block__title">Owosso Dashboard</h2>
      <hr className="dashboard-block__divider" />
      <div
        className={`dashboard-block__list-wrap ${isExiting ? 'dashboard-block__list-wrap--exiting' : 'dashboard-block__list-wrap--entering'}`}
      >
        <ul className="dashboard-block__list" key={page}>
          {pageLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className="dashboard-block__link"
                title={label}
                aria-label={label}
              >
                {truncateDashboardLabel(label)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {totalPages > 1 && (
        <nav className="dashboard-block__pagination" aria-label="Dashboard pages">
          <button
            type="button"
            className="dashboard-block__page-btn"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1 || isExiting}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="dashboard-block__pagination-center">
            <span className="dashboard-block__pages" role="group" aria-label="Pages">
              {paginationItems.map((item, idx) =>
                item === PAGINATION_ELLIPSIS ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="dashboard-block__pagination-ellipsis"
                    aria-hidden
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={`dashboard-block__page-num ${item === page ? 'dashboard-block__page-num--current' : ''}`}
                    onClick={() => goToPage(item)}
                    disabled={isExiting}
                    aria-label={`Page ${item}`}
                    aria-current={item === page ? 'page' : undefined}
                  >
                    {item}
                  </button>
                ),
              )}
            </span>
          </div>
          <button
            type="button"
            className="dashboard-block__page-btn"
            onClick={() => goToPage(page + 1)}
            disabled={page >= totalPages || isExiting}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
}
