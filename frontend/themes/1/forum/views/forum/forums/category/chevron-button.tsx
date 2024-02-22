"use client";

import { ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

import { Button } from "@/components/ui/button";

export const ChevronCategoryForumButton = () => {
  return (
    <Accordion.Header>
      <Accordion.Trigger asChild>
        <Button
          className="text-muted-foreground hover:text-foreground flex-shrink-0 [&[data-state=open]>svg]:rotate-180 [&>svg]:transition-transform"
          variant="ghost"
          size="icon"
          tooltip=""
        >
          <ChevronDown />
        </Button>
      </Accordion.Trigger>
    </Accordion.Header>
  );
};
