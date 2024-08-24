import { cn } from '@/helpers/classnames';

import { getSessionData } from '../../../graphql/get-session-data';
import { getTextLang } from '../../../hooks/use-text-lang';

export const Footer = async ({
  locale,
  className,
}: {
  className?: string;
  locale: string;
}) => {
  const { convertText } = getTextLang({ locale });
  const {
    core_settings__show: { site_copyright },
  } = await getSessionData();

  if (!site_copyright.length) return null;

  return (
    <footer
      className={cn(
        'mb-16 flex flex-col items-center justify-center gap-2 p-5 text-center text-sm md:mb-0',
        className,
      )}
    >
      <span>{convertText(site_copyright)}</span>
    </footer>
  );
};
