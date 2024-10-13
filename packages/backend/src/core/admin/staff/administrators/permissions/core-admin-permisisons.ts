import { ShowAdminStaffAdministratorsObj } from '../show/show.dto';

export const coreAdminPermissions: ShowAdminStaffAdministratorsObj['permissions'] =
  [
    {
      plugin: 'Core',
      plugin_code: 'core',
      permissions: [
        {
          id: 'staff',
          children: ['can_view_staff'],
        },
      ],
    },
  ];
