import { PlateLeaf, type PlateLeafProps } from '@udecode/plate-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const UnderlineLeafEditor = ({ className, ...props }: PlateLeafProps) => {
  return <PlateLeaf className="underline" {...props} />;
};
