export const AutoFormInputWrapper = ({
  withChildren,
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
  withChildren: boolean;
}) => {
  if (className || withChildren) {
    return <div className={className}>{children}</div>;
  }

  return <>{children}</>;
};
