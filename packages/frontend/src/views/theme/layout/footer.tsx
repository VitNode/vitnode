import { getSessionData } from '../../../graphql/get-session-data';
import { getTextLang } from '../../../hooks/use-text-lang';
import { PoweredByVitNode } from '../../global';

interface Props {
  locale: string;
}

export const Footer = async ({ locale }: Props) => {
  const { convertText } = getTextLang({ locale });
  const {
    core_settings__show: { site_copyright },
  } = await getSessionData();

  return (
    <footer className="mb-16 flex flex-col items-center justify-center gap-2 p-5 text-center text-sm md:mb-0">
      {site_copyright.length && <span>{convertText(site_copyright)}</span>}
      {/* /**
       * Thanks for using VitNode!
       *
       * ! This is an open source project, you can use it for free.
       * ! If you want to support us, please consider donating.
       * ! You can remove this component if you want, but we will be very grateful if you leave it.
       * ! Thank you for your support!
       */}
      <PoweredByVitNode className="text-muted-foreground no-underline" />
    </footer>
  );
};
