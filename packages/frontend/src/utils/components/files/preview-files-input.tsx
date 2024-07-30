import { FilesInputValue } from '@/components/ui/files-input';
import { ItemPreviewFilesInput } from './item-preview-files-input';

export const PreviewFilesInput = ({
  onChange,
  value,
}: {
  onChange: (e: FilesInputValue[]) => void;
  value: FilesInputValue[] | undefined;
}) => {
  if (!value || value.length === 0) return null;

  return (
    <ul className="flex flex-col gap-4">
      {value.map((file, index) => (
        <ItemPreviewFilesInput
          key={
            file instanceof File
              ? `${file.name}_${file.lastModified}_${file.size}`
              : `${file.dir_folder}_${file.file_name}`
          }
          onChange={onChange}
          file={file}
          value={value}
          index={index}
        />
      ))}
    </ul>
  );
};
