import { PlateElement, type PlateElementProps } from '@udecode/plate-common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props extends PlateElementProps {
  heading: 'h1' | 'h2' | 'h3' | 'h4';
}

export const HeadingElementEditor = ({ className, heading, ...props }: Props) => {
  const headingClass: { [vsl: string]: string } = {
    h1: 'text-4xl',
    h2: 'text-3xl',
    h3: 'text-2xl',
    h4: 'text-xl'
  };

  return <PlateElement className={headingClass[heading]} {...props} />;
};
