import type { ShowAdminGroups } from '@/graphql/hooks';
import { EditGroupsMembersDialogAdmin } from './edit-groups-members-dialog-admin';
import { DeleteGroupsMembersDialogAdmin } from './delete/delete-groups-members-dialog-admin';

interface Props {
  data: Omit<ShowAdminGroups, 'default' | 'root'>;
}

export const ActionsTableGroupsMembersAdmin = ({ data }: Props) => {
  return (
    <div className="flex items-center justify-end">
      <EditGroupsMembersDialogAdmin data={data} />

      <DeleteGroupsMembersDialogAdmin data={data} />
    </div>
  );
};
