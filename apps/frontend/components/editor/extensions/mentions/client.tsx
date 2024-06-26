'use client';

import { EditorView } from '@tiptap/pm/view';
import { Editor, ReactRenderer } from '@tiptap/react';
import * as React from 'react';
import tippy, { GetReferenceClientRect, Instance, Props } from 'tippy.js';
import { useTranslations } from 'next-intl';
import { cn } from 'vitnode-frontend/helpers/classnames';
import { Button } from 'vitnode-frontend/components/ui/button';
import { classPopover } from 'vitnode-frontend/components/ui/popover';

export interface SuggestionProps<I> {
  command: (props: I) => void;
  contentComponent: React.ComponentType<{ item: I }>;
  decorationNode: Element | null;
  editor: Editor;
  items: I[];
  query: string;
  range: Range;
  text: string;
  clientRect?: GetReferenceClientRect;
}

export interface SuggestionKeyDownProps {
  event: KeyboardEvent;
  range: Range;
  view: EditorView;
}

export interface ComponentListRef {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
}

export interface ComponentListProps {
  command: (_props: { id: string }) => void;
  items: string[];
  ref?: React.RefCallback<ComponentListRef>;
}

const ComponentList = ({ command, items, ref }: ComponentListProps) => {
  const t = useTranslations('core');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const selectItem = (index: number) => {
    const item = items[index];

    if (item) {
      command({ id: item });
    }
  };

  const upHandler = () =>
    setSelectedIndex((selectedIndex + items.length - 1) % items.length);
  const downHandler = () =>
    setSelectedIndex((selectedIndex + 1) % items.length);
  const enterHandler = () => selectItem(selectedIndex);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === 'ArrowUp') {
        upHandler();

        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();

        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();

        return true;
      }

      return false;
    },
  }));

  return (
    <>
      {items.length ? (
        items.map((item, index) => (
          <Button
            variant="ghost"
            className={cn('justify-start', {
              'bg-accent': index === selectedIndex,
            })}
            key={index}
            onClick={() => selectItem(index)}
            size="sm"
          >
            {item}
          </Button>
        ))
      ) : (
        <div className="text-muted-foreground italic">{t('no_results')}</div>
      )}
    </>
  );
};

let component: ReactRenderer<ComponentListRef> | null = null;
let popup: Instance<Props>[] | null = null;

export function onStart<T>(props: SuggestionProps<T>) {
  component = new ReactRenderer(ComponentList, {
    props,
    editor: props.editor,
    className: cn(classPopover, 'flex flex-col p-2'),
  });

  if (!props.clientRect) {
    return;
  }

  popup = tippy('body', {
    getReferenceClientRect: props.clientRect,
    appendTo: () => document.body,
    content: component?.element,
    showOnCreate: true,
    interactive: true,
    trigger: 'manual',
    placement: 'bottom-start',
  });
}

export function onUpdate<T>(props: SuggestionProps<T>) {
  if (!component || !popup) {
    return;
  }

  component.updateProps(props);

  if (!props.clientRect) {
    return;
  }

  popup[0].setProps({
    getReferenceClientRect: props.clientRect,
  });
}

export function onKeyDown(props: SuggestionKeyDownProps) {
  if (!component || !popup) {
    return;
  }

  if (props.event.key === 'Escape') {
    popup[0].hide();

    return true;
  }

  return component.ref?.onKeyDown(props);
}

export const onExit = () => {
  if (!component || !popup) {
    return;
  }

  popup[0].destroy();
  component.destroy();
};
