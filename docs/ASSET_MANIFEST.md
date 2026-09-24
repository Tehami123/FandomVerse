# FandomVerse Asset Manifest

Phase 9A is an audit only. No generated asset has been integrated, renamed, moved, or deleted.

## Audit Scope

- Generated asset root: `public/assets/`
- Existing source asset root: `design-references/`
- Existing app asset root: `src/assets/` (Vite/React starter assets only)
- Requested `src/data/contentData.js` does not exist. The current normalized search/content utility is `src/utils/contentData.js`.
- Current source code does not reference `public/assets/`.

## Status Definitions

- `MATCHED`: exact data-to-asset identity is established and already connected.
- `NEEDS_ASSET`: the current record needs an asset and no adequate generated candidate is available.
- `NEEDS_MAPPING`: a candidate exists, but filename/category evidence is insufficient to assign it to a specific record.
- `PLACEHOLDER`: the record currently uses legacy reference/mock artwork rather than the generated library.
- `MISSING_DATA`: an asset class exists, but the current data model has no corresponding record.

## Generated Asset Counts

| Area | Heroes | Characters | Articles | Trailers | Events | Merchandise | Galleries | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Homepage | 1 | 0 | 0 | 0 | 3 | 3 | 5 | 12 |
| Anime | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 10 |
| Gaming | 1 | 1 | 2 | 1 | 1 | 2 | 2 | 10 |
| Movies | 1 | 1 | 2 | 1* | 1 | 1 | 1 | 8 |
| TV Shows | 1 | 1 | 2 | 1 | 0 | 1 | 1 | 7 |
| K-Pop | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 8 |
| Comics | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 8 |
| Manga | 1 | 1 | 2 | 1 | 1 | 1 | 1 | 8 |
| **Total** | **8** | **7** | **14** | **7** | **9** | **10** | **14** | **71** |

`*` `public/assets/movies/trailers/film-festival-event.jpg` is stored under trailers but its filename says event. It requires verification before use as a trailer asset.

## Current Data Counts By Category

Current category pages reuse global article, trailer, and merchandise records. The IDs below are the actual records exposed by the current data, not inferred asset names.

