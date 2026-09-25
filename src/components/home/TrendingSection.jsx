import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Container } from '../ui/Container';
import { trending } from '../../data/mockData';
import { Card, CardMeta } from '../ui/Card';
import { Badge } from '../ui/Badge';
import './TrendingSection.css';

export function TrendingSection() {
  const navigate = useNavigate();
  return (
    <section className="fv-section fv-trending-section">
      <Container>
        <div className="fv-section-header-editorial">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
            <div className="fv-section-number" style={{ marginBottom: 0 }}>02 // TRENDING</div>
            <Link to="/search?sort=popularity" className="fv-view-all">View All</Link>
          </div>
          <motion.h2 initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            NOW
          </motion.h2>
          <div className="fv-section-divider"></div>
        </div>
        <div className="fv-trending-rail">
          {trending.map((item, index) => {
            const isFeatured = index === 0 || index === 3;
            const itemStyle = {
              minWidth: isFeatured ? '500px' : '320px',
              height: isFeatured ? '500px' : '420px',
            };
            
            const catAccents = {
              Anime: 'var(--color-anime)',
              Gaming: 'var(--color-gaming)',
              Movies: 'var(--color-movies)',
              'TV Shows': 'var(--color-tv)',
              'K-Pop': 'var(--color-kpop)',
              Comics: 'var(--color-comics)',
              Manga: 'var(--color-manga)'
            };
            const accent = catAccents[item.category] || 'var(--color-border)';

            return (
              <motion.div 
                key={item.id} 
                className="fv-trending-rail-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1 }}
                style={itemStyle}
              >
                <Card 
                  imageSrc={item.image} 
                  imageAlt={item.title}
                  onClick={() => navigate(`/search?q=${encodeURIComponent(item.title)}`)}
                  className="fv-trending-card"
                  style={{ borderBottom: `2px solid ${accent}` }}
                >
                <div className="fv-trending-card-content">
                  <Badge variant="primary" style={{ alignSelf: 'flex-start', marginBottom: 'auto' }}>
                    {item.category}
                  </Badge>
                  <div className="fv-trending-card-meta">
                    <h3 style={{ fontFamily: 'var(--font-family-display)', fontSize: isFeatured ? '32px' : '24px', marginBottom: '8px' }}>{item.title}</h3>
                    <CardMeta style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '11px' }}>{item.type}</CardMeta>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
        </div>
      </Container>
    </section>
  );
}
