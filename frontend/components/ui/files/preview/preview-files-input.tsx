import { ItemPreviewFilesInput } from "./item/item-preview-files-input";

interface Props {
  onChange: (e: File[]) => void;
  value: File[] | undefined;
}

export const PreviewFilesInput = ({
  onChange,
  value
}: Props): JSX.Element | null => {
  if (!value || value.length === 0) return null;

  return (
    <ul className="flex flex-col gap-4">
      {value.map(
        (file, index): JSX.Element => (
          <ItemPreviewFilesInput
            key={`${file.name}_${file.lastModified}_${file.size}`}
            onChange={onChange}
            file={file}
            value={value}
            index={index}
          />
        )
      )}
    </ul>
  );
};
