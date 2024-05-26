import { AnchorHTMLAttributes } from "react";

import { Link } from "@/utils/i18n";
import { User } from "@/graphql/hooks";

interface Props
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> {
  user: Pick<User, "name_seo" | "name">;
}

export const UserLink = ({ user: { name, name_seo }, ...props }: Props) => {
  return (
    <Link href={`/profile/${name_seo}`} className="font-medium" {...props}>
      {name}
    </Link>
  );
};
