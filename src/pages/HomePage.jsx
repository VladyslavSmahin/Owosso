import Gallery from '../components/Gallery';
import PopularLinks from '../components/PopularLinks';
import CTAWidgets from '../components/CTAWidgets';
import NewsBlock from '../components/NewsBlock';
import NewsletterForm from '../components/NewsletterForm';
import './HomePage.css';

export default function HomePage() {
  return (
    <main className="home-page">
      <div className="app-container home-page__wrap">
        <section className="home-page__hero">
          <div className="home-page__gallery-wrap">
            <Gallery />
          </div>
          <div className="home-page__sidebar">
            <PopularLinks />
          </div>
        </section>
        <CTAWidgets />
        <NewsBlock />
        <NewsletterForm />
      </div>
    </main>
  );
}
