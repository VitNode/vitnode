import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { HeaderContent } from "@/components/header-content/header-content";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const FilesSectionContentEditorAdmin = () => {
  const t = useTranslations("admin.core.styles.editor");
  const form = useFormContext();

  return (
    <div>
      <HeaderContent h2={"Files"} className="m-0" />

      <FormField
        control={form.control}
        name="files.allow_type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("files.allow_type.title")}</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="all" id="files.allow_type.all" />
                <Label htmlFor="files.allow_type.all">
                  {t("files.allow_type.all")}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem
                  value="images_videos"
                  id="files.allow_type.images_videos"
                />
                <Label htmlFor="files.allow_type.images_videos">
                  {t("files.allow_type.images_videos")}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="images" id="files.allow_type.images" />
                <Label htmlFor="files.allow_type.images">
                  {t("files.allow_type.images")}
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="none" id="files.allow_type.none" />
                <Label htmlFor="files.allow_type.none">
                  {t("files.allow_type.none")}
                </Label>
              </div>
            </RadioGroup>
          </FormItem>
        )}
      />
    </div>
  );
};
