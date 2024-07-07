'use client';

import { useTranslations } from 'next-intl';

import { useCaptchaSecurityAdmin } from './hooks/use-captcha-security-admin';

import {
  Admin__Core_Security__Captcha__ShowQuery,
  CaptchaTypeEnum,
} from '../../../../../../../graphql/graphql';
import {
  RadioGroup,
  RadioGroupItem,
} from '../../../../../../../components/ui/radio-group';
import {
  Form,
  FormField,
  FormFieldRender,
  FormWrapper,
} from '../../../../../../../components/ui/form';
import { Label } from '../../../../../../../components/ui/label';
import { Button } from '../../../../../../../components/ui/button';

export const ContentCaptchaSecurityAdmin = (
  data: Admin__Core_Security__Captcha__ShowQuery,
) => {
  const t = useTranslations('admin.core.settings.security.captcha');
  const tCore = useTranslations('core');
  const { form, onSubmit } = useCaptchaSecurityAdmin(data);

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => {
            const types = Object.keys(CaptchaTypeEnum) as CaptchaTypeEnum[];

            return (
              <FormFieldRender label={t('type.title')}>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label className="flex flex-col gap-1" htmlFor="none">
                      <span>{t('type.none.title')}</span>
                      <span className="text-muted-foreground text-sm font-normal">
                        {t('type.none.title')}
                      </span>
                    </Label>
                  </div>

                  {types
                    .filter(type => type !== 'none')
                    .map(type => (
                      <div key={type} className="flex items-center space-x-2">
                        <RadioGroupItem value={type} id={type} />
                        <Label className="flex flex-col gap-1" htmlFor={type}>
                          <span>{t(`type.${type}.title`)}</span>
                          <span className="text-muted-foreground text-sm font-normal">
                            {t(`type.${type}.title`)}
                          </span>
                        </Label>
                      </div>
                    ))}
                </RadioGroup>
              </FormFieldRender>
            );
          }}
        />

        <Button
          type="submit"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          {tCore('save')}
        </Button>
      </FormWrapper>
    </Form>
  );
};
