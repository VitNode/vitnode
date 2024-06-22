import * as z from "zod";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditorState } from "@/components/editor/hooks/use-editor-state";

interface Props {
  setOpen: (open: boolean) => void;
}

export const ContentLinkToolbarEditor = ({ setOpen }: Props) => {
  const t = useTranslations("core.editor.link");
  const { editor } = useEditorState();
  const tCore = useTranslations("core");
  const formSchema = z.object({
    text: z.string().min(1, { message: tCore("errors.required") }),
    href: z.string().min(1, { message: tCore("errors.required") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text:
        editor.state.doc.textBetween(
          editor.view.state.selection.from,
          editor.view.state.selection.to,
          "",
        ) ?? "",
      href: editor.getAttributes("link").href ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    editor
      .chain()

      .extendMarkRange("link")
      .command(({ dispatch, tr }) => {
        if (!dispatch) return true;

        const { from, to } = tr.selection;
        const displayText = values.text || values.href || "";

        tr.insertText(displayText, from, to);
        tr.addMark(
          from,
          from + displayText.length,
          editor.schema.marks.link.create({ href: values.href }),
        );

        return true;
      })
      .run();

    setOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={t("text")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="href"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="url" placeholder={t("href")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2 [&>button]:flex-1 [&>button]:shrink-0">
          <Button
            onClick={() => {
              editor.chain().unsetLink().run();
              setOpen(false);
            }}
            variant="destructiveGhost"
            size="sm"
            disabled={!editor.isActive("link")}
          >
            {t("delete")}
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            loading={form.formState.isSubmitting}
            disabled={!form.formState.isValid}
            size="sm"
          >
            {t("insert")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
