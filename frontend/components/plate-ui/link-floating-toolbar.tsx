'use client';

import { flip, offset, type UseVirtualFloatingOptions } from '@udecode/plate-floating';
import {
  FloatingLinkUrlInput,
  type LinkFloatingToolbarState,
  LinkOpenButton,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkInsert,
  useFloatingLinkInsertState
} from '@udecode/plate-link';
import { ExternalLink, Link, Text, Unlink } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const floatingOptions: UseVirtualFloatingOptions = {
  placement: 'bottom-start',
  middleware: [
    offset(12),
    flip({
      padding: 12,
      fallbackPlacements: ['bottom-end', 'top-start', 'top-end']
    })
  ]
};

export interface LinkFloatingToolbarProps {
  state?: LinkFloatingToolbarState;
}

export function LinkFloatingToolbar({ state }: LinkFloatingToolbarProps) {
  const t = useTranslations('core.editor.link');
  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions
    }
  });
  const {
    hidden,
    props: insertProps,
    ref: insertRef,
    textInputProps
  } = useFloatingLinkInsert(insertState);

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions
    }
  });
  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps
  } = useFloatingLinkEdit(editState);

  if (hidden) return null;

  const input = (
    <div className="flex w-72 flex-col p-1 gap-1">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center text-muted-foreground size-9 [&>svg]:size-4 flex-shrink-0">
          <Link />
        </div>

        <FloatingLinkUrlInput
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={t('paste_link')}
        />
      </div>

      <Separator />

      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center text-muted-foreground size-9 [&>svg]:size-4 flex-shrink-0">
          <Text />
        </div>

        <Input className="h-9" placeholder={t('link_text')} {...textInputProps} />
      </div>
    </div>
  );

  const editContent = editState.isEditing ? (
    input
  ) : (
    <div className="box-content flex h-9 items-center gap-1">
      <Button type="button" variant="ghost" size="sm" {...editButtonProps}>
        {t('edit_link')}
      </Button>

      <Separator orientation="vertical" />

      <Button
        className="size-9"
        variant="ghost"
        size="icon"
        tooltip={t('open_link_in_new_tab')}
        asChild
      >
        <LinkOpenButton>
          <ExternalLink />
        </LinkOpenButton>
      </Button>

      <Separator orientation="vertical" />

      <Button
        className="size-9"
        variant="ghost"
        tooltip={t('unlink')}
        size="icon"
        {...unlinkButtonProps}
      >
        <Unlink />
      </Button>
    </div>
  );

  const className =
    'z-50 rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 overflow-y-auto';

  return (
    <>
      <div ref={insertRef} className={className} {...insertProps}>
        {input}
      </div>

      <div ref={editRef} className={className} {...editProps}>
        {editContent}
      </div>
    </>
  );
}
