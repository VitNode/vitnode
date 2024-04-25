import { useTranslations } from "next-intl";

import type { ItemListFilesFooterEditorProps } from "./item";

export const ContentItemListFilesFooterEditor = ({
  data,
  error,
  file,
  isLoading
}: Omit<ItemListFilesFooterEditorProps, "id">) => {
  const t = useTranslations("core.editor.files");

  if (isLoading) {
    return t("state.loading");
  }

  if (error) {
    return (
      <span className="text-destructive">{t("state.error", { error })}</span>
    );
  }

  return (
    <>
      <span>{file?.size ?? data?.file_size ?? "Error!"}</span>
      <span>&middot;</span>
      <span>{file?.type ?? data?.mimetype ?? "Error!"}</span>
      {data?.width && data?.height && (
        <>
          <span>&middot;</span>
          <span>
            {data.width}x{data.height}
          </span>
        </>
      )}
    </>
  );
};
