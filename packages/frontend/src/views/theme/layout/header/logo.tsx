import { getImageProps } from 'next/image';

import { ImgProps } from '@/components/img';
import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';

export const LogoHeader = () => {
  const common: Omit<ImgProps, 'src'> = {
    width: 500,
    height: 500,
    sizes: '100vw',
    alt: 'Logo',
  };

  const {
    props: { srcSet: light },
  } = getImageProps({
    src: `${CONFIG.backend_public_url}/light.png`,
    ...common,
  });

  const {
    props: { srcSet: dark, ...rest },
  } = getImageProps({
    src: `${CONFIG.backend_public_url}/dark.png`,
    ...common,
  });

  const {
    props: { srcSet: mobileDark },
  } = getImageProps({
    src: `${CONFIG.backend_public_url}/mobile.png`,
    ...common,
  });

  const {
    props: { srcSet: mobileLight },
  } = getImageProps({
    src: `${CONFIG.backend_public_url}/mobile.png`,
    ...common,
  });

  return (
    <Link id="vitnode_logo" href="/">
      <picture className="hidden dark:block">
        <source srcSet={dark} media="(min-width: 640px)" />
        <source srcSet={mobileDark} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img className={`w-[50px] sm:w-[200px]`} {...rest} />
      </picture>

      <picture className="block dark:hidden">
        <source
          srcSet={light}
          className="bg-black"
          media="(min-width: 640px)"
        />
        <source srcSet={mobileLight} />
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        <img className={`w-[50px] sm:w-[200px]`} {...rest} />
      </picture>
    </Link>
  );
};
