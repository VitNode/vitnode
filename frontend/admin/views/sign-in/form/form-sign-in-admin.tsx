'use client';

import { useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';

import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useSignInAdminView } from '../hooks/use-sign-in-admin-view';

export const FormSignInAdmin = () => {
  const t = useTranslations('core');
  const { error, form, isPending, onSubmit } = useSignInAdminView();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-4">
            {error === 'ACCESS_DENIED' && (
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
