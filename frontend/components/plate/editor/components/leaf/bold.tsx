import { PlateLeaf, type PlateLeafProps } from '@udecode/plate-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const BoldLeafEditor = ({ className, ...props }: PlateLeafProps) => {
  return <PlateLeaf className="font-bold" {...props} />;
};
