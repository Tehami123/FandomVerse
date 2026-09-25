import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';
import { merchandiseByCategory } from '../../data/mockData';
import { motion } from 'motion/react';
import { MerchandiseCard } from '../ui/ContentCards';
import './MerchandiseSection.css';

export function MerchandiseSection() {
  return (
    <section className="fv-section fv-merch-section">
      <Container>
        <div className="fv-section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Exclusive Merchandise
          </motion.h2>
          <Link to="/search?q=merchandise" className="fv-view-all">Shop All</Link>
        </div>
        <div className="fv-merch-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--space-lg)' }}>
          {(merchandiseByCategory.homepage || []).map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <MerchandiseCard 
                item={item} 
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
