import { FilesInputValue } from '@/components/ui/file-input';

import { ItemPreviewFilesInput } from './item-preview-files-input';

interface Props {
  showInfo?: boolean;
}

interface WithMultiple extends Props {
  multiple: true;
  onChange: (e: FilesInputValue[]) => void;
  value: FilesInputValue[];
}

interface WithoutMultiple extends Props {
  multiple?: false;
  onChange: (e: FilesInputValue | null) => void;
  value: FilesInputValue | null;
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
          file={file}
          index={index}
          key={
            file instanceof File
              ? `${file.name}_${file.lastModified}_${file.size}`
              : `${file.dir_folder}_${file.file_name}`
          }
          multiple={multiple as false}
          onChange={onChange as (e: FilesInputValue | null) => void}
          showInfo={showInfo}
          value={value as FilesInputValue | null}
        />
      ))}
    </ul>
  );
};
