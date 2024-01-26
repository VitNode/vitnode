import type { ShowAdminStaffModerators } from '@/graphql/hooks';
import { DeleteActionsTableModeratorsStaffAdmin } from './delete/delete';

interface Props {
  data: ShowAdminStaffModerators;
}

export const ActionsTableModeratorsStaffAdmin = ({ data }: Props) => {
  return (
    <div className="flex items-center justify-end">
      <DeleteActionsTableModeratorsStaffAdmin data={data} />
    </div>
  );
};
