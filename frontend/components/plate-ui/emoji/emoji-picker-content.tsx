import React, { memo, useCallback } from 'react';
import { cn } from '@udecode/cn';
import {
  type Emoji,
  EmojiSettings,
  type GridRow,
  type UseEmojiPickerType,
  type EmojiCategoryList
} from '@udecode/plate-emoji';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export type EmojiPickerContentProps = Pick<
  UseEmojiPickerType,
  | 'onMouseOver'
  | 'onSelectEmoji'
  | 'emojiLibrary'
  | 'isSearching'
  | 'searchResult'
  | 'visibleCategories'
  | 'refs'
  | 'settings'
>;

export type EmojiButtonProps = {
  emoji: Emoji;
  index: number;
  onMouseOver: (emoji?: Emoji) => void;
  onSelect: (emoji: Emoji) => void;
};

export type RowOfButtonsProps = Pick<
  UseEmojiPickerType,
  'onMouseOver' | 'onSelectEmoji' | 'emojiLibrary'
> & {
  row: GridRow;
};

const EmojiButton = memo(({ emoji, index, onMouseOver, onSelect }: EmojiButtonProps) => {
  return (
    <Button
      aria-label={emoji.skins[0].native}
      data-index={index}
      onClick={() => onSelect(emoji)}
      onMouseEnter={() => onMouseOver(emoji)}
      onMouseLeave={() => onMouseOver()}
      onFocus={() => onMouseOver(emoji)}
      onBlur={() => onMouseOver()}
      variant="ghost"
      className="size-9 text-2xl"
    >
      <span data-emoji-set="native">{emoji.skins[0].native}</span>
    </Button>
  );
});
EmojiButton.displayName = 'EmojiButton';

const RowOfButtons = memo(
  ({ emojiLibrary, onMouseOver, onSelectEmoji, row }: RowOfButtonsProps) => (
    <div key={row.id} data-index={row.id} className="flex">
      {row.elements.map((emojiId, index) => (
        <EmojiButton
          key={emojiId}
          index={index}
          emoji={emojiLibrary.getEmoji(emojiId)}
          onSelect={onSelectEmoji}
          onMouseOver={onMouseOver}
        />
      ))}
    </div>
  )
);
RowOfButtons.displayName = 'RowOfButtons';

export function EmojiPickerContent({
  emojiLibrary,
  isSearching = false,
  onMouseOver,
  onSelectEmoji,
  refs,
  searchResult,
  settings = EmojiSettings,
  visibleCategories
}: EmojiPickerContentProps) {
  const getRowWidth = settings.perLine.value * settings.buttonSize.value;
  const t = useTranslations('core');

  const isCategoryVisible = useCallback(
    (categoryId: EmojiCategoryList) => {
      return visibleCategories.has(categoryId) ? visibleCategories.get(categoryId) : false;
    },
    [visibleCategories]
  );

  const EmojiList = useCallback(() => {
    return emojiLibrary
      .getGrid()
      .sections()
      .map(({ id: categoryId }) => {
        const section = emojiLibrary.getGrid().section(categoryId);
        const { buttonSize } = settings;

        return (
          <div
            key={categoryId}
            data-id={categoryId}
            ref={section.root}
            style={{ width: getRowWidth }}
          >
            <div className="sticky -top-px z-[1] bg-popover/90 p-1 backdrop-blur">
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              {t(`editor.emoji.categories.${categoryId}`)}
            </div>
            <div
              className="relative flex flex-wrap my-1"
              style={{ height: section.getRows().length * buttonSize.value }}
            >
              {isCategoryVisible(categoryId) &&
                section
                  .getRows()
                  .map((row: GridRow, index) => (
                    <RowOfButtons
                      key={index}
                      emojiLibrary={emojiLibrary}
                      row={row}
                      onSelectEmoji={onSelectEmoji}
                      onMouseOver={onMouseOver}
                    />
                  ))}
            </div>
          </div>
        );
      });
  }, [emojiLibrary, getRowWidth, isCategoryVisible, onSelectEmoji, onMouseOver, settings]);

  const SearchList = useCallback(() => {
    return (
      <div data-id="search" style={{ width: getRowWidth }}>
        <div className="sticky -top-px z-[1] bg-popover/90 p-1 backdrop-blur">{t('results')}</div>
        <div className="relative flex flex-wrap my-1">
          {searchResult.map((emoji: Emoji, index: number) => (
            <EmojiButton
              key={emoji.id}
              index={index}
              emoji={emojiLibrary.getEmoji(emoji.id)}
              onSelect={onSelectEmoji}
              onMouseOver={onMouseOver}
            />
          ))}
        </div>
      </div>
    );
  }, [emojiLibrary, getRowWidth, searchResult, onSelectEmoji, onMouseOver]);

  return (
    <div
      className={cn(
        'h-full min-h-[50%] overflow-y-auto overflow-x-hidden px-3'
        // '[&::-webkit-scrollbar]:w-4',
        // '[&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-button]:h-0 [&::-webkit-scrollbar-button]:w-0',
        // ':hover:[&::-webkit-scrollbar-thumb]:bg-[#f3f4f6]',
        // '[&::-webkit-scrollbar-thumb]:min-h-[65px] [&::-webkit-scrollbar-thumb]:rounded-2xl [&::-webkit-scrollbar-thumb]:border-4 [&::-webkit-scrollbar-thumb]:border-white',
        // '[&::-webkit-scrollbar-track]:border-0'
      )}
      data-id="scroll"
      ref={refs.current.contentRoot}
    >
      <div ref={refs.current.content} className="h-full">
        {isSearching ? SearchList() : EmojiList()}
      </div>
    </div>
  );
}
