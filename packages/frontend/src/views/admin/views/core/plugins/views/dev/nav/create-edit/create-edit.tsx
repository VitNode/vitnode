import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Ban } from 'lucide-react';

import { useCreateNavPluginAdmin } from './hooks/use-create-nav-plugin-admin';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormInput } from '@/components/ui/auto-form/fields/input';
import { AutoFormSelect } from '@/components/ui/auto-form/fields/select';
import { AutoFormIcon } from '@/components/ui/auto-form/fields/icon';
import { AutoFormTags } from '@/components/ui/auto-form/fields/tags';

export interface CreateEditNavDevPluginAdminProps {
  dataFromSSR: Admin__Core_Plugins__Nav__ShowQuery['admin__core_plugins__nav__show'];
  icons: { icon: React.ReactNode; id: string }[];
  data?: ShowAdminNavPluginsObj;
  parentId?: string;
}

export const CreateEditNavDevPluginAdmin = ({
  data,
  dataFromSSR,
  icons,
  parentId,
}: CreateEditNavDevPluginAdminProps) => {
  const t = useTranslations('admin.core.plugins.dev.nav');
  const { onSubmit, formSchema, values, setValues } = useCreateNavPluginAdmin({
    data,
    parentId,
    dataFromSSR,
  });
  const { code } = useParams();
  const tPlugin = useTranslations(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    `${Array.isArray(code) ? code[0] : code}.admin.nav`,
  );

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? t('edit.title') : t('create.title')}</DialogTitle>
      </DialogHeader>

      <AutoForm
        formSchema={formSchema}
        onSubmit={onSubmit}
        onValuesChange={setValues}
        fieldConfig={{
          code: {
            label: t('create.code.label'),
            description: t('create.code.desc'),
            fieldType: AutoFormInput,
          },
          href: {
            label: t('create.href.label'),
            description: t.rich('create.href.desc', {
              link: () => (
                <span className="text-foreground font-bold">{`${code}/${values.parent_code !== 'null' ? `${values.parent_code}/` : ''}${removeSpecialCharacters(values.href ?? '')}`}</span>
              ),
            }),
            fieldType: AutoFormInput,
          },
          parent_code: {
            label: t('create.parent.label'),
            fieldType: props => (
              <AutoFormSelect
                {...props}
                labels={{
                  null: (
                    <div className="flex flex-wrap items-center gap-2">
                      <Ban className="text-muted-foreground size-4" />
                      <span>{t('create.parent.null')}</span>
                    </div>
                  ),
                  ...Object.fromEntries(
                    dataFromSSR.map(nav => [
                      nav.code,
                      <div
                        key={nav.code}
                        className="flex flex-wrap items-center gap-2"
                      >
                        {nav.icon
                          ? icons.find(icon => icon.id === nav.code)?.icon
                          : null}
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-expect-error */}
                        <span>{tPlugin(nav.code)}</span>
                      </div>,
                    ]),
                  ),
                }}
              />
            ),
          },
          icon: {
            label: t('create.icon.label'),
            fieldType: AutoFormIcon,
          },
          keywords: {
            label: t('create.keywords.label'),
            description: t('create.keywords.desc'),
            fieldType: props => <AutoFormTags {...props} multiple />,
          },
        }}
      />
    </>
  );
};
