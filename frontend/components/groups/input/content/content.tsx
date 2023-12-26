import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { cx } from '@/functions/classnames';
import { fetcher } from '@/graphql/fetcher';
import {
  Core_Groups__Admin__Show_Short,
  type Core_Groups__Admin__Show_ShortQuery,
  type Core_Groups__Admin__Show_ShortQueryVariables
} from '@/graphql/hooks';
import { Loader } from '@/components/loader/loader';
import { Input } from '@/components/ui/input';
import { Command, CommandList, commandInputClassName } from '@/components/ui/command';
import type { GroupInputItem } from '../group-input';
import { GroupInputContentList } from './list';

interface Props {
  onSelect: (value: GroupInputItem) => void;
  values: GroupInputItem[];
}

export const GroupInputContent = ({ onSelect, values }: Props) => {
  const t = useTranslations('core');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['Core_Groups__Admin__Show_Short', { search }],
    queryFn: async () => {
      const { data } = await fetcher<
        Core_Groups__Admin__Show_ShortQuery,
        Core_Groups__Admin__Show_ShortQueryVariables
      >({
        query: Core_Groups__Admin__Show_Short,
        variables: {
          first: 10,
          search
        }
      });

      return data;
    }
  });

  return (
    <Command>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <Input
          className={cx(
            'border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            commandInputClassName
          )}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t('group_input.search')}
        />
      </div>

      <CommandList>
        {isLoading ? (
          <Loader className="p-2" />
        ) : (
          <GroupInputContentList
            edges={data?.core_groups__admin__show.edges ?? []}
            onSelect={onSelect}
            values={values}
          />
        )}
      </CommandList>
    </Command>
  );
};
