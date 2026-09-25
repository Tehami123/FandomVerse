import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { trailers } from '../../data/mockData';
import { motion } from 'motion/react';
import { ContentCard } from '../ui/ContentCards';
import './TrailerSection.css';

export function TrailerSection() {
  const navigate = useNavigate();
  return (
    <section className="fv-section fv-trailers-section">
      <Container>
        <div className="fv-section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Latest Trailers
          </motion.h2>
          <Link to="/search?type=trailer" className="fv-view-all">View All</Link>
        </div>
        <div className="fv-trailers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 'var(--space-lg)' }}>
          {trailers.map((trailer, idx) => (
            <motion.div
              key={trailer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ContentCard 
                item={{...trailer, type: 'trailer'}} 
                onClick={() => navigate(`/trailer/${trailer.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
