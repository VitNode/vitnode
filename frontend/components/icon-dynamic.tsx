import dynamic from "next/dynamic";
import * as Lucide from "lucide-react";
import { memo } from "react";
import { Loader2 } from "lucide-react";

import { cx } from "../functions/classnames";

export type IconDynamicNames = keyof typeof Lucide.icons;

interface Props extends Lucide.LucideProps {
  name: IconDynamicNames;
}

const _IconDynamic = ({ className, name, ...props }: Props) => {
  const LucideIcon = dynamic(
    () => import(`lucide-react`).then(mod => mod[name]),
    {
      loading: () => {
        return <Loader2 className={cx("animate-spin", className)} />;
      }
    }
  );

  return <LucideIcon className={className} {...props} />;
};

export const IconDynamic = memo(_IconDynamic);
