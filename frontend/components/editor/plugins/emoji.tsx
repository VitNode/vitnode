import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { TextNode } from 'lexical';
import data, { Emoji, EmojiMartData } from '@emoji-mart/data';
import { values } from 'lodash';

import { $createEmojiNode, EmojiNode } from '../nodes/EmojiNode';
import { CONFIG } from '@/config';

const convertEmoji = (emoji: Emoji[]) => {
  const localStorageSkinToneIndex = localStorage.getItem(CONFIG.editor.skin_tone);
  const result: Map<string, string> = new Map();

  emoji.forEach(item => {
    if (item.emoticons) {
      item.emoticons.forEach(emoticon => {
        result.set(
          emoticon,
          item.skins[localStorageSkinToneIndex ? +localStorageSkinToneIndex : 0].native
        );
      });
    }
  });

  return result;
};

const emojiMart = data as EmojiMartData;
const emojis = convertEmoji(values(emojiMart.emojis).filter(emoji => emoji.emoticons));

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

const textNodeTransform = (node: TextNode) => {
  let targetNode: TextNode | null = node;

  while (targetNode !== null) {
    if (!targetNode.isSimpleText()) {
      return;
    }

    targetNode = findAndTransformEmoji(targetNode);
  }
};

export const EmojiPluginEditor = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!editor.hasNodes([EmojiNode])) {
      throw new Error('EmojisPlugin: EmojiNode not registered on editor');
    }

    return editor.registerNodeTransform(TextNode, textNodeTransform);
  }, [editor]);

  return null;
};
