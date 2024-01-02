import { useEditorRef } from '@udecode/plate-common';
import { ChevronDown, Code2, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { insertEmptyCodeBlock } from '@udecode/plate-code-block';

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
          }}
        >
          <Code2 /> {t('code_block.title')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
