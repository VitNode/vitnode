import { Loader2 } from "lucide-react";

import { cx } from "@/functions/classnames";

interface Props {
  className?: string;
  small?: boolean;
}

export const Loader = ({ className, small }: Props) => {
  return (
    <div className={cx("flex justify-center items-center", className)}>
      <Loader2
        className={cx("h-10 w-10 animate-spin", {
          "h-4 w-4": small
        })}
      />
    </div>
  );
};
