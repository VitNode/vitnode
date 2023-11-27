import { useState } from 'react';
import { Baseline, Check, Palette, X } from 'lucide-react';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { useTranslations } from 'next-intl';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import { useUpdateStateEditor } from '../hooks/use-update-state-editor';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const basicColors = [
  '#d0021b',
  '#f5a623',
  '#f8e71c',
  '#8b572a',
  '#7ed321',
  '#417505',
  '#bd10e0',
  '#9013fe',
  '#4a90e2',
  '#50e3c2',
  '#b8e986',
  '#4a4a4a',
  '#9b9b9b'
];

interface Props {
  type: 'color' | 'background-color';
}

export const ColorGroupsToolbarEditor = ({ type }: Props) => {
  const t = useTranslations('core.editor');
  const [fontColor, setFontColor] = useState('');
  const [customColor, setCustomColor] = useState('');
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      setFontColor($getSelectionStyleValueForProperty(selection, type, ''));
    }
  });

  const updateColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      $patchStyleText(selection, { [type]: color });
    });
  };

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="[&>svg]:w-5 [&>svg]:h-5">
                {type === 'color' ? <Baseline /> : <Palette />}
                <div
                  className="w-5 h-5 border rounded-md"
                  style={{
                    backgroundColor: fontColor
                      ? fontColor
                      : `hsl(var(--${type === 'color' ? 'foreground' : 'card'}))`
                  }}
                />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>

          <PopoverContent className="p-2 w-64 flex flex-col gap-2">
            {!customColor ? (
              <>
                <div className="flex flex-wrap justify-center items-center gap-1.5">
                  {basicColors.map(color => (
                    <Button
                      className="w-7 h-7 border"
                      size="icon"
                      key={color}
                      style={{ backgroundColor: color }}
                      onClick={() => updateColor(color)}
                    />
                  ))}

                  <Button
                    variant="ghost"
                    className="w-7 h-7 border [&>svg]:w-4 [&>svg]:h-4"
                    size="icon"
                    onClick={() => setCustomColor(fontColor ? fontColor : '#000000')}
                  >
                    <Palette />
                  </Button>
                </div>

                {fontColor && (
                  <Button
                    className="w-full"
                    variant="secondary"
                    size="sm"
                    onClick={() => updateColor('')}
                  >
                    {t('set_default_color')}
                  </Button>
                )}
              </>
            ) : (
              <div className="flex gap-1">
                <Input
                  type="color"
                  onChange={e => setCustomColor(e.target.value)}
                  value={customColor}
                />

                <Button
                  size="icon"
                  className="flex-shrink-0"
                  variant="outline"
                  onClick={() => setCustomColor('')}
                >
                  <X />
                </Button>

                <Button
                  size="icon"
                  className="flex-shrink-0"
                  onClick={() => updateColor(customColor)}
                >
                  <Check />
                </Button>
              </div>
            )}
          </PopoverContent>

          <TooltipContent side="bottom">
            {t(type === 'color' ? 'font_color' : 'font_background_color')}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Popover>
  );
};
