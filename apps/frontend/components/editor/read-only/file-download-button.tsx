"use client";

import { File } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { formatBytes } from "@vitnode/shared";

import { CONFIG } from "@/config";
import { Button } from "@/components/ui/button";
import { acceptMimeTypeImage } from "../extensions/files/files";

interface Props {
  dir_folder: string;
  file_name: string;
  file_name_original: string;
  file_size: number;
  id: number;
  mimetype: string;
  allowDownloadAttachments?: boolean;
  file_alt?: string;
  height?: number;
  security_key?: string;
  width?: number;
}

export const FileDownloadButton = ({
  allowDownloadAttachments,
  dir_folder,
  file_alt,
  file_name,
  file_name_original,
  file_size,
  height,
  id,
  mimetype,
  security_key,
  width,
}: Props) => {
  const t = useTranslations("core.editor.files");

  if (acceptMimeTypeImage.includes(mimetype) && width && height) {
    return (
      <span className="inline-block">
        <Image
          src={`${CONFIG.graphql_public_url}/${dir_folder}/${file_name}`}
          alt={file_alt ?? file_name_original}
          sizes="100vw"
          className="h-auto w-full"
          width={width}
          height={height}
        />
      </span>
    );
  }

  if (!allowDownloadAttachments) {
    return (
      <Button
        variant="outline"
        className="bg-muted h-auto max-w-full gap-5 px-5 py-2 text-left [&>svg]:size-7"
        disabled
      >
        <File className="text-muted-foreground" />
        <div className="text-muted-foreground text-sm">
          <span>{t("access_denied_download")}</span>
        </div>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="bg-muted h-auto gap-5 px-5 py-2 text-left [&>svg]:size-7"
      onClick={() => {
        if (!security_key) return;

        window.open(
          `${CONFIG.backend_url}/secure_files/${id}?security_key=${security_key}`,
          "_blank",
        );
      }}
    >
      <File className="text-muted-foreground" />
      <div className="min-w-0 flex-1 overflow-hidden truncate">
        <span className="leading-tight">{file_name_original}</span>
        <div className="text-muted-foreground space-x-2 text-sm">
          <span>{formatBytes(file_size)}</span>
          <span>&middot;</span>
          <span>{mimetype}</span>
        </div>
      </div>
    </Button>
  );
};
