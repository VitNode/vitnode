import { forwardRef, type AnchorHTMLAttributes } from "react";

import { Link } from "@/utils/i18n/link";
import type { User } from "@/graphql/hooks";

interface Props
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  user: Pick<User, "name" | "name_seo">;
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
