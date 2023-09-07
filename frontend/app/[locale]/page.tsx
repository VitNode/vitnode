import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('global');

  return <h1>{t('test')}</h1>;
}
