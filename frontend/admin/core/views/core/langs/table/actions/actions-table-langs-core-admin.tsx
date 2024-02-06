import type { ShowCoreLanguages } from "@/graphql/hooks";
import { EditActionsTableLangsCoreAdmin } from "./edit/edit-actions-table-langs-core-admin";

export const ActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  return (
    <div className="flex items-center justify-end">
      <EditActionsTableLangsCoreAdmin {...data} />
    </div>
  );
};
