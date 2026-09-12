import { toast } from "sonner";
import { useTranslations } from "use-intl";
import { z } from "zod";

import type { AutoFormOnSubmit } from "@/components/form/auto-form";
import type { UserPersonalInformation } from "@/lib/user-personal-information";

import { AutoForm, AutoFormSubmitButton } from "@/components/form/auto-form";
import { AutoFormInput } from "@/components/form/fields/input";
import { AutoFormSwitch } from "@/components/form/fields/switch";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter, useDialog } from "@/components/ui/dialog";
import {
  USER_FIRST_NAME_MAX_LENGTH,
  USER_HEADLINE_MAX_LENGTH,
  USER_LAST_NAME_MAX_LENGTH,
} from "@/lib/user-personal-information";

import type { UpdatePersonalInformation } from "./personal-update";

export const PersonalFormContent = ({
  onUpdate,
  user,
}: {
  onUpdate: UpdatePersonalInformation;
  user: UserPersonalInformation;
}) => {
  const t = useTranslations("core.auth.settings.overview");
  const tGlobal = useTranslations("core.global");
  const tError = useTranslations("core.global.errors");
  const { setIsDirty, setOpen } = useDialog();

  const formSchema = z.object({
    firstName: z
      .string()
      .max(USER_FIRST_NAME_MAX_LENGTH)
      .default(user.firstName ?? ""),
    lastName: z
      .string()
      .max(USER_LAST_NAME_MAX_LENGTH)
      .default(user.lastName ?? ""),
    headline: z
      .string()
      .max(USER_HEADLINE_MAX_LENGTH)
      .default(user.headline ?? ""),
    showRealName: z.boolean().default(user.showRealName),
  });

  const onSubmit: AutoFormOnSubmit<typeof formSchema> = async values => {
    const result = await onUpdate(values);

    if (result.error) {
      toast.error(tError("title"), {
        description: tError("internal_server_error"),
      });

      return;
    }

    setIsDirty?.(false);
    setOpen?.(false);
    toast.success(t("saved"), { description: t("savedDesc") });
  };

  return (
    <AutoForm
      fields={[
        {
          component: props => (
            <AutoFormInput
              {...props}
              autoComplete="given-name"
              label={t("firstName")}
            />
          ),
          id: "firstName",
        },
        {
          component: props => (
            <AutoFormInput
              {...props}
              autoComplete="family-name"
              label={t("lastName")}
            />
          ),
          id: "lastName",
        },
        {
          component: props => (
            <AutoFormInput
              {...props}
              description={t("headlineDesc", { max: USER_HEADLINE_MAX_LENGTH })}
              label={t("headline")}
            />
          ),
          id: "headline",
        },
        {
          component: props => (
            <AutoFormSwitch
              {...props}
              description={t("showRealNameDesc")}
              label={t("showRealName")}
            />
          ),
          id: "showRealName",
        },
      ]}
      formSchema={formSchema}
      layout={rendered => (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {rendered.firstName}
            {rendered.lastName}
          </div>

          {rendered.headline}

          {rendered.showRealName}

          <DialogFooter>
            <DialogClose
              render={<Button variant="ghost">{tGlobal("cancel")}</Button>}
            />
            <AutoFormSubmitButton>{t("save")}</AutoFormSubmitButton>
          </DialogFooter>
        </>
      )}
      onSubmit={onSubmit}
    />
  );
};
