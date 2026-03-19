import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './NewsBlock.css';

const ITEMS_PER_PAGE = 6;
const FADE_DURATION_MS = 280;

const NEWS_ITEMS = [
  { id: 1, month: 'Mar', day: '17', title: 'Public Hearing - Purchasing Ordinance Amendment', posted: 'March 17, 2026', to: '/news/1' },
  { id: 2, month: 'Feb', day: '26', title: 'Upcoming Consumers Energy Construction', posted: 'February 26, 2026', to: '/news/2' },
  { id: 3, month: 'Feb', day: '23', title: 'Brush Pickup Notice', posted: 'February 23, 2026', to: '/news/3' },
  { id: 4, month: 'Mar', day: '06', title: 'Website Notice: 1095C', posted: 'March 6, 2026', to: '/news/4' },
  { id: 5, month: 'Feb', day: '23', title: '2026 Spring & Summer Yard Cleanup Guide', posted: 'February 23, 2026', to: '/news/5' },
  { id: 6, month: 'Mar', day: '12', title: 'City Council Meeting Agenda - March 2026', posted: 'March 12, 2026', to: '/news/6' },
  { id: 7, month: 'Mar', day: '08', title: 'Water Main Replacement Project Update', posted: 'March 8, 2026', to: '/news/7' },
  { id: 8, month: 'Mar', day: '01', title: 'Community Recreation Program Registration', posted: 'March 1, 2026', to: '/news/8' },
  { id: 9, month: 'Feb', day: '28', title: 'Street Sweeping Schedule - Spring 2026', posted: 'February 28, 2026', to: '/news/9' },
  { id: 10, month: 'Feb', day: '20', title: 'Planning Commission Public Meeting Notice', posted: 'February 20, 2026', to: '/news/10' },
  { id: 11, month: 'Feb', day: '15', title: 'Holiday Trash Collection Schedule', posted: 'February 15, 2026', to: '/news/11' },
  { id: 12, month: 'Feb', day: '10', title: 'Parks & Recreation Summer Events', posted: 'February 10, 2026', to: '/news/12' },
  { id: 13, month: 'Feb', day: '05', title: 'Utility Bill Payment Options Update', posted: 'February 5, 2026', to: '/news/13' },
  { id: 14, month: 'Jan', day: '30', title: 'Winter Parking Ordinance Reminder', posted: 'January 30, 2026', to: '/news/14' },
  { id: 15, month: 'Jan', day: '22', title: 'Community Survey Results Available', posted: 'January 22, 2026', to: '/news/15' },
  { id: 16, month: 'Mar', day: '19', title: 'Easter Weekend City Office Hours', posted: 'March 19, 2026', to: '/news/16' },
  { id: 17, month: 'Mar', day: '14', title: 'Tree Planting Program - Applications Open', posted: 'March 14, 2026', to: '/news/17' },
  { id: 18, month: 'Mar', day: '11', title: 'Downtown Parking Study Public Input Session', posted: 'March 11, 2026', to: '/news/18' },
];

function DateBadge({ month, day }) {
  return (
    <span className="news-item__date" aria-hidden="true">
      <span className="news-item__date-month">{month}</span>
      <span className="news-item__date-day">{day}</span>
    </span>
  );
}

const TOTAL_PAGES = Math.ceil(NEWS_ITEMS.length / ITEMS_PER_PAGE);

export default function NewsBlock() {
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

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = NEWS_ITEMS.slice(start, start + ITEMS_PER_PAGE);

  return (
    <section className="news-block" aria-label="News and announcements">
      <div className="news-block__head">
        <h2 className="news-block__title">News &amp; Announcements</h2>
        <Link to="/news" className="news-block__view-all">View All &raquo;</Link>
      </div>
      <div
        className={`news-block__grid-wrap ${isExiting ? 'news-block__grid-wrap--exiting' : 'news-block__grid-wrap--entering'}`}
      >
        <div className="news-block__grid" key={page}>
          {pageItems.map((item) => (
            <Link key={item.id} to={item.to} className="news-card">
              <DateBadge month={item.month} day={item.day} />
              <div className="news-card__content">
                <span className="news-card__title">{item.title}</span>
                <time className="news-card__posted" dateTime={item.posted}>
                  posted on {item.posted}
                </time>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {TOTAL_PAGES > 1 && (
        <div className="news-block__pagination">
          <button
            type="button"
            className="news-block__page-btn"
            onClick={() => goToPage(page - 1)}
            disabled={page <= 1 || isExiting}
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="news-block__pagination-center">
            <span className="news-block__dots" role="tablist" aria-label="Pages">
              {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`news-block__dot ${p === page ? 'news-block__dot--current' : ''}`}
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
            className="news-block__page-btn"
            onClick={() => goToPage(page + 1)}
            disabled={page >= TOTAL_PAGES || isExiting}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
