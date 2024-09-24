'use client';

import { Admin__Core_Email__LogsQuery } from '@/graphql/queries/admin/settings/email/admin__core_email__logs.generated';

import { ShowActionLogsEmailSettingsAdmin } from './show';

export const ActionsLogsEmailSettingsAdmin = (
  props: Admin__Core_Email__LogsQuery['admin__core_email__logs']['edges'][0],
) => {
  return (
    <>
      <ShowActionLogsEmailSettingsAdmin {...props} />
    </>
  );
};
