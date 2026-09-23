import { articles, categories, eventsByCategory, merchandise, trailers, trending } from '../data/mockData';
import { categoryDetails } from '../data/categoryData';

const categorySlugs = Object.fromEntries(
  Object.entries(categoryDetails).map(([slug, category]) => [category.name, slug]),
);

export const uniqueById = (items) => [...new Map(
  items.filter((item) => item?.id).map((item) => [item.id, item]),
).values()];

export const getCategory = (slug) => categoryDetails[slug];

const allEvents = uniqueById(Object.values(eventsByCategory).flat());

export const getContentDestination = (item, contentType) => {
  if (contentType === 'Article') return `/article/${item.id}`;
  if (contentType === 'Trailer') return `/trailer/${item.id}`;
  if (contentType === 'Event') return `/event/${item.id}`;
  return getCategoryDestination(item.category);
};

export const getContentByType = (contentType, id) => {
  const collections = {
    Article: articles,
    Trailer: trailers,
    Event: allEvents,
  };
  return collections[contentType]?.find((item) => item.id === id) || null;
};

export const getRelatedContent = (contentType, item, limit = 3) => {
  const collections = {
    Article: articles,
    Trailer: trailers,
    Event: allEvents,
  };
  const source = collections[contentType] || [];
  const sourceTags = item.tags || [];
  const related = source
    .filter((candidate) => candidate.id !== item.id)
    .map((candidate) => {
      const sharedTags = (candidate.tags || []).filter((tag) => sourceTags.includes(tag)).length;
      const sameCategory = candidate.category && candidate.category === item.category ? 2 : 0;
      const sameFranchise = item.franchise && (candidate.franchise === item.franchise || candidate.series === item.franchise) ? 2 : 0;
      return { candidate, score: sharedTags + sameCategory + sameFranchise };
    })
    .sort((left, right) => right.score - left.score || left.candidate.title.localeCompare(right.candidate.title))
    .slice(0, limit)
    .map(({ candidate }) => candidate);

  return related;
};

const getCategoryDestination = (category) => `/category/${categorySlugs[category] || 'anime'}`;
const getSortableDate = (date) => {
  if (!date) return null;
  const timestamp = Date.parse(date);
  return Number.isNaN(timestamp) ? null : timestamp;
};

const toSearchResult = (item, contentType, category = item.category) => ({
  id: item.id,
  title: item.title || item.name,
  image: item.image,
  category,
  contentType,
  description: item.description || item.biography || '',
  type: item.type || contentType,
  tags: item.tags || [],
  franchise: item.franchise || item.series || '',
  location: item.location || '',
  date: item.date || '',
  sortableDate: getSortableDate(item.date),
  popularity: typeof item.popularity === 'number' ? item.popularity : null,
  featured: item.featured === true,
  metadata: item.date || item.location || item.status || item.price || item.readTime || '',
  destination: getContentDestination({ ...item, category }, contentType),
});

// Keep intentional cross-rail references as one result for future search consumers.
const searchableContent = uniqueById([
  ...categories.map((item) => toSearchResult({ ...item, category: item.title, type: 'Category' }, 'Category', item.title)),
  ...trending.map((item) => toSearchResult(item, 'Trending')),
  ...articles.map((item) => toSearchResult(item, 'Article')),
  ...trailers.map((item) => toSearchResult(item, 'Trailer')),
  ...merchandise.map((item) => toSearchResult(item, 'Merchandise')),
  ...Object.values(categoryDetails).flatMap((category) => [
    ...category.characters.map((item) => toSearchResult(item, 'Character', category.name)),
    ...category.events.map((item) => toSearchResult(item, 'Event', category.name)),
  ]),
]);

export const getSearchableContent = () => searchableContent;

const searchableFields = ['title', 'description', 'category', 'contentType', 'type', 'franchise', 'location'];

const normalizeSearchText = (value = '') => value.trim().toLowerCase().replace(/\s+/g, ' ');

export const searchContent = (query) => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return [];
  }

  return searchableContent.filter((item) => {
    const searchableText = [
      ...searchableFields.map((field) => item[field]),
      ...item.tags,
    ].join(' ');

    return normalizeSearchText(searchableText).includes(normalizedQuery);
  });
};

const compareMissingLast = (leftValue, rightValue) => {
  if (leftValue === rightValue) return 0;
  if (leftValue === '' || leftValue === null || leftValue === undefined) return 1;
  if (rightValue === '' || rightValue === null || rightValue === undefined) return -1;
  return leftValue < rightValue ? -1 : 1;
};

const compareDescendingMissingLast = (leftValue, rightValue) => {
  if (leftValue === rightValue) return 0;
  if (leftValue === '' || leftValue === null || leftValue === undefined) return 1;
  if (rightValue === '' || rightValue === null || rightValue === undefined) return -1;
  return leftValue < rightValue ? 1 : -1;
};

export const filterAndSortContent = (query, { category = '', type = '', tag = '', sort = 'relevance' } = {}) => {
  const normalizedQuery = normalizeSearchText(query);
  const normalizedTag = normalizeSearchText(tag);
  const results = searchableContent.filter((item) => {
    const searchableText = [
      ...searchableFields.map((field) => item[field]),
      ...item.tags,
    ].join(' ');

    const matchesQuery = !normalizedQuery || normalizeSearchText(searchableText).includes(normalizedQuery);
    const matchesCategory = !category || categorySlugs[item.category] === category;
    const matchesType = !type || item.contentType.toLowerCase() === type.toLowerCase();
    const matchesTag = !normalizedTag || [item.franchise, ...item.tags].some((value) => normalizeSearchText(value) === normalizedTag);

    return matchesQuery && matchesCategory && matchesType && matchesTag;
  });

  return [...results].sort((left, right) => {
    if (sort === 'alphabetical') return compareMissingLast(left.title.toLowerCase(), right.title.toLowerCase());
    if (sort === 'newest') return compareDescendingMissingLast(left.sortableDate, right.sortableDate);
    if (sort === 'popularity') return compareDescendingMissingLast(left.popularity, right.popularity);
    if (sort === 'featured') return compareDescendingMissingLast(left.featured ? 1 : 0, right.featured ? 1 : 0);
    return 0;
  });
};

export const getSearchFilterOptions = () => ({
  categories: Object.entries(categoryDetails).map(([slug, category]) => ({ value: slug, label: category.name })),
  types: [...new Set(searchableContent.map((item) => item.contentType))].sort(),
  tags: [...new Set(searchableContent.flatMap((item) => [item.franchise, ...item.tags]).filter(Boolean))].sort((left, right) => left.localeCompare(right)),
});
