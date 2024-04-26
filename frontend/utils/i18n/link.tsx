"use client";

import { useRouter } from "next/navigation";
import {
  forwardRef,
  startTransition,
  useCallback,
  type ComponentProps,
  type MouseEvent
} from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { useSetFinishViewTransition } from "../next-view-transitions/transition-context";

export const { Link: I18nLink } = createSharedPathnamesNavigation();

// copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: MouseEvent): boolean {
  const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
  const target = eventTarget.getAttribute("target");

  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey || // triggers resource download
    (event.nativeEvent && event.nativeEvent.which === 2)
  );
}

// copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L204-L217
function shouldPreserveDefault(e: MouseEvent<HTMLAnchorElement>): boolean {
  const { nodeName } = e.currentTarget;

  // anchors inside an svg have a lowercase nodeName
  const isAnchorNodeName = nodeName.toUpperCase() === "A";

  if (isAnchorNodeName && isModifiedEvent(e)) {
    // ignore click for browser’s default behavior
    return true;
  }

  return false;
}

// This is a wrapper around next/link that explicitly uses the router APIs
// to navigate, and trigger a view transition.

export const Link = forwardRef<
  HTMLAnchorElement,
  ComponentProps<typeof I18nLink>
>((props, ref) => {
  const router = useRouter();
  const finishViewTransition = useSetFinishViewTransition();

  const { as, href, replace, scroll } = props;
  const onClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (props.onClick) {
        props.onClick(e);
      }

      if ("startViewTransition" in document) {
        if (shouldPreserveDefault(e)) {
          return;
        }

        e.preventDefault();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        document.startViewTransition(
          () =>
            new Promise<void>(resolve => {
              startTransition(() => {
                // copied from https://github.com/vercel/next.js/blob/66f8ffaa7a834f6591a12517618dce1fd69784f6/packages/next/src/client/link.tsx#L231-L233
                router[replace ? "replace" : "push"]((as || href) as string, {
                  scroll: scroll ?? true
                });
                finishViewTransition(() => resolve);
              });
            })
        );
      }
    },
    [props.onClick, href, as, replace, scroll]
  );

  return <I18nLink {...props} ref={ref} onClick={onClick} />;
});

Link.displayName = "Link";
