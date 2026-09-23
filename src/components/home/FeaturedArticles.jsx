import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { articles } from '../../data/mockData';
import { Card, CardTitle, CardMeta } from '../ui/Card';
import { Badge } from '../ui/Badge';
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
          <h2>Featured Articles</h2>
        </div>
        <div className="fv-articles-layout">
          <Card 
            imageSrc={featured.image}
            imageAlt={featured.title}
            className="fv-article-featured"
            onClick={() => openArticle(featured)}
          >
            <div className="fv-article-content-wrapper">
              <Badge variant="accent">{featured.category}</Badge>
              <h3 className="fv-article-hero-title">{featured.title}</h3>
              <CardMeta>By {featured.author} • {featured.readTime}</CardMeta>
            </div>
          </Card>
          
          <div className="fv-article-supporting">
            {supporting.map(art => (
              <Card 
                key={art.id} 
                imageSrc={art.image} 
                className="fv-article-small"
                onClick={() => openArticle(art)}
              >
                <div className="fv-article-content-wrapper">
                  <Badge variant="default" style={{ alignSelf: 'flex-start' }}>{art.category}</Badge>
                  <CardTitle style={{ marginTop: '8px' }}>{art.title}</CardTitle>
                  <CardMeta>{art.readTime}</CardMeta>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
