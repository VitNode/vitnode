import { Filter } from 'lucide-react';
import { ReactNode, Suspense } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '../../../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../../../ui/sheet';
import { Loader } from '../../../loader/loader';

interface Props {
  children: ReactNode;
}

export const AdvancedFilterToolbarDataTable = ({ children }: Props) => {
  const t = useTranslations('core');

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="ml-auto" variant="outline" size="icon">
          <Filter />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('filters')}</SheetTitle>
        </SheetHeader>

        <Suspense fallback={<Loader />}>{children}</Suspense>
      </SheetContent>
    </Sheet>
  );
};
