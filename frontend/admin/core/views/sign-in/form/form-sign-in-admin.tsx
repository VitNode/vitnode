"use client";

import { useTranslations } from "next-intl";
import { AlertCircle } from "lucide-react";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSignInAdminView } from "../hooks/use-sign-in-admin-view";

export const FormSignInAdmin = () => {
  const t = useTranslations("core");
  const { error, form, onSubmit } = useSignInAdminView();

  return (
    <Form {...form} disableBeforeUnload>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <div className="space-y-4">
            {error?.extensions?.code === "ACCESS_DENIED" && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>{t("sign_in.error.title")}</AlertTitle>
                <AlertDescription>{t("sign_in.error.desc")}</AlertDescription>
              </Alert>
            )}

            {error && error.extensions?.code !== "ACCESS_DENIED" && (
              <Alert variant="destructive">
                <AlertCircle className="size-4" />
                <AlertTitle>{t("errors.title")}</AlertTitle>
                <AlertDescription>
                  {t("errors.internal_server_error")}
                </AlertDescription>
              </Alert>
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("sign_in.form.email.label")}</FormLabel>
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
                  <FormLabel>{t("sign_in.form.password.label")}</FormLabel>
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
          <Button
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
          >
            {t("sign_in.form.submit")}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};
