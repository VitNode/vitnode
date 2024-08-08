'use client';

import { useTranslations } from 'next-intl';

// import { SuccessFormSignUp } from './success';
import { useSignUpView } from '@/hooks/core/sign/up/use-sign-up-view';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormInput } from '@/components/ui/auto-form/fields/input';
import { AutoFormCheckbox } from '@/components/ui/auto-form/fields/checkbox';

export const FormSignUp = () => {
  const t = useTranslations('core');
  const { formSchema, onSubmit, form } = useSignUpView();

  // if (isSuccess) {
  //   return <SuccessFormSignUp name={form.watch('name')} />;
  // }

  return (
    <>
      <CardContent>
        <AutoForm
          formSchema={formSchema}
          fieldConfig={{
            name: {
              label: t('sign_up.form.name.label'),
              fieldType: AutoFormInput,
              description: t('sign_up.form.name.desc'),
              inputProps: {
                type: 'text',
              },
            },
            email: {
              label: t('sign_up.form.email.label'),
              fieldType: AutoFormInput,
              inputProps: {
                type: 'email',
              },
            },
            password: {
              label: t('sign_up.form.password.label'),
              fieldType: AutoFormInput,
              inputProps: {
                type: 'password',
              },
            },
            terms: {
              label: t('sign_up.form.terms.label'),
              description: t('sign_up.form.terms.desc'),
              fieldType: AutoFormCheckbox,
            },
            newsletter: {
              label: t('sign_up.form.newsletter.label'),
              description: t('sign_up.form.newsletter.desc'),
              fieldType: AutoFormCheckbox,
            },
          }}
          onSubmit={onSubmit}
          submitButton={props => (
            <Button {...props} className="w-full">
              {t('sign_up.form.submit')}
            </Button>
          )}
        >
          <div id="vitnode_captcha" />
        </AutoForm>
      </CardContent>

      <Form {...form} disableBeforeUnload>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign_up.form.name.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    {t('sign_up.form.name.desc')}
                  </FormDescription>
                  {field.value.length > 0 && (
                    <FormDescription>
                      {t.rich('sign_up.form.name.your_id', {
                        id: () => (
                          <span className="font-medium">
                            {removeSpecialCharacters(
                              field.value.trimStart().trimEnd(),
                            )}
                          </span>
                        ),
                      })}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => {
                const value = field.value;
                const regexArray = [
                  /^.{8,}$/, // Min 8 characters
                  /[a-z]/, // Min 1 lowercase
                  /[A-Z]/, // Min 1 uppercase
                  /\d/, // Min 1 digit
                  /\W|_/, // Min 1 special character
                ];

                const passRegexPassword = regexArray.reduce((acc, regex) => {
                  return acc + Number(regex.test(value));
                }, 0);

                return (
                  <FormItem>
                    <FormLabel>{t('sign_up.form.password.label')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    {(fieldState.invalid || value.length > 0) && (
                      <div className="mt-1">
                        <div className="mb-2 flex justify-between text-xs font-semibold">
                          <span>{t('week')}</span>
                          <span>{t('strong')}</span>
                        </div>
                        <Progress
                          value={(100 / regexArray.length) * passRegexPassword}
                        />
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </CardContent>
        </form>
      </Form>
    </>
  );
};
