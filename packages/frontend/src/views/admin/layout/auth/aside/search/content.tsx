import {
  CommandEmpty,
  CommandGroup,
  CommandList,
} from '@/components/ui/command';
import { Loader } from '@/components/ui/loader';
import { useTranslations } from 'next-intl';

import { TextAndIconsAsideAdmin } from '../aside';
import { useSearchAdminApi } from './hooks/use-search-admin-api';
import { PageItemContentSearchAsideAuthAdmin } from './items/page';

export const ContentSearchAsideAuthAdmin = ({
  search,
  setOpen,
  textsAndIcons,
}: {
  search: string;
  setOpen: (open: boolean) => void;
  textsAndIcons: TextAndIconsAsideAdmin[];
}) => {
  const t = useTranslations('admin.global.search');
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
              {data.admin__sessions__search.nav.map(item => {
                const id = item.parent_nav_code
                  ? `${item.parent_nav_code}_${item.code}`
                  : item.code;
                const textAndIcon = textsAndIcons.find(item => item.id === id);

                if (!textAndIcon) return null;

                return (
                  <PageItemContentSearchAsideAuthAdmin
                    key={`pages_${id}`}
                    setOpen={setOpen}
                    textAndIcon={textAndIcon}
                    {...item}
                  />
                );
              })}
            </CommandGroup>
          )}
        </>
      )}
    </CommandList>
  );
};
