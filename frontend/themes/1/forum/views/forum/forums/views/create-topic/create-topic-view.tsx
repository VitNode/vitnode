"use client";

import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { Editor } from "@/components/editor/editor";
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
import { useCreateTopic } from "@/hooks/forums/forum/topics/create/use-create-topic";
import { useRouter } from "@/i18n";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { useTextLang } from "@/hooks/core/use-text-lang";
import type { Forum_Forums__Show_ItemQuery } from "@/graphql/hooks";

export interface CreateTopicViewProps {
  data: Forum_Forums__Show_ItemQuery;
}

export default function CreateTopicView({ data }: CreateTopicViewProps) {
  const t = useTranslations("forum.topics.create");
  const tCore = useTranslations("core");
  const { id } = useParams();
  const { back } = useRouter();
  const forumId = getIdFormString(id);
  const { form, onSubmit } = useCreateTopic({ forumId });
  const { convertText } = useTextLang();

  const breadcrumbsItems = data.forum_forums__show.edges[0].breadcrumbs.map(
    item => ({
      id: item.id,
      text: convertText(item.name),
      href: `/forum/${item.id}`
    })
  );

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />

      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("form.title")}</FormLabel>
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
                    <FormLabel>{t("form.content")}</FormLabel>
                    <FormControl>
                      <Editor
                        id="topic_create"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="justify-center">
              <Button onClick={back} variant="ghost">
                {tCore("prev_page")}
              </Button>

              <Button
                disabled={!form.formState.isValid}
                loading={form.formState.isSubmitting}
                type="submit"
              >
                {t("submit")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
