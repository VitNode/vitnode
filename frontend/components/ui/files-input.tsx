import { InputHTMLAttributes, forwardRef, useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useToast } from '@/components/ui/use-toast';
import { useMergeRefs } from '@/hooks/core/utils/use-merge-refs';
import { cx } from '@/functions/classnames';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  acceptExtensions: string[];
  maxFileSizeInMb: number;
  onChange: (e: File[]) => void;
  value: File[] | undefined;
}

const FilesInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      acceptExtensions,
      className,
      disabled,
      maxFileSizeInMb,
      multiple,
      onChange,
      value: stateValue,
      ...props
    },
    ref
  ) => {
    const t = useTranslations('core');
    const [isDrag, setDrag] = useState(false);
    const currentRef = useRef<HTMLInputElement>(null);
    const inputRef = useMergeRefs([ref, currentRef]);
    const { toast } = useToast();

    const handleUploadFile = (files: FileList | null) => {
      if (!files || files.length <= 0) return;

      // Validate files
      const currentFiles = Array.from(files).filter(file => {
        const splitFileName = file.name.split('.');
        const extensionType = splitFileName.at(-1);

        if (extensionType && !acceptExtensions.includes(extensionType)) {
          toast({
            variant: 'destructive',
            description: t('forms.files.errors.extension', { file: file.name })
          });

          return;
        }

        if (maxFileSizeInMb && file.size > maxFileSizeInMb * 1024 * 1024) {
          toast({
            variant: 'destructive',
            description: t('forms.files.errors.max_size', { file: file.name })
          });

          return;
        }

        return file;
      });

      if (currentFiles.length <= 0) return;

      if (multiple) {
        onChange([...(stateValue || []), ...currentFiles]);

        return;
      }

      const current = currentFiles.at(0);
      if (!current) return;

      onChange([current]);
    };

    if (stateValue && stateValue.length > 0 && !multiple) return;

    return (
      <label
        htmlFor="dropzone-file"
        className={cx(
          'flex flex-col items-center justify-center w-full m-h-32 rounded-md bg-background border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-center',
          className,
          {
            'opacity-50 cursor-not-allowed': disabled
          }
        )}
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
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-muted-foreground">
          <Upload />
          <p className="mb-2 text-sm mt-2 font-semibold">
            {t(isDrag ? 'forms.files.drop_here' : 'forms.files.title')}
          </p>
          <p className="text-xs">
            {acceptExtensions.join(', ').toUpperCase()}{' '}
            {t('forms.files.allow_size_per_file', { size: maxFileSizeInMb })}
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
      </label>
    );
  }
);
FilesInput.displayName = 'Input';

export { FilesInput };
