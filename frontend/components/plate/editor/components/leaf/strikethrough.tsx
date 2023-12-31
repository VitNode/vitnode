import { PlateLeaf, type PlateLeafProps } from '@udecode/plate-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StrikethroughLeafEditor = ({ className, ...props }: PlateLeafProps) => {
  return <PlateLeaf className="line-through" {...props} />;
};
