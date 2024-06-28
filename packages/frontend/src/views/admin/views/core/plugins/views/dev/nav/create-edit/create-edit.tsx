import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Ban } from 'lucide-react';
import { removeSpecialCharacters } from 'vitnode-shared';

import { useCreateNavPluginAdmin } from './hooks/use-create-nav-plugin-admin';

import { ShowAdminNavPluginsObj } from '../../../../../../../../../graphql/code';
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../../../../../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../../../../../components/ui/form';
import { Input } from '../../../../../../../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../../../../components/ui/select';
import { IconInput } from '../../../../../../../../../components/icon/input/icon-input';
import { Button } from '../../../../../../../../../components/ui/button';

export interface CreateEditNavDevPluginAdminProps {
  dataFromSSR: ShowAdminNavPluginsObj[];
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
  const { form, onSubmit } = useCreateNavPluginAdmin({ data, parentId });
  const { code } = useParams();
  const tPlugin = useTranslations(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
    // @ts-ignore
    `${Array.isArray(code) ? code[0] : code}.admin.nav`,
  );
  const parentCode = form.watch('parent_code');

  return (
    <>
      <DialogHeader>
        <DialogTitle>{data ? t('edit.title') : t('create.title')}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('create.code.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{t('create.code.desc')}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('create.href.label')}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  {t.rich('create.href.desc', {
                    link: () => (
                      <span className="text-foreground font-bold">{`${code}/${parentCode !== 'null' ? `${parentCode}/` : ''}${removeSpecialCharacters(form.watch('href'))}`}</span>
                    ),
                  })}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parent_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('create.parent.label')}</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="null">
                        <div className="flex flex-wrap items-center gap-2">
                          <Ban className="text-muted-foreground size-4" />
                          <span>{t('create.parent.null')}</span>
                        </div>
                      </SelectItem>
                      {dataFromSSR.map(nav => (
                        <SelectItem value={nav.code} key={nav.code}>
                          <div className="flex flex-wrap items-center gap-2">
                            {nav.icon
                              ? icons.find(icon => icon.id === nav.code)?.icon
                              : null}
                            {/* eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment */}
                            {/* @ts-ignore */}
                            <span>{tPlugin(nav.code)}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel optional>{t('create.icon.label')}</FormLabel>
                <FormControl>
                  <IconInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {tCore(data ? 'edit' : 'create')}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
