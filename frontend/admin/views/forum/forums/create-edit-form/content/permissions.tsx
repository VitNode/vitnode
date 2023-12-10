import { TableVirtuoso } from 'react-virtuoso';
import { useState } from 'react';

import { usePermissionsGroupsAdminAPI } from './hooks/use-permissions-groups-admin';
import { useTextLang } from '@/hooks/core/use-text-lang';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { GlobalLoader } from '@/components/loader/global/global-loader';

export const PermissionsContentCreateEditFormForumAdmin = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, isFetching } = usePermissionsGroupsAdminAPI({
    searchValue
  });
  const { convertText } = useTextLang();

  return (
    <>
      {isFetching && <GlobalLoader />}

      <Input
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        placeholder="Search group..."
      />

      <TableVirtuoso
        style={{ height: '50vh' }}
        data={data?.core_groups__admin__show.edges}
        className="border rounded-md"
        components={{
          Table: ({ ...props }) => <table className="w-full" {...props} />,
          TableRow: ({ ...props }) => (
            <tr
              className="[&:not(:last-child)]:border-b transition-colors hover:bg-muted/50"
              {...props}
            />
          )
        }}
        fixedHeaderContent={() => (
          <tr className="bg-card border-b">
            <th />
            <th className="px-4 py-3 align-middle font-medium text-muted-foreground">
              <div className="flex gap-4 items-center justify-center">
                Can view? <Switch />
              </div>
            </th>
            <th className="px-4 py-3 align-middle font-medium text-muted-foreground">
              <div className="flex gap-4 items-center justify-center">
                Can view? <Switch />
              </div>
            </th>
            <th className="px-4 py-3 align-middle font-medium text-muted-foreground">
              <div className="flex gap-4 items-center justify-center">
                Can view? <Switch />
              </div>
            </th>
            <th className="px-4 py-3 align-middle font-medium text-muted-foreground">
              <div className="flex gap-4 items-center justify-center">
                Can view? <Switch />
              </div>
            </th>
          </tr>
        )}
        itemContent={(index, item) => (
          <>
            <td className="px-4 py-2">
              <div className="flex gap-2 flex-col">
                {convertText(item.name)}
                <Switch />
              </div>
            </td>
            <td className="px-4 py-2 text-center">
              <Switch />
            </td>
            <td className="px-4 py-2 text-center">
              <Switch />
            </td>
            <td className="px-4 py-2 text-center">{item.guest ? null : <Switch />}</td>
            <td className="px-4 py-2 text-center">{item.guest ? null : <Switch />}</td>
          </>
        )}
      />
    </>
  );
};
