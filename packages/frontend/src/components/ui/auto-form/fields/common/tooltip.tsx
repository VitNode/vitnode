export const AutoFormTooltip = ({
  description,
}: {
  description: React.ReactNode;
}) => {
  return <p className="text-muted-foreground text-sm">{description}</p>;
};
