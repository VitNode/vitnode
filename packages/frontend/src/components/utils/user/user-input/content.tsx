import {
  Command,
  commandInputClassName,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import { UserInputItem } from '@/components/ui/user/user-input';
import { getUsersShortApi } from '@/graphql/get-users-short-api';
import { cn } from '@/helpers/classnames';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import React from 'react';
import { useDebouncedCallback } from 'use-debounce';

import { UserInputContentList } from './list';

export const UserInputContent = (props: {
  onSelect: (value: UserInputItem) => void;
  values: UserInputItem[];
}) => {
  const [search, setSearch] = React.useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['Core_Members__Show__Search', { search }],
    queryFn: async () => {
      const mutation = await getUsersShortApi({
        first: 10,
        search,
      });

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
          placeholder={'Search users...'}
        />
      </div>

      <CommandList>
        {isLoading ? (
          <Loader className="p-2" />
        ) : (
          <UserInputContentList
            edges={data?.core_members__show.edges ?? []}
            {...props}
          />
        )}
      </CommandList>
    </Command>
  );
};
