import * as React from "react";
import { X } from "lucide-react";

import { Img } from "@/components/img";
import { acceptMimeTypeImage } from "@/components/editor/extensions/files/files";

interface Props {
  file: File;
  index: number;
  onChange: (e: File[]) => void;
  value: File[] | undefined;
}

export const ItemPreviewFilesInput = ({
  file,
  index,
  onChange,
  value
}: Props) => {
  const previewURL = React.useMemo(
    () => (file instanceof File ? URL.createObjectURL(file) : ``),
    [file]
  );
  const size = React.useMemo(() => {
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

  const handleRemoveFile = () => {
    if (!value) return;

    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <li className="border-input bg-background relative flex gap-4 overflow-hidden rounded-md border p-4">
      {acceptMimeTypeImage.includes(file.type) && (
        <Img
          className="shrink-0 rounded-sm"
          imageClassName="object-cover"
          src={previewURL}
          alt={file instanceof File ? file.name : ""}
          width={64}
          height={64}
        />
      )}
      <div className="mr-6 overflow-hidden">
        <p className="truncate">{file.name}</p>
        <p className="text-muted-foreground text-sm">{size}</p>
      </div>
      <button
        type="button"
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        onClick={handleRemoveFile}
      >
        <X className="size-6" />
        <span className="sr-only">Close</span>
      </button>
    </li>
  );
};
