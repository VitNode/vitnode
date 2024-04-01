import { Loader2 } from "lucide-react";

import { cn } from "@/functions/classnames";

interface Props {
  className?: string;
  small?: boolean;
}

export const Loader = ({ className, small }: Props): JSX.Element => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <Loader2
        className={cn("h-10 w-10 animate-spin", {
          "h-4 w-4": small
        })}
      />
    </div>
  );
};