| Category | Hero data | Character IDs / names | Article IDs / titles in category view | Trailer IDs / titles in category view | Event IDs / titles | Merchandise IDs / titles in category view | Gallery data |
|---|---|---|---|---|---|---|---|
| Anime | `anime` / `heroImg1` | `ca1` Kaien Vance; `ca2` Aria Sol; `ca3` Rael; `ca4` Mira Ten; `ca5` Sora Vale | `a1` The Evolution of Mecha Design in Modern Anime; `a2` Top 10 Upcoming RPGs of 2027; `a3` Deconstructing the Cinematic Universe | `tr1` Eclipse of Eden; `tr2` Void Runner: 2099; `tr3` Silent Chorus | `e2` Anime Expo Winter; `ea2` Sakura Night Market; `ea3` Animated Worlds Film Night | `m1` Void Runner Katana Replica; `m2` Stellar Drifters Artbook; `m3` Neon Rhythms Hoodie; `m4` The Last Epoch Steelbook | None; detail gallery falls back to one `image` |
| Gaming | `gaming` / `heroImg2` | `cg1` Kaien Vance; `cg2` Aria Sol; `cg3` Elara; `cg4` Dax Mercer; `cg5` Nyx | `a2` Top 10 Upcoming RPGs of 2027; `a3` Deconstructing the Cinematic Universe; `a1` The Evolution of Mecha Design in Modern Anime | `tr1` Eclipse of Eden; `tr2` Void Runner: 2099; `tr3` Silent Chorus | `e1` Global Esports Final; `eg2` Indie Worlds Showcase; `eg3` World Speedrun Relay | `m1` Void Runner Katana Replica; `m2` Stellar Drifters Artbook; `m3` Neon Rhythms Hoodie; `m4` The Last Epoch Steelbook | None; detail gallery falls back to one `image` |
| Movies | `movies` / `heroImg3` | `cm1` Elara; `cm2` Rael; `cm3` Jonah Vale; `cm4` Lyra Chen; `cm5` Oren Pike | `a3` Deconstructing the Cinematic Universe; `a1` The Evolution of Mecha Design in Modern Anime; `a2` Top 10 Upcoming RPGs of 2027 | `tr1` Eclipse of Eden; `tr2` Void Runner: 2099; `tr3` Silent Chorus | `em1` Midnight Premiere Circuit; `em2` Directors in Focus; `em3` Future Frames Festival | `m1` Void Runner Katana Replica; `m2` Stellar Drifters Artbook; `m3` Neon Rhythms Hoodie; `m4` The Last Epoch Steelbook | None; detail gallery falls back to one `image` |
| TV Shows | `tv` / `heroImg4` | `ct1` Aria Sol; `ct2` Jin; `ct3` Mara Quinn; `ct4` Evan Rook; `ct5` Tess Okafor | `a1` The Evolution of Mecha Design in Modern Anime; `a2` Top 10 Upcoming RPGs of 2027; `a3` Deconstructing the Cinematic Universe | `tr1` Eclipse of Eden; `tr2` Void Runner: 2099; `tr3` Silent Chorus | `et1` Pilot Lab Live; `et2` The Finale Watch; `et3` Writers Room Summit | `m1` Void Runner Katana Replica; `m2` Stellar Drifters Artbook; `m3` Neon Rhythms Hoodie; `m4` The Last Epoch Steelbook | None; detail gallery falls back to one `image` |
| K-Pop | `kpop` / `heroImg5` | `ck1` Jin; `ck2` Hana Seo; `ck3` Min Jae; `ck4` Yuri Han; `ck5` Dae Kim | `a2` Top 10 Upcoming RPGs of 2027; `a1` The Evolution of Mecha Design in Modern Anime; `a3` Deconstructing the Cinematic Universe | `tr1` Eclipse of Eden; `tr2` Void Runner: 2099; `tr3` Silent Chorus | `ek1` Neon Rhythms Live; `ek2` Orbit Seven Fan Con; `ek3` Global Sound Awards | `m1` Void Runner Katana Replica; `m2` Stellar Drifters Artbook; `m3` Neon Rhythms Hoodie; `m4` The Last Epoch Steelbook | None; detail gallery falls back to one `image` |
| Comics | `comics` / `heroImg6` | `cc1` Rael; `cc2` Violet Kane; `cc3` Brick Calder; `cc4` Nova Reyes; `cc5` Iris Wren | `a3` Deconstructing the Cinematic Universe; `a2` Top 10 Upcoming RPGs of 2027; `a1` The Evolution of Mecha Design in Modern Anime | `tr1` Eclipse of Eden; `tr2` Void Runner: 2099; `tr3` Silent Chorus | `e3` Comic-Con International; `ec2` Creator Alley Weekend; `ec3` Graphic Novel Forum | `m1` Void Runner Katana Replica; `m2` Stellar Drifters Artbook; `m3` Neon Rhythms Hoodie; `m4` The Last Epoch Steelbook | None; detail gallery falls back to one `image` |
| Manga | `manga` / `heroImg7` | `cn1` Sora Vale; `cn2` Mira Ten; `cn3` Kaito Ren; `cn4` Yuna Aki; `cn5` Ren Kisaragi | `a1` The Evolution of Mecha Design in Modern Anime; `a3` Deconstructing the Cinematic Universe; `a2` Top 10 Upcoming RPGs of 2027 | `tr1` Eclipse of Eden; `tr2` Void Runner: 2099; `tr3` Silent Chorus | `en1` Manga Expo; `en2` Artist Studio Visits; `en3` Midnight Serialization Night | `m1` Void Runner Katana Replica; `m2` Stellar Drifters Artbook; `m3` Neon Rhythms Hoodie; `m4` The Last Epoch Steelbook | None; detail gallery falls back to one `image` |

## Data-to-Asset Mapping Audit

The current `image` fields resolve to imported files in `design-references/`, not to `public/assets/`. Because no generated filename contains a current record ID or exact current title, generated candidates are marked `NEEDS_MAPPING` rather than assigned by category alone.

