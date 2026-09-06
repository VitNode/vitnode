import type { CustomSection } from "@ferrucc-io/emoji-picker";
import type { EmojiItem } from "@tiptap/extension-emoji";

import type { EditorEmojiSection } from "@/components/editor-provider";

const SHORTCODE = /^:([^:\s]+):$/;

export const customEmojiToTipTap = (
  sections: EditorEmojiSection[] = [],
): EmojiItem[] =>
  sections.flatMap(section =>
    section.emojis.map(emoji => ({
      fallbackImage: emoji.src,
      group: section.label,
      name: emoji.name,
      shortcodes: [emoji.name],
      tags: emoji.tags ?? [],
    })),
  );

export const customEmojiToPickerSections = (
  sections: EditorEmojiSection[] = [],
): CustomSection[] =>
  sections.map((section, index) => ({
    emojis: section.emojis.map(emoji => ({
      id: emoji.name,
      imageUrl: emoji.src,
      name: emoji.name,
    })),
    id: `custom-${index.toString()}`,
    name: section.label,
  }));

/**
 * The picker hands back the character for a unicode emoji, but `:name:` for a
 * custom one.
 */
export const shortcodeOf = (selected: string): null | string =>
  SHORTCODE.exec(selected)?.[1] ?? null;
