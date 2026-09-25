import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { Gallery } from '../components/gallery/Gallery';
import { getContentByType, getContentDestination, getGalleryImages, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailNotFound, DetailShell, NextTransmission, RelatedContent } from './ContentDetail';
import './ContentDetail.css';

export function ArticleDetail() {
  const { id } = useParams();
  const article = getContentByType('Article', id);

  if (!article) return <DetailNotFound contentLabel="Article" />;

  const related = getRelatedContent('Article', article);
  const bookmark = { ...article, contentType: 'Article', destination: getContentDestination(article, 'Article') };

  return (
    <DetailShell category={article.category} variant="article" type="article" ambient={false}>
      <Container>
        <div className="fv-detail-cinematic-header">
          <div className="fv-detail-index"><span>01</span> // FEATURED ARTICLE</div>
          <div className="fv-detail-meta">
            {[article.category, article.date].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
          </div>
          <h1 className="fv-detail-cinematic-title">{article.title}</h1>
          <div className="fv-detail-cinematic-image">
            <Gallery images={getGalleryImages(article)} title={article.title} />
          </div>
        </div>

        <div className="fv-detail-copy-centered">
          <div className="fv-detail-copy">
            <BookmarkButton item={bookmark} />
            <h2>From the editorial desk</h2>
            <p>{article.description}</p>
            <div className="fv-detail-meta">
              {[article.author, article.readTime].filter(Boolean).map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="fv-detail-tags">
              {article.tags?.map((tag) => <span className="fv-detail-tag" key={tag}>{tag}</span>)}
            </div>
            <DetailBackLink />
          </div>
        </div>
        <RelatedContent items={related} contentType="Article" getPath={(item) => `/article/${item.id}`} />
        <NextTransmission item={related[0]} getPath={(item) => `/article/${item.id}`} />
      </Container>
    </DetailShell>
  );
}
