import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

import { ContentDevicesSettings } from './content';

import {
  Core_Sessions__Devices__Show,
  Core_Sessions__Devices__ShowQuery,
  Core_Sessions__Devices__ShowQueryVariables,
} from '../../../../../../graphql/graphql';
import {
  CardContent,
  CardDescription,
  CardHeader,
} from '../../../../../../components/ui/card';
import { fetcher } from '../../../../../../graphql/fetcher';

const getData = async () => {
  const { data } = await fetcher<
    Core_Sessions__Devices__ShowQuery,
    Core_Sessions__Devices__ShowQueryVariables
  >({
    query: Core_Sessions__Devices__Show,
  });

  return data;
};

export const DevicesSettingsView = async () => {
  const t = await getTranslations('core.settings.devices');
  const data = await getData();
  const cookieStore = cookies();
  const loginToken = cookieStore.get('vitnode-login-token')?.value;

  if (!loginToken) {
    return null;
  }

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t('title')}
        </h1>
        <CardDescription>{t('desc')}</CardDescription>
      </CardHeader>

      <CardContent>
        <ContentDevicesSettings {...data} loginToken={loginToken} />
      </CardContent>
    </>
  );
};
