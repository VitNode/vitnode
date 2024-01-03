import { type EmojiCategoryList, type UseEmojiPickerType } from '@udecode/plate-emoji';
import { motion } from 'framer-motion';
import {
  Car,
  Clock3,
  Component,
  Dumbbell,
  Flag,
  Lightbulb,
  PawPrint,
  Smile,
  Utensils,
  type LucideIcon
} from 'lucide-react';
import { useTranslations } from 'next-intl';

import { cx } from '@/functions/classnames';
import { Button } from '@/components/ui/button';

const categories: { [id: string]: LucideIcon } = {
  frequent: Clock3,
  people: Smile,
  nature: PawPrint,
  foods: Utensils,
  activity: Dumbbell,
  places: Car,
  objects: Lightbulb,
  symbols: Component,
  flags: Flag
};

export type EmojiPickerNavigationProps = Pick<
  UseEmojiPickerType,
  'emojiLibrary' | 'focusedCategory'
> & {
  onClick: (id: EmojiCategoryList) => void;
};

export function EmojiPickerNavigation({
  emojiLibrary,
  focusedCategory,
  onClick
}: EmojiPickerNavigationProps) {
  const t = useTranslations('core.editor.emoji.categories');

  return (
    <nav id="emoji-nav" className="mb-2.5 border-0 border-solid border-b">
      <div className="relative flex px-1">
        {emojiLibrary
          .getGrid()
          .sections()
          .map(({ id }) => {
            const active = focusedCategory === id;
            const Icons = categories[id];

            return (
              <Button
                key={id}
                variant="ghost"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                tooltip={t(id)}
                className={cx('w-9 h-10 rounded-b-none relative', {
                  'text-primary': active
                })}
                size="icon"
                onClick={() => onClick(id)}
              >
                <Icons />
                {active && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-primary rounded-t-md"
                    layoutId="emoji_nav_underline"
                  />
                )}
              </Button>
            );
          })}
      </div>
    </nav>
  );
}
