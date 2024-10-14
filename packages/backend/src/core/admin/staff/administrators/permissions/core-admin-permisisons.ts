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
        {
          id: 'test',
          children: ['can_view_test', 'can_view_test_2', 'can_view_test_3'],
        },
      ],
    },
    {
      plugin: 'Test',
      plugin_code: 'test',
      permissions: [
        {
          id: 'staff',
          children: ['can_view_staff'],
        },
      ],
    },
  ];
