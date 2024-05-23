"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { TextLanguageInput } from "@/components/text-language-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { getIdFormString } from "@/functions/url";
import { useRouter } from "@/utils/i18n";
import type { ShowTopicsForums } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import { useCreateEditTopic } from "@/hooks/forum/topics/create-edit/use-create-edit-topic";
import { Editor } from "@/components/editor/editor";

export interface EditTopicData
  extends Pick<ShowTopicsForums, "content" | "id" | "title"> {}

interface Props {
  data?: EditTopicData;
}

export const CreateEditTopic = ({ data }: Props) => {
  const t = useTranslations("forum.topics");
  const tCore = useTranslations("core");
  const { id } = useParams();
  const { back, push } = useRouter();
  const forumId = getIdFormString(id);
  const { form, onSubmit } = useCreateEditTopic({ forumId, data });
  const { convertNameToLink, convertText } = useTextLang();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {data
            ? t("edit.title", {
                title: convertText(data.title)
              })
            : t("create.title")}
        </CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("create.form.title")}</FormLabel>
                  <FormControl>
                    <TextLanguageInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("create.form.content")}</FormLabel>
                  <FormControl>
                    <Editor
                      onChange={field.onChange}
                      value={field.value}
                      allowUploadFiles={{
                        plugin: "forum",
                        folder: "posts"
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="justify-center">
            <Button
              onClick={() => {
                if (data) {
                  push(
                    `/forum/topic/${convertNameToLink({ id: data.id, name: data.title })}`
                  );

                  return;
                }

                back();
              }}
              variant="ghost"
            >
              {tCore("prev_page")}
            </Button>

            <Button
              disabled={!form.formState.isValid}
              loading={form.formState.isSubmitting}
              type="submit"
            >
              {t(data ? "edit.submit" : "create.submit")}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
