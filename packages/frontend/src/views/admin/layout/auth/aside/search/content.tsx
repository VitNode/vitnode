import {
  CommandEmpty,
  CommandGroup,
  CommandList,
} from '@/components/ui/command';
import { Loader } from '@/components/ui/loader';
import { useTranslations } from 'next-intl';

import { useSearchAdminApi } from './hooks/use-search-admin-api';
import { PageItemContentSearchAsideAuthAdmin } from './items/page';

export const ContentSearchAsideAuthAdmin = ({
  search,
  setOpen,
}: {
  search: string;
  setOpen: (open: boolean) => void;
}) => {
  const t = useTranslations('admin.search');

  const { data, isLoading } = useSearchAdminApi(search);

  return (
    <CommandList>
      {isLoading ? (
        <Loader className="p-4" />
      ) : (
        <>
          {search.length >= 3 && <CommandEmpty>{t('no_results')}</CommandEmpty>}
          {data && data.admin__sessions__search.nav.length > 0 && (
            <CommandGroup heading={t('pages')}>
              {data.admin__sessions__search.nav.map(item => (
                <PageItemContentSearchAsideAuthAdmin
                  key={`pages_${item.code_plugin}_${item.code}`}
                  setOpen={setOpen}
                  {...item}
                />
              ))}
            </CommandGroup>
          )}
        </>
      )}
    </CommandList>
  );
};
