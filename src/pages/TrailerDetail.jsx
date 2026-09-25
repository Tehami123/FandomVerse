import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { MediaPlayer } from '../components/media/MediaPlayer';
import { getContentByType, getContentDestination, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailNotFound, DetailShell, NextTransmission, RelatedContent } from './ContentDetail';
import './ContentDetail.css';

export function TrailerDetail() {
  const { id } = useParams();
  const trailer = getContentByType('Trailer', id);

  if (!trailer) return <DetailNotFound contentLabel="Trailer" />;

  const related = getRelatedContent('Trailer', trailer);
  const bookmark = { ...trailer, contentType: 'Trailer', destination: getContentDestination(trailer, 'Trailer') };

  return (
    <DetailShell category={trailer.category} variant="trailer" type="trailer" ambient={false}>
      <Container>
        <div className="fv-detail-cinematic-header">
          <div className="fv-detail-index"><span>01</span> // TRANSMISSION</div>
          <div className="fv-detail-meta">
            {[trailer.category, trailer.status, trailer.type].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
          </div>
          <h1 className="fv-detail-cinematic-title">{trailer.title}</h1>
          <div className="fv-trailer-frame">
            <MediaPlayer
              key={trailer.id}
              sources={trailer.mediaSources || (trailer.mediaSrc ? [trailer.mediaSrc] : [])}
              type={trailer.mediaType || 'video'}
              title={trailer.title}
            />
            <div className="fv-trailer-frame-meta">
              <span>ARCHIVE CHANNEL // {trailer.category}</span>
              <span>{trailer.status || 'UNVERIFIED SIGNAL'}</span>
            </div>
          </div>
        </div>
        <section className="fv-trailer-info">
          <div className="fv-trailer-info-heading">
            <div>
              <div className="fv-detail-section-label">TRANSMISSION NOTES</div>
              <h2>{trailer.title}</h2>
            </div>
            <BookmarkButton item={bookmark} />
          </div>
          <p className="fv-trailer-description">{trailer.description}</p>
          <div className="fv-trailer-facts">
            <div>
              <span>Premiere</span>
              <strong>{trailer.premiere || trailer.status}</strong>
            </div>
            <div>
              <span>Format</span>
              <strong>{trailer.format || trailer.type}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>{trailer.status}</strong>
            </div>
          </div>
          {trailer.tags?.length > 0 && (
            <div className="fv-trailer-tags" aria-label="Trailer tags">
              {trailer.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          )}
          <div className="fv-trailer-info-footer">
            <DetailBackLink />
          </div>
        </section>
        <RelatedContent items={related} contentType="Trailer" getPath={(item) => `/trailer/${item.id}`} />
        <NextTransmission item={related[0]} getPath={(item) => `/trailer/${item.id}`} />
      </Container>
    </DetailShell>
  );
}
