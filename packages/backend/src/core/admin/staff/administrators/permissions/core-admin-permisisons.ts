import { ShowAdminStaffAdministratorsObj } from '../show/show.dto';

export const coreAdminPermissions: ShowAdminStaffAdministratorsObj['permissions'] =
  [
    {
      plugin: 'Core',
      plugin_code: 'core',
      permissions: [
        {
          id: 'dashboard',
          children: ['can_manage_diagnostic_tools'],
        },
        {
          id: 'settings',
          children: [
            'can_manage_settings_main',
            'can_manage_settings_security',
            'can_manage_settings_metadata',
            'can_manage_settings_email',
            'can_manage_settings_authorization',
            'can_manage_settings_legal',
            'can_manage_settings_ai',
          ],
        },
      ],
    },
    {
      plugin: 'Members',
      plugin_code: 'members',
      permissions: [
        {
          id: 'staff',
          children: ['can_view_staff'],
        },
      ],
    },
  ];
