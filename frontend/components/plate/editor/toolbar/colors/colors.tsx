import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { Baseline, PaintBucket } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { DropdownColorsToolbarEditor } from './colors-dropdown';

export const ColorsToolbarEditor = () => {
  const t = useTranslations('core.editor');

  return (
    <>
      <DropdownColorsToolbarEditor
        nodeType={MARK_COLOR}
        customDefaultColor="hsl(var(--foreground))"
        tooltip={t('font_color')}
      >
        <Baseline />
      </DropdownColorsToolbarEditor>

      <DropdownColorsToolbarEditor
        nodeType={MARK_BG_COLOR}
        customDefaultColor="hsl(var(--card))"
        tooltip={t('font_background_color')}
      >
        <PaintBucket />
      </DropdownColorsToolbarEditor>
    </>
  );
};
