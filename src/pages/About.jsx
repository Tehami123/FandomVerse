import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import './About.css';

const categories = ['Anime', 'Gaming', 'Movies', 'TV Shows', 'K-Pop', 'Comics', 'Manga'];
const capabilities = ['Search', 'Filtering and sorting', 'Characters', 'Articles', 'Trailers', 'Events', 'Galleries', 'Upcoming Releases', 'Merchandise', 'Bookmarks', 'Notes', 'Cart', 'Scripted Chatbot'];

export function About() {
  return (
    <main className="fv-about-page">
      <Container>
        <header className="fv-about-header">
          <div className="fv-about-kicker">ABOUT / FANDOMVERSE</div>
          <h1>Portal for Fandom World</h1>
          <p>FandomVerse is a local-first discovery platform for people who move between stories, characters, releases, and the worlds that connect them.</p>
        </header>

        <section className="fv-about-section" aria-labelledby="about-categories-heading">
          <div className="fv-about-section-label">01 / THE WORLDS</div>
          <div className="fv-about-section-content">
            <h2 id="about-categories-heading">Seven doors into fandom</h2>
            <div className="fv-about-category-grid">
              {categories.map((category) => <Link to={`/category/${category === 'TV Shows' ? 'tv' : category.toLowerCase().replace(' ', '-')}`} key={category}>{category}<ArrowRight size={16} aria-hidden="true" /></Link>)}
            </div>
          </div>
        </section>

        <section className="fv-about-section" aria-labelledby="about-capabilities-heading">
          <div className="fv-about-section-label">02 / THE ARCHIVE</div>
          <div className="fv-about-section-content">
            <h2 id="about-capabilities-heading">A place to follow what matters</h2>
            <ul className="fv-about-capabilities">
              {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>
          </div>
        </section>

        <section className="fv-about-section" aria-labelledby="about-team-heading">
          <div className="fv-about-section-label">03 / THE PEOPLE</div>
          <div className="fv-about-section-content">
            <h2 id="about-team-heading">Built by the FandomVerse Team</h2>
            <p>The project is shaped by a small product team focused on making fandom discovery feel cinematic, useful, and easy to return to. Individual team details are not published in the local project archive.</p>
          </div>
        </section>
      </Container>
    </main>
  );
}
