import React from 'react';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { UploadCoreFilesObj } from '@/graphql/types';
import { PreviewFilesInput } from '../utils/files/preview-files-input';

import { useMergeRefs } from '../../helpers/use-merge-refs';
import { cn } from '../../helpers/classnames';

export type FilesInputValue = File | UploadCoreFilesObj;

interface FilesInputInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'multiple' | 'onChange' | 'type' | 'value'
  > {
  acceptExtensions?: string[];
  maxFileSizeInMb?: number;
  ref?: React.RefCallback<HTMLInputElement>;
  showInfo?: boolean;
}

interface WithMultiple extends FilesInputInputProps {
  multiple: true;
  onChange: (e: FilesInputValue[]) => void;
  value: FilesInputValue[];
}

interface WithoutMultiple extends FilesInputInputProps {
  onChange: (e: FilesInputValue | null) => void;
  value: FilesInputValue | null;
  multiple?: false;
}

export const FileInput = ({
  acceptExtensions,
  className,
  disabled,
  maxFileSizeInMb = 0,
  multiple,
  onChange,
  value,
  ref,
  showInfo,
  ...props
}: WithMultiple | WithoutMultiple) => {
  const t = useTranslations('core');
  const [isDrag, setDrag] = React.useState(false);
  const currentRef = React.useRef<HTMLInputElement>(null);
  const inputRef = useMergeRefs([ref, currentRef]);

  const handleUploadFile = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Validate files
    const currentFiles = Array.from(files).filter(file => {
      const splitFileName = file.name.split('.');
      const extensionType = splitFileName.at(-1);

      if (
        extensionType &&
        acceptExtensions &&
        !acceptExtensions.includes(extensionType)
      ) {
        toast.error(t('forms.files.errors.extension', { file: file.name }));

        return;
      }

      if (maxFileSizeInMb && file.size > maxFileSizeInMb * 1024 * 1024) {
        toast.error(t('forms.files.errors.max_size', { file: file.name }));

        return;
      }

      return file;
    });

    if (currentFiles.length === 0) return;

    if (multiple) {
      onChange([...(value || []), ...currentFiles]);

      return;
    }

    const current = currentFiles.at(0);
    if (!current) return;

    onChange(current);
  };

  return (
    <div className="@container flex-1">
      {((!value && !multiple) || multiple) && (
        <div
          className={cn(
            'm-h-32 border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full flex-col rounded-md border px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            {
              'cursor-not-allowed opacity-50': disabled,
              'ring-ring outline-none ring-2 ring-offset-2': isDrag,
            },
          )}
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={() => currentRef.current?.click()}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              currentRef.current?.click();
            }
          }}
          onDragOver={e => {
            if (!e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            e.stopPropagation();

            setDrag(true);
          }}
          onDragLeave={e => {
            if (!e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            e.stopPropagation();

            if (e.currentTarget.contains(e.relatedTarget as Node)) return;
            setDrag(false);
          }}
          onDrop={e => {
            if (!e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            e.stopPropagation();
            setDrag(false);
            handleUploadFile(e.dataTransfer.files);
          }}
        >
          <div className="text-muted-foreground @xs:p-4 flex items-center gap-4 p-1">
            <Upload className="size-5 flex-shrink-0" />

            <div className="space-y-1">
              <p className="text-sm">
                {t(isDrag ? 'forms.files.drop_here' : 'forms.files.title')}
              </p>

              {showInfo && (
                <p className="text-xs">
                  {acceptExtensions?.join(', ').toUpperCase()}{' '}
                  {maxFileSizeInMb
                    ? t('forms.files.allow_size_per_file', {
                        size: maxFileSizeInMb,
                      })
                    : ''}
                </p>
              )}
            </div>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            disabled={disabled}
            ref={inputRef}
            onChange={e => {
              handleUploadFile(e.target.files);
            }}
            multiple={multiple}
            value=""
            {...props}
          />
        </div>
      )}

      <PreviewFilesInput
        value={value as FilesInputValue[]}
        onChange={onChange as (e: FilesInputValue[]) => void}
        showInfo={showInfo}
        multiple={multiple as true}
      />
    </div>
  );
};
