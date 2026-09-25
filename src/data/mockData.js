const unconfirmedImage = null;

const characterAssetsByCategory = {
  anime: Array.from({ length: 5 }, (_, index) => `/assets/anime/characters/anime-character-0${index + 1}.jpg`),
  gaming: Array.from({ length: 5 }, (_, index) => `/assets/gaming/characters/gaming-character-0${index + 1}.jpg`),
  movies: Array.from({ length: 5 }, (_, index) => `/assets/movies/characters/movies-character-0${index + 1}.jpg`),
  tv: Array.from({ length: 5 }, (_, index) => `/assets/tv/characters/tv-character-0${index + 1}.jpg`),
  kpop: Array.from({ length: 5 }, (_, index) => `/assets/kpop/characters/kpop-character-0${index + 1}.jpg`),
  comics: Array.from({ length: 5 }, (_, index) => `/assets/comics/characters/comics-character-0${index + 1}.jpg`),
  manga: Array.from({ length: 5 }, (_, index) => `/assets/manga/characters/manga-character-0${index + 1}.jpg`),
};

export const categories = [
  { id: 'anime', title: 'Anime', image: '/assets/anime/anime-hero.jpg' },
  { id: 'gaming', title: 'Gaming', image: '/assets/gaming/gaming-hero.jpg' },
  { id: 'movies', title: 'Movies', image: '/assets/movies/movies-hero.jpg' },
  { id: 'tv', title: 'TV Shows', image: '/assets/tv/tv-hero.jpg' },
  { id: 'kpop', title: 'K-Pop', image: '/assets/kpop/kpop-hero.jpg' },
  { id: 'comics', title: 'Comics', image: '/assets/comics/comics-hero.jpg' },
  { id: 'manga', title: 'Manga', image: '/assets/manga/manga-hero.jpg' },
];

export const trending = [
  { id: 't1', title: 'Cybernetic Chronicles', description: 'A tactical RPG about rebellion in a machine-ruled city.', category: 'Gaming', type: 'RPG', tags: ['RPG', 'sci-fi'], popularity: 98, featured: true, image: '/assets/gaming/articles/article-gaming-1.jpg' },
  { id: 't2', title: 'Stellar Drifters', description: 'A crew of pilots charts a dangerous route through the outer systems.', category: 'Anime', type: 'Series', tags: ['space opera', 'adventure'], popularity: 94, featured: true, image: '/assets/anime/articles/article-anime-2.jpg' },
  { id: 't3', title: 'The Last Epoch', description: 'Survivors cross a fractured world to recover a lost future.', category: 'Movies', type: 'Sci-Fi', tags: ['cinema', 'sci-fi'], popularity: 91, featured: true, image: '/assets/movies/articles/article-movies-2.jpg' },
  { id: 't4', title: 'Neon Rhythms', description: 'A boundary-pushing comeback from the brightest new voices in K-Pop.', category: 'K-Pop', type: 'Album', tags: ['music', 'comeback'], popularity: 96, featured: true, image: '/assets/kpop/articles/article-kpop-2.jpg' },
];

export const articles = [
  { id: 'a1', title: 'The Evolution of Mecha Design in Modern Anime', description: 'How silhouette, scale, and motion changed the language of giant robots.', author: 'A. Halloway', readTime: '5 min read', category: 'Anime', type: 'Article', tags: ['anime', 'design'], date: '2026-08-14', featured: true, image: '/assets/anime/articles/article-anime-1.jpg', gallery: ['/assets/anime/gallery/anime-shrine-gallery.jpg', '/assets/anime/gallery/anime-city-gallery.jpg'] },
  { id: 'a2', title: 'Top 10 Upcoming RPGs of 2027', description: 'The role-playing worlds already on our radar for next year.', author: 'J. Curry', readTime: '8 min read', category: 'Gaming', type: 'Article', tags: ['gaming', 'RPG'], date: '2026-08-21', featured: true, image: '/assets/gaming/articles/article-gaming-1.jpg', gallery: ['/assets/gaming/gallery/gaming-megacity-gallery.jpg', '/assets/gaming/gallery/gaming-arena-gallery.jpg'] },
  { id: 'a3', title: 'Deconstructing the Cinematic Universe', description: 'Why interconnected stories still matter when every screen is crowded.', author: 'S. Oneill', readTime: '12 min read', category: 'Movies', type: 'Article', tags: ['movies', 'analysis'], date: '2026-08-29', featured: true, image: '/assets/movies/articles/article-movies-1.jpg', gallery: ['/assets/movies/gallery/movie-theater-gallery.jpg'] },
];

