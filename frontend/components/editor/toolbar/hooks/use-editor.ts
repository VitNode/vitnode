import {
  Code,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  List,
  ListFilter,
  ListOrdered
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { createContext, useContext } from 'react';

export enum BLOCK_NAMES {
  PARAGRAPH = 'paragraph',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  BULLET = 'bullet',
  NUMBER = 'number',
  CODE = 'code'
}

export const AVAILABLE_BLOCKS: { icon: LucideIcon; value: BLOCK_NAMES }[] = [
  {
    value: BLOCK_NAMES.PARAGRAPH,
    icon: ListFilter
  },
  {
    value: BLOCK_NAMES.H1,
    icon: Heading1Icon
  },
  {
    value: BLOCK_NAMES.H2,
    icon: Heading2Icon
  },
  {
    value: BLOCK_NAMES.H3,
    icon: Heading3Icon
  },
  {
    value: BLOCK_NAMES.BULLET,
    icon: List
  },
  {
    value: BLOCK_NAMES.NUMBER,
    icon: ListOrdered
  },
  {
    value: BLOCK_NAMES.CODE,
    icon: Code
  }
];

interface Args {
  blockType: string;
  setBlockType: (blockType: string) => void;
}

export const EditorContext = createContext<Args>({
  blockType: BLOCK_NAMES.PARAGRAPH,
  setBlockType: () => {}
});

export const useEditor = () => useContext(EditorContext);
