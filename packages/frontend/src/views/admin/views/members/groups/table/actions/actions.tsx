import { EditGroupsMembersDialogAdmin } from './edit';
import { DeleteGroupsMembersDialogAdmin } from './delete/delete';

import { ShowAdminGroups } from '../../../../../../../graphql/code';

export const ActionsTableGroupsMembersAdmin = (props: ShowAdminGroups) => {
  return (
    <>
      <EditGroupsMembersDialogAdmin {...props} />
      {!props.protected && <DeleteGroupsMembersDialogAdmin {...props} />}
    </>
  );
};
