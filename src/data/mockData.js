import img1 from '../../design-references/0b72e5f07125a921159f0b5dbc184597.webp';
import img2 from '../../design-references/3d5657abee8d862f79660b657c0dad51.webp';
import img3 from '../../design-references/41d76481d4b984ecf038a53c156885fd.webp';
import img4 from '../../design-references/44cdc4c432e8385d9bfec5c691a8ce90.webp';
import img5 from '../../design-references/6b1371c55b89a2c351d9416935faf085.webp';
import img6 from '../../design-references/7acf74c51e317ed64a46d21fef8c2eb8 (1).webp';
import img7 from '../../design-references/7eacf2245679037.69b2c06f3e6ed.png';
import img8 from '../../design-references/914bb14146d4d8591cd886f9589d146b.webp';
import img9 from '../../design-references/bb3c999c3945c945bba70b88f0437009.webp';
import img10 from '../../design-references/cec84c245679037.69b2c06f3fdd7.png';
import img11 from '../../design-references/d61a2d7e2d34b77695ab1d69f1e8dd1a.webp';
import img12 from '../../design-references/ee32a4245679037.69b2c06f43742.png';
import img13 from '../../design-references/original-047d7eb2cc34cc971406604bf0179023.webp';
import img14 from '../../design-references/original-6ac5def4f15f7c2fee272143c182ce51.webp';
import img15 from '../../design-references/original-6af0daaf9208a482624515d6cece79fd.webp';
import img16 from '../../design-references/still-56638036f565c533630ea27322aeb232.webp';

export const categories = [
  { id: 'anime', title: 'Anime', image: img1 },
  { id: 'gaming', title: 'Gaming', image: img2 },
  { id: 'movies', title: 'Movies', image: img3 },
  { id: 'tv', title: 'TV Shows', image: img4 },
  { id: 'kpop', title: 'K-Pop', image: img5 },
  { id: 'comics', title: 'Comics', image: img6 },
  { id: 'manga', title: 'Manga', image: img7 },
];

export const trending = [
  { id: 't1', title: 'Cybernetic Chronicles', description: 'A tactical RPG about rebellion in a machine-ruled city.', category: 'Gaming', type: 'RPG', tags: ['RPG', 'sci-fi'], popularity: 98, featured: true, image: img8 },
  { id: 't2', title: 'Stellar Drifters', description: 'A crew of pilots charts a dangerous route through the outer systems.', category: 'Anime', type: 'Series', tags: ['space opera', 'adventure'], popularity: 94, featured: true, image: img9 },
  { id: 't3', title: 'The Last Epoch', description: 'Survivors cross a fractured world to recover a lost future.', category: 'Movies', type: 'Sci-Fi', tags: ['cinema', 'sci-fi'], popularity: 91, featured: true, image: img10 },
  { id: 't4', title: 'Neon Rhythms', description: 'A boundary-pushing comeback from the brightest new voices in K-Pop.', category: 'K-Pop', type: 'Album', tags: ['music', 'comeback'], popularity: 96, featured: true, image: img11 },
];

export const articles = [
  { id: 'a1', title: 'The Evolution of Mecha Design in Modern Anime', description: 'How silhouette, scale, and motion changed the language of giant robots.', author: 'A. Halloway', readTime: '5 min read', category: 'Anime', type: 'Article', tags: ['anime', 'design'], date: '2026-08-14', featured: true, image: img12 },
  { id: 'a2', title: 'Top 10 Upcoming RPGs of 2027', description: 'The role-playing worlds already on our radar for next year.', author: 'J. Curry', readTime: '8 min read', category: 'Gaming', type: 'Article', tags: ['gaming', 'RPG'], date: '2026-08-21', featured: true, image: img13 },
  { id: 'a3', title: 'Deconstructing the Cinematic Universe', description: 'Why interconnected stories still matter when every screen is crowded.', author: 'S. Oneill', readTime: '12 min read', category: 'Movies', type: 'Article', tags: ['movies', 'analysis'], date: '2026-08-29', featured: true, image: img14 },
];

export const characterSpotlight = {
  name: 'Kaien Vance',
  franchise: 'Void Runner 2099',
  class: 'Cyber-Shinobi',
  weapon: 'Plasma Edge Type-IV',
  description: 'Ex-operative of the Neo-Kyoto Cybernetic Defense Command. Fitted with high-frequency phase-plasma katanas and optical dampening.',
  image: img15
};

