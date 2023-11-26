import {
  Code,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  List,
  ListFilter,
  ListOrdered,
  LucideIcon
} from 'lucide-react';
import { useMemo, useState } from 'react';
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

enum ROOT_NAMES {
  NORMAL = 'normal',
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  BULLET = 'bullet',
  NUMBER = 'number',
  CODE = 'code'
}

const AVAILABLE_ROOTS: { icon: LucideIcon; value: ROOT_NAMES }[] = [
  {
    value: ROOT_NAMES.NORMAL,
    icon: ListFilter
  },
  {
    value: ROOT_NAMES.H1,
    icon: Heading1Icon
  },
  {
    value: ROOT_NAMES.H2,
    icon: Heading2Icon
  },
  {
    value: ROOT_NAMES.H3,
    icon: Heading3Icon
  },
  {
    value: ROOT_NAMES.BULLET,
    icon: List
  },
  {
    value: ROOT_NAMES.NUMBER,
    icon: ListOrdered
  },
  {
    value: ROOT_NAMES.CODE,
    icon: Code
  }
];

export const BlockTypeGroupsToolbarEditor = () => {
  const t = useTranslations('core.editor.roots');
  const [blockType, setBlockType] = useState<string>(ROOT_NAMES.NORMAL);
  const [editor] = useLexicalComposerContext();
  const currentRoot = useMemo(() => {
    return AVAILABLE_ROOTS.find(item => item.value === blockType) ?? AVAILABLE_ROOTS[0];
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
  const onValueChange = (value: ROOT_NAMES) => {
    if (value === ROOT_NAMES.BULLET) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);

      return;
    }

    if (value === ROOT_NAMES.NUMBER) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);

      return;
    }

    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      if (value === ROOT_NAMES.NORMAL) {
        $setBlocksType(selection, () => $createParagraphNode());

        return true;
      }

      if (value === ROOT_NAMES.H1 || value === ROOT_NAMES.H2 || value === ROOT_NAMES.H3) {
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
        {AVAILABLE_ROOTS.map(item => (
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
