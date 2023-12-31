import { type AutoformatRule } from '@udecode/plate-autoformat';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4 } from '@udecode/plate-heading';

import { preFormat } from './utils';

export const autoformatBlocks: AutoformatRule[] = [
  {
    mode: 'block',
    type: ELEMENT_H1,
    match: '# ',
    preFormat
  },
  {
    mode: 'block',
    type: ELEMENT_H2,
    match: '## ',
    preFormat
  },
  {
    mode: 'block',
    type: ELEMENT_H3,
    match: '### ',
    preFormat
  },
  {
    mode: 'block',
    type: ELEMENT_H4,
    match: '#### ',
    preFormat
  }
  // {
  //   mode: 'block',
  //   type: ELEMENT_BLOCKQUOTE,
  //   match: '> ',
  //   preFormat
  // },
  // {
  //   mode: 'block',
  //   type: ELEMENT_CODE_BLOCK,
  //   match: '```',
  //   triggerAtBlockStart: false,
  //   preFormat,
  //   format: editor => {
  //     insertEmptyCodeBlock(editor, {
  //       defaultType: ELEMENT_DEFAULT,
  //       insertNodesOptions: { select: true }
  //     });
  //   }
  // },
  // {
  //   mode: 'block',
  //   type: ELEMENT_HR,
  //   match: ['---', '—-', '___ '],
  //   format: editor => {
  //     setNodes(editor, { type: ELEMENT_HR });
  //     insertNodes(editor, {
  //       type: ELEMENT_DEFAULT,
  //       children: [{ text: '' }]
  //     });
  //   }
  // }
];
