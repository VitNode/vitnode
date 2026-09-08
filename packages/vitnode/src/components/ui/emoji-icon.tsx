import { cn } from "cn";

import type { EmojiIconValue } from "@/lib/emoji-icon";

import { DynamicIcon } from "./dynamic-icon";

export const EmojiIcon = ({
  className,
  value,
}: {
  className?: string;
  value: EmojiIconValue | null | undefined;
}) => {
  if (!value) return null;

  if (value.type === "emoji") {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center leading-none",
          className,
        )}
      >
        {value.value}
      </span>
    );
  }

  return (
    <DynamicIcon
      className={cn("inline-block size-4 shrink-0", className)}
      name={value.value}
    />
  );
};
