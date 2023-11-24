import { useTranslations } from 'next-intl';
import { Redo } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CAN_REDO_COMMAND, COMMAND_PRIORITY_CRITICAL, REDO_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export const RedoMoveGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.move');
  const [editor] = useLexicalComposerContext();
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    return editor.registerCommand<boolean>(
      CAN_REDO_COMMAND,
      payload => {
        setCanRedo(payload);

        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
            aria-label={t('redo')}
            disabled={!canRedo}
          >
            <Redo />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{t('redo')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
