import { Virtuoso } from 'react-virtuoso';
import { useTranslations } from 'next-intl';

import type { ShowTopicsForums } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { Link } from '@/i18n';
import { DateFormat } from '@/components/date-format/date-format';

export interface TopicsListForumProps {
  data: Pick<ShowTopicsForums, 'id' | 'created' | 'title' | 'updated' | 'author'>[];
}

export const ContentTopicsListForum = ({ data }: TopicsListForumProps) => {
  const t = useTranslations('forum');
  const { convertNameToLink, convertText } = useTextLang();

  return (
    <Virtuoso
      data={data}
      useWindowScroll
      itemContent={(index, data) => (
        <div className="px-6 py-4 hover:bg-muted/50 cursor-pointer">
          <div className="flex flex-col">
            <h3 className="font-semibold text-base">
              <Link
                href={`/topic/${convertNameToLink({ id: data.id, name: data.title })}`}
                className="text-foreground no-underline"
              >
                {convertText(data.title)}
              </Link>
            </h3>
            <span className="text-sm text-muted-foreground">
              {t.rich('by', {
                user: () => <Link href={`/profile/${data.author.id}`}>{data.author.name}</Link>,
                date: () => <DateFormat date={data.created} />
              })}
            </span>
          </div>
        </div>
      )}
    />
  );
};
