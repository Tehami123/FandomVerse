import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { Gallery } from '../components/gallery/Gallery';
import { getContentByType, getContentDestination, getGalleryImages, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailNotFound, DetailShell, NextTransmission, RelatedContent } from './ContentDetail';
import './ContentDetail.css';

export function EventDetail() {
  const { id } = useParams();
  const event = getContentByType('Event', id);

  if (!event) return <DetailNotFound contentLabel="Event" />;

  const related = getRelatedContent('Event', event).filter((item) => item.category === event.category);
  const bookmark = { ...event, contentType: 'Event', destination: getContentDestination(event, 'Event') };

  return (
    <DetailShell category={event.category} variant="event" type="event">
      <Container>
        <div className="fv-detail-cinematic-header">
          <div className="fv-detail-index"><span>01</span> // EVENT RECORD</div>
          <div className="fv-detail-meta">
            {[event.category, event.date, event.location].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
          </div>
          <h1 className="fv-detail-cinematic-title">{event.title}</h1>
          <div className="fv-detail-cinematic-image">
            <Gallery images={getGalleryImages(event)} title={event.title} />
          </div>
        </div>

        <div className="fv-detail-copy-centered">
          <div className="fv-detail-copy">
            <BookmarkButton item={bookmark} />
            <h2>Dispatch</h2>
            <p>{event.description}</p>
            <div className="fv-event-facts">
              <div className="fv-event-fact">
                <span>Date</span>
                <strong>{event.date}</strong>
              </div>
              <div className="fv-event-fact">
                <span>Location</span>
                <strong>{event.location}</strong>
              </div>
              <div className="fv-event-fact">
                <span>Category</span>
                <strong>{event.category}</strong>
              </div>
            </div>
            <DetailBackLink />
          </div>
        </div>
        <RelatedContent items={related} contentType="Event" getPath={(item) => `/event/${item.id}`} />
        <NextTransmission item={related[0]} getPath={(item) => `/event/${item.id}`} />
      </Container>
    </DetailShell>
  );
}
