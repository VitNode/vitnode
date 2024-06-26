import { ShowAdminGroups } from '@/graphql/hooks';
import { EditGroupsMembersDialogAdmin } from './edit';
import { DeleteGroupsMembersDialogAdmin } from './delete/delete';

export const ActionsTableGroupsMembersAdmin = (props: ShowAdminGroups) => {
  return (
    <>
      <EditGroupsMembersDialogAdmin data={props} />
      {!props.protected && <DeleteGroupsMembersDialogAdmin {...props} />}
    </>
  );
};
