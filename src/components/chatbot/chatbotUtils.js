import { getSearchableContent } from '../../utils/contentData';
import { chatbotIntents, fallbackResponse } from './chatbotData';

const normalize = (value = '') => value.trim().toLowerCase().replace(/\s+/g, ' ');

const containsTrigger = (message, trigger) => {
  const normalizedMessage = normalize(message);
  const normalizedTrigger = normalize(trigger);
  return normalizedMessage === normalizedTrigger || normalizedMessage.includes(normalizedTrigger);
};

export const getSearchDestination = (message) => {
  const match = message.match(/(?:search|find|look for)\s+(.+)/i);
  return match?.[1]?.trim() ? `/search?q=${encodeURIComponent(match[1].trim())}` : '/search';
};

export const matchChatbotIntent = (message) => {
  const normalizedMessage = normalize(message);
  if (!normalizedMessage) return null;

  const searchMatch = normalizedMessage.match(/^(?:search|find|look for)\s+(.+)/);
  if (searchMatch) {
    return {
      id: 'search-query',
      response: `I can search the archive for "${searchMatch[1].trim()}".`,
      action: { label: `Search "${searchMatch[1].trim()}"`, to: getSearchDestination(message) },
    };
  }

  const matchingIntents = chatbotIntents.filter((intent) => intent.triggers.some((trigger) => containsTrigger(normalizedMessage, trigger)));
  const matchedIntent = matchingIntents.sort((left, right) => {
    const leftLength = Math.max(...left.triggers.filter((trigger) => containsTrigger(normalizedMessage, trigger)).map((trigger) => trigger.length));
    const rightLength = Math.max(...right.triggers.filter((trigger) => containsTrigger(normalizedMessage, trigger)).map((trigger) => trigger.length));
    return rightLength - leftLength;
  })[0];

  return matchedIntent || {
    id: 'fallback',
    response: fallbackResponse,
  };
};

export const getRecommendation = () => {
  const candidates = getSearchableContent().filter((item) => ['Trending', 'Article', 'Character'].includes(item.contentType));
  const item = candidates.find((candidate) => candidate.featured) || candidates[0];

  if (!item) {
    return { text: 'The archive is ready when you are. Try exploring a category first.', action: null };
  }

  return {
    text: `Try ${item.title} from ${item.category}. ${item.description || 'It is waiting in the local archive.'}`,
    action: { label: `Explore ${item.title}`, to: item.destination },
  };
};

export const resolveChatbotReply = (message) => {
  const intent = matchChatbotIntent(message);
  if (!intent) return { text: fallbackResponse, action: null, quickReplies: [] };

  if (intent.recommendation) {
    const recommendation = getRecommendation();
    return { ...recommendation, quickReplies: intent.quickReplies || [] };
  }

  return {
    text: intent.response,
    action: intent.action || null,
    quickReplies: intent.quickReplies || [],
  };
};
