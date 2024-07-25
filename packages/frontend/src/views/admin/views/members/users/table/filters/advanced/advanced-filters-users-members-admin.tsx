import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { convertDateToUnixTime } from 'vitnode-shared';

import { usePathname, useRouter } from '@/navigation';
import { Form } from '@/components/ui/form';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export const AdvancedFiltersUsersMembersAdmin = () => {
  const tCore = useTranslations('core');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const formSchema = z.object({
    date: z
      .object({
        from: z.date(),
        to: z.date(),
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // TODO: Add more flexible search params for advanced filters
    const params = new URLSearchParams(searchParams);

    if (data.date?.from) {
      params.set(
        'dateFrom',
        `${convertDateToUnixTime(data.date.from.toDateString())}`,
      );
    }

    if (data.date?.to) {
      params.set(
        'dateTo',
        `${convertDateToUnixTime(data.date.to.toDateString())}`,
      );
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6">
        {/* <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('table.joined')}</FormLabel>
              <CalendarPicker
                selected={field.value}
                onSelect={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <SheetFooter>
          <SheetClose asChild>
            <Button className="w-full" type="submit">
              {tCore('search')}
            </Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
};
