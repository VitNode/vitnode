import { PlateLeaf, type PlateLeafProps } from '@udecode/plate-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ItalicLeafEditor = ({ className, ...props }: PlateLeafProps) => {
  return <PlateLeaf className="italic" {...props} />;
};