export const characterRoster = [
  { id: 'c1', name: 'Kaien Vance', franchise: 'Void Runner 2099', series: 'Void Runner 2099', category: 'Gaming', class: 'Cyber-Shinobi', traits: ['Stealth', 'Agility'], image: img15, biography: 'Ex-operative of the Neo-Kyoto Cybernetic Defense Command.' },
  { id: 'c2', name: 'Aria Sol', franchise: 'Stellar Drifters', series: 'Stellar Drifters', category: 'Anime', class: 'Pilot', traits: ['Leadership', 'Tactics'], image: img10, biography: 'Ace pilot of the Drifter vanguard.' },
  { id: 'c3', name: 'Jin', franchise: 'Neon Rhythms', series: 'Neon Rhythms', category: 'K-Pop', class: 'Vocalist', traits: ['Charisma', 'Dance'], image: img11, biography: 'Lead singer with an undeniable stage presence.' },
  { id: 'c4', name: 'Elara', franchise: 'The Last Epoch', series: 'The Last Epoch', category: 'Movies', class: 'Survivor', traits: ['Resourceful', 'Willpower'], image: img13, biography: 'One of the few remaining survivors of the great calamity.' },
  { id: 'c5', name: 'Rael', franchise: 'Eclipse of Eden', series: 'Eclipse of Eden', category: 'Comics', class: 'Mage', traits: ['Magic', 'Wisdom'], image: img12, biography: 'A mysterious spellcaster seeking the lost texts.' }
];

const createCharacter = (id, name, series, category, biography, traits, image) => ({
  id, name, image, series, franchise: series, biography, traits, category,
});

