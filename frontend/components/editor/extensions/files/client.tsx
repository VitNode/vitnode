"use client";

import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { File } from "lucide-react";

import type { FilesHandlerAttributes } from "./files";
import { formatBytes } from "@/functions/format-bytes";

const FileFromNextWithNode = ({
  node: { attrs: data }
}: {
  node: { attrs: FilesHandlerAttributes };
}) => {
  return (
    <NodeViewWrapper>
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
