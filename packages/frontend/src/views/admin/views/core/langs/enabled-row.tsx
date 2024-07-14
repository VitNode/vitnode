import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';
import React from 'react';

import { editMutationApi } from './create-edit/hooks/edit-mutation-api';
import { ShowCoreLanguages } from '@/graphql/graphql';
import { Switch } from '@/components/ui/switch';

export const EnabledRowTableLangsCoreAdmin = ({
  data,
}: {
  data: ShowCoreLanguages;
}) => {
  const locale = useLocale();
  const t = useTranslations('core');
  const [checked, changeChecked] = React.useOptimistic(data.enabled);

  return (
    <Switch
      disabled={data.default || data.protected || data.code === locale}
      checked={checked}
      onClick={async () => {
        changeChecked(!checked);

        try {
          await editMutationApi({
            ...data,
            enabled: !data.enabled,
            time24: data.time_24,
            allowInInput: data.allow_in_input,
          });
        } catch (error) {
          toast.error(t('errors.title'), {
            description: t('errors.internal_server_error'),
          });
          changeChecked(!checked);
        }
      }}
    />
  );
};
