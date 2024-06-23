import { FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";
import {
  Button,
  Loader,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "vitnode-frontend/components";

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
