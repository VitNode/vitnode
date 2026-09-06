import type { EmojiItem } from "@tiptap/extension-emoji";

export const MAX_SUGGESTION_ITEMS = 30;

const SCORE_NO_MATCH = 0;
const SCORE_TAG = 1;
const SCORE_NAME_CONTAINS = 2;
const SCORE_NAME_STARTS_WITH = 3;
const SCORE_EXACT = 4;

const isPickable = (item: EmojiItem): boolean =>
  !item.name.startsWith("regional_indicator") &&
  item.group !== "components" &&
  (!!item.emoji || !!item.fallbackImage);

const scoreOf = (item: EmojiItem, query: string): number => {
  const names = [item.name, ...item.shortcodes].map(name => name.toLowerCase());
  if (names.includes(query)) return SCORE_EXACT;
  if (names.some(name => name.startsWith(query))) return SCORE_NAME_STARTS_WITH;
  if (names.some(name => name.includes(query))) return SCORE_NAME_CONTAINS;
  if (item.tags.some(tag => tag.toLowerCase().startsWith(query))) {
    return SCORE_TAG;
  }

  return SCORE_NO_MATCH;
};

export const matchEmojis = (
  emojis: EmojiItem[],
  query: string,
  limit = MAX_SUGGESTION_ITEMS,
): EmojiItem[] => {
  const normalized = query.trim().toLowerCase();
  const pickable = emojis.filter(isPickable);
  if (normalized.length === 0) return pickable.slice(0, limit);

  return pickable
    .map((item, index) => ({ index, item, score: scoreOf(item, normalized) }))
    .filter(entry => entry.score !== SCORE_NO_MATCH)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map(entry => entry.item);
};
