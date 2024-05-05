"use client";

import { File } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { formatBytes } from "@/functions/format-bytes";
import { acceptMimeTypeImage } from "../extensions/files/files";
import { CONFIG } from "@/config";

interface Props {
  dir_folder: string;
  file_name: string;
  file_name_original: string;
  file_size: number;
  id: number;
  mimetype: string;
  file_alt?: string;
  height?: number;
  security_key?: string;
  width?: number;
}

export const FileDownloadButton = ({
  dir_folder,
  file_alt,
  file_name,
  file_name_original,
  file_size,
  height,
  id,
  mimetype,
  security_key,
  width
}: Props) => {
  if (acceptMimeTypeImage.includes(mimetype) && width && height) {
    return (
      <span className="inline-block">
        <Image
          src={`${CONFIG.backend_public_url}/${dir_folder}/${file_name}`}
          alt={file_alt ?? file_name_original}
          sizes="100vw"
          className="w-full h-auto"
          width={width}
          height={height}
        />
      </span>
    );
  }

  return (
    <Button
      variant="outline"
      className="bg-muted [&>svg]:size-7 text-left h-auto gap-5 px-5 py-2"
      onClick={() => {
        if (!security_key) return;

        window.open(
          `${CONFIG.backend_url}/secure_files/${id}?security_key=${security_key}`,
          "_blank"
        );
      }}
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
