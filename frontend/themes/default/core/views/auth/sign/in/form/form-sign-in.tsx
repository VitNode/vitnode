'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';

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
import { useSignInView } from '@/hooks/core/sign/in/use-sign-in-view';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const FormSignIn = () => {
  const t = useTranslations('core');
  const { error, form, isPending, onSubmit } = useSignInView();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-4">
            {error?.extensions.code === 'ACCESS_DENIED' && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t('sign_in.error.title')}</AlertTitle>
                <AlertDescription>{t('sign_in.error.desc')}</AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign_in.form.email.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sign_in.form.password.label')}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>{t('sign_in.form.remember.label')}</FormLabel>
                    <FormDescription>{t('sign_in.form.remember.desc')}</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" loading={isPending}>
            {t('sign_in.form.submit')}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
