"use client";

import { File } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBytes } from "@/functions/format-bytes";

interface Props {
  file_name_original: string;
  file_size: number;
  id: number;
  mimetype: string;
}

export const FileDownloadButton = ({
  file_name_original,
  file_size,
  id,
  mimetype
}: Props) => {
  return (
    <Button
      variant="outline"
      className="bg-muted [&>svg]:size-7 text-left h-auto gap-5 px-5 py-2"
    >
      <File className="text-muted-foreground" />
      <div>
        <span className="truncate leading-tight max-w-80 block">
          {file_name_original}
        </span>
        <div className="text-sm text-muted-foreground space-x-2">
          <span>{formatBytes(file_size)}</span>
          <span>&middot;</span>
          <span>{mimetype}</span>
        </div>
      </div>
    </Button>
  );
};
