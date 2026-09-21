import React from 'react';
import { Container } from '../ui/Container';
import { merchandise } from '../../data/mockData';
import { Card, CardTitle, CardMeta } from '../ui/Card';
import { Button } from '../ui/Button';
import './MerchandiseSection.css';

export function MerchandiseSection() {
  return (
    <section className="fv-section fv-merch-section">
      <Container>
        <div className="fv-section-header">
          <h2>Exclusive Merchandise</h2>
          <a href="#" className="fv-view-all">Shop All</a>
        </div>
        <div className="fv-merch-grid">
          {merchandise.map((item) => (
            <Card 
              key={item.id} 
              imageSrc={item.image} 
              imageAlt={item.title}
              className="fv-merch-card"
            >
              <div className="fv-merch-info">
                <CardTitle className="fv-merch-title">{item.title}</CardTitle>
                <div className="fv-merch-row">
                  <span className="fv-merch-price">{item.price}</span>
                  <span className="fv-merch-status">{item.status}</span>
                </div>
              </div>
              <div className="fv-merch-hover-action">
                <Button variant="ghost" style={{ width: '100%' }}>Add to Cart</Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
