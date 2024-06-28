import { useTranslations } from 'next-intl';

import { useDownloadPluginAdmin } from './hooks/use-download-plugin-admin';

import { ShowAdminPlugins } from '../../../../../../../../../../graphql/code';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../../../../../../../../components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../../../../../../../../components/ui/form';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../../../../../../../../components/ui/radio-group';
import { Label } from '../../../../../../../../../../components/ui/label';
import { Input } from '../../../../../../../../../../components/ui/input';
import { Button } from '../../../../../../../../../../components/ui/button';

export const ContentDownloadActionDevPluginAdmin = ({
  code,
  name,
  version,
  version_code,
}: ShowAdminPlugins) => {
  const t = useTranslations('admin.core.plugins.download');
  const { form, onSubmit } = useDownloadPluginAdmin({
    version_code,
    version,
    code,
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t('title')}</DialogTitle>
        <DialogDescription className="text-muted-foreground text-sm">
          {name}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {version_code && (
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rebuild" id="rebuild" />
                    <Label htmlFor="rebuild">
                      {t('type.rebuild', {
                        version: `${version} (${version_code})`,
                      })}
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new_version" id="new_version" />
                    <Label htmlFor="new_version">{t('type.new_version')}</Label>
                  </div>
                </RadioGroup>
              )}
            />
          )}

          {form.watch('type') === 'new_version' && (
            <>
              <FormField
                control={form.control}
                name="version"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('version.label')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="version_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('version_code.label')}</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={version_code ? version_code + 1 : 1}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <DialogFooter>
            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {t('submit')}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};
