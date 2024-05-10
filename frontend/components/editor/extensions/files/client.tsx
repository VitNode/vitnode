"use client";

import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { File } from "lucide-react";
import Image from "next/image";
import { CONFIG } from "@vitnode/shared";

import { acceptMimeTypeImage, type FilesHandlerAttributes } from "./files";
import { formatBytes } from "@/functions/format-bytes";

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
        <div data-drag-handle="" draggable>
          <Image
            src={`${CONFIG.backend_public_url}/${data.dir_folder}/${data.file_name}`}
            alt={data.file_alt ?? data.file_name_original}
            sizes="100vw"
            className="w-full h-auto"
            width={data.width}
            height={data.height}
          />
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="inline-block" data-drag-handle="" draggable>
      <button
        className="bg-muted hover:bg-accent rounded-md text-sm font-medium transition-colors cursor-gap text-left"
        type="button"
        tabIndex={-1}
      >
        <div className="flex gap-5 items-center px-5 py-2">
          <File className="size-7 text-muted-foreground" />
          <div className="pointer-events-none select-none">
            <span className="truncate block leading-tight max-w-80">
              {data.file_name_original}
            </span>
            <div className="text-sm text-muted-foreground space-x-2">
              <span>{formatBytes(data?.file_size ?? 0)}</span>
              <span>&middot;</span>
              <span>{data.mimetype}</span>
            </div>
          </div>
        </div>
      </button>
    </NodeViewWrapper>
  );
};

export const renderReactNode = () =>
  ReactNodeViewRenderer(FileFromNextWithNode);
