import { useMemo } from "react";
import { X } from "lucide-react";

import { Img } from "@/components/img";

interface Props {
  file: File;
  index: number;
  onChange: (e: File[]) => void;
  value: File[] | undefined;
}

const IMAGE_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];

export const ItemPreviewFilesInput = ({
  file,
  index,
  onChange,
  value
}: Props): JSX.Element => {
  const previewURL = useMemo(
    (): string => (file instanceof File ? URL.createObjectURL(file) : ``),
    [file]
  );
  const size = useMemo((): string => {
    if (file instanceof File) {
      const sizeInKb = file.size / 1024;
      if (sizeInKb < 1024) return `${sizeInKb.toFixed(2)} KB`;

      const sizeInMb = sizeInKb / 1024;
      if (sizeInMb < 1024) return `${sizeInMb.toFixed(2)} MB`;

      const sizeInGb = sizeInMb / 1024;

      return `${sizeInGb.toFixed(2)} GB`;
    }

    return "";
  }, [file]);

  const handleRemoveFile = (): void => {
    if (!value) return;

    onChange(value.filter((_, i): boolean => i !== index));
  };

  return (
    <li className="relative p-4 rounded-md bg-background border border-input flex gap-4 overflow-hidden">
      {IMAGE_FILE_TYPES.includes(file.type) && (
        <Img
          className="rounded-sm flex-shrink-0"
          imageClassName="object-cover"
          src={previewURL}
          alt={file instanceof File ? file.name : ""}
          width={64}
          height={64}
        />
      )}
      <div className="mr-6 overflow-hidden">
        <p className="truncate">{file.name}</p>
        <p className="text-sm text-muted-foreground">{size}</p>
      </div>
      <button
        type="button"
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        onClick={handleRemoveFile}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Close</span>
      </button>
    </li>
  );
};
