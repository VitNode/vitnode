import { DeleteActionsTableModeratorsStaffAdmin } from './delete/delete';

import { ShowAdminStaffModerators } from '../../../../../../../../graphql/code';

interface Props {
  data: ShowAdminStaffModerators;
}

export const ActionsTableModeratorsStaffAdmin = ({ data }: Props) => {
  return <DeleteActionsTableModeratorsStaffAdmin data={data} />;
};
