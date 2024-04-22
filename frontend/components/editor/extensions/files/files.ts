import { Node, mergeAttributes } from "@tiptap/react";

import { renderReactNode } from "./client";

export interface FilesHandlerStorage {
  files: string[];
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    files: {
      setFiles: () => ReturnType;
    };
  }
}

export const FilesHandler = Node.create<object, FilesHandlerStorage>({
  name: "files",
  group: "block",
  draggable: true,

  addStorage() {
    return {
      files: []
    };
  },

  addCommands() {
    return {
      setFiles: () => () => {
        return false;
      }
    };
  },

  addNodeView() {
    return renderReactNode();
  },

  renderHTML({ HTMLAttributes }) {
    return ["files-component", mergeAttributes(HTMLAttributes), 0];
  }
});
