import type { ShowAdminStaffAdministrators } from "@/graphql/hooks";
import { DeleteActionsTableAdministratorsStaffAdmin } from "./delete/delete";

interface Props {
  data: ShowAdminStaffAdministrators;
}

export const ActionsTableAdministratorsStaffAdmin = ({ data }: Props) => {
  return (
    <div className="flex items-center justify-end">
      <DeleteActionsTableAdministratorsStaffAdmin data={data} />
    </div>
  );
};
