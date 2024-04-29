import { Image as ImageExtension } from "@tiptap/extension-image";

import { renderReactNode } from "./client";

export const ImageExtensionEditor = ImageExtension.extend({
  addNodeView() {
    return renderReactNode();
  }
}).configure({
  inline: true
});
