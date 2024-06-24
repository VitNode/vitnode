import Image, { StaticImageData } from "next/image";

import { cn } from "../helpers";

interface InitialProps {
  alt: string;
  src: StaticImageData | string;
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
}

interface PropsWithFill extends InitialProps {
  fill: true;
  height?: never;
  heightLoading?: never;
  width?: never;
}

export type ImgProps = PropsWithFill | PropsWithWidthAndHeight;

export const Img = ({
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
}: ImgProps) => {
  return (
    <div
      className={cn("relative w-fit overflow-hidden leading-[0]", className)}
      style={{
        height: !height
          ? heightLoading
            ? `${heightLoading}px`
            : "100%"
          : undefined,
      }}
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
        }}
      />
    </div>
  );
};
