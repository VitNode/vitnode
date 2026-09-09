import { cn } from "cn";
import React from "react";

export const UserCoverImage = ({
  className,
  url,
  ...props
}: Omit<React.ComponentProps<"img">, "alt" | "src"> & {
  url: null | string;
}) => {
  const [failedUrl, setFailedUrl] = React.useState<null | string>(null);

  if (!url || failedUrl === url) return null;

  return (
    <img
      alt=""
      className={cn("size-full object-cover", className)}
      decoding="async"
      onError={() => {
        setFailedUrl(url);
      }}
      src={url}
      {...props}
    />
  );
};
