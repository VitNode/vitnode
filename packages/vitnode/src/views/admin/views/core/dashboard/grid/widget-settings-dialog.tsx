import { Settings2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useTranslations } from "use-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";

import type { DashboardWidgetView } from "../widgets/types";

import { useDashboardBoard } from "./board-context";
import { WidgetSettingsDialogContext } from "./widget-settings-context";

const WidgetSettingsForm = ({
  form,
}: {
  form: Promise<React.ReactNode>;
}): React.ReactNode => React.use(form);

export const WidgetSettingsDialog = ({
  onSaved,
  widget,
}: {
  onSaved: () => void;
  widget: DashboardWidgetView;
}) => {
  const t = useTranslations("admin.dashboard.widgets");
  const { actions } = useDashboardBoard();
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [form, setForm] = React.useState<null | Promise<React.ReactNode>>(null);

  const [formKey, setFormKey] = React.useState(widget.contentKey);
  if (formKey !== widget.contentKey) {
    setFormKey(widget.contentKey);
    setForm(null);
  }

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next || form) return;

    setForm(
      actions
        .loadWidgetSettings(widget.instanceId)
        .catch(() => (
          <p className="text-destructive text-sm">{t("settings.load_error")}</p>
        )),
    );
  };

  const close = React.useCallback(() => setOpen(false), []);

  const save = React.useCallback(
    async (settings: Record<string, unknown>) =>
      new Promise<void>(resolve => {
        startTransition(async () => {
          try {
            const res = await actions.saveWidgetSettings({
              settings,
              widgetId: widget.instanceId,
            });

            if (res?.error) {
              toast.error(t("settings.error_title"), {
                description: t("settings.error_desc"),
              });

              return;
            }

            setOpen(false);
            setTimeout(onSaved, 300);
          } finally {
            resolve();
          }
        });
      }),
    [actions, onSaved, t, widget.instanceId],
  );

  const value = React.useMemo(
    () => ({ close, isPending, save, widgetId: widget.instanceId }),
    [close, isPending, save, widget.instanceId],
  );

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogTrigger
        render={
          <Button
            aria-label={t("settings.open", { title: widget.title })}
            size="icon-sm"
            variant="secondary"
          />
        }
      >
        <Settings2Icon />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("settings.title", { title: widget.title })}
          </DialogTitle>
          <DialogDescription>{t("settings.desc")}</DialogDescription>
        </DialogHeader>

        <WidgetSettingsDialogContext value={value}>
          {form ? (
            <React.Suspense fallback={<Loader />}>
              <WidgetSettingsForm form={form} />
            </React.Suspense>
          ) : (
            <Loader />
          )}
        </WidgetSettingsDialogContext>
      </DialogContent>
    </Dialog>
  );
};
