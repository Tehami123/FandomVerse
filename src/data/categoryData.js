import { trending, articles, charactersByCategory, trailers, eventsByCategory, merchandise, merchandiseByCategory } from './mockData';
const heroImg1 = '/assets/anime/anime-hero.jpg';
const heroImg2 = '/assets/gaming/gaming-hero.jpg';
const heroImg3 = '/assets/movies/movies-hero.jpg';
const heroImg4 = '/assets/tv/tv-hero.jpg';
const heroImg5 = '/assets/kpop/kpop-hero.jpg';
const heroImg6 = '/assets/comics/comics-hero.jpg';
const heroImg7 = '/assets/manga/manga-hero.jpg';

const categoryMedia = {
  anime: {
    articles: ['/assets/anime/articles/article-anime-1.jpg', '/assets/anime/articles/article-anime-2.jpg'],
    trailers: '/assets/anime/trailers/trailer-anime-1.jpg',
    events: '/assets/anime/events/anime-convention-event.jpg',
    merchandise: ['/assets/anime/merchandise/anime-collectible-merchandise.jpg', '/assets/anime/merchandise/anime-poster-merchandise.jpg'],
  },
  gaming: {
    articles: ['/assets/gaming/articles/article-gaming-1.jpg', '/assets/gaming/articles/article-gaming-2.jpg'],
    trailers: '/assets/gaming/trailers/trailer-gaming-1.jpg',
    events: '/assets/gaming/events/gaming-expo-event.jpg',
    merchandise: ['/assets/gaming/merchandise/gaming-desk-figure-merchandise.jpg', '/assets/gaming/merchandise/gaming-hoodie-merchandise.jpg'],
  },
  movies: {
    articles: ['/assets/movies/articles/article-movies-1.jpg', '/assets/movies/articles/article-movies-2.jpg'],
    events: '/assets/movies/events/tv-fan-gathering-event.jpg',
    merchandise: ['/assets/movies/merchandise/movie-art-print-merchandise.jpg'],
  },
  tv: {
    articles: ['/assets/tv/articles/article-tv-1.jpg', '/assets/tv/articles/article-tv-2.jpg'],
    trailers: '/assets/tv/trailers/trailer-movies-1.jpg',
    merchandise: ['/assets/tv/merchandise/tv-collectible-merchandise.jpg'],
  },
  kpop: {
    articles: ['/assets/kpop/articles/article-kpop-1.jpg', '/assets/kpop/articles/article-kpop-2.jpg'],
    trailers: '/assets/kpop/trailers/trailer-kpop-1.jpg',
    events: '/assets/kpop/events/kpop-concert-event.jpg',
    merchandise: ['/assets/kpop/merchandise/kpop-lightstick-merchandise.jpg'],
  },
  comics: {
    articles: ['/assets/comics/articles/article-comics-1.jpg', '/assets/comics/articles/article-comics-2.jpg'],
    trailers: '/assets/comics/trailers/trailer-comics-1.jpg',
    events: '/assets/comics/events/comic-convention-event.jpg',
    merchandise: ['/assets/comics/merchandise/comics-figure-merchandise.jpg'],
  },
  manga: {
    articles: ['/assets/manga/articles/article-manga-1.jpg', '/assets/manga/articles/article-manga-2.jpg'],
    trailers: '/assets/manga/trailers/trailer-manga-1.jpg',
    events: '/assets/manga/events/manga-exhibition-event.jpg',
    merchandise: ['/assets/manga/merchandise/manga-art-book-merchandise.jpg'],
  },
};

const withCategoryMedia = (items, category, field) => items.map((item, index) => ({
  ...item,
  image: Array.isArray(categoryMedia[category][field])
    ? categoryMedia[category][field][index % categoryMedia[category][field].length]
    : categoryMedia[category][field] || item.image,
}));

