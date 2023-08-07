import { useTranslations } from 'next-intl';
import Link from 'next-intl/link';

export default function Page() {
  const t = useTranslations('global');

  return (
    <div>
      <div>Home Page {t('test')}</div>
      <div>
        <Link href="/" locale="en">
          English
        </Link>
      </div>
      <div>
        <Link href="/" locale="pl">
          Polish
        </Link>
      </div>
    </div>
  );
}
