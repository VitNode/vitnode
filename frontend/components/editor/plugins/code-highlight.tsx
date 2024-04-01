import { registerCodeHighlighting } from "@lexical/code";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

export const CodeHighlightPluginEditor = (): null => {
  const [editor] = useLexicalComposerContext();

  useEffect((): (() => void) => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
};
