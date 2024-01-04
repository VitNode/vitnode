import { useTranslations } from 'next-intl';
import { Redo } from 'lucide-react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CAN_REDO_COMMAND, COMMAND_PRIORITY_CRITICAL, REDO_COMMAND } from 'lexical';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export const RedoMoveButtonEditor = () => {
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
    <Button
      variant="ghost"
      size="icon"
      onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      tooltip={t('redo')}
      disabled={!canRedo}
    >
      <Redo />
    </Button>
  );
};
