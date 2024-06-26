import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { zodInput } from "vitnode-frontend/helpers/zod";
import { useDialog } from "vitnode-frontend/components/ui/dialog";
import { ErrorType } from "vitnode-frontend/graphql/fetcher";

import { mutationApi } from "./mutation-api";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";

export const useFormCreateEditFormGroupsMembersAdmin = () => {
  const t = useTranslations("admin.members.staff");
  const tCore = useTranslations("core");
  const { convertText } = useTextLang();
  const { setOpen } = useDialog();

  const formSchema = z.object({
    type: z.enum(["group", "user"]),
    user: z
      .object({
        id: z.number(),
        name: zodInput.string,
      })
      .optional(),
    group: z
      .object({
        id: z.number(),
        name: zodInput.languageInput,
      })
      .optional(),
    unrestricted: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "group",
      unrestricted: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);

    const mutation = await mutationApi({
      groupId: values.type === "group" ? values.group?.id : undefined,
      userId: values.type === "user" ? values.user?.id : undefined,
      unrestricted: values.unrestricted,
    });

    if (mutation.error) {
      const error = mutation.error as ErrorType | undefined;
      if (error?.extensions && error.extensions?.code === "ALREADY_EXISTS") {
        form.setError(values.type === "user" ? "user" : "group", {
          type: "manual",
          message: t("already_exists"),
        });

        return;
      }

      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error"),
      });

      return;
    }

    setOpen?.(false);
    toast.success(t("moderators.add.success"), {
      description:
        values.type === "group"
          ? convertText(values.group?.name)
          : values.user?.name,
    });
  };

  return {
    form,
    onSubmit,
  };
};
