import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { ActionsTableNavDevPluginAdmin } from './actions/actions';
import { useItemNavDevPluginAdmin } from './hooks/use-item-nav-dev-plugin-admin';
import { FlatTree } from '@/helpers/flatten-tree';
import { ShowAdminNavPluginsObj } from '@/graphql/graphql';

export const ItemContentNavDevPluginAdmin = (
  data: FlatTree<ShowAdminNavPluginsObj>,
) => {
  const { code: pluginCode } = useParams();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${pluginCode}.admin.nav`);
  const tAdmin = useTranslations('admin.core.plugins.dev.nav');
  const tCore = useTranslations('core');
  const { parentId } = useItemNavDevPluginAdmin();
  const langKey = parentId ? `${parentId}_${data.code}` : data.code;

  return (
    <>
      <div className="flex flex-1 flex-col">
        <span className="font-semibold">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t(langKey)}
        </span>
        <p className="text-muted-foreground text-sm">
          {tAdmin.rich('lang_key', {
            key: () => (
              <span className="text-foreground">{`${pluginCode}.admin.nav.${langKey}`}</span>
            ),
          })}
        </p>
        <p className="text-muted-foreground text-sm">
          {tCore.rich('link_url_with_link', {
            link: () => (
              <span className="text-foreground">{`/admin/${pluginCode}/${parentId ? `${parentId}/` : ''}${data.code}`}</span>
            ),
          })}
        </p>
        <p className="text-muted-foreground mt-1 text-sm">
          {tAdmin.rich('keywords', {
            keywords: () => (
              <span className="text-foreground">
                {data.keywords.join(', ')}
              </span>
            ),
          })}
        </p>
      </div>

      <ActionsTableNavDevPluginAdmin {...data} />
    </>
  );
};
