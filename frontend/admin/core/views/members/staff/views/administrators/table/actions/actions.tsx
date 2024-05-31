import { ShowAdminStaffAdministrators } from "@/utils/graphql/hooks";
import { DeleteActionsTableAdministratorsStaffAdmin } from "./delete/delete";

interface Props {
  data: ShowAdminStaffAdministrators;
}

export const ActionsTableAdministratorsStaffAdmin = ({ data }: Props) => {
  return <DeleteActionsTableAdministratorsStaffAdmin data={data} />;
};
