import { ShowAdminGroups } from '@/graphql/types';

import { DeleteGroupsMembersDialogAdmin } from './delete/delete';
import { EditGroupsMembersDialogAdmin } from './edit';

export const ActionsTableGroupsMembersAdmin = (props: ShowAdminGroups) => {
  return (
    <>
      <EditGroupsMembersDialogAdmin {...props} />
      {!props.protected && <DeleteGroupsMembersDialogAdmin {...props} />}
    </>
  );
};
