import { charactersByCategory } from '../data/mockData';

export const FANDOM_DNA_STORAGE_KEY = 'fandomverse.fandom-dna.v1';

export const dnaCategories = [
  { id: 'anime', name: 'Anime', accent: '#8B5CF6' },
  { id: 'gaming', name: 'Gaming', accent: '#3B82F6' },
  { id: 'movies', name: 'Movies', accent: '#EF4444' },
  { id: 'tv', name: 'TV Shows', accent: '#06B6D4' },
  { id: 'kpop', name: 'K-Pop', accent: '#EC4899' },
  { id: 'comics', name: 'Comics', accent: '#EAB308' },
  { id: 'manga', name: 'Manga', accent: '#DC2626' },
];

const dimensions = ['action', 'mystery', 'chaos', 'emotion', 'explorer', 'story', 'character'];

const choiceWeights = {
  hook: {
    characters: { categories: { anime: 1, tv: 2, kpop: 1, comics: 1, manga: 1 }, traits: { character: 3, emotion: 1 } },
    stories: { categories: { anime: 1, movies: 2, tv: 2, manga: 2 }, traits: { story: 3, mystery: 1 } },
    challenge: { categories: { anime: 1, gaming: 2, comics: 1 }, traits: { action: 3, chaos: 1 } },
    worlds: { categories: { anime: 1, gaming: 1, movies: 1, tv: 1, comics: 1, manga: 1 }, traits: { explorer: 3 } },
  },
  energy: {
    action: { categories: { anime: 2, gaming: 2, comics: 1 }, traits: { action: 3 } },
    mystery: { categories: { movies: 1, tv: 1, comics: 1, manga: 2 }, traits: { mystery: 3, explorer: 1 } },
    chaos: { categories: { anime: 1, gaming: 2, kpop: 1 }, traits: { chaos: 3 } },
    emotion: { categories: { anime: 1, tv: 1, kpop: 2, manga: 1 }, traits: { emotion: 3, character: 1 } },
  },
  moment: {
    battle: { categories: { anime: 2, gaming: 2, comics: 1 }, traits: { action: 3, chaos: 1 } },
    clue: { categories: { movies: 2, tv: 1, comics: 1, manga: 2 }, traits: { mystery: 2, explorer: 1 } },
    cast: { categories: { anime: 1, tv: 2, kpop: 2 }, traits: { emotion: 2, character: 2 } },
    map: { categories: { gaming: 1, comics: 2, manga: 2 }, traits: { explorer: 3, story: 1 } },
  },
};

const archetypeByTrait = {
  action: 'WARRIOR',
  mystery: 'STRATEGIST',
  chaos: 'CHAOS AGENT',
  emotion: 'STORY SEEKER',
  explorer: 'EXPLORER',
  story: 'WORLD BUILDER',
  character: 'LEGEND HUNTER',
};

const traitSignals = {
  action: ['agility', 'speed', 'strength', 'courage', 'precision', 'piloting', 'stealth', 'dance'],
  mystery: ['investigation', 'observation', 'listening', 'logic', 'memory', 'hacking', 'patience', 'stealth'],
  chaos: ['adaptability', 'defiance', 'experimentation', 'flow', 'speed', 'willpower'],
  emotion: ['empathy', 'charisma', 'warmth', 'loyalty', 'resolve', 'storytelling', 'leadership'],
  explorer: ['curiosity', 'tracking', 'piloting', 'botany', 'agility', 'wisdom', 'diplomacy'],
  story: ['storytelling', 'wisdom', 'leadership', 'memory', 'songwriting', 'strategy', 'diplomacy'],
  character: ['leadership', 'charisma', 'loyalty', 'resolve', 'craft', 'discipline', 'willpower'],
};

