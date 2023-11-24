import { Type } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  SELECTION_CHANGE_COMMAND
} from 'lexical';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { mergeRegister } from '@lexical/utils';
import { useTranslations } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { buttonVariants } from '@/components/ui/button';

const AVAILABLE_FONT_SIZE = [
  '10px',
  '12px',
  '14px',
  '15px',
  '16px',
  '18px',
  '20px',
  '24px',
  '32px',
  '48px'
];

const DEFAULT_FONT_SIZE = '16px';

export const FontSizeGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor');
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [editor] = useLexicalComposerContext();

  const handleChange = () => {
    const selection = $getSelection();
    if (!$isRangeSelection(selection)) return false;

    setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', DEFAULT_FONT_SIZE));
  };

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          handleChange();

          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          handleChange();
        });
      })
    );
  }, [editor]);

  return (
    <Select
      value={fontSize}
      onValueChange={val => {
        editor.update(() => {
          const selection = $getSelection();

          if (!$isRangeSelection(selection)) return false;

          $patchStyleText(selection, {
            ['font-size']: val
          });
        });
      }}
    >
      <SelectTrigger
        className={buttonVariants({
          variant: 'ghost',
          className: 'w-auto border-0'
        })}
      >
        <Type />
        {fontSize ? fontSize : t('mixed')}
      </SelectTrigger>

      <SelectContent onCloseAutoFocus={() => editor.focus()}>
        {AVAILABLE_FONT_SIZE.map(size => (
          <SelectItem key={size} value={size}>
            {size}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
