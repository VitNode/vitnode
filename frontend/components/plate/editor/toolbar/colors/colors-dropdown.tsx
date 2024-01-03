import {
  useColorDropdownMenuState,
  useColorsCustom,
  useColorsCustomState
} from '@udecode/plate-font';
import { useState, type ReactNode, type ChangeEvent, useRef } from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ToolbarButton } from '@/components/plate-ui/toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DEFAULT_COLORS, DEFAULT_CUSTOM_COLORS } from './color-constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cx } from '@/functions/classnames';

interface Props {
  children: ReactNode;
  customDefaultColor: string;
  nodeType: string;
  tooltip: string;
}

export const DropdownColorsToolbarEditor = ({
  children,
  customDefaultColor,
  nodeType,
  tooltip
}: Props) => {
  const t = useTranslations('core.editor');
  const tCore = useTranslations('core');
  const state = useColorDropdownMenuState({
    nodeType,
    colors: DEFAULT_COLORS,
    customColors: DEFAULT_CUSTOM_COLORS,
    closeOnSelect: true
  });
  const ref = useRef<HTMLInputElement>(null);
  const [customColor, setCustomColor] = useState(state.color);
  const stateCustom = useColorsCustomState({
    color: state.color,
    colors: DEFAULT_COLORS,
    customColors: DEFAULT_CUSTOM_COLORS,
    updateCustomColor: state.updateColor
  });
  const { inputProps } = useColorsCustom(stateCustom);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton tooltip={tooltip} size="sm" className="w-16 gap-1">
          <div
            className="size-5 rounded-sm border"
            style={{ backgroundColor: state.color ? state.color : customDefaultColor }}
          />
          {children}
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <div className="p-2 w-[316px]">
          <div className="flex gap-2">
            <Input
              type="color"
              className="p-1.5"
              onChange={e => setCustomColor(e.target.value)}
              value={customColor || state.color}
              ref={ref}
              onBlur={inputProps.onChange}
            />

            {customColor !== state.color && (
              <Button
                size="icon"
                variant="outline"
                className="flex-shrink-0"
                tooltip={tCore('confirm')}
                onClick={() => {
                  inputProps.onChange({
                    target: { value: customColor }
                  } as ChangeEvent<HTMLInputElement>);
                }}
              >
                <Check />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-[repeat(10,1fr)] gap-1 mt-2">
            {state.colors.map(item => (
              <Button
                key={item.value}
                variant="ghost"
                size="icon"
                className={cx('size-6', {
                  'text-black': item.isBrightColor,
                  'text-white': !item.isBrightColor
                })}
                tooltip=""
                onClick={() => state.updateColorAndClose(item.value)}
                style={{ backgroundColor: item.value }}
              >
                {item.value === state.color && <Check />}
              </Button>
            ))}
          </div>

          {state.color && (
            <Button className="w-full mt-2" variant="outline" size="sm" onClick={state.clearColor}>
              <RotateCcw /> {t('set_default_color')}
            </Button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
