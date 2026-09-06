import { useTranslations } from "use-intl";
import z from "zod";

import { AutoForm } from "@/components/form/auto-form";
import { AutoFormInput } from "@/components/form/fields/input";
import { useDialog } from "@/components/ui/dialog";

import { useToolbarEditor } from "../../use-toolbar-editor";

export const AudioForm = () => {
  const t = useTranslations("core.global.editor.audio");
  const { editor } = useToolbarEditor();
  const { setOpen } = useDialog();
  const formSchema = z.object({
    src: z.url(),
  });

  return (
    <AutoForm
      fields={[
        {
          id: "src",
          component: props => (
            <AutoFormInput
              label={t("src.label")}
              placeholder="https://example.com/audio.mp3"
              type="url"
              {...props}
            />
          ),
        },
      ]}
      formSchema={formSchema}
      mode="all"
      onSubmit={({ src }) => {
        editor.chain().focus().setAudio({ src }).run();
        setOpen?.(false);
      }}
      submitButtonProps={{ children: t("submit") }}
    />
  );
};
