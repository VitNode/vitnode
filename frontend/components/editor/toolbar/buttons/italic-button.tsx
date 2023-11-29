import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Italic } from 'lucide-react';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUpdateStateEditor } from '../hooks/use-update-state-editor';

export const ItalicButtonEditor = () => {
  const t = useTranslations('core.editor.text');
  const [isItalic, setIsItalic] = useState(false);
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setIsItalic(selection.hasFormat('italic'));
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t('italic')}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
              pressed={isItalic}
            >
              <Italic />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent side="bottom">{t('italic')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
