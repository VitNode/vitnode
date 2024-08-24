import { ShowAdminStaffModerators } from '@/graphql/types';

import { DeleteActionsTableModeratorsStaffAdmin } from './delete/delete';

export const ActionsTableModeratorsStaffAdmin = ({
  data,
}: {
  data: ShowAdminStaffModerators;
}) => {
  return <DeleteActionsTableModeratorsStaffAdmin data={data} />;
};
