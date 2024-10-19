export const AutoFormInputWrapper = ({
  children,
  Wrapper,
}: {
  children: React.ReactNode;
  Wrapper?: (props: { children: React.ReactNode }) => React.ReactNode;
}) => {
  if (Wrapper) {
    return <Wrapper>{children}</Wrapper>;
  }

  return <>{children}</>;
};
