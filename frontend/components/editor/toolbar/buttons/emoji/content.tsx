import { CSSProperties, ReactNode, forwardRef, useState } from 'react';
import data, { Emoji, EmojiMartData } from '@emoji-mart/data';
import { init, SearchIndex } from 'emoji-mart';
import { Components, VirtuosoGrid } from 'react-virtuoso';
import { useTranslations } from 'next-intl';

import { ItemEmojiButtonEditor } from './item';
import { TabsEmojiButtonEditor } from './tabs';
import { Input } from '@/components/ui/input';
import { SkinSelectEmojiButtonEditor } from './skin-select';

import { useSession } from '../../../../../hooks/core/use-session';
import { useSessionAdmin } from '../../../../../admin/hooks/use-session-admin';
import { CONFIG } from '../../../../../config';

init({ data });

const emojiMart = data as EmojiMartData;
const emojis = emojiMart.categories.flatMap(item => item.emojis);

export const ContentEmojiButtonEditor = () => {
  const { session } = useSession();
  const { session: adminSession } = useSessionAdmin();
  const userId = session?.id ?? adminSession?.id;
  const localStorageSkinToneIndex = localStorage.getItem(`${CONFIG.editor.skin_tone}-${userId}`);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<string[] | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [skinToneIndex, setSkinToneIndex] = useState(
    localStorageSkinToneIndex ? +localStorageSkinToneIndex : 0
  );
  const t = useTranslations('core');

  async function search(value: string) {
    setSearchValue(value);
    if (value === '') return setSearchResults(null);

    const emojis: Emoji[] = await SearchIndex.search(value);
    setSearchResults(emojis.map(emoji => emoji.id));
  }

  const List: Components['List'] = forwardRef(
    ({ children, style }: { children?: ReactNode; style?: CSSProperties }, ref) => {
      return (
        <div className="flex flex-wrap items-center relative" style={style} ref={ref}>
          {children}
        </div>
      );
    }
  );

  List.displayName = 'List';

  return (
    <>
      <TabsEmojiButtonEditor
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchValue={searchValue}
        onResetSearch={async () => {
          if (searchValue.length <= 0) return;

          await search('');
        }}
      />

      <div className="px-2 py-3.5 flex gap-2">
        <Input
          className="h-9"
          onChange={async e => {
            await search(e.target.value);
          }}
          value={searchValue}
          placeholder={t('search_placeholder')}
        />
        <SkinSelectEmojiButtonEditor
          skinToneIndex={skinToneIndex}
          setSkinToneIndex={setSkinToneIndex}
        />
      </div>

      <div className="h-48">
        {searchResults && searchResults.length === 0 ? (
          <div className="px-2 pb-2 text-muted-foreground italic">{t('no_results')}</div>
        ) : (
          <VirtuosoGrid
            style={{ height: '100%' }}
            data={
              searchResults
                ? searchResults
                : emojiMart.categories.find(category => category.id === activeCategory)?.emojis ??
                  emojis
            }
            components={{
              List
            }}
            overscan={200}
            itemContent={(_index, id) => {
              const emoji = emojiMart.emojis[id];

              return <ItemEmojiButtonEditor key={id} emoji={emoji} skinToneIndex={skinToneIndex} />;
            }}
          />
        )}
      </div>
    </>
  );
};
