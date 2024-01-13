import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Strikethrough } from 'lucide-react';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUpdateStateEditor } from '../hooks/use-update-state-editor';

export const StrikethroughButtonEditor = () => {
  const t = useTranslations('core.editor.text');
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t('strikethrough')}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough')}
              pressed={isStrikethrough}
              className="size-9"
            >
              <Strikethrough />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent>{t('strikethrough')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
