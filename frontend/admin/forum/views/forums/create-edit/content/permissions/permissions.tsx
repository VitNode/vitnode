import { useFormContext } from "react-hook-form";

import { FormField } from "@/components/ui/form";
import { ContentPermissionsContentCreateEditFormForumAdmin } from "./content";

export const PermissionsContentCreateEditFormForumAdmin = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="permissions"
      render={({ field }) => {
        return (
          <ContentPermissionsContentCreateEditFormForumAdmin
            permissions={[
              {
                id: "can_view",
                title: "View"
              },
              {
                id: "can_read",
                title: "Read"
              },
              {
                id: "can_create",
                title: "Create",
                disableForGuest: true
              },
              {
                id: "can_reply",
                title: "Reply",
                disableForGuest: true
              }
            ]}
            field={field}
          />
        );
      }}
    />
  );
};
