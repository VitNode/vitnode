import { Lock, Unlock } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { mutationApi } from "./mutation-api";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface Props {
  id: number;
  locked: boolean;
}

export const LockToggleActionsTopic = ({ id, locked }: Props): JSX.Element => {
  const t = useTranslations("forum.topics.actions");
  const tCore = useTranslations("core");

  const onClick = async (): Promise<void> => {
    const mutation = await mutationApi({ id });

    if (mutation.error) {
      toast.error(tCore("errors.title"), {
        description: tCore("errors.internal_server_error")
      });
    }
  };

  if (locked) {
    return (
      <DropdownMenuItem onClick={onClick}>
        <Unlock /> {t("unlock")}
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem onClick={onClick}>
      <Lock /> {t("lock")}
    </DropdownMenuItem>
  );
};
