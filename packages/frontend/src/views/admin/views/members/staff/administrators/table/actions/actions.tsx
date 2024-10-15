import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';

import { DeleteActionsTableAdministratorsStaffAdmin } from './delete/delete';
import { EditActionTableAdministratorsStaffAdmin } from './edit';

export const ActionsTableAdministratorsStaffAdmin = ({
  data,
  permissions,
}: {
  data: Admin__Core_Staff_Administrators__ShowQuery['admin__core_staff_administrators__show']['edges'][0];
  permissions: Admin__Core_Staff_Administrators__ShowQuery['admin__core_staff_administrators__show']['permissions'];
}) => {
  return (
    <>
      <EditActionTableAdministratorsStaffAdmin
        data={data}
        permissions={permissions}
      />
      <DeleteActionsTableAdministratorsStaffAdmin data={data} />
    </>
  );
};
