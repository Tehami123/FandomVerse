import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { trailers } from '../../data/mockData';
import { Card, CardTitle, CardMeta } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Play } from 'lucide-react';
import './TrailerSection.css';

export function TrailerSection() {
  const navigate = useNavigate();
  return (
    <section className="fv-section fv-trailers-section">
      <Container>
        <div className="fv-section-header">
          <h2>Latest Trailers</h2>
          <Link to="/search?type=trailer" className="fv-view-all">View All</Link>
        </div>
        <div className="fv-trailers-grid">
          {trailers.map((trailer) => (
            <Card 
              key={trailer.id} 
              imageSrc={trailer.image} 
              imageAlt={trailer.title}
              onClick={() => navigate(`/trailer/${trailer.id}`)}
              className="fv-trailer-card"
            >
              <div className="fv-play-icon-wrapper">
                <Play size={24} fill="currentColor" />
              </div>
              <Badge variant="accent" style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
                {trailer.status}
              </Badge>
              <CardTitle>{trailer.title}</CardTitle>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
