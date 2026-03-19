import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './CommunityCalendar.css';

const EVENTS_PER_PAGE = 3;
const FADE_DURATION_MS = 280;

const CALENDAR_EVENTS = [
  { id: 1, date: '2026-03-20', time: '7:00 PM', title: 'City Council Regular Meeting', location: 'City Hall Council Chambers' },
  { id: 2, date: '2026-03-23', time: '6:30 PM', title: 'Planning Commission', location: 'City Hall' },
  { id: 3, date: '2026-03-23', time: '6:30 PM', title: 'WWTP Review Board', location: 'City Hall' },
  { id: 4, date: '2026-03-25', time: '6:00 PM', title: 'Planning Commission Meeting', location: 'City Hall' },
  { id: 5, date: '2026-03-27', time: '5:30 PM', title: 'Parks & Recreation Board', location: 'Owosso City Hall' },
  { id: 6, date: '2026-04-01', time: '7:00 PM', title: 'City Council Regular Meeting', location: 'City Hall Council Chambers' },
  { id: 7, date: '2026-04-08', time: '4:00 PM', title: 'Public Hearing - Zoning', location: 'City Hall' },
  { id: 8, date: '2026-04-15', time: '6:30 PM', title: 'Downtown Development Authority', location: 'City Hall' },
  { id: 9, date: '2026-04-22', time: '7:00 PM', title: 'City Council Regular Meeting', location: 'City Hall Council Chambers' },
];

function formatDate(str) {
  const d = new Date(str + 'T12:00:00');
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  return {
    month: months[d.getMonth()],
    day: d.getDate(),
    full: d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

const TOTAL_PAGES = Math.ceil(CALENDAR_EVENTS.length / EVENTS_PER_PAGE);

export default function CommunityCalendar() {
  const [page, setPage] = useState(1);
  const [isExiting, setIsExiting] = useState(false);

  const goToPage = useCallback((nextPage) => {
    if (nextPage < 1 || nextPage > TOTAL_PAGES) return;
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setPage(nextPage);
      setIsExiting(false);
    }, FADE_DURATION_MS);
  }, [isExiting]);

  const start = (page - 1) * EVENTS_PER_PAGE;
  const pageEvents = CALENDAR_EVENTS.slice(start, start + EVENTS_PER_PAGE);

  return (
    <section className="community-calendar" aria-label="Community Calendar">
      <h2 className="community-calendar__title">Community Calendar</h2>
      <Link to="/calendar" className="community-calendar__view-all">View All &raquo;</Link>
      <div
        className={`community-calendar__list-wrap ${isExiting ? 'community-calendar__list-wrap--exiting' : 'community-calendar__list-wrap--entering'}`}
      >
        <ul className="community-calendar__list" key={page}>
          {pageEvents.map((entry) => {
            const { month, day, full } = formatDate(entry.date);
            return (
              <li key={entry.id} className="community-calendar__event">
                <span className="community-calendar__date" aria-hidden="true">
                  <span className="community-calendar__date-month">{month}</span>
                  <span className="community-calendar__date-day">{day}</span>
                </span>
                <div className="community-calendar__event-body">
                  <span className="community-calendar__event-title">{entry.title}</span>
                  <span className="community-calendar__event-meta">
                    {full}, {entry.time}
                    {entry.location && ` – ${entry.location}`}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {TOTAL_PAGES > 1 && (
        <nav className="community-calendar__pagination" aria-label="Calendar pages">
          <button
            type="button"
            className="community-calendar__page-btn"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1 || isExiting}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="community-calendar__pagination-center">
            <span className="community-calendar__dots" role="tablist" aria-label="Pages">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`community-calendar__dot ${p === page ? 'community-calendar__dot--current' : ''}`}
                  onClick={() => goToPage(p)}
                  disabled={isExiting}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? 'true' : undefined}
                />
              ))}
            </span>
          </div>
          <button
            type="button"
            className="community-calendar__page-btn"
            onClick={() => goToPage(page + 1)}
            disabled={page >= TOTAL_PAGES || isExiting}
            aria-label="Next page"
          >
            Next
          </button>
        </nav>
      )}
    </section>
  );
}
