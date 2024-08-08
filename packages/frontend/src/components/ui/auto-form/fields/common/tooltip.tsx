export const AutoFormTooltip = ({
  description,
  value,
}: {
  description: React.ReactNode | ((value: unknown) => React.ReactNode);
  value: unknown;
}) => {
  const current =
    typeof description === 'function' ? description(value) : description;

  return <p className="text-muted-foreground text-sm">{current}</p>;
};
