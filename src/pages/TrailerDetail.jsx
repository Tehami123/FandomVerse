import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { MediaPlayer } from '../components/media/MediaPlayer';
import { getContentByType, getContentDestination, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailNotFound, RelatedContent } from './ContentDetail';
import './ContentDetail.css';

export function TrailerDetail() {
  const { id } = useParams();
  const trailer = getContentByType('Trailer', id);

  if (!trailer) return <DetailNotFound contentLabel="Trailer" />;

  const related = getRelatedContent('Trailer', trailer);
  const bookmark = { ...trailer, contentType: 'Trailer', destination: getContentDestination(trailer, 'Trailer') };

  return (
    <main className="fv-detail-page">
      <Container>
        <div className="fv-detail-cinematic-header">
          <div className="fv-detail-kicker">MEDIA / {trailer.category}</div>
          <div className="fv-detail-cinematic-image">
            <MediaPlayer src={trailer.mediaSrc} type={trailer.mediaType || 'video'} title={trailer.title} />
          </div>
          <h1 className="fv-detail-cinematic-title">{trailer.title}</h1>
          <div className="fv-detail-meta">
            {[trailer.status, trailer.type].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
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
      </Container>
    </main>
  );
}
