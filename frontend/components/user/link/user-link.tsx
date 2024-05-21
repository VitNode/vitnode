import { forwardRef, type AnchorHTMLAttributes } from "react";

import { Link } from "@/i18n";
import type { User } from "@/graphql/hooks";

interface Props
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
  user: Pick<User, "name_seo" | "name">;
}

export const UserLink = forwardRef<HTMLAnchorElement, Props>(
  ({ user: { name, name_seo }, ...props }, ref) => {
    return (
      <Link
        href={`/profile/${name_seo}`}
        className="font-medium"
        ref={ref}
        {...props}
      >
        {name}
      </Link>
    );
  }
);

UserLink.displayName = "UserLink";
