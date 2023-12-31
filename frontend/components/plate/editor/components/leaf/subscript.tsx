import { PlateLeaf, type PlateLeafProps } from '@udecode/plate-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SubscriptLeafEditor = ({ children, className, ...props }: PlateLeafProps) => {
  return (
    <PlateLeaf asChild className="line-through" {...props}>
      <sub>{children}</sub>
    </PlateLeaf>
  );
};
