import { ShowAdminStaffModerators } from "@/graphql/hooks";
import { DeleteActionsTableModeratorsStaffAdmin } from "./delete/delete";

interface Props {
  data: ShowAdminStaffModerators;
}

export const ActionsTableModeratorsStaffAdmin = ({ data }: Props) => {
  return <DeleteActionsTableModeratorsStaffAdmin data={data} />;
};
