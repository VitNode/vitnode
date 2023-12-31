import { type AutoformatRule } from '@udecode/plate-autoformat';

import { autoformatBlocks } from './blocks';
import { autoformatMarks } from './marks';
import { autoformatLists } from './lists';
import { autoformatIndentLists } from './indent-lists';

export const autoformatRules: AutoformatRule[] = [
  ...autoformatBlocks,
  ...autoformatLists,
  ...autoformatMarks,
  ...autoformatIndentLists
];
