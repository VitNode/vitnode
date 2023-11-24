import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Italic } from 'lucide-react';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import { useTranslations } from 'next-intl';

import { Toggle } from '../../../../ui/toggle';
import { useToolbarEditor } from '../../hooks/use-toolbar-editor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../ui/tooltip';

export const ItalicTextGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.text');
  const [editor] = useLexicalComposerContext();
  const { isItalic } = useToolbarEditor();

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
