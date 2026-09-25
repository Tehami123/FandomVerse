import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { events } from '../../data/mockData';
import { Card, CardTitle, CardMeta } from '../ui/Card';
import { Badge } from '../ui/Badge';
import './EventsSection.css';

export function EventsSection() {
  const navigate = useNavigate();
  return (
    <section className="fv-section fv-events-section">
      <Container>
        <div className="fv-section-header">
          <h2>Upcoming Events</h2>
          <Link to="/search?q=event" className="fv-view-all">All Events</Link>
        </div>
        <div className="fv-events-grid">
          {events.map((evt) => (
            <Card 
              key={evt.id} 
              className="fv-event-card"
              onClick={() => navigate(`/event/${evt.id}`)}
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
