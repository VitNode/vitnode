import { Type } from 'lucide-react';
import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { useTranslations } from 'next-intl';

import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useUpdateStateEditor } from '../hooks/use-update-state-editor';

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

export const FontSizeButtonEditor = () => {
  const t = useTranslations('core.editor');
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [editor] = useLexicalComposerContext();
  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setFontSize($getSelectionStyleValueForProperty(selection, 'font-size', DEFAULT_FONT_SIZE));
    }
  });

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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className: 'w-auto border-0 [&>svg]:w-5 [&>svg]:h-5'
              })}
            >
              <Type />
              {fontSize ? fontSize : t('mixed')}
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent>{t('font_size')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
