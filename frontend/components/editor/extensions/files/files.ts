import { Node, mergeAttributes } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";

import { renderReactNode } from "./client";
import { Core_Editor_Files__UploadMutation } from "@/graphql/hooks";
import { UploadFilesHandlerArgs } from "./hooks/use-upload-files-handler-editor.ts";

export const acceptMimeTypeImage = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif"
];

export const acceptMimeTypeVideo = ["video/mp4", "video/webm", "video/ogg"];

export interface FilesHandlerAttributes {
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

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    files: {
      insertFile: (options: FilesHandlerAttributes) => ReturnType;
    };
  }
}

export interface FileStateEditor {
  id: number;
  isLoading: boolean;
  data?: Core_Editor_Files__UploadMutation["core_editor_files__upload"];
  error?: string;
  file?: File;
}

export interface FilesHandlerArgs {
  uploadFiles?: (args: UploadFilesHandlerArgs) => Promise<void>;
}

export const FilesHandler = ({ uploadFiles }: FilesHandlerArgs) =>
  Node.create({
    name: "files",
    group: "inline",
    inline: true,
    atom: true,
    selectable: true,
    draggable: true,
    isolating: false,
    priority: 10000,

    addAttributes() {
      return {
        file_name_original: {
          default: ""
        },
        file_name: {
          default: ""
        },
        dir_folder: {
          default: ""
        },
        file_alt: {
          default: ""
        },
        file_size: {
          default: 0
        },
        mimetype: {
          default: ""
        },
        id: {
          default: 0
        },
        width: {
          default: 0
        },
        height: {
          default: 0
        },
        security_key: {
          default: ""
        }
      };
    },

    addNodeView() {
      return renderReactNode();
    },

    renderHTML({ HTMLAttributes }) {
      return [
        "button",
        mergeAttributes(HTMLAttributes, {
          ["data-type"]: "file",
          type: "button"
        })
      ];
    },

    addCommands() {
      return {
        insertFile:
          options =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options
            });
          }
      };
    },

    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handlePaste(view, event) {
              const files: FileStateEditor[] = [
                ...(event.clipboardData?.files ?? [])
              ].map(file => ({
                file,
                isLoading: true,
                id: Math.floor(Math.random() * 1000) + file.size
              }));
              if (!files.length || !uploadFiles) return false;
              const { schema } = view.state;

              uploadFiles({
                files,
                finishUpload: file => {
                  const node = schema.nodes.files.create(file.data);
                  const transaction = view.state.tr.replaceSelectionWith(node);
                  view.dispatch(transaction);
                }
              });

              return true;
            },
            handleDrop(view, event, slice, moved) {
              const files: FileStateEditor[] = [
                ...(event.dataTransfer?.files ?? [])
              ].map(file => ({
                file,
                isLoading: true,
                id: Math.floor(Math.random() * 1000) + file.size
              }));
              if ((moved && !files.length) || !uploadFiles) return false;

              uploadFiles({
                files,
                finishUpload: file => {
                  const { schema } = view.state;
                  const coordinates = view.posAtCoords({
                    left: event.clientX,
                    top: event.clientY
                  });

                  if (!coordinates) return;

                  const node = schema.nodes.files.create(file.data);
                  const transaction = view.state.tr.insert(
                    coordinates.pos,
                    node
                  );
                  view.dispatch(transaction);
                }
              });

              return true;
            }
          }
        })
      ];
    }
  });
