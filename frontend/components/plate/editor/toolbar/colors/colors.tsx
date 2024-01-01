import { MARK_BG_COLOR, MARK_COLOR } from '@udecode/plate-font';
import { Baseline, PaintBucket } from 'lucide-react';

import { DropdownColorsToolbarEditor } from './colors-dropdown';

export const ColorsToolbarEditor = () => {
  return (
    <>
      <DropdownColorsToolbarEditor
        nodeType={MARK_COLOR}
        customDefaultColor="hsl(var(--foreground))"
      >
        <Baseline />
      </DropdownColorsToolbarEditor>

      <DropdownColorsToolbarEditor nodeType={MARK_BG_COLOR} customDefaultColor="hsl(var(--card))">
        <PaintBucket />
      </DropdownColorsToolbarEditor>
    </>
  );
};
