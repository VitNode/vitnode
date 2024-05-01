"use client";

import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { File } from "lucide-react";
import Image from "next/image";

import { acceptMimeTypeImage, type FilesHandlerAttributes } from "./files";
import { formatBytes } from "@/functions/format-bytes";
import { CONFIG } from "@/config";

const FileFromNextWithNode = ({
  node: { attrs: data }
}: {
  node: { attrs: FilesHandlerAttributes };
}) => {
  if (
    acceptMimeTypeImage.includes(data.mimetype) &&
    data.width &&
    data.height
  ) {
    return (
      <NodeViewWrapper className="inline-block">
        <Image
          src={`${CONFIG.backend_public_url}/${data.dir_folder}/${data.file_name}`}
          alt={data.file_alt ?? data.file_name_original}
          sizes="100vw"
          className="w-full h-auto"
          width={data.width}
          height={data.height}
        />
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="inline-block">
      <button
        className="bg-muted hover:bg-accent rounded-md text-sm font-medium transition-colors px-5 py-2 flex gap-5 items-center cursor-pointer text-left"
        data-drag-handle=""
        draggable
        type="button"
      >
        <File className="size-7 text-muted-foreground" />
        <div>
          <span className="truncate block leading-tight max-w-80">
            {data.file_name_original}
          </span>
          <div className="text-sm text-muted-foreground space-x-2">
            <span>{formatBytes(data?.file_size ?? 0)}</span>
            <span>&middot;</span>
            <span>{data.mimetype}</span>
          </div>
        </div>
      </button>
    </NodeViewWrapper>
  );
};

export const renderReactNode = () =>
  ReactNodeViewRenderer(FileFromNextWithNode);
