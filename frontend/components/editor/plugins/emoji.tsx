import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { TextNode } from "lexical";
import data, { type Emoji, type EmojiMartData } from "@emoji-mart/data";
import { values } from "lodash";

import { $createEmojiNode, EmojiNode } from "../nodes/EmojiNode";
import { CONFIG } from "@/config";

const convertEmoji = (emoji: Emoji[]): Map<string, string> => {
  const localStorageSkinToneIndex =
    typeof window !== "undefined"
      ? localStorage.getItem(CONFIG.local_storage.editor_skin_tone)
      : null;
  const result: Map<string, string> = new Map();

  const skinToneIndex = localStorageSkinToneIndex
    ? +localStorageSkinToneIndex
    : 0;

  emoji.forEach((item): void => {
    if (item.emoticons) {
      item.emoticons.forEach((emoticon): void => {
        result.set(
          emoticon,
          item.skins.length > skinToneIndex
            ? item.skins[skinToneIndex].native
            : item.skins[0].native
        );
      });
    }
  });

  return result;
};

const emojiMart = data as EmojiMartData;
const emojis = convertEmoji(
  values(emojiMart.emojis).filter(
    (emoji): string[] | undefined => emoji.emoticons
  )
);

const findAndTransformEmoji = (node: TextNode): null | TextNode => {
  const text = node.getTextContent();

  for (let i = 0; i < text.length; i++) {
    const emojiData = emojis.get(text[i]) || emojis.get(text.slice(i, i + 3));

    if (emojiData !== undefined) {
      const [emojiText] = emojiData;
      let targetNode;

      if (i === 0) {
        [targetNode] = node.splitText(i + 3);
      } else {
        [, targetNode] = node.splitText(i, i + 3);
      }

      const emojiNode = $createEmojiNode(emojiText);
      targetNode.replace(emojiNode);

      return emojiNode;
    }
  }

  return null;
};

const textNodeTransform = (node: TextNode): void => {
  let targetNode: TextNode | null = node;

  while (targetNode !== null) {
    if (!targetNode.isSimpleText()) {
      return;
    }

    targetNode = findAndTransformEmoji(targetNode);
  }
};

export const EmojiPluginEditor = (): null => {
  const [editor] = useLexicalComposerContext();

  useEffect((): (() => void) => {
    if (!editor.hasNodes([EmojiNode])) {
      throw new Error("EmojisPlugin: EmojiNode not registered on editor");
    }

    return editor.registerNodeTransform(TextNode, textNodeTransform);
  }, [editor]);

  return null;
};