| Category | Content Type | Data ID(s) | Content Name(s) | Expected Asset | Current Asset | Status |
|---|---|---|---|---|---|---|
| Homepage | Hero | n/a | Homepage hero | `/assets/homepage/homepage-hero.jpg` | `design-references/cec84c245679037.69b2c06f3fdd7.png` via `HeroSection.jsx` | NEEDS_MAPPING / PLACEHOLDER |
| All 7 | Category heroes | anime, gaming, movies, tv, kpop, comics, manga | Category names | One category hero per slug | `design-references/0b72...` through `914b...` via `categoryData.js` | NEEDS_MAPPING / PLACEHOLDER |
| All 7 | Characters | 35 records: `ca1-ca5`, `cg1-cg5`, `cm1-cm5`, `ct1-ct5`, `ck1-ck5`, `cc1-cc5`, `cn1-cn5` | All 35 current character names listed above | One identified character image per record | Shared `img1-img15` legacy references; many records share images | NEEDS_ASSET / PLACEHOLDER |
| Anime | Character candidates | n/a | n/a | `/assets/anime/characters/anime-character-1.jpg` | Unused | NEEDS_MAPPING |
| Gaming | Character candidates | n/a | n/a | `/assets/gaming/characters/gaming-character-1.jpg` | Unused | NEEDS_MAPPING |
| Movies | Character candidates | n/a | n/a | `/assets/movies/characters/movies-character-1.jpg` | Unused | NEEDS_MAPPING |
| TV Shows | Character candidates | n/a | n/a | `/assets/tv/characters/tv-character-1.jpg` | Unused | NEEDS_MAPPING |
| K-Pop | Character candidates | n/a | n/a | `/assets/kpop/characters/kpop-character-1.jpg` | Unused | NEEDS_MAPPING |
| Comics | Character candidates | n/a | n/a | `/assets/comics/characters/comics-character-1.jpg` | Unused | NEEDS_MAPPING |
| Manga | Character candidates | n/a | n/a | `/assets/manga/characters/manga-character-1.jpg` | Unused | NEEDS_MAPPING |
| All 7 | Articles | Unique data IDs `a1-a3`; 21 category-view placements | Three current article titles; placements repeat by category | 14 generated article candidates, two per category | `design-references/ee32...`, `original-047...`, `original-6ac...` | NEEDS_MAPPING / PLACEHOLDER |
| All 7 | Trailers | Unique data IDs `tr1-tr3`; 21 category-view placements | Eclipse of Eden; Void Runner: 2099; Silent Chorus | One generated trailer candidate per category | `design-references/still-566...`, `0b72...`, `3d565...` | NEEDS_MAPPING / PLACEHOLDER |
| Movies | Trailer candidate | n/a | n/a | `/assets/movies/trailers/film-festival-event.jpg` | Unused; filename conflicts with trailer folder | NEEDS_MAPPING |
| All 7 | Events | 21 records: `e1-e3`, `ea2-ea3`, `eg2-eg3`, `em1-em3`, `et1-et3`, `ek1-ek3`, `ec2-ec3`, `en1-en3` | All 21 event titles listed above | One generated event candidate per category; homepage has 3 additional candidates | Shared legacy references `img1-img14`; category views use repeated/generated-looking content with no IDs | NEEDS_ASSET / PLACEHOLDER |
| All 7 | Merchandise | Unique data IDs `m1-m4`; 28 category-view placements | Four current merchandise titles repeated across categories | 10 category candidates plus 3 homepage candidates | `design-references/6b...`, `7acf...`, `7eacf...`, `914...` | NEEDS_MAPPING / PLACEHOLDER |
| All 7 | Galleries | No explicit gallery records or gallery fields | No named gallery records | 14 generated gallery candidates: 9 category + 5 homepage | Detail pages use `[item.image]` fallback through `getGalleryImages()` | MISSING_DATA / NEEDS_MAPPING |
| All 7 | Releases | `rel-anime-01`, `rel-gaming-01`, `rel-movies-01`, `rel-tv-01`, `rel-kpop-01`, `rel-comics-01`, `rel-manga-01` | Seven release titles | No release-specific generated asset directory | Legacy `design-references` assets reused by `releaseData.js` | NEEDS_ASSET / PLACEHOLDER |

## Generated Asset Inventory

All 71 files below are currently unused by source code. The filename gives a candidate class and category, but not a current data ID.

### Homepage (12)

- Hero: `homepage/homepage-hero.jpg`
- Events: `homepage/events/creator-showcase-event.jpg`, `homepage/events/fandom-awards-event.jpg`, `homepage/events/fandom-festival-event.jpg`
- Galleries: `homepage/gallery/creator-studio-gallery.jpg`, `homepage/gallery/fandom-archive-gallery.jpg`, `homepage/gallery/fandom-future-gallery.jpg`, `homepage/gallery/fandom-museum-gallery.jpg`, `homepage/gallery/fandom-night-market-gallery.jpg`
- Merchandise: `homepage/merchandise/fandom-enamel-pins-merchandise.jpg`, `homepage/merchandise/fandom-jacket-merchandise.jpg`, `homepage/merchandise/fandom-tote-merchandise.jpg`

### Category Assets (59)

