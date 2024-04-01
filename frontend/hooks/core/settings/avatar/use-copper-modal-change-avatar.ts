import { useRef, useState } from "react";
import { type ReactCropperElement } from "react-cropper";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { mutationUploadApi } from "./api/mutation-upload-api";
import { useDialog } from "@/components/ui/dialog";

import { useSession } from "../../use-session";

export const useCopperModalChangeAvatar = (): {
  cropperRef: React.RefObject<ReactCropperElement>;
  isPending: boolean;
  onSubmit: () => Promise<void>;
} => {
  const t = useTranslations("core");
  const cropperRef = useRef<ReactCropperElement>(null);
  const [isPending, setPending] = useState(false);
  const { session } = useSession();
  const { setOpen } = useDialog();

  const onSubmit = async (): Promise<void> => {
    if (!session) return;

    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;
    const blob = await fetch(cropper.getCroppedCanvas().toDataURL()).then(
      (res): Promise<Blob> => res.blob()
    );
    const file = new File([blob], `${session.id}.webp`, {
      type: blob.type
    });

    setPending(true);

    const formData = new FormData();
    formData.append("file", file);
    const mutation = await mutationUploadApi(formData);
    if (mutation.error) {
      toast.error(t("errors.title"), {
        description: t("settings.change_avatar.options.upload.error")
      });

      return;
    } else {
      toast.success(t("settings.change_avatar.options.upload.title"), {
        description: t("settings.change_avatar.options.upload.success")
      });
      setOpen?.(false);
    }

    setPending(false);
  };

  return {
    cropperRef,
    onSubmit,
    isPending
  };
};
