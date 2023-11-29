import { useTranslations } from 'next-intl';
import { Undo } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, UNDO_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export const UndoMoveButtonEditor = () => {
  const t = useTranslations('core.editor.move');
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);

  useEffect(() => {
    return editor.registerCommand<boolean>(
      CAN_UNDO_COMMAND,
      payload => {
        setCanUndo(payload);

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
            onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
            aria-label={t('undo')}
            disabled={!canUndo}
          >
            <Undo />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">{t('undo')}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
