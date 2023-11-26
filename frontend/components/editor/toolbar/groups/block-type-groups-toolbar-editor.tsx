import { useMemo } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTranslations } from 'next-intl';
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot
} from 'lexical';
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text';
import { $setBlocksType } from '@lexical/selection';
import { $findMatchingParent, $getNearestNodeOfType } from '@lexical/utils';
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  ListType
} from '@lexical/list';

import { useUpdateStateEditor } from '../hooks/use-update-state-editor';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { buttonVariants } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { AVAILABLE_BLOCKS, BLOCK_NAMES, useEditor } from '../hooks/use-editor';

export const BlockTypeGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.roots');
  const { blockType, setBlockType } = useEditor();
  const [editor] = useLexicalComposerContext();
  const currentRoot = useMemo(() => {
    return AVAILABLE_BLOCKS.find(item => item.value === blockType) ?? AVAILABLE_BLOCKS[0];
  }, [blockType]);

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : $findMatchingParent(anchorNode, e => {
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
        const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
        const type: ListType = parentList ? parentList.getListType() : element.getListType();
        setBlockType(type);

        return true;
      }

      // Headings
      const type = $isHeadingNode(element) ? element.getTag() : element.getType();
      setBlockType(type);
    }
  });

  const onValueChange = (value: BLOCK_NAMES) => {
    if (value === BLOCK_NAMES.BULLET) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);

      return;
    }

    if (value === BLOCK_NAMES.NUMBER) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);

      return;
    }

    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      if (value === BLOCK_NAMES.PARAGRAPH) {
        $setBlocksType(selection, () => $createParagraphNode());

        return true;
      }

      if (value === BLOCK_NAMES.H1 || value === BLOCK_NAMES.H2 || value === BLOCK_NAMES.H3) {
        $setBlocksType(selection, () => $createHeadingNode(value));

        return true;
      }
    });
  };

  return (
    <Select value={blockType} onValueChange={onValueChange}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SelectTrigger
              className={buttonVariants({
                variant: 'ghost',
                className: 'w-auto border-0 [&>svg]:w-5 [&>svg]:h-5'
              })}
            >
              <currentRoot.icon />

              {t(currentRoot.value)}
            </SelectTrigger>
          </TooltipTrigger>

          <TooltipContent side="bottom">{t('title')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SelectContent onCloseAutoFocus={() => editor.focus()}>
        {AVAILABLE_BLOCKS.map(item => (
          <SelectItem key={item.value} value={item.value}>
            <div className="flex items-center gap-2">
              <item.icon />

              {t(item.value)}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
