import { useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { articles } from '../../data/mockData';
import { motion } from 'motion/react';
import { ArticleCard } from '../ui/ContentCards';
import './FeaturedArticles.css';

export function FeaturedArticles() {
  const navigate = useNavigate();
  const featured = articles[0];
  const supporting = articles.slice(1);
  const openArticle = (article) => navigate(`/article/${article.id}`);

  return (
    <section className="fv-section fv-articles-section">
      <Container>
        <div className="fv-section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Featured Articles
          </motion.h2>
        </div>
        <div className="fv-articles-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-xl)' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ArticleCard 
              item={{...featured, category: featured.category || 'Editorial'}} 
              onClick={() => openArticle(featured)}
              isLead={true}
            />
          </motion.div>
          <div className="fv-article-supporting" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {supporting.map((art, idx) => (
              <motion.div
                key={art.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArticleCard 
                  item={{...art, category: art.category || 'Editorial'}} 
                  onClick={() => openArticle(art)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
