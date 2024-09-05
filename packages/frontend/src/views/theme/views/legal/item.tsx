import { DateFormat } from '@/components/date-format';
import { Button } from '@/components/ui/button';
import { Admin_Core_Terms__ShowQuery } from '@/graphql/queries/admin/settings/terms/Admin_core_terms__show.generated';
import { useTextLang } from '@/hooks/use-text-lang';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export const ItemLegal = ({
  code,
  title,
  updated,
}: Admin_Core_Terms__ShowQuery['core_terms__show']['edges'][0]) => {
  const { convertText } = useTextLang();
  const t = useTranslations('core.legal');

  return (
    <Button
      asChild
      className="bg-card hover:bg-muted flex h-auto cursor-pointer items-center justify-between gap-4 p-6"
      variant="outline"
    >
      <Link href={`/legal/${code}`}>
        <div className="space-y-2">
          <span className="text-xl font-semibold">{convertText(title)}</span>
          <p className="text-muted-foreground text-sm">
            {t.rich('last_updated', {
              date: () => <DateFormat date={updated} />,
            })}
          </p>
        </div>

        <Button className="rounded-full" variant="outline">
          {t('read_document')}
        </Button>
      </Link>
    </Button>
  );
};
