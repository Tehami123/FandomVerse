import { AddToCartButton } from '../components/ui/AddToCartButton';
import { Gallery } from '../components/gallery/Gallery';
import { getContentByType, getGalleryImages, getRelatedContent } from '../utils/contentData';
import { Container } from '../components/ui/Container';
import { DetailBackLink, DetailNotFound, DetailShell, NextTransmission, RelatedContent } from './ContentDetail';
import { useParams } from 'react-router-dom';
import './ContentDetail.css';
import './CharacterDetail.css';

export function CharacterDetail() {
  const { id } = useParams();
  const character = getContentByType('Character', id);

  if (!character) return <DetailNotFound contentLabel="Character" />;

  const related = getRelatedContent('Character', character, 4);
  const metadata = [character.category, character.series, character.franchise]
    .filter(Boolean)
    .filter((value, index, list) => list.indexOf(value) === index);

  return (
    <DetailShell category={character.category} variant="character" type="character" ambient={false}>
      <div className="fv-dossier-atmosphere" aria-hidden="true">
        <div className="fv-dossier-atmosphere-glow" />
        <svg className="fv-dossier-atmosphere-arcs" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M12 8 C 6 36, 6 68, 16 96" />
          <line x1="8" y1="14" x2="20" y2="14" />
        </svg>
      </div>

      <Container>
        <section className="fv-dossier" aria-label={`${character.name} character dossier`}>
          <div className="fv-dossier-portrait">
            <Gallery images={getGalleryImages(character)} title={character.name} />
          </div>

          <div className="fv-dossier-copy">
            <div className="fv-detail-index"><span>01</span> // CHARACTER DOSSIER</div>
            <div className="fv-detail-meta">
              {metadata.map((item) => <span key={item}>{item}</span>)}
            </div>
            <h1 className="fv-dossier-name">{character.name}</h1>
            <div className="fv-dossier-rule" />

            <div className="fv-detail-copy">
              <h2>Biography</h2>
              <p>{character.biography}</p>
              {character.traits?.length ? (
                <>
                  <h2>Traits</h2>
                  <div className="fv-detail-tags">
                    {character.traits.map((tag) => <span className="fv-detail-tag" key={tag}>{tag}</span>)}
                  </div>
                </>
              ) : null}

              <div className="fv-collect-block">
                <div className="fv-detail-section-label">ADD TO COLLECTION</div>
                <AddToCartButton product={character} itemType="character" label="Add to Collection" />
              </div>

              <DetailBackLink />
            </div>
          </div>
        </section>

        <RelatedContent items={related} contentType="Character" getPath={(item) => `/character/${item.id}`} />
        <NextTransmission item={related[0]} getPath={(item) => `/character/${item.id}`} />
      </Container>
    </DetailShell>
  );
}
