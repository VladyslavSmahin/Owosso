import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPaginationItems, PAGINATION_ELLIPSIS } from '../utils/paginationItems';
import './CommunityCalendar.css';

/** Примерная высота одной строки события (тело + отступ между строками), px */
const ESTIMATED_EVENT_ROW_PX = 84;
const MIN_EVENTS_PER_PAGE = 3;
const MAX_EVENTS_PER_PAGE = 5;
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

export default function CommunityCalendar() {
  const [page, setPage] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [eventsPerPage, setEventsPerPage] = useState(MIN_EVENTS_PER_PAGE);
  const listWrapRef = useRef(null);

  const totalPages = Math.max(1, Math.ceil(CALENDAR_EVENTS.length / eventsPerPage));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  useEffect(() => {
    const el = listWrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const updateCount = () => {
      const h = el.getBoundingClientRect().height;
      if (h < 80) return;
      const raw = Math.floor(h / ESTIMATED_EVENT_ROW_PX);
      const next = Math.max(MIN_EVENTS_PER_PAGE, Math.min(MAX_EVENTS_PER_PAGE, raw));
      setEventsPerPage((prev) => (prev !== next ? next : prev));
    };

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateCount);
    });
    ro.observe(el);
    updateCount();
    return () => ro.disconnect();
  }, []);

  const goToPage = useCallback((nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setPage(nextPage);
      setIsExiting(false);
    }, FADE_DURATION_MS);
  }, [isExiting, totalPages]);

  const start = (page - 1) * eventsPerPage;
  const pageEvents = CALENDAR_EVENTS.slice(start, start + eventsPerPage);
  const paginationItems = useMemo(
    () => getPaginationItems(page, totalPages),
    [page, totalPages],
  );

  return (
    <section className="community-calendar" aria-label="Community Calendar">
      <h2 className="community-calendar__title">Community Calendar</h2>
      <Link to="/calendar" className="community-calendar__view-all">View All &raquo;</Link>
      <div
        ref={listWrapRef}
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
      {totalPages > 1 && (
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
            <span className="community-calendar__pages" role="group" aria-label="Pages">
              {paginationItems.map((item, idx) =>
                item === PAGINATION_ELLIPSIS ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="community-calendar__pagination-ellipsis"
                    aria-hidden
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={`community-calendar__page-num ${item === page ? 'community-calendar__page-num--current' : ''}`}
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
            className="community-calendar__page-btn"
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