// Reusing global mock data to populate category pages
export const categoryDetails = {
  anime: {
    id: 'anime',
    name: 'Anime',
    slug: 'anime',
    accentColor: 'var(--color-anime)',
    accent: 'var(--color-anime)',
    heroImage: heroImg1,
    hero: heroImg1,
    description: 'Explore the vast worlds of Japanese animation. From high-octane shounen battles to deep psychological thrillers, discover your next obsession.',
    featuredContent: trending[1],
    featured: trending[1],
    trendingContent: [trending[1], trending[1], trending[1], trending[1]],
    trending: [trending[1], trending[1], trending[1], trending[1]],
    latestContent: [trending[1], trending[0], trending[2]],
    discovery: [trending[1], trending[0], trending[2]],
    characters: charactersByCategory.anime,
    articles: withCategoryMedia([articles[0], articles[1], articles[2]], 'anime', 'articles'),
    trailers: withCategoryMedia(trailers, 'anime', 'trailers'),
    events: eventsByCategory.anime,
    merchandise: merchandiseByCategory.anime
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming',
    slug: 'gaming',
    accentColor: 'var(--color-gaming)',
    accent: 'var(--color-gaming)',
    heroImage: heroImg2,
    hero: heroImg2,
    description: 'Dive into digital realms. The latest releases, deepest lore, and competitive scenes from across the gaming multiverse.',
    featuredContent: trending[0],
    featured: trending[0],
    trendingContent: [trending[0], trending[0], trending[0], trending[0]],
    trending: [trending[0], trending[0], trending[0], trending[0]],
    latestContent: [trending[0], trending[1], trending[2]],
    discovery: [trending[0], trending[1], trending[2]],
    characters: charactersByCategory.gaming,
    articles: withCategoryMedia([articles[1], articles[2], articles[0]], 'gaming', 'articles'),
    trailers: withCategoryMedia(trailers, 'gaming', 'trailers'),
    events: eventsByCategory.gaming,
    merchandise: merchandiseByCategory.gaming
  },
  movies: {
    id: 'movies',
    name: 'Movies',
    slug: 'movies',
    accentColor: 'var(--color-movies)',
    accent: 'var(--color-movies)',
    heroImage: heroImg3,
    hero: heroImg3,
    description: 'Cinematic experiences that define generations. Blockbusters, indie darlings, and deep-cut classics await.',
    featuredContent: trending[2],
    featured: trending[2],
    trendingContent: [trending[2], trending[2], trending[2], trending[2]],
    trending: [trending[2], trending[2], trending[2], trending[2]],
    latestContent: [trending[2], trending[3], trending[0]],
    discovery: [trending[2], trending[3], trending[0]],
    characters: charactersByCategory.movies,
    articles: withCategoryMedia([articles[2], articles[0], articles[1]], 'movies', 'articles'),
    trailers: trailers,
    events: eventsByCategory.movies,
    merchandise: merchandiseByCategory.movies
  },
  tv: {
    id: 'tv',
    name: 'TV Shows',
    slug: 'tv',
    accentColor: 'var(--color-tv)',
    accent: 'var(--color-tv)',
    heroImage: heroImg4,
    hero: heroImg4,
    description: 'Binge-worthy narratives and episodic adventures. Step into ongoing worlds of premium television.',
    featuredContent: trending[3],
    featured: trending[3],
    trendingContent: [trending[3], trending[3], trending[3], trending[3]],
    trending: [trending[3], trending[3], trending[3], trending[3]],
    latestContent: [trending[3], trending[2], trending[1]],
    discovery: [trending[3], trending[2], trending[1]],
    characters: charactersByCategory.tv,
    articles: withCategoryMedia([articles[0], articles[1], articles[2]], 'tv', 'articles'),
    trailers: withCategoryMedia(trailers, 'tv', 'trailers'),
    events: eventsByCategory.tv,
    merchandise: merchandiseByCategory.tv
  },
  kpop: {
    id: 'kpop',
    name: 'K-Pop',
    slug: 'kpop',
    accentColor: 'var(--color-kpop)',
    accent: 'var(--color-kpop)',
    heroImage: heroImg5,
    hero: heroImg5,
    description: 'The global phenomenon. Music videos, group spotlights, and the culture surrounding Korean pop.',
    featuredContent: trending[3],
    featured: trending[3],
    trendingContent: [trending[3], trending[3], trending[3], trending[3]],
    trending: [trending[3], trending[3], trending[3], trending[3]],
    latestContent: [trending[3], trending[0], trending[1]],
    discovery: [trending[3], trending[0], trending[1]],
    characters: charactersByCategory.kpop,
    articles: withCategoryMedia([articles[1], articles[0], articles[2]], 'kpop', 'articles'),
    trailers: withCategoryMedia(trailers, 'kpop', 'trailers'),
    events: eventsByCategory.kpop,
    merchandise: merchandiseByCategory.kpop
  },
  comics: {
    id: 'comics',
    name: 'Comics',
    slug: 'comics',
    accentColor: 'var(--color-comics)',
    accent: 'var(--color-comics)',
    heroImage: heroImg6,
    hero: heroImg6,
    description: 'Sequential storytelling at its finest. From superhero epics to grounded indie graphic novels.',
    featuredContent: trending[0],
    featured: trending[0],
    trendingContent: [trending[0], trending[0], trending[0], trending[0]],
    trending: [trending[0], trending[0], trending[0], trending[0]],
    latestContent: [trending[0], trending[2], trending[3]],
    discovery: [trending[0], trending[2], trending[3]],
    characters: charactersByCategory.comics,
    articles: withCategoryMedia([articles[2], articles[1], articles[0]], 'comics', 'articles'),
    trailers: withCategoryMedia(trailers, 'comics', 'trailers'),
    events: eventsByCategory.comics,
    merchandise: merchandiseByCategory.comics
  },
  manga: {
    id: 'manga',
    name: 'Manga',
    slug: 'manga',
    accentColor: 'var(--color-manga)',
    accent: 'var(--color-manga)',
    heroImage: heroImg7,
    hero: heroImg7,
    description: 'The source material. Read the stories that inspire the anime and dive into ongoing serializations.',
    featuredContent: trending[1],
    featured: trending[1],
    trendingContent: [trending[1], trending[1], trending[1], trending[1]],
    trending: [trending[1], trending[1], trending[1], trending[1]],
    latestContent: [trending[1], trending[0], trending[2]],
    discovery: [trending[1], trending[0], trending[2]],
    characters: charactersByCategory.manga,
    articles: withCategoryMedia([articles[0], articles[2], articles[1]], 'manga', 'articles'),
    trailers: withCategoryMedia(trailers, 'manga', 'trailers'),
    events: eventsByCategory.manga,
    merchandise: merchandiseByCategory.manga
  }
};
