import { DateFormat } from '@/components/date-format';
import { ReadOnlyEditor } from '@/components/editor/read-only/read-only';
import { getTextLang } from '@/hooks/use-text-lang';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { getLegalData } from '../legal-view';

interface Props {
  params: { code: string; locale: string };
}

export const generateMetadataItemLegal = async ({
  params: { locale, code },
}: Props): Promise<Metadata> => {
  const {
    core_terms__show: { edges },
  } = await getLegalData({
    code,
  });

  if (edges.length !== 1) {
    return {};
  }

  const { title } = edges[0];

  const { convertText } = getTextLang({ locale });

  return {
    title: convertText(title),
  };
};

export const ItemLegalView = async ({ params: { locale, code } }: Props) => {
  const [
    t,
    {
      core_terms__show: { edges },
    },
  ] = await Promise.all([
    getTranslations('core.legal'),
    getLegalData({
      code,
    }),
  ]);

  if (edges.length !== 1) {
    return notFound();
  }

  const { convertText } = getTextLang({ locale });
  const { updated, title, content } = edges[0];

  return (
    <div className="container my-24 max-w-5xl space-y-24">
      <div className="grid justify-center">
        <div className="flex max-w-xl flex-col gap-6 text-center">
          <h1 className="text-3xl font-semibold">{convertText(title)}</h1>
          <p className="text-muted-foreground text-sm">
            {t.rich('last_updated', {
              date: () => <DateFormat date={updated} />,
            })}
          </p>
        </div>
      </div>

      <ReadOnlyEditor
        className="[&_p]:text-muted-foreground [&_strong]:text-foreground"
        value={content}
      />
    </div>
  );
};
