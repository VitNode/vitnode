import { forwardRef, useEffect, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

import { Skeleton } from '../ui/skeleton';
import { cx } from '@/functions/classnames';

interface InitialProps {
  alt: string;
  src: string | StaticImageData;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
}

interface PropsWithWidthAndHeight extends InitialProps {
  height: number;
  width: number;
  fill?: never;
  heightLoading?: number;
  widthLoading?: number;
}

interface PropsWithFill extends InitialProps {
  fill: true;
  height?: never;
  heightLoading?: never;
  width?: never;
  widthLoading?: never;
}

export type ImgProps = PropsWithWidthAndHeight | PropsWithFill;

const Img = forwardRef<HTMLDivElement, ImgProps>(
  (
    {
      alt,
      className,
      fill,
      height,
      heightLoading,
      imageClassName,
      priority,
      quality,
      sizes,
      src,
      width,
      widthLoading
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(!priority);

    // Refresh loading state when changing src
    useEffect(() => {
      if (!priority) {
        setIsLoading(true);
      }
    }, [src]);

    return (
      <div
        className={cx(className, 'relative', 'overflow-hidden', 'leading-[0] w-fit')}
        style={{
          height: !height ? (heightLoading && isLoading ? `${heightLoading}px` : '100%') : undefined
        }}
        ref={ref}
      >
        {isLoading && (
          <Skeleton
            className="absolute"
            style={{
              height: height !== undefined ? `${heightLoading ? heightLoading : height}px` : '100%',
              width: width ? `${widthLoading ? widthLoading : width}px` : '100%'
            }}
          />
        )}
        <Image
          width={width}
          height={height}
          sizes={sizes}
          quality={quality}
          src={src}
          alt={alt}
          priority={priority}
          fill={fill}
          className={imageClassName}
          style={{
            height: height !== undefined ? `${height}px` : undefined
          }}
          /* istanbul ignore next */ onLoadingComplete={
            /* istanbul ignore next */ () => setIsLoading(false)
          }
        />
      </div>
    );
  }
);
Img.displayName = 'Img';

export { Img };
