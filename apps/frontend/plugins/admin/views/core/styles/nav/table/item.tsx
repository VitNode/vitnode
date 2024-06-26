import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FlatTree } from 'vitnode-frontend/helpers/flatten-tree';
import { useTextLang } from 'vitnode-frontend/hooks/use-text-lang';

import { ShowCoreNav } from '@/graphql/hooks';
import { ActionsTableNavAdmin } from './actions/actions';

interface Props {
  data: FlatTree<Omit<ShowCoreNav, '__typename'>>;
}

export const ItemContentTableContentNavAdmin = ({ data }: Props) => {
  const t = useTranslations('admin.core.styles.nav');
  const { convertText } = useTextLang();

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="font-semibold">{convertText(data.name)}</span>
        </div>

        <span className="text-muted-foreground line-clamp-2 flex items-center gap-2 text-sm">
          {t('href', { href: data.href })}{' '}
          {data.external && <ExternalLink className="size-4" />}
        </span>

        {data.description.length > 0 && (
          <span className="text-muted-foreground line-clamp-2 text-sm">
            {convertText(data.description)}
          </span>
        )}
      </div>

      <ActionsTableNavAdmin {...data} />
    </>
  );
};