| Category | Hero | Character | Articles | Trailer candidate | Event | Merchandise | Galleries |
|---|---|---|---|---|---|---|---|
| Anime | `anime/anime-hero.jpg` | `anime/characters/anime-character-1.jpg` | `anime/articles/article-anime-1.jpg`; `article-anime-2.jpg` | `anime/trailers/trailer-anime-1.jpg` | `anime/events/anime-convention-event.jpg` | `anime/merchandise/anime-collectible-merchandise.jpg`; `anime-poster-merchandise.jpg` | `anime/gallery/anime-city-gallery.jpg`; `anime-shrine-gallery.jpg` |
| Gaming | `gaming/gaming-hero.jpg` | `gaming/characters/gaming-character-1.jpg` | `gaming/articles/article-gaming-1.jpg`; `article-gaming-2.jpg` | `gaming/trailers/trailer-gaming-1.jpg` | `gaming/events/gaming-expo-event.jpg` | `gaming/merchandise/gaming-desk-figure-merchandise.jpg`; `gaming-hoodie-merchandise.jpg` | `gaming/gallery/gaming-arena-gallery.jpg`; `gaming-megacity-gallery.jpg` |
| Movies | `movies/movies-hero.jpg` | `movies/characters/movies-character-1.jpg` | `movies/articles/article-movies-1.jpg`; `article-movies-2.jpg` | `movies/trailers/film-festival-event.jpg` | `movies/events/tv-fan-gathering-event.jpg` | `movies/merchandise/movie-art-print-merchandise.jpg` | `movies/gallery/movie-theater-gallery.jpg` |
| TV Shows | `tv/tv-hero.jpg` | `tv/characters/tv-character-1.jpg` | `tv/articles/article-tv-1.jpg`; `article-tv-2.jpg` | `tv/trailers/trailer-movies-1.jpg` | None | `tv/merchandise/tv-collectible-merchandise.jpg` | `tv/gallery/tv-city-gallery.jpg` |
| K-Pop | `kpop/kpop-hero.jpg` | `kpop/characters/kpop-character-1.jpg` | `kpop/articles/article-kpop-1.jpg`; `article-kpop-2.jpg` | `kpop/trailers/trailer-kpop-1.jpg` | `kpop/events/kpop-concert-event.jpg` | `kpop/merchandise/kpop-lightstick-merchandise.jpg` | `kpop/gallery/kpop-stage-gallery.jpg` |
| Comics | `comics/comics-hero.jpg` | `comics/characters/comics-character-1.jpg` | `comics/articles/article-comics-1.jpg`; `article-comics-2.jpg` | `comics/trailers/trailer-comics-1.jpg` | `comics/events/comic-convention-event.jpg` | `comics/merchandise/comics-figure-merchandise.jpg` | `comics/gallery/comic-city-gallery.jpg` |
| Manga | `manga/manga-hero.jpg` | `manga/characters/manga-character-1.jpg` | `manga/articles/article-manga-1.jpg`; `article-manga-2.jpg` | `manga/trailers/trailer-manga-1.jpg` | `manga/events/manga-exhibition-event.jpg` | `manga/merchandise/manga-art-book-merchandise.jpg` | `manga/gallery/manga-street-gallery.jpg` |

## Legacy / Placeholder Image Usage

- `mockData.js` imports 16 legacy files from `design-references/` as `img1` through `img16`.
- `categoryData.js` imports 7 of those same legacy files for category heroes and reuses global records across every category.
- `releaseData.js` imports 7 legacy files from `design-references/`.
- `HeroSection.jsx` directly imports a legacy `design-references` PNG.
- `public/assets/` has zero source-code references at this audit point.
- The 16 legacy aliases are shared across many records; this is not a one-record/one-image model. Image alias occurrence counts in `mockData.js` range from 2 (`img16`) to 8 (`img1` and `img6`).
- No current record has a missing `image` field in the inspected primary collections. The issue is identity and source location, not null image fields.
- No explicit `gallery` field exists in the current data. The reusable gallery presents a single `image` fallback for article, event, and trailer details.

## SRS Content-Count Check

| Requirement | Actual current count | Result |
|---|---:|---|
| Categories | 7 | PASS |
| Characters | 35 category records, 5 per category | PASS |
| Events | 21 category records, 3 per category | PASS |
| Articles | 3 unique global records; 3 placements per category | PARTIAL / data is reused |
| Trailers | 3 unique global records; 3 placements per category | PARTIAL / data is reused |
| Merchandise | 4 unique global records; 4 placements per category | PARTIAL / data is reused |
| Galleries | 0 explicit records; one-image fallback on 3 detail types | NEEDS_DATA |
| Upcoming releases | 7 records, one per category | PASS |

