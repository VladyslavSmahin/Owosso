import { useState } from 'react';
import './NewsletterForm.css';

const INTERESTS = [
  { id: 'enews', label: 'E-Newsletter' },
  { id: 'council', label: 'City Council Meeting Recap' },
  { id: 'jobs', label: 'Job Openings' },
  { id: 'bids', label: 'Bid Postings' },
  { id: 'alerts', label: 'Emergency/Alerts' },
];

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [interests, setInterests] = useState({});

  const toggleInterest = (id) => {
    setInterests((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your newsletter service
  };

  return (
    <section className="newsletter-form" aria-labelledby="newsletter-title">
      <form onSubmit={handleSubmit} className="newsletter-form__inner">
        <div className="newsletter-form__head">
          <h2 id="newsletter-title" className="newsletter-form__title">
            Subscribe to the City of Owosso Newsletter.
          </h2>
          <span className="newsletter-form__required-note">* indicates required</span>
        </div>

        <div className="newsletter-form__row">
          <div className="newsletter-form__fields">
            <label className="newsletter-form__label">
              <span className="newsletter-form__label-text">Email Address <span className="newsletter-form__asterisk" aria-hidden="true">*</span></span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-form__input"
                placeholder="your@email.com"
                autoComplete="email"
              />
            </label>
            <label className="newsletter-form__label">
              <span className="newsletter-form__label-text">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="newsletter-form__input"
                placeholder="First name"
                autoComplete="given-name"
              />
            </label>
            <label className="newsletter-form__label">
              <span className="newsletter-form__label-text">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="newsletter-form__input"
                placeholder="Last name"
                autoComplete="family-name"
              />
            </label>
          </div>
          <fieldset className="newsletter-form__interests">
            <legend className="newsletter-form__legend">Interests</legend>
            <div className="newsletter-form__checkboxes">
              {INTERESTS.map(({ id, label }) => (
                <label key={id} className="newsletter-form__checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={!!interests[id]}
                    onChange={() => toggleInterest(id)}
                    className="newsletter-form__checkbox"
                  />
                  <span className="newsletter-form__checkbox-box" aria-hidden="true" />
                  <span className="newsletter-form__checkbox-label">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <button type="submit" className="newsletter-form__submit">
          Subscribe
        </button>
      </form>
    </section>
  );
}
