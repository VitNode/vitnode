import { useMemo } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useTranslations } from "next-intl";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  ParagraphNode
} from "lexical";
import {
  $createHeadingNode,
  $isHeadingNode,
  HeadingNode
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $findMatchingParent, $getNearestNodeOfType } from "@lexical/utils";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode
} from "@lexical/list";
import type { ListType } from "@lexical/list";
import { $createCodeNode, CodeNode } from "@lexical/code";
import type { LucideIcon } from "lucide-react";

import { useUpdateStateEditor } from "../hooks/use-update-state-editor";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select";
import { AVAILABLE_BLOCKS, BLOCK_NAMES, useEditor } from "../hooks/use-editor";

export const BlockTypeButtonEditor = (): JSX.Element => {
  const t = useTranslations("core.editor.roots");
  const { blockType, setBlockType } = useEditor();
  const [editor] = useLexicalComposerContext();
  const currentRoot = useMemo((): {
    icon: LucideIcon;
    value: BLOCK_NAMES;
  } => {
    return (
      AVAILABLE_BLOCKS.find((item): boolean => item.value === blockType) ??
      AVAILABLE_BLOCKS[0]
    );
  }, [blockType]);

  useUpdateStateEditor({
    handleChange: (): boolean => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e): boolean => {
              const parent = e.getParent();

              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey);
      if (elementDOM === null) return false;

      // Lists
      if ($isListNode(element)) {
        const parentList = $getNearestNodeOfType<ListNode>(
          anchorNode,
          ListNode
        );
        const type: ListType = parentList
          ? parentList.getListType()
          : element.getListType();
        setBlockType(type);

        return true;
      }

      // Headings
      const type = $isHeadingNode(element)
        ? element.getTag()
        : element.getType();
      setBlockType(type);

      // Code
      // if ($isCodeNode(element)) {
      //   const language = element.getLanguage();
      //   setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : '');
      // }

      return true;
    }
  });

  const onValueChange = (value: BLOCK_NAMES): boolean => {
    if (value === BLOCK_NAMES.BULLET) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);

      return true;
    }

    if (value === BLOCK_NAMES.NUMBER) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);

      return true;
    }

    editor.update((): boolean => {
      if (value === BLOCK_NAMES.CODE) {
        let selection = $getSelection();
        if (!$isRangeSelection(selection)) return false;

        if (selection.isCollapsed()) {
          $setBlocksType(selection, (): CodeNode => $createCodeNode());
        } else {
          const textContent = selection.getTextContent();
          const codeNode = $createCodeNode();
          selection.insertNodes([codeNode]);

          selection = $getSelection();
          if ($isRangeSelection(selection))
            selection.insertRawText(textContent);
        }

        return true;
      }

      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      if (value === BLOCK_NAMES.PARAGRAPH) {
        $setBlocksType(selection, (): ParagraphNode => $createParagraphNode());

        return true;
      }

      if (
        value === BLOCK_NAMES.H1 ||
        value === BLOCK_NAMES.H2 ||
        value === BLOCK_NAMES.H3
      ) {
        $setBlocksType(selection, (): HeadingNode => $createHeadingNode(value));

        return true;
      }

      return false;
    });

    return true;
  };

  return (
    <Select value={blockType} onValueChange={onValueChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "w-auto border-0 [&>svg]:w-5 [&>svg]:h-5"
              })}
            >
              <currentRoot.icon />

              {t(currentRoot.value)}
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent>{t("title")}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SelectContent onCloseAutoFocus={(): void => editor.focus()}>
        {AVAILABLE_BLOCKS.map(
          (item): JSX.Element => (
            <SelectItem key={item.value} value={item.value}>
              <div className="flex items-center gap-2">
                <item.icon />

                {t(item.value)}
              </div>
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
};
