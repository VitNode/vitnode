import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Code } from 'lucide-react';
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useUpdateStateEditor } from '../../hooks/use-update-state-editor';

export const CodeTextGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.text');
  const [isCode, setIsCode] = useState(false);
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setIsCode(selection.hasFormat('code'));
    }
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t('code')}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code')}
              pressed={isCode}
            >
              <Code />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent side="bottom">{t('code')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
