import type { ShowCoreLanguages } from "@/graphql/hooks";
import { EditActionsTableLangsCoreAdmin } from "./edit";
import { DeleteActionsTableLangsCoreAdmin } from "./delete/delete";

export const ActionsTableLangsCoreAdmin = (data: ShowCoreLanguages) => {
  return (
    <div className="flex items-center justify-end">
      <EditActionsTableLangsCoreAdmin {...data} />
      {!data.default && !data.protected && (
        <DeleteActionsTableLangsCoreAdmin {...data} />
      )}
    </div>
  );
};
