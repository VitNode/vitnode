import { AutoForm, DependencyType } from '@/components/form/auto-form';
import { AutoFormCombobox } from '@/components/form/fields/combobox';
import { AutoFormRadioGroup } from '@/components/form/fields/radio-group';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { AvatarUser } from '@/components/ui/user/avatar';
import { GroupFormat } from '@/components/ui/user/group-format';
import { getGroupsShortApi } from '@/graphql/get-groups-short-api';
import { getUsersShortApi } from '@/graphql/get-users-short-api';
import { Admin__Core_Staff_Administrators__ShowQuery } from '@/graphql/queries/admin/members/staff/admin__core_staff_administrators__show.generated';
import { useTranslations } from 'next-intl';

import { PermissionsField } from '../../permissions-field';
import { useFormCreateEditFormGroupsMembersAdmin } from './hooks/use-form';

export const CreateEditFormAdministratorsStaffAdmin = ({
  permissions,
  data,
}: {
  data?: Admin__Core_Staff_Administrators__ShowQuery['admin__core_staff_administrators__show']['edges'][0];
  permissions: Admin__Core_Staff_Administrators__ShowQuery['admin__core_staff_administrators__show']['permissions'];
}) => {
  const t = useTranslations('admin.members.staff.shared');
  const { onSubmit, formSchema } = useFormCreateEditFormGroupsMembersAdmin({
    data,
  });

  return (
    <>
      <AutoForm
        dependencies={[
          {
            sourceField: 'type',
            type: DependencyType.HIDES,
            targetField: 'type',
            when: () => !!data,
          },
          {
            sourceField: 'type',
            type: DependencyType.HIDES,
            targetField: 'group',
            when: (provider: 'group' | 'user') =>
              provider !== 'group' || !!data,
          },
          {
            sourceField: 'type',
            type: DependencyType.HIDES,
            targetField: 'user',
            when: (provider: 'group' | 'user') => provider !== 'user' || !!data,
          },
          {
            sourceField: 'unrestricted',
            type: DependencyType.HIDES,
            targetField: 'permissions',
            when: (unrestricted: boolean) => unrestricted,
          },
          {
            sourceField: 'type',
            type: DependencyType.REQUIRES,
            targetField: 'user',
            when: (provider: 'group' | 'user') => provider === 'user',
          },
          {
            sourceField: 'type',
            type: DependencyType.REQUIRES,
            targetField: 'group',
            when: (provider: 'group' | 'user') => provider === 'group',
          },
        ]}
        fields={[
          {
            id: 'type',
            label: t('type'),
            component: props => (
              <AutoFormRadioGroup
                {...props}
                hideOptionalLabel
                labels={{
                  group: {
                    title: t('group'),
                  },
                  user: {
                    title: t('user'),
                  },
                }}
              />
            ),
          },
          {
            id: 'group',
            label: t('group'),
            component: props => (
              <AutoFormCombobox
                {...props}
                withFetcher={{
                  queryKey: 'Admin__Core_Groups__Show_Short',
                  search: true,
                  queryFn: async ({ search }) => {
                    const mutation = await getGroupsShortApi({ search });

                    return (mutation.data?.admin__core_groups__show.edges ?? [])
                      .filter(item => !item.guest)
                      .map(item => ({
                        key: item.id.toString(),
                        value: item.name,
                        valueWithFormatting: <GroupFormat group={item} />,
                      }));
                  },
                }}
              />
            ),
          },
          {
            id: 'user',
            label: t('user'),
            component: props => (
              <AutoFormCombobox
                {...props}
                withFetcher={{
                  queryKey: 'Core_Members__Show__Search',
                  search: true,
                  queryFn: async ({ search }) => {
                    const mutation = await getUsersShortApi({ search });

                    return (mutation.data?.core_members__show.edges ?? []).map(
                      item => ({
                        key: item.id.toString(),
                        value: item.name,
                        valueWithFormatting: (
                          <>
                            <AvatarUser sizeInRem={1.75} user={item} />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <GroupFormat
                                className="text-xs"
                                group={item.group}
                              />
                            </div>
                          </>
                        ),
                      }),
                    );
                  },
                }}
              />
            ),
          },
          {
            id: 'unrestricted',
            component: AutoFormSwitch,
            label: t('unrestricted.title'),
            description: t('unrestricted.desc'),
          },
          {
            id: 'permissions',
            component: props => (
              <PermissionsField {...props} permissions={permissions} />
            ),
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
      />
    </>
  );
};
