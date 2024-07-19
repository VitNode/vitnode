import { CircleX, File } from 'lucide-react';
import Image from 'next/image';

import { Loader } from '@/components/ui/loader';

export const IconItemListFilesFooterEditor = ({
  alt,
  isError,
  isLoading,
  src,
}: {
  alt: string;
  isError: boolean | undefined;
  isLoading: boolean;
  src: string | null;
}) => {
  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <CircleX className="text-destructive size-8" />;
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

  return <File className="text-muted-foreground size-8" />;
};
