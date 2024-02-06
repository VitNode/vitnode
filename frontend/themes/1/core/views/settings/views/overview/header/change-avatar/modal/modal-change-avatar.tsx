import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { FilesInput } from "@/components/ui/files/files-input";
import { Loader } from "@/components/loader/loader";
import { useModalChangeAvatar } from "@/hooks/core/settings/avatar/use-modal-change-avatar";
import { useSession } from "@/hooks/core/use-session";

const CropperModalChangeAvatar = lazy(() =>
  import("./cropper/cropper-modal-change-avatar").then(module => ({
    default: module.CropperModalChangeAvatar
  }))
);

export const ModalChangeAvatar = () => {
  const t = useTranslations("core");
  const { session } = useSession();
  const { form, onSubmit } = useModalChangeAvatar();
  if (!session) return null;
  const { avatar } = session;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("settings.change_avatar.title")}</DialogTitle>
        <DialogDescription>
          {t("settings.change_avatar.desc")}
        </DialogDescription>
      </DialogHeader>

      {form.watch("type") === "upload" && form.watch("file").length > 0 ? (
        <Suspense fallback={<Loader />}>
          <CropperModalChangeAvatar file={form.watch("file")[0]} />
        </Suspense>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {avatar && (
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upload" id="r1" />
                        <Label htmlFor="r1">
                          {t("settings.change_avatar.options.upload.title")}
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delete" id="r2" />
                        <Label htmlFor="r2">
                          {t("settings.change_avatar.options.delete.title")}
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              )}

              {form.watch("type") === "upload" && (
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FilesInput
                      id="picture"
                      {...field}
                      acceptExtensions={["png", "jpg", "jpeg"]}
                      maxFileSizeInMb={3}
                    />
                  )}
                />
              )}
            </form>

            <DialogFooter>
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={
                  form.watch("type") === "upload" &&
                  form.watch("file").length === 0
                }
              >
                {t("settings.change_avatar.submit")}
              </Button>
            </DialogFooter>
          </Form>
        </>
      )}
    </>
  );
};