const hashString = (value) => [...value].reduce((hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;

const rankEntries = (scores) => Object.entries(scores).sort(([leftKey, leftScore], [rightKey, rightScore]) => (
  rightScore - leftScore || leftKey.localeCompare(rightKey)
));

const createCharacterMatch = (categoryId, traitScores, answerSignature) => {
  const candidates = charactersByCategory[categoryId] || [];
  const preferredTraits = rankEntries(traitScores).slice(0, 3);
  const rankedCandidates = candidates.map((character) => {
    const searchable = `${character.traits?.join(' ') || ''} ${character.description || character.biography || ''}`.toLowerCase();
    const traitMatch = preferredTraits.reduce((total, [trait, score], index) => {
      const affinity = traitSignals[trait].some((signal) => searchable.includes(signal));
      return total + (affinity ? Math.max(1, 3 - index) * Math.max(1, score) : 0);
    }, 0);
    return { character, score: traitMatch };
  });

  const bestScore = Math.max(...rankedCandidates.map((candidate) => candidate.score));
  const bestMatches = rankedCandidates.filter((candidate) => candidate.score === bestScore);
  return bestMatches[hashString(answerSignature) % bestMatches.length]?.character || candidates[0] || null;
};

export function createFandomDnaProfile(answers) {
  const categoryScores = Object.fromEntries(dnaCategories.map(({ id }) => [id, 0]));
  const traitScores = Object.fromEntries(dimensions.map((trait) => [trait, 0]));

  Object.entries(choiceWeights).forEach(([questionId, options]) => {
    const weights = options[answers[questionId]];
    if (!weights) return;
    Object.entries(weights.categories).forEach(([category, points]) => { categoryScores[category] += points; });
    Object.entries(weights.traits).forEach(([trait, points]) => { traitScores[trait] += points; });
  });

  if (Number.isFinite(answers.balance)) {
    const characterPreference = (100 - answers.balance) / 100;
    traitScores.character += Math.round(characterPreference * 5);
    traitScores.story += Math.round((1 - characterPreference) * 5);
    const characterWorlds = ['anime', 'tv', 'kpop', 'comics'];
    const storyWorlds = ['movies', 'tv', 'manga', 'anime'];
    const preferredWorlds = characterPreference >= 0.5 ? characterWorlds : storyWorlds;
    preferredWorlds.forEach((category) => { categoryScores[category] += 1; });
  }

  if (categoryScores[answers.world] !== undefined) categoryScores[answers.world] += 12;

  const rankedCategories = rankEntries(categoryScores);
  const [strongestCategory, strongestScore] = rankedCategories[0];
  const secondScore = rankedCategories[1]?.[1] || 0;
  const rankedTraits = rankEntries(traitScores);
  const topTrait = rankedTraits[0]?.[0] || 'explorer';
  const signature = JSON.stringify(answers);
  const totalCategoryScore = Object.values(categoryScores).reduce((sum, score) => sum + score, 0) || 1;
  const maximumTraitScore = Math.max(1, ...Object.values(traitScores));
  const categoryBreakdown = rankedCategories.map(([id, score]) => ({
    id,
    name: dnaCategories.find((category) => category.id === id)?.name || id,
    score,
    percentage: Math.round((score / totalCategoryScore) * 100),
  }));
  const traitBreakdown = rankedTraits.map(([id, score]) => ({
    id,
    score,
    percentage: score ? Math.round((score / maximumTraitScore) * 100) : 0,
  }));
  const topWorlds = categoryBreakdown.slice(0, 4);
  const otherWorldPercentage = Math.max(0, 100 - topWorlds.reduce((sum, world) => sum + world.percentage, 0));
  const match = createCharacterMatch(strongestCategory, traitScores, signature);

  return {
    version: 1,
    answers,
    archetype: archetypeByTrait[topTrait],
    strongestTrait: topTrait,
    strongestCategory,
    categoryScores,
    traitScores,
    categoryBreakdown,
    traitBreakdown,
    topWorlds,
    otherWorldPercentage,
    resonance: Math.min(98, Math.max(68, 76 + Math.round((strongestScore - secondScore) / 2))),
    character: match,
    summary: `Your fandom signature leans ${topTrait}, with a strong pull toward ${dnaCategories.find((category) => category.id === strongestCategory)?.name}. You connect with worlds through ${match?.name || 'the characters within them'} and the details that make each universe feel alive.`,
  };
}

export function readFandomDnaProfile() {
  try {
    const profile = JSON.parse(window.localStorage.getItem(FANDOM_DNA_STORAGE_KEY) || 'null');
    if (profile?.version === 1 && profile.character?.id && profile.strongestCategory in charactersByCategory) return profile;
  } catch {
    return null;
  }
  return null;
}

export function saveFandomDnaProfile(profile) {
  try {
    window.localStorage.setItem(FANDOM_DNA_STORAGE_KEY, JSON.stringify(profile));
  } catch {
    return false;
  }
  return true;
}

export function clearFandomDnaProfile() {
  try {
    window.localStorage.removeItem(FANDOM_DNA_STORAGE_KEY);
  } catch {
    return false;
  }
  return true;
}