export const characterSpotlight = {
  name: 'Kaien Vance',
  franchise: 'Void Runner 2099',
  class: 'Cyber-Shinobi',
  weapon: 'Plasma Edge Type-IV',
  description: 'Ex-operative of the Neo-Kyoto Cybernetic Defense Command. Fitted with high-frequency phase-plasma katanas and optical dampening.',
  image: unconfirmedImage
};

export const characterRoster = [
  { id: 'c1', name: 'Kaien Vance', franchise: 'Void Runner 2099', series: 'Void Runner 2099', category: 'Gaming', class: 'Cyber-Shinobi', traits: ['Stealth', 'Agility'], image: unconfirmedImage, biography: 'Ex-operative of the Neo-Kyoto Cybernetic Defense Command.' },
  { id: 'c2', name: 'Aria Sol', franchise: 'Stellar Drifters', series: 'Stellar Drifters', category: 'Anime', class: 'Pilot', traits: ['Leadership', 'Tactics'], image: unconfirmedImage, biography: 'Ace pilot of the Drifter vanguard.' },
  { id: 'c3', name: 'Jin', franchise: 'Neon Rhythms', series: 'Neon Rhythms', category: 'K-Pop', class: 'Vocalist', traits: ['Charisma', 'Dance'], image: unconfirmedImage, biography: 'Lead singer with an undeniable stage presence.' },
  { id: 'c4', name: 'Elara', franchise: 'The Last Epoch', series: 'The Last Epoch', category: 'Movies', class: 'Survivor', traits: ['Resourceful', 'Willpower'], image: unconfirmedImage, biography: 'One of the few remaining survivors of the great calamity.' },
  { id: 'c5', name: 'Rael', franchise: 'Eclipse of Eden', series: 'Eclipse of Eden', category: 'Comics', class: 'Mage', traits: ['Magic', 'Wisdom'], image: unconfirmedImage, biography: 'A mysterious spellcaster seeking the lost texts.' }
];

const createCharacter = (id, name, series, category, biography, traits, image) => ({
  id, name, image, series, franchise: series, biography, traits, category,
});

