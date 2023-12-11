import { useFormContext } from 'react-hook-form';

import { FormField } from '@/components/ui/form';
import { ContentPermissionsContentCreateEditFormForumAdmin } from './content';

export const PermissionsContentCreateEditFormForumAdmin = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="permissions"
      render={({ field }) => {
        return (
          <ContentPermissionsContentCreateEditFormForumAdmin
            permissions={[
              {
                id: 'view',
                title: 'View'
              },
              {
                id: 'read',
                title: 'Read'
              },
              {
                id: 'create',
                title: 'Create',
                disableForGuest: true
              },
              {
                id: 'reply',
                title: 'Reply',
                disableForGuest: true
              }
            ]}
            field={field}
          />
        );
      }}
    />
  );
};
