import { cn } from "cn";

import { parseEmojiIcon } from "@/lib/emoji-icon";

import { EmojiIcon } from "./ui/emoji-icon";

export const UserFormat = ({
  user,
  format,
  className,
  style,
  ...props
}: React.ComponentProps<"span"> & {
  format?: boolean;
  user: {
    name: string;
    role: {
      color: null | string;
      prefix?: null | string;
    };
  };
}) => {
  const prefix = format ? parseEmojiIcon(user.role.prefix) : null;

  return (
    <span
      className={cn(
        "inline-flex min-w-0 items-center gap-1.5 font-medium",
        className,
      )}
      style={{
        ...(format && user.role.color ? { color: user.role.color } : {}),
        ...style,
      }}
      {...props}
    >
      {!!prefix && <EmojiIcon value={prefix} />}
      <span className="truncate">{user.name}</span>
    </span>
  );
};
