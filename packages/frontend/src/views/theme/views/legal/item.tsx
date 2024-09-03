import { DateFormat } from '@/components/date-format';
import { Button } from '@/components/ui/button';
import { Core_Terms__ShowQuery } from '@/graphql/queries/terms/core_terms__show.generated';
import { useTextLang } from '@/hooks/use-text-lang';
import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export const ItemLegal = ({
  id,
  title,
  updated,
}: Core_Terms__ShowQuery['core_terms__show']['edges'][0]) => {
  const { convertText } = useTextLang();
  const t = useTranslations('core.legal');

  return (
    <li className="flex items-center justify-between gap-4">
      <div className="space-y-2">
        <span className="text-xl font-semibold">{convertText(title)}</span>
        <p className="text-muted-foreground text-sm">
          {t.rich('last_updated', {
            date: () => <DateFormat date={updated} />,
          })}
        </p>
      </div>

      <Button asChild className="bg-card rounded-full" variant="outline">
        <Link href={`/legal/${id}`}>{t('read_document')}</Link>
      </Button>
    </li>
  );
};
