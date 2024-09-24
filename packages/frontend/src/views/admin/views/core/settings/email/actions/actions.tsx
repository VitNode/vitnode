import { Link } from '@/navigation';
import { TestingActionEmailSettingsAdmin } from './testing/testing';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { MailWarningIcon } from 'lucide-react';

export const ActionsEmailSettingsAdmin = ({
  disabled,
}: {
  disabled: boolean;
}) => {
  const t = useTranslations('admin.core.settings.email.logs');

  return (
    <>
      <Button asChild variant="ghost">
        <Link href="/admin/core/settings/email/logs">
          <MailWarningIcon />
          {t('title')}
        </Link>
      </Button>
      <TestingActionEmailSettingsAdmin disabled={disabled} />
    </>
  );
};
