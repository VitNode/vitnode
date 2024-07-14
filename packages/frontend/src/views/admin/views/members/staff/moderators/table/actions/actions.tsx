import { DeleteActionsTableModeratorsStaffAdmin } from './delete/delete';
import { ShowAdminStaffModerators } from '@/graphql/graphql';

export const ActionsTableModeratorsStaffAdmin = ({
  data,
}: {
  data: ShowAdminStaffModerators;
}) => {
  return <DeleteActionsTableModeratorsStaffAdmin data={data} />;
};
