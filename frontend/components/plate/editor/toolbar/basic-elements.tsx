import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { ChevronDown, Heading1, Heading2, Heading3, Heading4, Pilcrow } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ELEMENT_H1, ELEMENT_H2, ELEMENT_H3, ELEMENT_H4 } from '@udecode/plate-heading';
import {
  findNode,
  isBlock,
  isCollapsed,
  useEditorSelector,
  type TElement,
  toggleNodeType,
  useEditorRef,
  collapseSelection,
  focusEditor
} from '@udecode/plate-common';

import { ToolbarButton } from '@/components/ui/toolbar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const BasicElementsToolbarEditor = () => {
  const items = [
    {
      value: ELEMENT_PARAGRAPH,
      id: 'paragraph',
      icon: <Pilcrow />
    },
    {
      value: ELEMENT_H1,
      id: 'h1',
      icon: <Heading1 />
    },
    {
      value: ELEMENT_H2,
      id: 'h2',
      icon: <Heading2 />
    },
    {
      value: ELEMENT_H3,
      id: 'h3',
      icon: <Heading3 />
    },
    {
      value: ELEMENT_H4,
      id: 'h4',
      icon: <Heading4 />
    }
  ];

  const defaultItem = items.find(item => item.value === ELEMENT_PARAGRAPH)!;

  const t = useTranslations('core.editor.roots');
  const editor = useEditorRef();

  const value: string = useEditorSelector(editor => {
    if (isCollapsed(editor.selection)) {
      const entry = findNode<TElement>(editor, {
        match: n => isBlock(editor, n)
      });

      if (entry) {
        return items.find(item => item.value === entry[0].type)?.value ?? ELEMENT_PARAGRAPH;
      }
    }

    return ELEMENT_PARAGRAPH;
  }, []);

  const selectedItem = items.find(item => item.value === value) ?? defaultItem;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <ToolbarButton className="w-32 p-3 justify-start">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t(selectedItem.id)} <ChevronDown className="ml-auto" />
        </ToolbarButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={type => {
            toggleNodeType(editor, { activeType: type });

            collapseSelection(editor);
            focusEditor(editor);
          }}
        >
          {items.map(item => (
            <DropdownMenuRadioItem key={item.id} value={item.value}>
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              {item.icon} {t(item.id)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
