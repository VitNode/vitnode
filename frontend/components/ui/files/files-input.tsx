import {
  type InputHTMLAttributes,
  useRef,
  useState,
  type RefCallback
} from "react";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { useMergeRefs } from "@/hooks/core/utils/use-merge-refs";
import { cn } from "@/functions/classnames";
import { PreviewFilesInput } from "./preview/preview-files-input";

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "type" | "value"
  > {
  acceptExtensions: string[];
  maxFileSizeInMb: number;
  onChange: (e: File[]) => void;
  value: File[] | undefined;
  ref?: RefCallback<HTMLInputElement>;
}

export const FilesInput = ({
  acceptExtensions,
  className,
  disabled,
  maxFileSizeInMb,
  multiple,
  onChange,
  value: stateValue,
  ref,
  ...props
}: InputProps) => {
  const t = useTranslations("core");
  const [isDrag, setDrag] = useState(false);
  const currentRef = useRef<HTMLInputElement>(null);
  const inputRef = useMergeRefs([ref, currentRef]);

  const handleUploadFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Validate files
    const currentFiles = Array.from(files).filter(file => {
      const splitFileName = file.name.split(".");
      const extensionType = splitFileName.at(-1);

      if (extensionType && !acceptExtensions.includes(extensionType)) {
        toast.error(t("forms.files.errors.extension", { file: file.name }));

        return;
      }

      if (maxFileSizeInMb && file.size > maxFileSizeInMb * 1024 * 1024) {
        toast.error(t("forms.files.errors.max_size", { file: file.name }));

        return;
      }

      return file;
    });

    if (currentFiles.length === 0) return;

    if (multiple) {
      onChange([...(stateValue || []), ...currentFiles]);

      return;
    }

    const current = currentFiles.at(0);
    if (!current) return;

    onChange([current]);
  };

  return (
    <>
      {((stateValue && stateValue.length === 0 && !multiple) || multiple) && (
        <div
          className={cn(
            "flex flex-col items-center justify-center w-full m-h-32 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            {
              "opacity-50 cursor-not-allowed": disabled
            }
          )}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={() => currentRef.current?.click()}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              currentRef.current?.click();
            }
          }}
          onDragOver={e => {
            if (!e.dataTransfer.types.includes("Files")) return;
            e.preventDefault();
            e.stopPropagation();

            setDrag(true);
          }}
          onDragLeave={e => {
            if (!e.dataTransfer.types.includes("Files")) return;
            e.preventDefault();
            e.stopPropagation();

            if (e.currentTarget.contains(e.relatedTarget as Node)) return;
            setDrag(false);
          }}
          onDrop={e => {
            if (!e.dataTransfer.types.includes("Files")) return;
            e.preventDefault();
            e.stopPropagation();
            setDrag(false);
            handleUploadFile(e.dataTransfer.files);
          }}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
            <Upload />
            <p className="mb-2 text-sm mt-2 font-semibold">
              {t(isDrag ? "forms.files.drop_here" : "forms.files.title")}
            </p>
            <p className="text-xs">
              {acceptExtensions.join(", ").toUpperCase()}{" "}
              {maxFileSizeInMb
                ? t("forms.files.allow_size_per_file", {
                    size: maxFileSizeInMb
                  })
                : ""}
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            disabled={disabled}
            ref={inputRef}
            onChange={e => handleUploadFile(e.target.files)}
            multiple={multiple}
            value=""
            {...props}
          />
        </div>
      )}

      <PreviewFilesInput value={stateValue} onChange={onChange} />
    </>
  );
};
