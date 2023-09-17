'use client';

import { useTranslations } from 'next-intl';

import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useSignUpView } from '@/hooks/core/sign/use-sign-up-view';
import { Checkbox } from '@/components/ui/checkbox';

export const FormSignUp = () => {
  const t = useTranslations('core');
  const { form, onSubmit } = useSignUpView();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.nickname.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>{t('sign-up.form.nickname.desc')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.email.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.birthday.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormDescription>{t('sign-up.form.birthday.desc')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.password.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign-up.form.password_confirmation.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t('sign-up.form.terms.label')}</FormLabel>
                    <FormDescription>{t('sign-up.form.terms.desc')}</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newsletter"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t('sign-up.form.newsletter.label')}</FormLabel>
                    <FormDescription>{t('sign-up.form.newsletter.desc')}</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">{t('sign-up.form.submit')}</Button>
        </CardFooter>
      </form>
    </Form>
  );
};
