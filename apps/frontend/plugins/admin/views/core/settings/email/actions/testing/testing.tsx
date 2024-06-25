import { FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "vitnode-frontend/components/ui/dialog";
import { Button } from "vitnode-frontend/components/ui/button";
import { Loader } from "vitnode-frontend/components/ui/loader";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentTestingActionEmailSettingsAdmin,
  })),
);

export const TestingActionEmailSettingsAdmin = () => {
  const t = useTranslations("admin.core.settings.email.test");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FlaskConical />
          {t("title")}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <React.Suspense fallback={<Loader />}>
          <Content />
        </React.Suspense>
      </DialogContent>
    </Dialog>
  );
};
