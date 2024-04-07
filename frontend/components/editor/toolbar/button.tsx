import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface Props {
  children: ReactNode;
  name: string;
  onClick: () => void;
  disabled?: boolean;
}

export const ButtonToolbarEditor = ({
  children,
  disabled,
  name,
  onClick
}: Props) => {
  const t = useTranslations("core.editor");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="shadow-none"
            size="icon"
            onClick={onClick}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ariaLabel={t(name)}
            disabled={disabled}
          >
            {children}
          </Button>
        </TooltipTrigger>

        {/* eslint-disable-next-line react/jsx-no-comment-textnodes, @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <TooltipContent>{t(name)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