export const charactersByCategory = {
  anime: [
    createCharacter('ca1', 'Kaien Vance', 'Void Runner 2099', 'Anime', 'A cyber-shinobi protecting the last free district of Neo-Kyoto.', ['Stealth', 'Agility'], unconfirmedImage),
    createCharacter('ca2', 'Aria Sol', 'Stellar Drifters', 'Anime', 'An ace pilot mapping safe passages through unstable space.', ['Leadership', 'Tactics'], unconfirmedImage),
    createCharacter('ca3', 'Rael', 'Eclipse of Eden', 'Anime', 'A young mage searching for texts that can restore a broken realm.', ['Magic', 'Wisdom'], unconfirmedImage),
    createCharacter('ca4', 'Mira Ten', 'Paper Moons', 'Anime', 'A courier carrying memories between floating cities.', ['Empathy', 'Resolve'], unconfirmedImage),
    createCharacter('ca5', 'Sora Vale', 'Skyline Zero', 'Anime', 'A street racer turned resistance strategist.', ['Speed', 'Strategy'], unconfirmedImage),
  ],
  gaming: [
    createCharacter('cg1', 'Kaien Vance', 'Void Runner 2099', 'Gaming', 'An ex-operative leading a tactical rebellion against the city core.', ['Stealth', 'Agility'], unconfirmedImage),
    createCharacter('cg2', 'Aria Sol', 'Stellar Drifters', 'Gaming', 'A squad commander who never leaves a pilot behind.', ['Leadership', 'Tactics'], unconfirmedImage),
    createCharacter('cg3', 'Elara', 'The Last Epoch', 'Gaming', 'A resourceful survivor building a settlement from the ruins.', ['Crafting', 'Willpower'], unconfirmedImage),
    createCharacter('cg4', 'Dax Mercer', 'Iron Circuit', 'Gaming', 'A tournament veteran who turns every loss into a new build.', ['Precision', 'Adaptability'], unconfirmedImage),
    createCharacter('cg5', 'Nyx', 'Eclipse Protocol', 'Gaming', 'A stealth operative uncovering the corporation behind the blackout.', ['Hacking', 'Stealth'], unconfirmedImage),
  ],
  movies: [
    createCharacter('cm1', 'Elara', 'The Last Epoch', 'Movies', 'One of the few remaining survivors of the great calamity.', ['Resourceful', 'Willpower'], unconfirmedImage),
    createCharacter('cm2', 'Rael', 'Eclipse of Eden', 'Movies', 'A spellcaster who trades certainty for one chance to save his home.', ['Magic', 'Wisdom'], unconfirmedImage),
    createCharacter('cm3', 'Jonah Vale', 'The Glass Horizon', 'Movies', 'A salvage diver who finds a message from a vanished civilization.', ['Courage', 'Curiosity'], unconfirmedImage),
    createCharacter('cm4', 'Lyra Chen', 'Afterlight', 'Movies', 'A scientist racing the sunrise of a world without electricity.', ['Science', 'Focus'], unconfirmedImage),
    createCharacter('cm5', 'Oren Pike', 'Black Meridian', 'Movies', 'A detective following a case that keeps rewriting its evidence.', ['Observation', 'Patience'], unconfirmedImage),
  ],
  tv: [
    createCharacter('ct1', 'Aria Sol', 'Stellar Drifters', 'TV Shows', 'A captain balancing a fragile crew and an impossible route home.', ['Leadership', 'Tactics'], unconfirmedImage),
    createCharacter('ct2', 'Jin', 'Neon Rhythms', 'TV Shows', 'A performer whose stage persona hides a meticulous producer.', ['Charisma', 'Dance'], unconfirmedImage),
    createCharacter('ct3', 'Mara Quinn', 'Northline', 'TV Shows', 'A public defender who knows every shortcut through the city.', ['Empathy', 'Tenacity'], unconfirmedImage),
    createCharacter('ct4', 'Evan Rook', 'Signal House', 'TV Shows', 'A radio host decoding a pattern inside late-night calls.', ['Listening', 'Logic'], unconfirmedImage),
    createCharacter('ct5', 'Tess Okafor', 'The Long Weekend', 'TV Shows', 'A chef rebuilding her family restaurant one guest at a time.', ['Craft', 'Warmth'], unconfirmedImage),
  ],
  kpop: [
    createCharacter('ck1', 'Jin', 'Neon Rhythms', 'K-Pop', 'A lead vocalist with an unmistakable stage presence.', ['Charisma', 'Dance'], unconfirmedImage),
    createCharacter('ck2', 'Hana Seo', 'Luminous', 'K-Pop', 'A songwriter turning diary fragments into arena-sized choruses.', ['Songwriting', 'Vision'], unconfirmedImage),
    createCharacter('ck3', 'Min Jae', 'Orbit Seven', 'K-Pop', 'A precise dancer who anchors every live performance.', ['Dance', 'Discipline'], unconfirmedImage),
    createCharacter('ck4', 'Yuri Han', 'Velvet Signal', 'K-Pop', 'A producer shaping a new sound from analog synths and field recordings.', ['Production', 'Experimentation'], unconfirmedImage),
    createCharacter('ck5', 'Dae Kim', 'Afterglow', 'K-Pop', 'A rapper documenting life between rehearsals and home.', ['Flow', 'Storytelling'], unconfirmedImage),
  ],
  comics: [
    createCharacter('cc1', 'Rael', 'Eclipse of Eden', 'Comics', 'A mysterious spellcaster seeking the lost texts.', ['Magic', 'Wisdom'], unconfirmedImage),
    createCharacter('cc2', 'Violet Kane', 'The Night Archive', 'Comics', 'An archivist who can enter memories stored in old paper.', ['Investigation', 'Memory'], unconfirmedImage),
    createCharacter('cc3', 'Brick Calder', 'City of Titans', 'Comics', 'A dockworker with a stubborn sense of justice and impossible strength.', ['Strength', 'Loyalty'], unconfirmedImage),
    createCharacter('cc4', 'Nova Reyes', 'Starbreaker', 'Comics', 'A former navigator defending a planet from its own satellites.', ['Piloting', 'Defiance'], unconfirmedImage),
    createCharacter('cc5', 'Iris Wren', 'Wildline', 'Comics', 'A conservationist protecting a hidden valley from an industrial empire.', ['Tracking', 'Courage'], unconfirmedImage),
  ],
  manga: [
    createCharacter('cn1', 'Sora Vale', 'Skyline Zero', 'Manga', 'A street racer who discovers the city is built over a sleeping machine.', ['Speed', 'Strategy'], unconfirmedImage),
    createCharacter('cn2', 'Mira Ten', 'Paper Moons', 'Manga', 'A courier carrying forbidden memories between floating cities.', ['Empathy', 'Resolve'], unconfirmedImage),
    createCharacter('cn3', 'Kaito Ren', 'Blue Ember', 'Manga', 'A quiet apprentice learning why his village fears its own fire.', ['Patience', 'Control'], unconfirmedImage),
    createCharacter('cn4', 'Yuna Aki', 'Garden of Echoes', 'Manga', 'A botanist hearing voices in plants that should be extinct.', ['Botany', 'Curiosity'], unconfirmedImage),
    createCharacter('cn5', 'Ren Kisaragi', 'Moonlit District', 'Manga', 'A courier navigating rival clans beneath an endless night.', ['Agility', 'Diplomacy'], unconfirmedImage),
  ],
};

