import { useTranslations } from 'next-intl';

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const InstallConfigsView = () => {
  const t = useTranslations('admin.configs.install');

  return (
    <>
      <CardHeader>
        <CardDescription>{t('title', { name: 'VitNode' })}</CardDescription>
        <CardTitle>{t('steps.step_1.title')}</CardTitle>
      </CardHeader>

      <CardContent>
        <div>{t('steps.step_1.text', { name: 'VitNode' })}</div>
      </CardContent>
    </>
  );
};
