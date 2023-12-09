/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * Source: https://github.com/facebook/lexical/blob/main/packages/lexical-playground/src/nodes/EmojiNode.tsx
 *
 */

import type { EditorConfig, LexicalNode, NodeKey, SerializedTextNode } from 'lexical';
import { $applyNodeReplacement, TextNode } from 'lexical';

export type SerializedEmojiNode = SerializedTextNode;

export class EmojiNode extends TextNode {
  static getType(): string {
    return 'emoji';
  }

  static clone(node: EmojiNode): EmojiNode {
    return new EmojiNode(node.__text, node.__key);
  }

  constructor(text: string, key?: NodeKey) {
    super(text, key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    return super.createDOM(config);
  }

  updateDOM(prevNode: TextNode, dom: HTMLElement, config: EditorConfig): boolean {
    const inner = dom.firstChild;
    if (inner === null) {
      return true;
    }
    super.updateDOM(prevNode, inner as HTMLElement, config);

    return false;
  }

  static importJSON(serializedNode: SerializedEmojiNode): EmojiNode {
    const node = $createEmojiNode(serializedNode.text);
    node.setFormat(serializedNode.format);
    node.setDetail(serializedNode.detail);
    node.setMode(serializedNode.mode);
    node.setStyle(serializedNode.style);

    return node;
  }

  exportJSON(): SerializedEmojiNode {
    return {
      ...super.exportJSON(),
      type: 'emoji'
    };
  }
}

export function $isEmojiNode(node: LexicalNode | null | undefined): node is EmojiNode {
  return node instanceof EmojiNode;
}

export function $createEmojiNode(emojiText: string): EmojiNode {
  const node = new EmojiNode(emojiText).setMode('token');

  return $applyNodeReplacement(node);
}
