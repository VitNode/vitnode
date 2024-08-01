import { ShowAdminStaffAdministrators } from '@/graphql/types';
import { DeleteActionsTableAdministratorsStaffAdmin } from './delete/delete';

export const ActionsTableAdministratorsStaffAdmin = ({
  data,
}: {
  data: ShowAdminStaffAdministrators;
}) => {
  return <DeleteActionsTableAdministratorsStaffAdmin data={data} />;
};
