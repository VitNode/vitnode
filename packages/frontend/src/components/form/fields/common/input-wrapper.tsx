import { ControllerRenderProps } from 'react-hook-form';

export const AutoFormInputWrapper = ({
  children,
  Wrapper,
  field,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<Record<string, any>>;
  Wrapper?: (props: {
    children: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    field: ControllerRenderProps<Record<string, any>>;
  }) => React.ReactNode;
}) => {
  if (Wrapper) {
    return <Wrapper field={field}>{children}</Wrapper>;
  }

  return <>{children}</>;
};
