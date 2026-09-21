import React from 'react';
import { Container } from '../ui/Container';
import { events } from '../../data/mockData';
import { Card, CardTitle, CardMeta } from '../ui/Card';
import { Badge } from '../ui/Badge';
import './EventsSection.css';

export function EventsSection() {
  return (
    <section className="fv-section fv-events-section">
      <Container>
        <div className="fv-section-header">
          <h2>Upcoming Events</h2>
          <a href="#" className="fv-view-all">All Events</a>
        </div>
        <div className="fv-events-grid">
          {events.map((evt) => (
            <Card 
              key={evt.id} 
              className="fv-event-card"
              onClick={() => console.log('View event')}
            >
              <div className="fv-event-date-block">
                <span className="fv-event-date">{evt.date}</span>
              </div>
              <div className="fv-event-details">
                <Badge variant="primary" style={{ alignSelf: 'flex-start', marginBottom: '8px' }}>
                  {evt.category}
                </Badge>
                <CardTitle>{evt.title}</CardTitle>
                <CardMeta>{evt.location}</CardMeta>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
