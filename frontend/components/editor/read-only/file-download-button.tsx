interface Props {
  file_name: string;
}

export const FileDownloadButton = ({ file_name }: Props) => {
  return <div className="bg-purple-50">FileDownloadButton - {file_name}</div>;
};
