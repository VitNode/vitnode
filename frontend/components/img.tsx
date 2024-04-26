import { forwardRef, type CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";

import { cn } from "@/functions/classnames";

interface InitialProps {
  alt: string;
  src: string | StaticImageData;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  style?: CSSProperties;
}

interface PropsWithWidthAndHeight extends InitialProps {
  height: number;
  width: number;
  fill?: never;
  heightLoading?: number;
}

interface PropsWithFill extends InitialProps {
  fill: true;
  height?: never;
  heightLoading?: never;
  width?: never;
}

export type ImgProps = PropsWithWidthAndHeight | PropsWithFill;

const Img = forwardRef<HTMLImageElement, ImgProps>(
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
      style
    },
    ref
  ) => {
    return (
      <div
        className={cn("relative overflow-hidden leading-[0] w-fit", className)}
        style={{
          height: !height
            ? heightLoading
              ? `${heightLoading}px`
              : "100%"
            : undefined
        }}
        ref={ref}
      >
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
            height: height !== undefined ? `${height}px` : undefined,
            ...style
          }}
          ref={ref}
        />
      </div>
    );
  }
);
Img.displayName = "Img";

export { Img };
