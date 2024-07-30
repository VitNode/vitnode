import React from 'react';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { FilesInputValue } from '@/components/ui/files-input';
import { CONFIG } from '@/helpers/config-with-env';

import { acceptMimeTypeImage } from '../../../helpers/files-support';

export const ItemPreviewFilesInput = ({
  file,
  index,
  onChange,
  value,
}: {
  file: FilesInputValue;
  index: number;
  onChange: (e: FilesInputValue[]) => void;
  value: FilesInputValue[] | undefined;
}) => {
  const t = useTranslations('core');

  const size = React.useMemo(() => {
    const sizeInKb = file instanceof File ? file.size : file.file_size / 1024;
    if (sizeInKb < 1024) return `${sizeInKb.toFixed(2)} KB`;

    const sizeInMb = sizeInKb / 1024;
    if (sizeInMb < 1024) return `${sizeInMb.toFixed(2)} MB`;

    const sizeInGb = sizeInMb / 1024;

    return `${sizeInGb.toFixed(2)} GB`;
  }, [file]);

  const handleRemoveFile = () => {
    if (!value) return;

    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <li className="border-input bg-background relative flex items-start gap-2 rounded-md border p-2">
      {acceptMimeTypeImage.includes(
        file instanceof File ? file.type : file.mimetype,
      ) && (
        <div className="relative size-10 shrink-0 rounded-sm">
          <Image
            src={
              file instanceof File
                ? URL.createObjectURL(file)
                : `${CONFIG.backend_public_url}/${file.dir_folder}/${file.file_name}`
            }
            className="object-cover"
            alt={file instanceof File ? file.name : file.file_name_original}
            sizes="100px"
            fill
          />
        </div>
      )}
      <div className="mr-6 truncate">
        <p className="@xs:text-base truncate text-sm">
          {file instanceof File ? file.name : file.file_name}
        </p>
        <p className="text-muted-foreground @xs:text-sm text-xs">{size}</p>
      </div>
      <button
        type="button"
        className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground ml-auto flex size-7 flex-shrink-0 items-center justify-center rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
        onClick={handleRemoveFile}
      >
        <Trash2 className="size-4" />
        <span className="sr-only">{t('delete')}</span>
      </button>
    </li>
  );
};
