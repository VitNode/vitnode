import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ActionsTableNavDevPluginAdmin } from './actions/actions';
import { useItemNavDevPluginAdmin } from './hooks/use-item-nav-dev-plugin-admin';

export const ItemContentNavDevPluginAdmin = (data: ShowAdminNavPluginsObj) => {
  const { code: pluginCode } = useParams();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`admin_${pluginCode}.nav`);
  const tAdmin = useTranslations('admin.core.plugins.dev.nav');
  const tCore = useTranslations('core');
  const { parentId, icons } = useItemNavDevPluginAdmin();
  const langKey = parentId ? `${parentId}_${data.code}` : data.code;

  return (
    <>
      <div className="flex flex-1 flex-col">
        <span className="flex flex-wrap items-center gap-2 font-semibold">
          {icons.find(icon => icon.id === data.code)?.icon}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t(langKey)}
        </span>
        <p className="text-muted-foreground text-sm">
          {tAdmin.rich('lang_key', {
            key: () => (
              <span className="text-foreground">{`admin_${pluginCode}.nav.${langKey}`}</span>
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
