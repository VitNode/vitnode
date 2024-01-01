import { type UseEmojiPickerType } from '@udecode/plate-emoji';
import { useTranslations } from 'next-intl';

export type EmojiPickerPreviewProps = Pick<
  UseEmojiPickerType,
  'emoji' | 'hasFound' | 'isSearching'
>;

export type EmojiPreviewProps = Pick<UseEmojiPickerType, 'emoji'>;

function EmojiPreview({ emoji }: EmojiPreviewProps) {
  return (
    <div className="flex items-center border-t p-2">
      <div className="flex items-center justify-center text-3xl">{emoji?.skins[0].native}</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm text-foreground">{emoji?.name}</div>
        <div className="truncate text-xs text-muted-foreground">{`:${emoji?.id}:`}</div>
      </div>
    </div>
  );
}

function NoEmoji() {
  const t = useTranslations('core.editor.emoji.no_results');

  return (
    <div className="flex items-center border-t p-2">
      <div className="flex items-center justify-center text-3xl">😢</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-sm text-foreground">{t('title')}</div>
        <div className="truncate text-xs text-muted-foreground">{t('desc')}</div>
      </div>
    </div>
  );
}

function PickAnEmoji() {
  const t = useTranslations('core.editor.emoji');

  return (
    <div className="flex items-center border-t p-2">
      <div className="flex items-center justify-center text-3xl">☝️</div>
      <div className="overflow-hidden pl-2">
        <div className="truncate text-lg text-muted-foreground">{t('pick')}</div>
      </div>
    </div>
  );
}

export function EmojiPickerPreview({
  emoji,
  hasFound = true,
  isSearching = false,
  ...props
}: EmojiPickerPreviewProps) {
  const showNoEmoji = isSearching && !hasFound;
  const showPreview = emoji;

  if (showNoEmoji) {
    return <NoEmoji {...props} />;
  }

  if (showPreview) {
    return <EmojiPreview emoji={emoji} {...props} />;
  }

  return <PickAnEmoji {...props} />;
}
