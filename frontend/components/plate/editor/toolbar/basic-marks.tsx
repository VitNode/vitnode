import {
  MARK_BOLD,
  MARK_CODE,
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_SUBSCRIPT,
  MARK_SUPERSCRIPT,
  MARK_UNDERLINE
} from '@udecode/plate-basic-marks';
import { Bold, Code, Italic, Strikethrough, Subscript, Superscript, Underline } from 'lucide-react';

import { MarkButton } from './mark-button';

export const BasicMarksToolbarEditor = () => {
  return (
    <>
      <MarkButton nodeType={MARK_BOLD}>
        <Bold />
      </MarkButton>
      <MarkButton nodeType={MARK_ITALIC}>
        <Italic />
      </MarkButton>
      <MarkButton nodeType={MARK_UNDERLINE}>
        <Underline />
      </MarkButton>
      <MarkButton nodeType={MARK_STRIKETHROUGH}>
        <Strikethrough />
      </MarkButton>
      <MarkButton nodeType={MARK_CODE}>
        <Code />
      </MarkButton>
      <MarkButton nodeType={MARK_SUBSCRIPT}>
        <Subscript />
      </MarkButton>
      <MarkButton nodeType={MARK_SUPERSCRIPT}>
        <Superscript />
      </MarkButton>
    </>
  );
};
