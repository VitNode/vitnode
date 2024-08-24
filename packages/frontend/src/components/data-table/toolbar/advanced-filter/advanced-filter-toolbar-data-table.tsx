import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

import { Button } from '../../../ui/button';
import { Loader } from '../../../ui/loader';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../../ui/sheet';

export const AdvancedFilterToolbarDataTable = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const t = useTranslations('core');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          ariaLabel={t('filters')}
          className="ml-auto"
          size="icon"
          variant="outline"
        >
          <Filter />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('filters')}</SheetTitle>
        </SheetHeader>

        <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
      </SheetContent>
    </Sheet>
  );
};
