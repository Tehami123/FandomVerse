import React from 'react';
import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { Gallery } from '../components/gallery/Gallery';
import { MediaPlayer } from '../components/media/MediaPlayer';
import { getContentByType, getContentDestination, getGalleryImages, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailHeader, DetailNotFound, RelatedContent } from './ContentDetail';
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
        <DetailHeader eyebrow="MEDIA / TRAILER" title={trailer.title} category={trailer.category} metadata={[trailer.status, trailer.type]} />
        <MediaPlayer src={trailer.mediaSrc} type={trailer.mediaType || 'video'} title={trailer.title} />
        <div className="fv-detail-feature">
          <Gallery images={getGalleryImages(trailer)} title={trailer.title} />
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