Object.entries(characterAssetsByCategory).forEach(([category, assets]) => {
  charactersByCategory[category] = charactersByCategory[category].map((character, index) => ({
    ...character,
    image: assets[index],
  }));
});

export const trailers = [
  { id: 'tr1', title: 'Eclipse of Eden', status: 'Premiering Tomorrow', type: 'Trailer', category: 'Anime', description: 'A new chapter begins beneath a dying sky.', image: '/assets/anime/trailers/trailer-anime-1.jpg', gallery: ['/assets/anime/gallery/anime-shrine-gallery.jpg', '/assets/anime/gallery/anime-city-gallery.jpg'] },
  { id: 'tr2', title: 'Void Runner: 2099', status: 'Live Now', type: 'Trailer', category: 'Gaming', description: 'The city core is watching.', image: '/assets/gaming/trailers/trailer-gaming-1.jpg', gallery: ['/assets/gaming/gallery/gaming-megacity-gallery.jpg', '/assets/gaming/gallery/gaming-arena-gallery.jpg'] },
  { id: 'tr3', title: 'Silent Chorus', status: 'Coming Soon', type: 'Trailer', category: 'Movies', description: 'Some signals are never meant to be answered.', image: '/assets/movies/trailers/movies-trailer-01.jpg', gallery: ['/assets/movies/trailers/movies-trailer-01.jpg', '/assets/movies/gallery/movie-theater-gallery.jpg'] },
];

const eventGalleryByCategory = {
  Anime: ['/assets/anime/gallery/anime-shrine-gallery.jpg', '/assets/anime/gallery/anime-city-gallery.jpg'],
  Gaming: ['/assets/gaming/gallery/gaming-megacity-gallery.jpg', '/assets/gaming/gallery/gaming-arena-gallery.jpg'],
  Movies: ['/assets/movies/gallery/movie-theater-gallery.jpg'],
  'TV Shows': ['/assets/tv/gallery/tv-city-gallery.jpg'],
  'K-Pop': ['/assets/kpop/gallery/kpop-stage-gallery.jpg'],
  Comics: ['/assets/comics/gallery/comic-city-gallery.jpg'],
  Manga: ['/assets/manga/gallery/manga-street-gallery.jpg'],
};

const eventAssetByCategory = {
  Anime: 'anime-convention-event.jpg',
  Gaming: 'gaming-expo-event.jpg',
  Movies: 'tv-fan-gathering-event.jpg',
  'K-Pop': 'kpop-concert-event.jpg',
  Comics: 'comic-convention-event.jpg',
  Manga: 'manga-exhibition-event.jpg',
};

