import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Bold } from 'lucide-react';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useTranslations } from 'next-intl';

import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useToolbarEditor } from '../../hooks/use-toolbar-editor';

export const BoldTextGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.text');
  const [editor] = useLexicalComposerContext();
  const { isBold } = useToolbarEditor();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              aria-label={t('bold')}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
              pressed={isBold}
            >
              <Bold />
            </Toggle>
          </div>
        </TooltipTrigger>

        <TooltipContent side="bottom">{t('bold')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
