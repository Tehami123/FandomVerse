export const chatbotQuickReplies = [
  { label: 'Explore Anime', message: 'Take me to anime', to: '/category/anime' },
  { label: 'Explore Gaming', message: 'Open gaming', to: '/category/gaming' },
  { label: 'Browse Movies', message: 'Where are movies?', to: '/category/movies' },
  { label: 'View Events', message: 'Show events', to: '/search?q=event' },
  { label: 'Upcoming Releases', message: 'Show upcoming releases', to: '/releases' },
  { label: 'Search FandomVerse', message: 'Search FandomVerse', to: '/search' },
  { label: 'View Bookmarks', message: 'Open bookmarks', to: '/bookmarks' },
  { label: 'Browse Merchandise', message: 'Show me merchandise', to: '/search?q=merchandise' },
  { label: 'Open Cart', message: 'Open cart', to: '/cart' },
  { label: 'Help', message: 'Help', to: null },
];

const categoryActions = {
  anime: { label: 'Open Anime', to: '/category/anime' },
  gaming: { label: 'Open Gaming', to: '/category/gaming' },
  movies: { label: 'Open Movies', to: '/category/movies' },
  tv: { label: 'Open TV Shows', to: '/category/tv' },
  kpop: { label: 'Open K-Pop', to: '/category/kpop' },
  comics: { label: 'Open Comics', to: '/category/comics' },
  manga: { label: 'Open Manga', to: '/category/manga' },
};

export const chatbotIntents = [
  {
    id: 'greeting',
    triggers: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    response: 'Welcome to FandomVerse. I can help you explore categories, search the archive, manage bookmarks, browse merchandise, check events, or find upcoming releases.',
    quickReplies: chatbotQuickReplies.slice(0, 6),
  },
  {
    id: 'about',
    triggers: ['what is fandomverse', 'what is this site', 'tell me about fandomverse', 'about fandomverse'],
    response: 'FandomVerse is a cinematic discovery platform for Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga.',
    quickReplies: chatbotQuickReplies.slice(0, 3),
  },
  {
    id: 'categories',
    triggers: ['categories', 'what can i explore', 'what can i browse', 'show me categories', 'genres'],
    response: 'You can explore Anime, Gaming, Movies, TV Shows, K-Pop, Comics, and Manga.',
    quickReplies: chatbotQuickReplies.slice(0, 3),
  },
  {
    id: 'anime',
    triggers: ['anime', 'animation'],
    response: 'Anime is home to Japanese animation, from high-octane adventures to deep psychological stories.',
    action: categoryActions.anime,
  },
  {
    id: 'gaming',
    triggers: ['gaming', 'games', 'video games'],
    response: 'Gaming brings together digital worlds, releases, lore, and competitive scenes.',
    action: categoryActions.gaming,
  },
  {
    id: 'movies',
    triggers: ['movies', 'films', 'cinema'],
    response: 'Movies gathers cinematic experiences, blockbusters, independent favorites, and classics.',
    action: categoryActions.movies,
  },
  {
    id: 'tv',
    triggers: ['tv', 'television', 'tv shows', 'shows'],
    response: 'TV Shows is the place for binge-worthy narratives and episodic adventures.',
    action: categoryActions.tv,
  },
  {
    id: 'kpop',
    triggers: ['k-pop', 'kpop', 'k pop'],
    response: 'K-Pop covers music, videos, group spotlights, and the culture around Korean pop.',
    action: categoryActions.kpop,
  },
  {
    id: 'comics',
    triggers: ['comics', 'comic books'],
    response: 'Comics explores sequential storytelling, superhero epics, and grounded graphic novels.',
    action: categoryActions.comics,
  },
  {
    id: 'manga',
    triggers: ['manga'],
    response: 'Manga is the place to discover source material and ongoing serializations.',
    action: categoryActions.manga,
  },
  {
    id: 'bookmarks',
    triggers: ['bookmarks', 'bookmark', 'saved worlds', 'saved content'],
    response: 'Bookmark content from search and category cards, then return to it from your Bookmarks page.',
    action: { label: 'Open Bookmarks', to: '/bookmarks' },
  },
  {
    id: 'merchandise',
    triggers: ['merchandise', 'merch', 'collectibles', 'products'],
    response: 'Browse local merchandise from your favorite worlds and add products to the temporary cart.',
    action: { label: 'Browse Merchandise', to: '/search?q=merchandise' },
  },
  {
    id: 'cart',
    triggers: ['cart', 'shopping cart', 'basket'],
    response: 'The temporary cart supports quantities, removal, and totals. There is no real checkout or payment system.',
    action: { label: 'Open Cart', to: '/cart' },
  },
  {
    id: 'events',
    triggers: ['events', 'event', 'upcoming', 'calendar'],
    response: 'Explore upcoming and featured events from across the FandomVerse archive.',
    action: { label: 'Find Events', to: '/search?q=event' },
  },
  {
    id: 'trailers',
    triggers: ['trailers', 'trailer', 'videos'],
    response: 'Find the latest trailers and video discoveries in the archive.',
    action: { label: 'Find Trailers', to: '/search?q=trailer' },
  },
  {
    id: 'releases',
    triggers: ['releases', 'release calendar', 'release dates', 'upcoming releases'],
    response: 'The release calendar tracks upcoming and current discoveries across all seven categories.',
    action: { label: 'Open Releases', to: '/releases' },
  },
  {
    id: 'search',
    triggers: ['search', 'find', 'look for'],
    response: 'Use global search to find content across categories and refine results with filters and sorting.',
    action: { label: 'Open Search', to: '/search' },
  },
  {
    id: 'recommendation',
    triggers: ['recommend', 'recommendation', 'what should i explore', 'give me something', 'suggest something', 'give me an anime'],
    response: 'I found a local discovery for you.',
    recommendation: true,
  },
  {
    id: 'help',
    triggers: ['help', 'what can you do', 'options'],
    response: 'I can explain FandomVerse, guide you to categories, search the archive, help with bookmarks, browse merchandise, open your cart, find events, or check releases.',
    quickReplies: chatbotQuickReplies,
  },
];

export const fallbackResponse = 'I can help you explore FandomVerse, find categories, search content, manage bookmarks, browse merchandise, check events, or find upcoming releases.';
