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
  { id: 'tvshows', title: 'TV Shows', image: img4 },
  { id: 'kpop', title: 'K-Pop', image: img5 },
  { id: 'comics', title: 'Comics', image: img6 },
  { id: 'manga', title: 'Manga', image: img7 },
];

export const trending = [
  { id: 't1', title: 'Cybernetic Chronicles', category: 'Gaming', type: 'RPG', image: img8 },
  { id: 't2', title: 'Stellar Drifters', category: 'Anime', type: 'Series', image: img9 },
  { id: 't3', title: 'The Last Epoch', category: 'Movies', type: 'Sci-Fi', image: img10 },
  { id: 't4', title: 'Neon Rhythms', category: 'K-Pop', type: 'Album', image: img11 },
];

export const articles = [
  { id: 'a1', title: 'The Evolution of Mecha Design in Modern Anime', author: 'A. Halloway', readTime: '5 min read', category: 'Anime', image: img12 },
  { id: 'a2', title: 'Top 10 Upcoming RPGs of 2027', author: 'J. Curry', readTime: '8 min read', category: 'Gaming', image: img13 },
  { id: 'a3', title: 'Deconstructing the Cinematic Universe', author: 'S. Oneill', readTime: '12 min read', category: 'Movies', image: img14 },
];

export const characterSpotlight = {
  name: 'Kaien Vance',
  franchise: 'Void Runner 2099',
  class: 'Cyber-Shinobi',
  weapon: 'Plasma Edge Type-IV',
  description: 'Ex-operative of the Neo-Kyoto Cybernetic Defense Command. Fitted with high-frequency phase-plasma katanas and optical dampening.',
  image: img15
};

export const trailers = [
  { id: 'tr1', title: 'Eclipse of Eden', status: 'Premiering Tomorrow', image: img16 },
  { id: 'tr2', title: 'Void Runner: 2099', status: 'Live Now', image: img1 },
  { id: 'tr3', title: 'Silent Chorus', status: 'Coming Soon', image: img2 },
];

export const events = [
  { id: 'e1', title: 'Global Esports Final', date: 'OCT 24', location: 'Tokyo, Japan', category: 'Gaming', image: img3 },
  { id: 'e2', title: 'Anime Expo Winter', date: 'NOV 12', location: 'Los Angeles, USA', category: 'Anime', image: img4 },
];

export const merchandise = [
  { id: 'm1', title: 'Void Runner Katana Replica', category: 'Gaming', price: '$129.99', status: 'In Stock', image: img5 },
  { id: 'm2', title: 'Stellar Drifters Artbook', category: 'Anime', price: '$45.00', status: 'Pre-order', image: img6 },
  { id: 'm3', title: 'Neon Rhythms Hoodie', category: 'K-Pop', price: '$65.00', status: 'Limited Edition', image: img7 },
  { id: 'm4', title: 'The Last Epoch Steelbook', category: 'Movies', price: '$29.99', status: 'In Stock', image: img8 },
];
