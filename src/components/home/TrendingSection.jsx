import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { articles } from '../../data/mockData';
import { ContentCard } from '../ui/ContentCards';
import './TrendingSection.css';

export function TrendingSection() {
  const navigate = useNavigate();
  return (
    <section className="fv-section fv-trending-section">
      <Container>
        <div className="fv-section-header-editorial">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div className="fv-section-number" style={{ marginBottom: 0 }}>02 // TRENDING</div>
              <Link to="/search?type=article" className="fv-view-all">View All</Link>
          </div>
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            NOW
          </motion.h2>
          <div className="fv-section-divider"></div>
        </div>
        <div className="fv-trending-rail" style={{ display: 'flex', gap: 'var(--space-lg)', overflowX: 'auto', paddingBottom: 'var(--space-xl)', scrollbarWidth: 'thin' }}>
          {articles.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="fv-trending-rail-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              style={{ flex: '0 0 clamp(260px, 31vw, 400px)', width: 'clamp(260px, 31vw, 400px)' }}
            >
              <ContentCard 
                item={item}
                onClick={() => navigate(`/article/${item.id}`)}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
