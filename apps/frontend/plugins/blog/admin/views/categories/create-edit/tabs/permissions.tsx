import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { PermissionsTable } from "@/components/permissions-table/permissions-table";
import { FormField } from "@/components/ui/form";

export const PermissionsTabCreateEditCategoryBlogAdmin = () => {
  const t = useTranslations("blog.admin.categories");
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="permissions"
        render={({ field }) => {
          return (
            <PermissionsTable
              permissions={[
                {
                  id: "read",
                  title: "Read",
                },
                {
                  id: "create",
                  title: "Create",
                  disableForGuest: true,
                },
                {
                  id: "reply",
                  title: "Reply",
                  disableForGuest: true,
                },
                {
                  id: "download_files",
                  title: "Download Files",
                },
              ]}
              field={field}
            />
          );
        }}
      />
    </>
  );
};
