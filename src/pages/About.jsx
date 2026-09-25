import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../components/ui/Container';
import { Scene3D } from '../components/visuals/Scene3D';
import './About.css';

const categories = [
  { name: 'Anime', slug: 'anime', accent: 'var(--color-anime)' },
  { name: 'Gaming', slug: 'gaming', accent: 'var(--color-gaming)' },
  { name: 'Movies', slug: 'movies', accent: 'var(--color-movies)' },
  { name: 'TV Shows', slug: 'tv', accent: 'var(--color-tv)' },
  { name: 'K-Pop', slug: 'kpop', accent: 'var(--color-kpop)' },
  { name: 'Comics', slug: 'comics', accent: 'var(--color-comics)' },
  { name: 'Manga', slug: 'manga', accent: 'var(--color-manga)' },
];
const capabilities = ['Search', 'Filtering and sorting', 'Characters', 'Articles', 'Trailers', 'Events', 'Galleries', 'Upcoming Releases', 'Merchandise', 'Bookmarks', 'Notes', 'Cart', 'Scripted Chatbot'];

export function About() {
  return (
    <main className="fv-about-page">
      <div className="fv-about-scene" aria-hidden="true"><Scene3D /></div>
      <div className="fv-about-decor fv-about-decor--one" aria-hidden="true" />
      <div className="fv-about-decor fv-about-decor--two" aria-hidden="true" />
      <Container className="fv-about-shell">
        <motion.header
          className="fv-about-header"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="fv-about-kicker">ABOUT / FANDOMVERSE</div>
          <h1>Portal for fandom worlds</h1>
          <p>FandomVerse is a local-first discovery platform for people who move between stories, characters, releases, and the worlds that connect them.</p>
          <div className="fv-about-cta-row">
            <Link to="/search" className="fv-about-primary-link">Explore the archive</Link>
            <Link to="/category/anime" className="fv-about-secondary-link">Jump to anime</Link>
          </div>
        </motion.header>

        <motion.section
          className="fv-about-hero-panel"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          aria-labelledby="about-story-heading"
        >
          <div className="fv-about-story-copy">
            <div className="fv-about-section-label">01 / PROJECT STORY</div>
            <h2 id="about-story-heading">Built for the culture between releases, characters, and worlds.</h2>
            <p>FandomVerse turns scattered interest into a curated archive. It brings together articles, trailers, events, releases, merchandise, and character-driven discovery in one place so fans can keep momentum without losing the thread of a world they love.</p>
          </div>
          <div className="fv-about-visual" aria-hidden="true">
            <img src="/assets/anime/anime-hero.jpg" alt="" />
            <div className="fv-about-visual-badge">CINEMATIC ARCHIVE</div>
          </div>
        </motion.section>

        <motion.section className="fv-about-section" aria-labelledby="about-categories-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
          <div className="fv-about-section-label">02 / THE UNIVERSE</div>
          <div className="fv-about-section-content">
            <h2 id="about-categories-heading">Seven doors into fandom</h2>
            <div className="fv-about-category-grid">
              {categories.map((category, index) => (
                <Link
                  to={`/category/${category.slug}`}
                  key={category.slug}
                  className="fv-about-category-card"
                  style={{ '--accent': category.accent }}
                  data-index={index}
                >
                  <span>{category.name}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="fv-about-section" aria-labelledby="about-capabilities-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
          <div className="fv-about-section-label">03 / THE ARCHIVE</div>
          <div className="fv-about-section-content">
            <h2 id="about-capabilities-heading">A place to follow what matters</h2>
            <ul className="fv-about-capabilities">
              {capabilities.map((capability) => <li key={capability}>{capability}</li>)}
            </ul>
          </div>
        </motion.section>

        <motion.section className="fv-about-section" aria-labelledby="about-team-heading" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
          <div className="fv-about-section-label">04 / THE PEOPLE</div>
          <div className="fv-about-section-content">
            <h2 id="about-team-heading">Built by the FandomVerse team</h2>
            <p>The project is shaped by a small product team focused on making fandom discovery feel cinematic, useful, and easy to return to. Individual team details are not published in the local project archive.</p>
          </div>
        </motion.section>
      </Container>
    </main>
  );
}
