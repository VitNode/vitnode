import { MARK_SUBSCRIPT, MARK_SUPERSCRIPT } from '@udecode/plate-basic-marks';
import { focusEditor, toggleMark, useEditorRef } from '@udecode/plate-common';
import { MoreHorizontal, Subscript, Superscript } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ToolbarButton } from '@/components/ui/toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const MoreToolbarEditor = () => {
  const t = useTranslations('core.editor.text');
  const editor = useEditorRef();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton size="icon">
          <MoreHorizontal />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUBSCRIPT,
              clear: MARK_SUPERSCRIPT
            });
            focusEditor(editor);
          }}
        >
          <Subscript /> {t('subscript')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            toggleMark(editor, {
              key: MARK_SUPERSCRIPT,
              clear: MARK_SUBSCRIPT
            });
            focusEditor(editor);
          }}
        >
          <Superscript /> {t('superscript')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
