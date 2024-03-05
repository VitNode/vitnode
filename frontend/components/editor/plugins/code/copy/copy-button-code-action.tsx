import { CheckCircle, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getNearestNodeFromDOMNode,
  $getSelection,
  $setSelection
} from "lexical";
import { $isCodeNode } from "@lexical/code";

import { useDebounce } from "@/hooks/core/use-debounce";
import { Button } from "@/components/ui/button";

interface Props {
  codeDOMNode: HTMLElement;
}

export const CopyButtonCodeAction = ({ codeDOMNode }: Props) => {
  const t = useTranslations("core.editor");
  const [isCopyCompleted, setCopyCompleted] = useState(false);
  const [editor] = useLexicalComposerContext();

  const removeSuccessIcon = useDebounce(() => {
    setCopyCompleted(false);
  }, 1000);

  return (
    <Button
      className="w-8 h-8 [&>svg]:pointer-events-none [&>svg]:w-4 [&>svg]:h-4"
      variant="outline"
      size="icon"
      ariaLabel={t("copy_code")}
      onClick={async () => {
        let content = "";

        editor.update(() => {
          const codeNode = $getNearestNodeFromDOMNode(codeDOMNode);

          if ($isCodeNode(codeNode)) {
            content = codeNode.getTextContent();
          }

          const selection = $getSelection();
          $setSelection(selection);
        });

        try {
          await navigator.clipboard.writeText(content);
          setCopyCompleted(true);
          removeSuccessIcon();
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      }}
    >
      {isCopyCompleted ? <CheckCircle className="text-primary" /> : <Copy />}
    </Button>
  );
};
