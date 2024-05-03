import { CircleX, File } from "lucide-react";
import Image from "next/image";

import { Loader } from "@/components/loader";

interface Props {
  alt: string;
  isError: boolean | undefined;
  isLoading: boolean;
  src: string | null;
}

export const IconItemListFilesFooterEditor = ({
  alt,
  isError,
  isLoading,
  src
}: Props) => {
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <CircleX className="size-8 text-destructive" />;
  }

  if (src) {
    return (
      <Image
        src={src}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover"
        alt={alt}
        fill
      />
    );
  }

  return <File className="size-8 text-muted-foreground" />;
};