## Unused and Unmapped Counts

- Generated assets present: **71**.
- Generated assets referenced by source: **0**.
- Generated assets unused/unmapped: **71**.
- Explicit gallery records: **0**.
- Current unique named character records: **35**; generated category character candidates: **7**; **28 records still need additional or confirmed assets** even after category candidates are considered.
- Current unique article records: **3**; generated article candidates: **14**; exact title/ID mapping is **0 confirmed**.
- Current unique trailer records: **3**; generated trailer candidates: **7**; exact title/ID mapping is **0 confirmed**; one candidate has an event-like filename.
- Current unique event records: **21**; generated category event candidates: **7** plus 3 homepage event candidates; exact title/ID mapping is **0 confirmed**.
- Current unique merchandise records: **4**; generated merchandise candidates: **10** plus 3 homepage candidates; exact title/ID mapping is **0 confirmed**.
- Generated gallery candidates: **14**; current explicit gallery data: **0**.

## Required Phase 9B Changes

Do not apply these changes during Phase 9A.

1. Add a deliberate asset path convention, likely `/assets/...` public URLs or a small local asset manifest, without renaming or moving generated files.
2. Update `src/data/mockData.js` only after confirming record-to-file identity. This is the main mapping file for categories, characters, articles, trailers, events, and merchandise.
3. Update `src/data/categoryData.js` only where category hero or category collection wiring needs to point to confirmed assets; preserve its existing component-facing aliases.
4. Update `src/data/releaseData.js` for release artwork only if a release-to-asset relationship is explicitly confirmed; there is currently no release asset folder.
5. Add normalized gallery metadata to the appropriate records, likely in `mockData.js` or a dedicated data module, then pass confirmed local paths into `getGalleryImages()`.
6. Review `HeroSection.jsx` separately because it directly imports a legacy hero path. Do not modify it until the homepage hero replacement is explicitly confirmed; it is protected in this audit.
7. Verify all image consumers after mapping: `Category.jsx`, homepage sections, `SearchPage.jsx`, `BookmarksPage.jsx`, `CartPage.jsx`, detail pages, `Releases.jsx`, and `Gallery.jsx`.
8. Re-run the build and browser smoke tests after each mapping group. No component redesign is required.

## Phase 9B Integration Result

The audit recommendations above were applied conservatively. The original Phase 9A inventory remains unchanged as historical evidence; this section records the post-integration state.

| Result | Count |
|---|---:|
| Generated assets available | 71 |
| Unique generated assets integrated | 52 |
| Generated assets still unmapped | 19 |
| Unique legacy assets still consumed | 15 |
| Legacy imports no longer consumed but retained | 1 (`img16`, for cleanup review) |
| Broken generated image requests in browser smoke test | 0 |

### Integrated Mappings

- Homepage hero: `/assets/homepage/homepage-hero.jpg`.
- Seven category heroes: one exact `/assets/<category>/<category>-hero.jpg` per slug.
- Category article presentation: two generated article assets per category through `categoryData.js`; canonical Anime, Gaming, and Movies article records use their exact category candidates.
- Category trailer presentation: generated candidates for Anime, Gaming, TV Shows, K-Pop, Comics, and Manga. The ambiguous Movies trailer candidate remains unmapped.
- Events: generated category event assets for Anime, Gaming, Movies, K-Pop, Comics, and Manga; TV event records retain their legacy fallback because no generated TV event exists. Homepage events use the corresponding Gaming, Anime, and Comics generated event assets.
- Merchandise: generated category merchandise candidates are used in category presentation, and the four exact-category global merchandise records use Gaming, Anime, K-Pop, and Movies candidates.
- Galleries: article, trailer, and event records now carry deterministic category-appropriate gallery arrays. Gallery UI was not redesigned.

### Intentionally Unmapped

- Seven character candidates remain unmapped because category-only filenames do not identify any of the 35 named characters.
- Three homepage event candidates, five homepage gallery candidates, and three homepage merchandise candidates remain unused because no exact current record identity is established.
- The Movies trailer-folder candidate `movies/trailers/film-festival-event.jpg` remains unmapped because its filename conflicts with its folder/type.
- Seven release records retain their existing artwork because there is no release-specific asset directory.

### Legacy Cleanup Review

`design-references/` was not deleted. Fifteen of its imported files remain consumed by character/trending/fallback content and release imagery. One retained import (`img16`) is no longer consumed after the Anime trailer mapping and can be removed in a later cleanup pass after a separate reference audit.
