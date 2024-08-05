import { ItemPreviewFilesInput } from './item-preview-files-input';
import { FilesInputValue } from '@/components/ui/file-input';

interface Props {
  showInfo?: boolean;
}

interface WithMultiple extends Props {
  multiple: true;
  onChange: (e: FilesInputValue[]) => void;
  value: FilesInputValue[];
}

interface WithoutMultiple extends Props {
  onChange: (e: FilesInputValue | null) => void;
  value: FilesInputValue | null;
  multiple?: false;
}

export const PreviewFilesInput = ({
  onChange,
  value,
  showInfo,
  multiple,
}: WithMultiple | WithoutMultiple) => {
  if (!value || (Array.isArray(value) && value.length === 0)) return null;

  return (
    <ul className="flex flex-col gap-4">
      {[...(Array.isArray(value) ? value : [value])].map((file, index) => (
        <ItemPreviewFilesInput
          key={
            file instanceof File
              ? `${file.name}_${file.lastModified}_${file.size}`
              : `${file.dir_folder}_${file.file_name}`
          }
          onChange={onChange as (e: FilesInputValue | null) => void}
          file={file}
          value={value as FilesInputValue | null}
          index={index}
          showInfo={showInfo}
          multiple={multiple as false}
        />
      ))}
    </ul>
  );
};
