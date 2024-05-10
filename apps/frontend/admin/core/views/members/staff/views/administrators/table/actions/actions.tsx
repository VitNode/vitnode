import type { ShowAdminStaffAdministrators } from "@/graphql/hooks";
import { DeleteActionsTableAdministratorsStaffAdmin } from "./delete/delete";

interface Props {
  data: ShowAdminStaffAdministrators;
}

export const ActionsTableAdministratorsStaffAdmin = ({ data }: Props) => {
  return <DeleteActionsTableAdministratorsStaffAdmin data={data} />;
};
