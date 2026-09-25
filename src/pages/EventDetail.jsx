import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { Gallery } from '../components/gallery/Gallery';
import { getContentByType, getContentDestination, getGalleryImages, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailNotFound, RelatedContent } from './ContentDetail';
import './ContentDetail.css';

export function EventDetail() {
  const { id } = useParams();
  const event = getContentByType('Event', id);

  if (!event) return <DetailNotFound contentLabel="Event" />;

  const related = getRelatedContent('Event', event).filter((item) => item.category === event.category);
  const bookmark = { ...event, contentType: 'Event', destination: getContentDestination(event, 'Event') };

  return (
    <main className="fv-detail-page">
      <Container>
        <div className="fv-detail-cinematic-header">
          <div className="fv-detail-kicker">CALENDAR / {event.category}</div>
          <div className="fv-detail-cinematic-image">
            <Gallery images={getGalleryImages(event)} title={event.title} />
          </div>
          <h1 className="fv-detail-cinematic-title">{event.title}</h1>
          <div className="fv-detail-meta">
            {[event.date, event.location].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <div className="fv-detail-copy-centered">
          <div className="fv-detail-copy">
            <BookmarkButton item={bookmark} />
            <h2>{event.date}</h2>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <DetailBackLink />
          </div>
        </div>
        <RelatedContent items={related} contentType="Event" getPath={(item) => `/event/${item.id}`} />
      </Container>
    </main>
  );
}
