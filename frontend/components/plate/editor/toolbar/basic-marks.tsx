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
import { useTranslations } from 'next-intl';

import { MarkButton } from './mark-button';

export const BasicMarksToolbarEditor = () => {
  const t = useTranslations('core.editor.text');

  return (
    <>
      <MarkButton nodeType={MARK_BOLD} tooltip={t('bold')}>
        <Bold />
      </MarkButton>
      <MarkButton nodeType={MARK_ITALIC} tooltip={t('italic')}>
        <Italic />
      </MarkButton>
      <MarkButton nodeType={MARK_UNDERLINE} tooltip={t('underline')}>
        <Underline />
      </MarkButton>
      <MarkButton nodeType={MARK_STRIKETHROUGH} tooltip={t('strikethrough')}>
        <Strikethrough />
      </MarkButton>
      <MarkButton nodeType={MARK_CODE} tooltip={t('code')}>
        <Code />
      </MarkButton>
      <MarkButton nodeType={MARK_SUBSCRIPT} tooltip={t('subscript')}>
        <Subscript />
      </MarkButton>
      <MarkButton nodeType={MARK_SUPERSCRIPT} tooltip={t('superscript')}>
        <Superscript />
      </MarkButton>
    </>
  );
};
