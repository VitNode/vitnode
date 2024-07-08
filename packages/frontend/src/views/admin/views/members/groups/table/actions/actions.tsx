import { EditGroupsMembersDialogAdmin } from './edit';
import { DeleteGroupsMembersDialogAdmin } from './delete/delete';

import { ShowAdminGroups } from '@/graphql/graphql';

export const ActionsTableGroupsMembersAdmin = (props: ShowAdminGroups) => {
  return (
    <>
      <EditGroupsMembersDialogAdmin {...props} />
      {!props.protected && <DeleteGroupsMembersDialogAdmin {...props} />}
    </>
  );
};
