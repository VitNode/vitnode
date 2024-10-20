import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { TextAndIconsAsideAdmin } from '@/views/admin/layout/admin-layout';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ActionsTableNavDevPluginAdmin } from './actions/actions';

export const ItemContentNavDevPluginAdmin = ({
  data,
  parentId,
  textsAndIcons,
  dataFromSSR,
}: {
  data: ShowAdminNavPluginsObj;
  dataFromSSR: Admin__Core_Plugins__Nav__ShowQuery['admin__core_plugins__nav__show'];
  parentId?: string;
  textsAndIcons: TextAndIconsAsideAdmin[];
}) => {
  const { code: pluginCode } = useParams();
  const tAdmin = useTranslations('admin.core.plugins.dev.nav');
  const langKey = parentId ? `${parentId}_${data.code}` : data.code;

  const textAndIcon = textsAndIcons.find(item => item.id === langKey);

  if (!textAndIcon) return null;

  return (
    <>
      <div className="flex flex-1 flex-col">
        <span className="flex flex-wrap items-center gap-2 font-semibold">
          {textAndIcon.icon}
          {textAndIcon.text}
        </span>
        <p className="text-muted-foreground text-sm">
          {tAdmin.rich('lang_key', {
            key: () => (
              <span className="text-foreground">{`admin_${pluginCode}.nav.${langKey}`}</span>
            ),
          })}
        </p>
        <p className="text-muted-foreground text-sm">
          {tAdmin.rich('link_url_with_link', {
            link: () => (
              <span className="text-foreground">{`/admin/${pluginCode}/${parentId ? `${parentId}/` : ''}${data.code}`}</span>
            ),
          })}
        </p>
        {data.keywords.length > 0 && (
          <p className="text-muted-foreground mt-1 text-sm">
            {tAdmin.rich('keywords', {
              keywords: () => (
                <span className="text-foreground">
                  {data.keywords.join(', ')}
                </span>
              ),
            })}
          </p>
        )}
      </div>

      <ActionsTableNavDevPluginAdmin
        data={data}
        dataFromSSR={dataFromSSR}
        parentId={parentId}
        textsAndIcons={textsAndIcons}
      />
    </>
  );
};
