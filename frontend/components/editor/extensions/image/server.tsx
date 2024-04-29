import { NodeViewWrapper } from "@tiptap/react";
import Image from "next/image";

export const ImageFromNextWithNode = ({
  node
}: {
  node: { attrs: { src: string } };
}) => {
  return (
    <NodeViewWrapper className="inline-block">
      <Image src={node.attrs.src} alt="" width={500} height={500} />
    </NodeViewWrapper>
  );
};
