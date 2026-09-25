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
    <DetailShell category={trailer.category} variant="trailer" type="trailer">
      <Container>
        <div className="fv-detail-cinematic-header">
          <div className="fv-detail-index"><span>01</span> // TRANSMISSION</div>
          <div className="fv-detail-meta">
            {[trailer.category, trailer.status, trailer.type].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
          </div>
          <h1 className="fv-detail-cinematic-title">{trailer.title}</h1>
          <div className="fv-trailer-frame">
            <MediaPlayer src={trailer.mediaSrc} type={trailer.mediaType || 'video'} title={trailer.title} />
            <div className="fv-trailer-frame-meta">
              <span>ARCHIVE CHANNEL // {trailer.category}</span>
              <span>{trailer.status || 'UNVERIFIED SIGNAL'}</span>
            </div>
          </div>
        </div>
        <div className="fv-detail-copy-centered">
          <div className="fv-detail-copy">
            <BookmarkButton item={bookmark} />
            <h2>{trailer.status}</h2>
            <p>{trailer.description}</p>
            <DetailBackLink />
          </div>
        </div>
        <RelatedContent items={related} contentType="Trailer" getPath={(item) => `/trailer/${item.id}`} />
        <NextTransmission item={related[0]} getPath={(item) => `/trailer/${item.id}`} />
      </Container>
    </DetailShell>
  );
}
