import {
  ELEMENT_DEFAULT,
  focusEditor,
  insertEmptyElement,
  useEditorRef
} from '@udecode/plate-common';
import { ChevronDown, Code2, Minus, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { insertEmptyCodeBlock } from '@udecode/plate-code-block';
import { ELEMENT_HR } from '@udecode/plate-horizontal-rule';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ToolbarButton } from '@/components/plate-ui/toolbar';

export const MoreToolbarEditor = () => {
  const t = useTranslations('core.editor');
  const editor = useEditorRef();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton className="w-16 gap-1">
          <Plus /> <ChevronDown />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={() => {
            insertEmptyCodeBlock(editor);
            focusEditor(editor);
          }}
        >
          <Code2 /> {t('code_block.title')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            insertEmptyElement(editor, ELEMENT_HR, {
              select: true,
              nextBlock: true
            });
            insertEmptyElement(editor, ELEMENT_DEFAULT);
            focusEditor(editor);
          }}
        >
          <Minus /> {t('divider')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
