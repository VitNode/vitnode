import { CircleX, File } from "lucide-react";
import Image from "next/image";

import { Loader } from "@/components/loader";

interface Props {
  isError: boolean | undefined;
  isLoading: boolean;
  src: string | null;
}

export const IconItemListFilesFooterEditor = ({
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
    return <Image src={src} className="object-cover" alt="test" fill />;
  }

  return <File className="size-8 text-muted-foreground" />;
};
