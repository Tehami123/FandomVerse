import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../ui/Container';
import { events } from '../../data/mockData';
import { motion } from 'motion/react';
import { EventCard } from '../ui/ContentCards';
import './EventsSection.css';

export function EventsSection() {
  const navigate = useNavigate();
  return (
    <section className="fv-section fv-events-section">
      <Container>
        <div className="fv-section-header">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Upcoming Events
          </motion.h2>
          <Link to="/search?q=event" className="fv-view-all">All Events</Link>
        </div>
        <div className="fv-events-grid" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {events.map((evt, idx) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <EventCard 
                item={evt}
                onClick={() => navigate(`/event/${evt.id}`)}
                asEditorial={true}
                index={idx}
              />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
