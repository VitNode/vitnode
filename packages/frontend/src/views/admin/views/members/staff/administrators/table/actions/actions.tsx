import { DeleteActionsTableAdministratorsStaffAdmin } from './delete/delete';
import { ShowAdminStaffAdministrators } from '@/graphql/graphql';

interface Props {
  data: ShowAdminStaffAdministrators;
}

export const ActionsTableAdministratorsStaffAdmin = ({ data }: Props) => {
  return <DeleteActionsTableAdministratorsStaffAdmin data={data} />;
};
