import { Virtuoso } from 'react-virtuoso';

import { ShowTopicsForums } from '@/graphql/hooks';
import { useTextLang } from '@/hooks/core/use-text-lang';

export interface TopicsListForumProps {
  data: Pick<ShowTopicsForums, 'id' | 'created' | 'title' | 'updated'>[];
}

export const ContentTopicsListForum = ({ data }: TopicsListForumProps) => {
  const { convertText } = useTextLang();

  return (
    <Virtuoso
      data={data}
      useWindowScroll
      itemContent={(index, data) => (
        <div>
          {index} - {convertText(data.title)}
        </div>
      )}
    />
  );
};
