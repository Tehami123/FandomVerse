import { useParams } from 'react-router-dom';
import { BookmarkButton } from '../components/ui/BookmarkButton';
import { Gallery } from '../components/gallery/Gallery';
import { getContentByType, getContentDestination, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailNotFound, DetailShell, RelatedContent } from './ContentDetail';
import './ContentDetail.css';
import './ArticleDetail.css';

export function ArticleDetail() {
  const { id } = useParams();
  const article = getContentByType('Article', id);

  if (!article) return <DetailNotFound contentLabel="Article" />;

  const related = getRelatedContent('Article', article);
  const bookmark = { ...article, contentType: 'Article', destination: getContentDestination(article, 'Article') };

  return (
    <DetailShell category={article.category} variant="article" type="article" ambient={false}>
      <Container>
        <header className="fv-article-hero">
          <div className="fv-detail-index"><span>01</span> // FEATURED ARTICLE</div>
          <div className="fv-article-hero-meta">
            <span>{article.category}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="fv-article-dek">{article.subtitle || article.description}</p>
          <div className="fv-article-byline">
            <span>By {article.author}</span>
            <BookmarkButton item={bookmark} />
          </div>
          <div className="fv-article-hero-media">
            <Gallery images={[article.image, ...(article.gallery || [])]} title={article.title} />
          </div>
        </header>

        <article className="fv-article-body">
          <p className="fv-article-lede">{article.description}</p>
          {article.body?.map((section) => (
            <section className="fv-article-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.quote && <blockquote>{section.quote}</blockquote>}
            </section>
          ))}
          <footer className="fv-article-footer">
            <div className="fv-article-tags" aria-label="Article tags">
              {article.tags?.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="fv-article-footer-actions">
              <BookmarkButton item={bookmark} />
              <DetailBackLink />
            </div>
          </footer>
        </article>

        <RelatedContent items={related} contentType="Article" getPath={(item) => `/article/${item.id}`} />
      </Container>
    </DetailShell>
  );
}
