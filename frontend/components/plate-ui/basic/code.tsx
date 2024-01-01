import { PlateLeaf, type PlateLeafProps } from '@udecode/plate-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const CodeLeafEditor = ({ className, ...props }: PlateLeafProps) => {
  return (
    <PlateLeaf
      className="whitespace-pre-wrap rounded-md bg-secondary px-[0.3em] py-[0.2em] font-mono text-sm"
      {...props}
    />
  );
};
