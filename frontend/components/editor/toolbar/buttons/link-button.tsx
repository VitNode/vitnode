import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Check, Link, X } from 'lucide-react';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $getSelection, $isRangeSelection, ElementNode, TextNode } from 'lexical';
import type { RangeSelection } from 'lexical';
import { $isAtNodeEnd } from '@lexical/selection';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { PopoverClose } from '@radix-ui/react-popover';
import { $findMatchingParent } from '@lexical/utils';

import { useUpdateStateEditor } from '../hooks/use-update-state-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Toggle } from '@/components/ui/toggle';

export const getSelectedNode = (selection: RangeSelection): TextNode | ElementNode => {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? anchorNode : focusNode;
  }
};

const SUPPORTED_URL_PROTOCOLS = new Set(['https:', 'mailto:', 'sms:', 'tel:']);

export const sanitizeUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    // eslint-disable-next-line no-script-url
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return 'about:blank';
    }
  } catch {
    return url;
  }

  return url;
};

export const LinkButtonEditor = () => {
  const t = useTranslations('core.editor');
  const tCore = useTranslations('core');
  const [isLink, setIsLink] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  const [editor] = useLexicalComposerContext();

  useUpdateStateEditor({
    handleChange: () => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return false;

      const node = getSelectedNode(selection);
      const linkParent = $findMatchingParent(node, $isLinkNode);

      // Set the link url
      if (linkParent) {
        setLinkUrl(linkParent.getURL());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
      } else {
        setLinkUrl('');
      }

      // Set the link state
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);

        return;
      }

      setIsLink(false);
    }
  });

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <div>
                <Toggle
                  aria-label={t('link')}
                  pressed={isLink}
                  onClick={() => {
                    if (!isLink) {
                      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl('https://'));
                    }
                  }}
                >
                  <Link />
                </Toggle>
              </div>
            </PopoverTrigger>
          </TooltipTrigger>

          <PopoverContent className="flex gap-1 [&>button]:flex-shrink-0 p-2 w-80">
            <Input onChange={e => setLinkUrl(e.target.value)} value={linkUrl} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)}
              tooltip={tCore('delete')}
            >
              <X />
            </Button>

            <PopoverClose asChild>
              <Button
                size="icon"
                disabled={!linkUrl}
                onClick={() => {
                  editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl(linkUrl));
                }}
                tooltip={tCore('confirm')}
              >
                <Check />
              </Button>
            </PopoverClose>
          </PopoverContent>

          <TooltipContent side="bottom">{t('link')}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Popover>
  );
};
