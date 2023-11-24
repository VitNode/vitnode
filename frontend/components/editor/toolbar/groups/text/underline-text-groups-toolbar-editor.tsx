import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Underline } from 'lucide-react';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useTranslations } from 'next-intl';

import { Toggle } from '../../../../ui/toggle';
import { useToolbarEditor } from '../../hooks/use-toolbar-editor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../ui/tooltip';

export const UnderlineTextGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.text');
  const [editor] = useLexicalComposerContext();
  const { isUnderline } = useToolbarEditor();

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
