import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { HeaderContent } from '@/components/ui/header-content';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const ContentContentCreateEditFormGroupsMembersAdmin = ({
  isGuest,
}: {
  isGuest?: boolean;
}) => {
  const t = useTranslations('admin.members.groups.create_edit');
  const tCore = useTranslations('core');
  const form = useFormContext();

  return (
    <>
      <HeaderContent h2={t('files.title')} className="m-0" />

      <FormField
        control={form.control}
        name="content.files_allow_upload"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between gap-2 rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">
                {t('files.allow_upload')}
              </FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />

      {form.watch('content.files_allow_upload') && (
        <>
          {!isGuest && (
            <FormField
              control={form.control}
              name="content.files_total_max_storage"
              render={({ field }) => {
                const currentValue = +form.watch(
                  'content.files_total_max_storage',
                );

                return (
                  <FormItem>
                    <FormLabel>{t('files.total_max_storage')}</FormLabel>
                    <div className="flex flex-wrap items-center gap-2">
                      <FormControl>
                        <Input
                          className="max-w-32"
                          type="number"
                          {...field}
                          onChange={e =>
                            form.setValue(field.name, +e.target.value)
                          }
                          value={currentValue === -1 ? '' : currentValue}
                          disabled={currentValue === -1}
                          min={-1}
                        />
                      </FormControl>
                      <span>{t('in_kb')}</span>
                      <div className="flex shrink-0 items-center gap-2">
                        <span>{tCore('or')}</span>
                        <Checkbox
                          id="content.files_total_max_storage.unlimited"
                          onClick={() => {
                            if (currentValue === -1) {
                              form.setValue(
                                'content.files_total_max_storage',
                                500000,
                              );

                              return;
                            }

                            form.setValue(
                              'content.files_total_max_storage',
                              -1,
                            );
                          }}
                          checked={currentValue === -1}
                        />
                        <Label htmlFor="content.files_total_max_storage.unlimited">
                          {tCore('unlimited')}
                        </Label>
                      </div>
                    </div>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <FormField
            control={form.control}
            name="content.files_max_storage_for_submit"
            render={({ field }) => {
              const currentValue = +form.watch(
                'content.files_max_storage_for_submit',
              );

              return (
                <FormItem>
                  <FormLabel>
                    {t('files.max_storage_for_submit.label')}
                  </FormLabel>
                  <div className="flex flex-wrap items-center gap-2">
                    <FormControl>
                      <Input
                        className="max-w-32"
                        type="number"
                        {...field}
                        onChange={e =>
                          form.setValue(field.name, +e.target.value)
                        }
                        value={currentValue === -1 ? '' : currentValue}
                        disabled={currentValue === -1}
                        min={-1}
                      />
                    </FormControl>
                    <span>{t('in_kb')}</span>
                    <div className="flex shrink-0 items-center gap-2">
                      <span>{tCore('or')}</span>
                      <Checkbox
                        id="content.files_max_storage_for_submit.unlimited"
                        onClick={() => {
                          if (currentValue === -1) {
                            form.setValue(
                              'content.files_max_storage_for_submit',
                              10000,
                            );

                            return;
                          }

                          form.setValue(
                            'content.files_max_storage_for_submit',
                            -1,
                          );
                        }}
                        checked={currentValue === -1}
                      />
                      <Label htmlFor="content.files_max_storage_for_submit.unlimited">
                        {tCore('unlimited')}
                      </Label>
                    </div>
                  </div>
                  <FormDescription>
                    {t('files.max_storage_for_submit.desc')}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      )}
    </>
  );
};
