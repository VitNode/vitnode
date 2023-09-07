import { useTranslations } from 'next-intl';

import { ModeToggle } from '@/components/modeToggle/mode-toggle';

export default function Page() {
  const t = useTranslations('global');

  return (
    <h1>
      {t('test')} <ModeToggle />
    </h1>
  );
}
