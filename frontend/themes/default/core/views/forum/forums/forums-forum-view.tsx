import { useTranslations } from 'next-intl';

import type { Forum_Forums__ShowQuery } from '@/graphql/hooks';
import { CategoryForum } from './category';
import { HeaderContent } from '@/components/header-content/header-content';
import { ReadOnlyEditor } from '@/components/plate/editor/read-only';

interface Props {
  data: Forum_Forums__ShowQuery;
}

export const ForumsForumView = ({
  data: {
    forum_forums__show: { edges }
  }
}: Props) => {
  const t = useTranslations('forum');
  const tCore = useTranslations('core');

  return (
    <>
      <HeaderContent h1={t('forum')} />

      <ReadOnlyEditor
        value={[
          {
            id_language: 'en',
            value: '[{"type":"p","children":[{"text":"sadasdssd EN"}]}]'
          },
          {
            id_language: 'pl',
            value: '[{"type":"p","children":[{"text":"sadasdssd PL"}]}]'
          }
        ]}
      />

      {edges.length ? (
        <div className="flex flex-col gap-4">
          {edges.map(edge => (
            <CategoryForum key={edge.id} {...edge} />
          ))}
        </div>
      ) : (
        <div className="text-center">{tCore('no_results')}</div>
      )}
    </>
  );
};
