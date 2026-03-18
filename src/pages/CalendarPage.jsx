import './CalendarPage.css';

const CALENDAR_ENTRIES = [
  { id: 1, date: '2026-03-20', time: '7:00 PM', title: 'City Council Regular Meeting', location: 'City Hall Council Chambers' },
  { id: 2, date: '2026-03-25', time: '6:00 PM', title: 'Planning Commission Meeting', location: 'City Hall' },
  { id: 3, date: '2026-03-27', time: '5:30 PM', title: 'Parks & Recreation Board Meeting', location: 'Owosso City Hall' },
  { id: 4, date: '2026-04-01', time: '7:00 PM', title: 'City Council Regular Meeting', location: 'City Hall Council Chambers' },
  { id: 5, date: '2026-04-08', time: '4:00 PM', title: 'Public Hearing - Zoning Amendment', location: 'City Hall' },
  { id: 6, date: '2026-04-15', time: '6:30 PM', title: 'Downtown Development Authority', location: 'City Hall' },
  { id: 7, date: '2026-04-22', time: '7:00 PM', title: 'City Council Regular Meeting', location: 'City Hall Council Chambers' },
  { id: 8, date: '2026-04-29', time: '5:00 PM', title: 'Budget Committee Workshop', location: 'City Hall' },
  { id: 9, date: '2026-05-06', time: '6:00 PM', title: 'Planning Commission Public Hearing', location: 'City Hall' },
];

function formatDate(str) {
  const d = new Date(str + 'T12:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return { month: months[d.getMonth()], day: d.getDate(), full: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) };
}

export default function CalendarPage() {
  return (
    <main className="calendar-page">
      <div className="app-container">
        <h1 className="calendar-page__title">Calendar</h1>
        <p className="calendar-page__intro">Upcoming meetings and events for the City of Owosso.</p>
        <ul className="calendar-page__list">
          {CALENDAR_ENTRIES.map((entry) => {
            const { month, day, full } = formatDate(entry.date);
            return (
              <li key={entry.id} className="calendar-entry">
                <span className="calendar-entry__date" aria-hidden="true">
                  <span className="calendar-entry__month">{month}</span>
                  <span className="calendar-entry__day">{day}</span>
                </span>
                <div className="calendar-entry__body">
                  <h2 className="calendar-entry__title">{entry.title}</h2>
                  <p className="calendar-entry__meta">
                    {full} &middot; {entry.time}
                    {entry.location && ` &middot; ${entry.location}`}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
