import { type AutoformatRule } from '@udecode/plate-autoformat';
import { ELEMENT_LI, ELEMENT_OL, ELEMENT_UL } from '@udecode/plate-list';

import { formatList, preFormat } from './utils';

export const autoformatLists: AutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['* ', '- '],
    preFormat,
    format: editor => formatList(editor, ELEMENT_UL)
  },
  {
    mode: 'block',
    type: ELEMENT_LI,
    match: ['1. ', '1) '],
    preFormat,
    format: editor => formatList(editor, ELEMENT_OL)
  }
];
