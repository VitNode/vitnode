'use client';

import { useTranslations } from 'next-intl';
import { SquareArrowOutUpRight } from 'lucide-react';
import * as z from 'zod';

import { useEmailSettingsFormAdmin } from './hooks/use-email-settings-form-admin';
import {
  Form,
  FormControl,
  FormField,
  FormFieldRender,
  FormItem,
  FormLabel,
  FormWrapper,
} from '@/components/ui/form';
import { ColorPicker } from '@/components/ui/color-picker';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Admin__Core_Email_Settings__ShowQuery } from '@/graphql/queries/admin/settings/admin__core_email_settings__show.generated';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link } from '@/navigation';
import { FileInput } from '@/components/ui/file-input';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormRadioGroup } from '@/components/ui/auto-form/fields/radio-group';

export const ContentEmailSettingsAdmin = (
  props: Admin__Core_Email_Settings__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.email');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useEmailSettingsFormAdmin(props);

  const formSchema = z.object({
    type: z.enum(['option-one', 'option-two']).default('option-one'),
  });

  return (
    <>
      <AutoForm
        formSchema={formSchema}
        fieldConfig={{
          type: {
            label: 'Radio Group Example',
            fieldType: props => (
              <AutoFormRadioGroup
                {...props}
                labels={{
                  ['option-one']: {
                    title: 'Option One',
                    description: 'Option One Description',
                  },
                  ['option-two']: {
                    title: 'Option Two',
                    description: 'Option Two Description',
                  },
                }}
              />
            ),
          },
        }}
      />

      <Form {...form}>
        <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="color_primary"
            render={({ field }) => (
              <FormFieldRender label={t('color_primary')}>
                <ColorPicker {...field} disableRemoveColor />
              </FormFieldRender>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormFieldRender label={t('logo')} optional>
                <FileInput
                  {...field}
                  acceptExtensions={['png', 'jpg', 'gif']}
                  maxFileSizeInMb={2}
                  accept="image/png, image/gif, image/jpeg"
                  showInfo
                />
              </FormFieldRender>
            )}
          />

          <div className="w-full space-y-2">
            <Separator />
          </div>

          <FormField
            control={form.control}
            name="provider"
            render={({ field }) => (
              <FormFieldRender label={t('provider.title')}>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t('provider.none')}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="smtp" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {t('provider.smtp')}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="resend" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      <span>{t('provider.resend')}</span>
                      <span className="text-muted-foreground flex flex-wrap items-center gap-1 text-sm font-normal">
                        {t.rich('provider.resend_desc', {
                          link: text => (
                            <Link
                              href="https://resend.com/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              {text}
                              <SquareArrowOutUpRight className="size-3" />
                            </Link>
                          ),
                        })}
                      </span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormFieldRender>
            )}
          />

          {form.watch('provider') === 'smtp' && (
            <>
              <FormField
                control={form.control}
                name="smtp.host"
                render={({ field }) => (
                  <FormFieldRender label={t('smtp_host')}>
                    <Input {...field} placeholder="smtp.gmail.com" />
                  </FormFieldRender>
                )}
              />

              <FormField
                control={form.control}
                name="smtp.user"
                render={({ field }) => (
                  <FormFieldRender label={t('smtp_user')}>
                    <Input {...field} placeholder="user" />
                  </FormFieldRender>
                )}
              />

              <FormField
                control={form.control}
                name="smtp.password"
                render={({ field }) => (
                  <FormFieldRender label={t('smtp_password')}>
                    <Input
                      {...field}
                      type="password"
                      placeholder="**********"
                    />
                  </FormFieldRender>
                )}
              />

              <FormField
                control={form.control}
                name="smtp.secure"
                render={({ field }) => (
                  <FormFieldRender label={t('smtp_secure')}>
                    <Switch
                      checked={field.value}
                      onCheckedChange={val => {
                        field.onChange(val);
                        if (val) {
                          form.setValue('smtp.port', 465);
                        }
                      }}
                    />
                  </FormFieldRender>
                )}
              />

              <FormField
                control={form.control}
                name="smtp.port"
                render={({ field }) => (
                  <FormFieldRender label={t('smtp_port')}>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      max={999}
                      onChange={e => field.onChange(+e.target.value)}
                    />
                  </FormFieldRender>
                )}
              />
            </>
          )}

          {form.watch('provider') === 'resend' && (
            <FormField
              control={form.control}
              name="resend_key"
              render={({ field }) => (
                <FormFieldRender label={t('resend_key')}>
                  <Input {...field} type="password" placeholder="**********" />
                </FormFieldRender>
              )}
            />
          )}

          <Button
            type="submit"
            disabled={!form.formState.isValid}
            loading={form.formState.isSubmitting}
          >
            {tCore('save')}
          </Button>
        </FormWrapper>
      </Form>
    </>
  );
};
