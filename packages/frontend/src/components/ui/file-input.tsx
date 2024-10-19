import { UploadCoreFilesObj } from '@/graphql/types';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';

import { cn } from '../../helpers/classnames';
import { useMergeRefs } from '../../helpers/use-merge-refs';
import { PreviewFilesInput } from '../utils/files/preview-files-input';

export type FilesInputValue = File | UploadCoreFilesObj;

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
}: {
  acceptExtensions?: string[];
  maxFileSizeInMb?: number;
  multiple?: boolean;
  onChange: (e: FilesInputValue[]) => void;
  ref?: React.RefCallback<HTMLInputElement>;
  showInfo?: boolean;
  value: FilesInputValue[];
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'multiple' | 'onChange' | 'type' | 'value'
>) => {
  const t = useTranslations('core.global.files');
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
        toast.error(t('errors.extension', { file: file.name }));

        return;
      }

      if (maxFileSizeInMb && file.size > maxFileSizeInMb * 1024 * 1024) {
        toast.error(t('errors.max_size', { file: file.name }));

        return;
      }

      return file;
    });

    if (currentFiles.length === 0) return;

    if (multiple) {
      onChange([...(value ?? []), ...currentFiles]);

      return;
    }

    const current = currentFiles.at(0);
    if (!current) return;

    onChange([current]);
  };

  return (
    <div className="@container flex-1">
      {!value.length || multiple ? (
        <div
          className={cn(
            'm-h-32 border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full flex-col rounded-md border px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
            className,
            {
              'cursor-not-allowed opacity-50': disabled,
              'ring-ring outline-none ring-2 ring-offset-2': isDrag,
            },
          )}
          onClick={() => currentRef.current?.click()}
          onDragLeave={e => {
            if (!e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            e.stopPropagation();

            if (e.currentTarget.contains(e.relatedTarget as Node)) return;
            setDrag(false);
          }}
          onDragOver={e => {
            if (!e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            e.stopPropagation();

            setDrag(true);
          }}
          onDrop={e => {
            if (!e.dataTransfer.types.includes('Files')) return;
            e.preventDefault();
            e.stopPropagation();
            setDrag(false);
            handleUploadFile(e.dataTransfer.files);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              currentRef.current?.click();
            }
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
        >
          <div className="text-muted-foreground @xs:p-4 @xs:flex-col @xs:text-center flex items-center gap-4 text-left">
            <Upload className="@xs:size-7 size-5 flex-shrink-0" />

            <div className="space-y-1">
              <p className="text-foreground text-sm font-medium">
                {t(isDrag ? 'drop_here' : 'title')}
              </p>

              {(acceptExtensions?.length ?? maxFileSizeInMb) && (
                <p className="text-xs">
                  {acceptExtensions?.length
                    ? t.rich('extensions', {
                        extensions: () =>
                          acceptExtensions.join(', ').toUpperCase(),
                      })
                    : ''}

                  {maxFileSizeInMb
                    ? `, ${t('allow_size_per_file', {
                        size: maxFileSizeInMb,
                      })}`
                    : ''}
                </p>
              )}
            </div>
          </div>
          <input
            className="hidden"
            disabled={disabled}
            id="dropzone-file"
            multiple={multiple}
            onChange={e => {
              handleUploadFile(e.target.files);
            }}
            ref={inputRef}
            type="file"
            value=""
            {...props}
          />
        </div>
      ) : null}

      <PreviewFilesInput
        multiple={multiple as true}
        onChange={onChange as (e: FilesInputValue[]) => void}
        showInfo={showInfo}
        value={value}
      />
    </div>
  );
};
