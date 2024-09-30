import {
  Command,
  commandInputClassName,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { GroupInputItem } from '@/components/ui/user/group-input';
import { getGroupsShortApi } from '@/graphql/get-groups-short-api';
import { cn } from '@/helpers/classnames';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { GroupInputContentList } from './list';

export const GroupInputContent = ({
  onSelect,
  values,
}: {
  onSelect: (value: GroupInputItem) => void;
  values: GroupInputItem[];
}) => {
  const [search, setSearch] = React.useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['Admin__Core_Groups__Show_Short', { search }],
    queryFn: async () => {
      const mutation = await getGroupsShortApi({ search });

      return mutation.data;
    },
  });

  const handleSearchInput = useDebouncedCallback((value: string) => {
    setSearch(value);
  }, 500);

  return (
    <Command>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 size-4 shrink-0 opacity-50" />
        <Input
          className={cn(
            'border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0',
            commandInputClassName,
          )}
          onChange={e => handleSearchInput(e.target.value)}
          // TODO: Add placeholder translation
          placeholder={'Search group...'}
        />
      </div>

      <CommandList>
        {isLoading ? (
          <Loader className="p-2" />
        ) : (
          <GroupInputContentList
            edges={data?.admin__core_groups__show.edges ?? []}
            onSelect={onSelect}
            values={values}
          />
        )}
      </CommandList>
    </Command>
  );
};