export const charactersByCategory = {
  anime: [
    createCharacter('ca1', 'Kaien Vance', 'Void Runner 2099', 'Anime', 'A cyber-shinobi protecting the last free district of Neo-Kyoto.', ['Stealth', 'Agility'], img15),
    createCharacter('ca2', 'Aria Sol', 'Stellar Drifters', 'Anime', 'An ace pilot mapping safe passages through unstable space.', ['Leadership', 'Tactics'], img10),
    createCharacter('ca3', 'Rael', 'Eclipse of Eden', 'Anime', 'A young mage searching for texts that can restore a broken realm.', ['Magic', 'Wisdom'], img12),
    createCharacter('ca4', 'Mira Ten', 'Paper Moons', 'Anime', 'A courier carrying memories between floating cities.', ['Empathy', 'Resolve'], img9),
    createCharacter('ca5', 'Sora Vale', 'Skyline Zero', 'Anime', 'A street racer turned resistance strategist.', ['Speed', 'Strategy'], img1),
  ],
  gaming: [
    createCharacter('cg1', 'Kaien Vance', 'Void Runner 2099', 'Gaming', 'An ex-operative leading a tactical rebellion against the city core.', ['Stealth', 'Agility'], img15),
    createCharacter('cg2', 'Aria Sol', 'Stellar Drifters', 'Gaming', 'A squad commander who never leaves a pilot behind.', ['Leadership', 'Tactics'], img10),
    createCharacter('cg3', 'Elara', 'The Last Epoch', 'Gaming', 'A resourceful survivor building a settlement from the ruins.', ['Crafting', 'Willpower'], img13),
    createCharacter('cg4', 'Dax Mercer', 'Iron Circuit', 'Gaming', 'A tournament veteran who turns every loss into a new build.', ['Precision', 'Adaptability'], img2),
    createCharacter('cg5', 'Nyx', 'Eclipse Protocol', 'Gaming', 'A stealth operative uncovering the corporation behind the blackout.', ['Hacking', 'Stealth'], img8),
  ],
  movies: [
    createCharacter('cm1', 'Elara', 'The Last Epoch', 'Movies', 'One of the few remaining survivors of the great calamity.', ['Resourceful', 'Willpower'], img13),
    createCharacter('cm2', 'Rael', 'Eclipse of Eden', 'Movies', 'A spellcaster who trades certainty for one chance to save his home.', ['Magic', 'Wisdom'], img12),
    createCharacter('cm3', 'Jonah Vale', 'The Glass Horizon', 'Movies', 'A salvage diver who finds a message from a vanished civilization.', ['Courage', 'Curiosity'], img14),
    createCharacter('cm4', 'Lyra Chen', 'Afterlight', 'Movies', 'A scientist racing the sunrise of a world without electricity.', ['Science', 'Focus'], img3),
    createCharacter('cm5', 'Oren Pike', 'Black Meridian', 'Movies', 'A detective following a case that keeps rewriting its evidence.', ['Observation', 'Patience'], img4),
  ],
  tv: [
    createCharacter('ct1', 'Aria Sol', 'Stellar Drifters', 'TV Shows', 'A captain balancing a fragile crew and an impossible route home.', ['Leadership', 'Tactics'], img10),
    createCharacter('ct2', 'Jin', 'Neon Rhythms', 'TV Shows', 'A performer whose stage persona hides a meticulous producer.', ['Charisma', 'Dance'], img11),
    createCharacter('ct3', 'Mara Quinn', 'Northline', 'TV Shows', 'A public defender who knows every shortcut through the city.', ['Empathy', 'Tenacity'], img4),
    createCharacter('ct4', 'Evan Rook', 'Signal House', 'TV Shows', 'A radio host decoding a pattern inside late-night calls.', ['Listening', 'Logic'], img6),
    createCharacter('ct5', 'Tess Okafor', 'The Long Weekend', 'TV Shows', 'A chef rebuilding her family restaurant one guest at a time.', ['Craft', 'Warmth'], img5),
  ],
  kpop: [
    createCharacter('ck1', 'Jin', 'Neon Rhythms', 'K-Pop', 'A lead vocalist with an unmistakable stage presence.', ['Charisma', 'Dance'], img11),
    createCharacter('ck2', 'Hana Seo', 'Luminous', 'K-Pop', 'A songwriter turning diary fragments into arena-sized choruses.', ['Songwriting', 'Vision'], img5),
    createCharacter('ck3', 'Min Jae', 'Orbit Seven', 'K-Pop', 'A precise dancer who anchors every live performance.', ['Dance', 'Discipline'], img7),
    createCharacter('ck4', 'Yuri Han', 'Velvet Signal', 'K-Pop', 'A producer shaping a new sound from analog synths and field recordings.', ['Production', 'Experimentation'], img1),
    createCharacter('ck5', 'Dae Kim', 'Afterglow', 'K-Pop', 'A rapper documenting life between rehearsals and home.', ['Flow', 'Storytelling'], img2),
  ],
  comics: [
    createCharacter('cc1', 'Rael', 'Eclipse of Eden', 'Comics', 'A mysterious spellcaster seeking the lost texts.', ['Magic', 'Wisdom'], img12),
    createCharacter('cc2', 'Violet Kane', 'The Night Archive', 'Comics', 'An archivist who can enter memories stored in old paper.', ['Investigation', 'Memory'], img6),
    createCharacter('cc3', 'Brick Calder', 'City of Titans', 'Comics', 'A dockworker with a stubborn sense of justice and impossible strength.', ['Strength', 'Loyalty'], img3),
    createCharacter('cc4', 'Nova Reyes', 'Starbreaker', 'Comics', 'A former navigator defending a planet from its own satellites.', ['Piloting', 'Defiance'], img8),
    createCharacter('cc5', 'Iris Wren', 'Wildline', 'Comics', 'A conservationist protecting a hidden valley from an industrial empire.', ['Tracking', 'Courage'], img4),
  ],
  manga: [
    createCharacter('cn1', 'Sora Vale', 'Skyline Zero', 'Manga', 'A street racer who discovers the city is built over a sleeping machine.', ['Speed', 'Strategy'], img1),
    createCharacter('cn2', 'Mira Ten', 'Paper Moons', 'Manga', 'A courier carrying forbidden memories between floating cities.', ['Empathy', 'Resolve'], img9),
    createCharacter('cn3', 'Kaito Ren', 'Blue Ember', 'Manga', 'A quiet apprentice learning why his village fears its own fire.', ['Patience', 'Control'], img2),
    createCharacter('cn4', 'Yuna Aki', 'Garden of Echoes', 'Manga', 'A botanist hearing voices in plants that should be extinct.', ['Botany', 'Curiosity'], img7),
    createCharacter('cn5', 'Ren Kisaragi', 'Moonlit District', 'Manga', 'A courier navigating rival clans beneath an endless night.', ['Agility', 'Diplomacy'], img6),
  ],
};

export const trailers = [
  { id: 'tr1', title: 'Eclipse of Eden', status: 'Premiering Tomorrow', type: 'Trailer', category: 'Anime', description: 'A new chapter begins beneath a dying sky.', image: img16 },
  { id: 'tr2', title: 'Void Runner: 2099', status: 'Live Now', type: 'Trailer', category: 'Gaming', description: 'The city core is watching.', image: img1 },
  { id: 'tr3', title: 'Silent Chorus', status: 'Coming Soon', type: 'Trailer', category: 'Movies', description: 'Some signals are never meant to be answered.', image: img2 },
];

export const events = [
  { id: 'e1', title: 'Global Esports Final', date: 'OCT 24', location: 'Tokyo, Japan', description: 'The world championship closes out the competitive season.', category: 'Gaming', type: 'Event', image: img3 },
  { id: 'e2', title: 'Anime Expo Winter', date: 'NOV 12', location: 'Los Angeles, USA', description: 'Panels, premieres, and creator showcases from across anime.', category: 'Anime', type: 'Event', image: img4 },
  { id: 'e3', title: 'Comic-Con International', date: 'DEC 05', location: 'San Diego, USA', description: 'A weekend of comics, creators, and exclusive reveals.', category: 'Comics', type: 'Event', image: img5 },
];

