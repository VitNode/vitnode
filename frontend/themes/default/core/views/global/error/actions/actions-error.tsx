'use client';

import { useTranslations } from 'next-intl';

import { Button, buttonVariants } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link, useRouter } from '@/i18n';

export const ActionsError = () => {
  const t = useTranslations('core');
  const { back } = useRouter();

  return (
    <CardFooter className="flex-col justify-end">
      <Separator />
      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={back}>
          {t('errors.actions.back')}
        </Button>
        <Link href="/contact" className={buttonVariants()}>
          {t('errors.actions.contact')}
        </Link>
      </div>
    </CardFooter>
  );
};
