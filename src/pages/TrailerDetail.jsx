import React from 'react';
import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { getContentByType, getContentDestination, getRelatedContent } from '../utils/contentData';
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
        <div className="fv-detail-media" role="img" aria-label={`Media placeholder for ${trailer.title}`}>
          <div>
            <strong>Media preview unavailable</strong>
            <p>No local video source is included for this trailer.</p>
          </div>
        </div>
        <div className="fv-detail-feature">
          <img className="fv-detail-image" src={trailer.image} alt={`${trailer.title} thumbnail`} />
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