const createEvent = (id, title, date, location, description, category, image) => ({
  id, title, date, location, description, category, type: 'Event', image,
});

export const eventsByCategory = {
  anime: [events[1], createEvent('ea2', 'Sakura Night Market', 'JAN 18', 'Kyoto, Japan', 'A night market celebrating animation, food, and illustration.', 'Anime', img1), createEvent('ea3', 'Animated Worlds Film Night', 'FEB 08', 'Paris, France', 'A curated screening of boundary-pushing animated films.', 'Anime', img9)],
  gaming: [events[0], createEvent('eg2', 'Indie Worlds Showcase', 'NOV 03', 'Austin, USA', 'Independent studios reveal their next playable worlds.', 'Gaming', img2), createEvent('eg3', 'World Speedrun Relay', 'DEC 19', 'Online', 'A global relay raising funds through precision play.', 'Gaming', img8)],
  movies: [createEvent('em1', 'Midnight Premiere Circuit', 'OCT 31', 'London, UK', 'A season of midnight screenings for genre cinema fans.', 'Movies', img3), createEvent('em2', 'Directors in Focus', 'NOV 16', 'Seoul, South Korea', 'Conversations with filmmakers shaping the next decade.', 'Movies', img10), createEvent('em3', 'Future Frames Festival', 'JAN 09', 'Toronto, Canada', 'New science-fiction cinema from emerging directors.', 'Movies', img14)],
  tv: [createEvent('et1', 'Pilot Lab Live', 'OCT 28', 'New York, USA', 'Creators preview the series that could define the next season.', 'TV Shows', img4), createEvent('et2', 'The Finale Watch', 'NOV 22', 'Online', 'A worldwide watch party for the year\'s biggest finale.', 'TV Shows', img6), createEvent('et3', 'Writers Room Summit', 'DEC 13', 'Los Angeles, USA', 'Story editors unpack the craft behind episodic television.', 'TV Shows', img13)],
  kpop: [createEvent('ek1', 'Neon Rhythms Live', 'OCT 18', 'Seoul, South Korea', 'A homecoming performance for the year’s defining album.', 'K-Pop', img5), createEvent('ek2', 'Orbit Seven Fan Con', 'NOV 09', 'Bangkok, Thailand', 'A full day of performances, games, and fan stages.', 'K-Pop', img7), createEvent('ek3', 'Global Sound Awards', 'DEC 28', 'Busan, South Korea', 'Artists and fans gather for the annual music awards.', 'K-Pop', img11)],
  comics: [events[2], createEvent('ec2', 'Creator Alley Weekend', 'NOV 07', 'Chicago, USA', 'Independent artists meet readers and debut new books.', 'Comics', img6), createEvent('ec3', 'Graphic Novel Forum', 'JAN 25', 'Berlin, Germany', 'A forum on the future of long-form sequential storytelling.', 'Comics', img12)],
  manga: [createEvent('en1', 'Manga Expo', 'OCT 26', 'Tokyo, Japan', 'Publishers and artists share the next wave of serial stories.', 'Manga', img7), createEvent('en2', 'Artist Studio Visits', 'NOV 30', 'Osaka, Japan', 'A behind-the-scenes look at the craft of manga production.', 'Manga', img9), createEvent('en3', 'Midnight Serialization Night', 'DEC 21', 'Online', 'Readers gather to celebrate new chapters as they release.', 'Manga', img1)],
};

export const merchandise = [
  { id: 'm1', title: 'Void Runner Katana Replica', name: 'Void Runner Katana Replica', description: 'A display replica inspired by the Neo-Kyoto defense line.', category: 'Gaming', type: 'Collectible', price: '$129.99', status: 'In Stock', image: img5 },
  { id: 'm2', title: 'Stellar Drifters Artbook', name: 'Stellar Drifters Artbook', description: 'Concept art and production notes from the Drifter vanguard.', category: 'Anime', type: 'Artbook', price: '$45.00', status: 'Pre-order', image: img6 },
  { id: 'm3', title: 'Neon Rhythms Hoodie', name: 'Neon Rhythms Hoodie', description: 'Limited tour apparel from the Neon Rhythms era.', category: 'K-Pop', type: 'Apparel', price: '$65.00', status: 'Limited Edition', image: img7 },
  { id: 'm4', title: 'The Last Epoch Steelbook', name: 'The Last Epoch Steelbook', description: 'A collector steelbook edition of the cinematic survival epic.', category: 'Movies', type: 'Home Video', price: '$29.99', status: 'In Stock', image: img8 },
];
