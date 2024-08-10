import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Ban } from 'lucide-react';

import { useCreateNavPluginAdmin } from './hooks/use-create-nav-plugin-admin';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TagsInput } from '@/components/ui/tags-input';
import { Admin__Core_Plugins__Nav__ShowQuery } from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormInput } from '@/components/ui/auto-form/fields/input';
import { AutoFormSelect } from '@/components/ui/auto-form/fields/select';
import { AutoFormIcon } from '@/components/ui/auto-form/fields/icon';

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
  const tCore = useTranslations('core');
  const { form, onSubmit, formSchema } = useCreateNavPluginAdmin({
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
  const parentCode = form.watch('parent_code');

  const test = Object.fromEntries(dataFromSSR.map(nav => [nav.code, nav.code]));
  // <div className="flex flex-wrap items-center gap-2">
  //                           {nav.icon
  //                             ? icons.find(icon => icon.id === nav.code)?.icon
  //                             : null}
  //                           {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
  //                           {/* @ts-expect-error */}
  //                           <span>{tPlugin(nav.code)}</span>
  //                         </div>

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? t('edit.title') : t('create.title')}</DialogTitle>
      </DialogHeader>

      <AutoForm
        formSchema={formSchema}
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
                <span className="text-foreground font-bold">{`${code}/${parentCode !== 'null' ? `${parentCode}/` : ''}${removeSpecialCharacters(form.watch('href'))}`}</span>
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
                  none: (
                    <div className="flex flex-wrap items-center gap-2">
                      <Ban className="text-muted-foreground size-4" />
                      <span>{t('create.parent.null')}</span>
                    </div>
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
            fieldType: AutoFormInput,
          },
        }}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>{t('create.keywords.label')}</FormLabel>
                <FormControl>
                  <TagsInput {...field} multiple />
                </FormControl>
                <FormDescription>{t('create.keywords.desc')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
