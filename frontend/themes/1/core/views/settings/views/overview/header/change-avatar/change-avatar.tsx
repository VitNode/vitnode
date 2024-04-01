import { useTranslations } from "next-intl";
import { Suspense, lazy, type ComponentType } from "react";
import { ImageIcon } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AvatarUser } from "@/components/user/avatar/avatar-user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { useSession } from "@/hooks/core/use-session";

const ModalChangeAvatar = lazy(
  (): Promise<{
    default: ComponentType<object>;
  }> =>
    import("./modal/modal-change-avatar").then(
      (
        module
      ): {
        default: ComponentType<object>;
      } => ({
        default: module.ModalChangeAvatar
      })
    )
);

export const ChangeAvatar = (): JSX.Element | null => {
  const t = useTranslations("core");
  const { session } = useSession();
  if (!session) return null;

  return (
    <div className="relative">
      <AvatarUser sizeInRem={5} user={session} />
      <TooltipProvider>
        <Dialog>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-[-0.5rem] left-[-0.5rem]"
                  ariaLabel=""
                >
                  <ImageIcon size={20} />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>

            <DialogContent>
              <Suspense fallback={<Loader />}>
                <ModalChangeAvatar />
              </Suspense>
            </DialogContent>

            <TooltipContent>
              <p>{t("settings.change_avatar.title")}</p>
            </TooltipContent>
          </Tooltip>
        </Dialog>
      </TooltipProvider>
    </div>
  );
};
