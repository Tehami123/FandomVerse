import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { Gallery } from '../components/gallery/Gallery';
import { getContentByType, getContentDestination, getGalleryImages, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailHeader, DetailNotFound, RelatedContent } from './ContentDetail';
import './ContentDetail.css';

export function ArticleDetail() {
  const { id } = useParams();
  const article = getContentByType('Article', id);

  if (!article) return <DetailNotFound contentLabel="Article" />;

  const related = getRelatedContent('Article', article);
  const bookmark = { ...article, contentType: 'Article', destination: getContentDestination(article, 'Article') };

  return (
    <main className="fv-detail-page">
      <Container>
        <DetailHeader
          eyebrow="EDITORIAL / ARTICLE"
          title={article.title}
          category={article.category}
          metadata={[article.author, article.date, article.readTime]}
        />
        <div className="fv-detail-feature">
          <Gallery images={getGalleryImages(article)} title={article.title} />
          <div className="fv-detail-copy">
            <BookmarkButton item={bookmark} />
            <h2>From the editorial desk</h2>
            <p>{article.description}</p>
            <div className="fv-detail-tags">
              {article.tags?.map((tag) => <span className="fv-detail-tag" key={tag}>{tag}</span>)}
            </div>
            <DetailBackLink />
          </div>
        </div>
        <RelatedContent items={related} contentType="Article" getPath={(item) => `/article/${item.id}`} />
      </Container>
    </main>
  );
}
