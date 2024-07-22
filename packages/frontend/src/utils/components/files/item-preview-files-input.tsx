import React from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

import { acceptMimeTypeImage } from '../../../helpers/files-support';

export const ItemPreviewFilesInput = ({
  file,
  index,
  onChange,
  value,
}: {
  file: File;
  index: number;
  onChange: (e: File[]) => void;
  value: File[] | undefined;
}) => {
  const previewURL = React.useMemo(
    () => (file instanceof File ? URL.createObjectURL(file) : ``),
    [file],
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

    return '';
  }, [file]);

  const handleRemoveFile = () => {
    if (!value) return;

    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <li className="border-input bg-background relative flex gap-4 overflow-hidden rounded-md border p-2">
      {acceptMimeTypeImage.includes(file.type) && (
        <div className="relative size-10 shrink-0 rounded-sm">
          <Image
            src={previewURL}
            className="object-cover"
            alt={file instanceof File ? file.name : ''}
            sizes="100px"
            fill
          />
        </div>
      )}
      <div className="mr-6 overflow-hidden">
        <p className="@xs:text-base truncate text-sm">{file.name}</p>
        <p className="text-muted-foreground @xs:text-sm text-xs">{size}</p>
      </div>
      <button
        type="button"
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-2 top-2 flex size-6 items-center justify-center rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        onClick={handleRemoveFile}
      >
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </button>
    </li>
  );
};
