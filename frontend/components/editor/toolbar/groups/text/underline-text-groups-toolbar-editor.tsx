import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Underline } from 'lucide-react';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useUpdateStateEditor } from '../../hooks/use-update-state-editor';

export const UnderlineTextGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.text');
  const [isUnderline, setIsUnderline] = useState(false);
  const [editor] = useLexicalComposerContext();

  const handleChange = () => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false;

    setIsUnderline(selection.hasFormat('underline'));
  };

  useUpdateStateEditor({ handleChange });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t('underline')}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
              pressed={isUnderline}
            >
              <Underline />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent side="bottom">{t('underline')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