const eventAssetById = {
  ea1: '/assets/anime/events/anime-convention-event.jpg',
  ea2: '/assets/anime/events/anime-event-02.jpg',
  ea3: '/assets/anime/events/anime-event-03.jpg',
  eg1: '/assets/gaming/events/gaming-expo-event.jpg',
  eg2: '/assets/gaming/events/gaming-event-02.jpg',
  eg3: '/assets/gaming/events/gaming-event-03.jpg',
  em1: '/assets/movies/events/tv-fan-gathering-event.jpg',
  em2: '/assets/movies/events/movies-event-02.jpg',
  em3: '/assets/movies/events/movies-event-03.jpg',
  et1: '/assets/tv/events/tv-event-01.jpg',
  et2: '/assets/tv/events/tv-event-02.jpg',
  et3: '/assets/tv/events/tv-event-03.jpg',
  ek1: '/assets/kpop/events/kpop-concert-event.jpg',
  ek2: '/assets/kpop/events/kpop-event-02.jpg',
  ek3: '/assets/kpop/events/kpop-event-03.jpg',
  ec1: '/assets/comics/events/comic-convention-event.jpg',
  ec2: '/assets/comics/events/comics-event-02.jpg',
  ec3: '/assets/comics/events/comics-event-03.jpg',
  en1: '/assets/manga/events/manga-exhibition-event.jpg',
  en2: '/assets/manga/events/manga-event-02.jpg',
  en3: '/assets/manga/events/manga-event-03.jpg',
};

const assetCategorySlug = (category) => ({ 'TV Shows': 'tv', 'K-Pop': 'kpop' }[category] || category.toLowerCase());

const createEvent = (id, title, date, location, description, category, image) => {
  const categoryImage = eventAssetByCategory[category] ? `/assets/${assetCategorySlug(category)}/events/${eventAssetByCategory[category]}` : image;
  const resolvedImage = eventAssetById[id] || categoryImage;
  return {
    id, title, date, location, description, category, type: 'Event', image: resolvedImage,
    gallery: [resolvedImage, ...(eventGalleryByCategory[category] || [])].filter(Boolean),
  };
};

