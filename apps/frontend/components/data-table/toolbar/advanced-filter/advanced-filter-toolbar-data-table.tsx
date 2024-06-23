import { Filter } from "lucide-react";
import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  Loader,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "vitnode-frontend/components";

interface Props {
  children: React.ReactNode;
}

export const AdvancedFilterToolbarDataTable = ({ children }: Props) => {
  const t = useTranslations("core");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="ml-auto"
          variant="outline"
          size="icon"
          ariaLabel={t("filters")}
        >
          <Filter />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("filters")}</SheetTitle>
        </SheetHeader>

        <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
      </SheetContent>
    </Sheet>
  );
};
