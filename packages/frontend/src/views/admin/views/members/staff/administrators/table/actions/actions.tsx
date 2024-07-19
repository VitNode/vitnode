import { DeleteActionsTableAdministratorsStaffAdmin } from './delete/delete';
import { ShowAdminStaffAdministrators } from '@/graphql/graphql';

export const ActionsTableAdministratorsStaffAdmin = ({
  data,
}: {
  data: ShowAdminStaffAdministrators;
}) => {
  return <DeleteActionsTableAdministratorsStaffAdmin data={data} />;
};