const eventCatalog = [
  createEvent('ea1', 'Anime Expo Winter', 'NOV 12', 'Los Angeles, USA', 'Panels, premieres, and creator showcases from across anime.', 'Anime', unconfirmedImage),
  createEvent('ea2', 'Sakura Night Market', 'JAN 18', 'Kyoto, Japan', 'A night market celebrating animation, food, and illustration.', 'Anime', unconfirmedImage),
  createEvent('ea3', 'Animated Worlds Film Night', 'FEB 08', 'Paris, France', 'A curated screening of boundary-pushing animated films.', 'Anime', unconfirmedImage),
  createEvent('eg1', 'Global Esports Final', 'OCT 24', 'Tokyo, Japan', 'The world championship closes out the competitive season.', 'Gaming', unconfirmedImage),
  createEvent('eg2', 'Indie Worlds Showcase', 'NOV 03', 'Austin, USA', 'Independent studios reveal their next playable worlds.', 'Gaming', unconfirmedImage),
  createEvent('eg3', 'World Speedrun Relay', 'DEC 19', 'Online', 'A global relay raising funds through precision play.', 'Gaming', unconfirmedImage),
  createEvent('em1', 'Midnight Premiere Circuit', 'OCT 31', 'London, UK', 'A season of midnight screenings for genre cinema fans.', 'Movies', unconfirmedImage),
  createEvent('em2', 'Directors in Focus', 'NOV 16', 'Seoul, South Korea', 'Conversations with filmmakers shaping the next decade.', 'Movies', unconfirmedImage),
  createEvent('em3', 'Future Frames Festival', 'JAN 09', 'Toronto, Canada', 'New science-fiction cinema from emerging directors.', 'Movies', unconfirmedImage),
  createEvent('et1', 'Pilot Lab Live', 'OCT 28', 'New York, USA', 'Creators preview the series that could define the next season.', 'TV Shows', unconfirmedImage),
  createEvent('et2', 'The Finale Watch', 'NOV 22', 'Online', 'A worldwide watch party for the year\'s biggest finale.', 'TV Shows', unconfirmedImage),
  createEvent('et3', 'Writers Room Summit', 'DEC 13', 'Los Angeles, USA', 'Story editors unpack the craft behind episodic television.', 'TV Shows', unconfirmedImage),
  createEvent('ek1', 'Neon Rhythms Live', 'OCT 18', 'Seoul, South Korea', 'A homecoming performance for the year’s defining album.', 'K-Pop', unconfirmedImage),
  createEvent('ek2', 'Orbit Seven Fan Con', 'NOV 09', 'Bangkok, Thailand', 'A full day of performances, games, and fan stages.', 'K-Pop', unconfirmedImage),
  createEvent('ek3', 'Global Sound Awards', 'DEC 28', 'Busan, South Korea', 'Artists and fans gather for the annual music awards.', 'K-Pop', unconfirmedImage),
  createEvent('ec1', 'Comic-Con International', 'DEC 05', 'San Diego, USA', 'A weekend of comics, creators, and exclusive reveals.', 'Comics', unconfirmedImage),
  createEvent('ec2', 'Creator Alley Weekend', 'NOV 07', 'Chicago, USA', 'Independent artists meet readers and debut new books.', 'Comics', unconfirmedImage),
  createEvent('ec3', 'Graphic Novel Forum', 'JAN 25', 'Berlin, Germany', 'A forum on the future of long-form sequential storytelling.', 'Comics', unconfirmedImage),
  createEvent('en1', 'Manga Expo', 'OCT 26', 'Tokyo, Japan', 'Publishers and artists share the next wave of serial stories.', 'Manga', unconfirmedImage),
  createEvent('en2', 'Artist Studio Visits', 'NOV 30', 'Osaka, Japan', 'A behind-the-scenes look at the craft of manga production.', 'Manga', unconfirmedImage),
  createEvent('en3', 'Midnight Serialization Night', 'DEC 21', 'Online', 'Readers gather to celebrate new chapters as they release.', 'Manga', unconfirmedImage),
];

export const events = ['eg1', 'ea1', 'ec1'].map((id) => eventCatalog.find((event) => event.id === id)).filter(Boolean);

export const eventsByCategory = {
  anime: eventCatalog.filter((event) => event.category === 'Anime'),
  gaming: eventCatalog.filter((event) => event.category === 'Gaming'),
  movies: eventCatalog.filter((event) => event.category === 'Movies'),
  tv: eventCatalog.filter((event) => event.category === 'TV Shows'),
  kpop: eventCatalog.filter((event) => event.category === 'K-Pop'),
  comics: eventCatalog.filter((event) => event.category === 'Comics'),
  manga: eventCatalog.filter((event) => event.category === 'Manga'),
};

export const merchandise = [
  { id: 'm1', title: 'Void Runner Katana Replica', name: 'Void Runner Katana Replica', description: 'A display replica inspired by the Neo-Kyoto defense line.', category: 'Gaming', type: 'Collectible', price: '$129.99', status: 'In Stock', image: '/assets/gaming/merchandise/gaming-desk-figure-merchandise.jpg' },
  { id: 'm2', title: 'Stellar Drifters Artbook', name: 'Stellar Drifters Artbook', description: 'Concept art and production notes from the Drifter vanguard.', category: 'Anime', type: 'Artbook', price: '$45.00', status: 'Pre-order', image: '/assets/anime/merchandise/anime-poster-merchandise.jpg' },
  { id: 'm3', title: 'Neon Rhythms Hoodie', name: 'Neon Rhythms Hoodie', description: 'Limited tour apparel from the Neon Rhythms era.', category: 'K-Pop', type: 'Apparel', price: '$65.00', status: 'Limited Edition', image: '/assets/kpop/merchandise/kpop-lightstick-merchandise.jpg' },
  { id: 'm4', title: 'The Last Epoch Steelbook', name: 'The Last Epoch Steelbook', description: 'A collector steelbook edition of the cinematic survival epic.', category: 'Movies', type: 'Home Video', price: '$29.99', status: 'In Stock', image: '/assets/movies/merchandise/movie-art-print-merchandise.jpg' },
];
