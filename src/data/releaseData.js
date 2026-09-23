import releaseAnime from '../../design-references/914bb14146d4d8591cd886f9589d146b.webp';
import releaseGaming from '../../design-references/3d5657abee8d862f79660b657c0dad51.webp';
import releaseMovies from '../../design-references/41d76481d4b984ecf038a53c156885fd.webp';
import releaseTv from '../../design-references/44cdc4c432e8385d9bfec5c691a8ce90.webp';
import releaseKpop from '../../design-references/6b1371c55b89a2c351d9416935faf085.webp';
import releaseComics from '../../design-references/7acf74c51e317ed64a46d21fef8c2eb8 (1).webp';
import releaseManga from '../../design-references/7eacf2245679037.69b2c06f3e6ed.png';

export const releases = [
  {
    id: 'rel-anime-01', title: 'Stellar Drifters: New Orbit', category: 'Anime', franchise: 'Stellar Drifters', releaseDate: '2026-10-02', status: 'Upcoming',
    description: 'A new animated chapter expands the Drifter crew’s map beyond the outer systems.', image: releaseAnime, tags: ['anime', 'series', 'space opera'],
  },
  {
    id: 'rel-gaming-01', title: 'Void Runner 2099', category: 'Gaming', franchise: 'Void Runner 2099', releaseDate: '2026-10-16', status: 'Upcoming',
    description: 'The next playable chapter brings the Neo-Kyoto resistance into the city core.', image: releaseGaming, tags: ['gaming', 'RPG', 'sci-fi'],
  },
  {
    id: 'rel-movies-01', title: 'The Last Epoch: Afterlight', category: 'Movies', franchise: 'The Last Epoch', releaseDate: '2026-09-24', status: 'Current',
    description: 'A companion film follows the survivors as they rebuild after the fractured world.', image: releaseMovies, tags: ['movies', 'cinema', 'sci-fi'],
  },
  {
    id: 'rel-tv-01', title: 'Northline: Season Two', category: 'TV Shows', franchise: 'Northline', releaseDate: '2026-11-06', status: 'Upcoming',
    description: 'The Northline team returns with a new case and a city full of hidden shortcuts.', image: releaseTv, tags: ['tv', 'series', 'drama'],
  },
  {
    id: 'rel-kpop-01', title: 'Neon Rhythms: Afterglow', category: 'K-Pop', franchise: 'Neon Rhythms', releaseDate: '2026-10-30', status: 'Upcoming',
    description: 'A new release from the group’s brightest era, built for late-night listening.', image: releaseKpop, tags: ['K-Pop', 'music', 'comeback'],
  },
  {
    id: 'rel-comics-01', title: 'Eclipse of Eden: The Lost Texts', category: 'Comics', franchise: 'Eclipse of Eden', releaseDate: '2026-12-04', status: 'Upcoming',
    description: 'A new graphic novel arc sends Rael into the archive beneath the old city.', image: releaseComics, tags: ['comics', 'graphic novel', 'fantasy'],
  },
  {
    id: 'rel-manga-01', title: 'Skyline Zero: Volume 8', category: 'Manga', franchise: 'Skyline Zero', releaseDate: '2027-01-15', status: 'Upcoming',
    description: 'Sora’s race beneath the city reaches the machine’s sealed first chamber.', image: releaseManga, tags: ['manga', 'serial', 'action'],
  },
];

export const releaseCategories = ['Anime', 'Gaming', 'Movies', 'TV Shows', 'K-Pop', 'Comics', 'Manga'];
