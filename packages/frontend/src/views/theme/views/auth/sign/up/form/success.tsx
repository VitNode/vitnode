import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/navigation';
import { Mailbox } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const SuccessFormSignUp = ({ name }: { name: string }) => {
  const t = useTranslations('core.sign_up.form.success');

  return (
    <div className="mx-16 flex flex-col items-center justify-center p-5 pt-0 text-center">
      <Mailbox className="size-20" />
      <span className="text-xl font-semibold">
        {t.rich('title', {
          name: () => <span className="text-primary">{name}</span>,
        })}
      </span>
      <p className="text-muted-foreground mb-4 mt-2">{t('desc')}</p>

      <Link
        className={buttonVariants({
          className: 'px-10',
        })}
        href="/login"
      >
        {t('sign_in')}
      </Link>
    </div>
  );
};
