import { revalidateTag } from "next/cache";

export enum AdminCoreApiTags {
  Admin__Core_Plugins__Show__Item = "Admin__Core_Plugins__Show__Item",
  Admin__Core_Plugins__Show = "Admin__Core_Plugins__Show"
}

export enum CoreApiTags {
  Core_Sessions__Authorization = "Core_Sessions__Authorization"
}

export const cleanAdminCorePluginsCache = () => {
  revalidateTag(AdminCoreApiTags.Admin__Core_Plugins__Show__Item);
  revalidateTag(AdminCoreApiTags.Admin__Core_Plugins__Show);
  revalidateTag(CoreApiTags.Core_Sessions__Authorization);
};
