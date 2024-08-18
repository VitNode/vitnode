import Image from 'next/image';

import { Link } from '@/navigation';
import { getSessionData } from '@/graphql/get-session-data';
import { CONFIG } from '@/helpers/config-with-env';
import { cn } from '@/helpers/classnames';

export const LogoHeader = async () => {
  const {
    core_theme_editor__show: { logos },
  } = await getSessionData();

  return (
    <Link
      id="vitnode_logo"
      href="/"
      style={
        {
          '--logo-width': `${logos.width}rem`,
          '--logo-mobile-width': `${logos.mobile_width}rem`,
        } as React.CSSProperties
      }
    >
      {!logos.dark &&
      !logos.mobile_dark &&
      !logos.light &&
      !logos.mobile_light ? (
        <span
          id="vitnode_logo_text"
          className="text-foreground inline-block whitespace-nowrap font-bold"
        >
          {logos.text}
        </span>
      ) : null}

      {logos.light && (
        <Image
          id="vitnode_logo_light"
          src={`${CONFIG.backend_public_url}/${logos.light.dir_folder}/${logos.light.file_name}`}
          width={logos.light.width}
          height={logos.light.height}
          sizes="100vw"
          className={cn('w-[--logo-mobile-width] sm:w-[--logo-width]', {
            'dark:hidden': logos.dark,
            'hidden sm:block': logos.mobile_light || logos.mobile_dark,
          })}
          alt={logos.text}
        />
      )}
      {logos.dark && (
        <Image
          id="vitnode_logo_dark"
          src={`${CONFIG.backend_public_url}/${logos.dark.dir_folder}/${logos.dark.file_name}`}
          width={logos.dark.width}
          height={logos.dark.height}
          sizes="100vw"
          className={cn('w-[--logo-mobile-width] sm:w-[--logo-width]', {
            'hidden dark:block': logos.light,
            'hidden sm:block': !logos.light,
            'dark:hidden dark:sm:block':
              logos.mobile_dark || logos.mobile_light,
          })}
          alt={logos.text}
        />
      )}

      {logos.mobile_light && (
        <Image
          id="vitnode_logo_mobile_light"
          src={`${CONFIG.backend_public_url}/${logos.mobile_light.dir_folder}/${logos.mobile_light.file_name}`}
          width={logos.mobile_light.width}
          height={logos.mobile_light.height}
          sizes="100vw"
          className={cn('w-[--logo-mobile-width] sm:w-[--logo-width]', {
            'block sm:hidden': logos.light || logos.dark,
            'dark:hidden': logos.mobile_dark,
          })}
          alt={logos.text}
        />
      )}
      {logos.mobile_dark && (
        <Image
          id="vitnode_logo_mobile_dark"
          src={`${CONFIG.backend_public_url}/${logos.mobile_dark.dir_folder}/${logos.mobile_dark.file_name}`}
          width={logos.mobile_dark.width}
          height={logos.mobile_dark.height}
          sizes="100vw"
          className={cn('w-[--logo-mobile-width] sm:w-[--logo-width]', {
            'block sm:hidden dark:block dark:sm:hidden':
              logos.dark || logos.light,
            'hidden dark:block': logos.mobile_light,
          })}
          alt={logos.text}
        />
      )}
    </Link>
  );
};
