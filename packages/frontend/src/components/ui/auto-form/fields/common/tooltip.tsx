export const AutoFormTooltip = ({
  description,
}: {
  description?: React.ReactNode;
}) => {
  return (
    description && (
      <p className="text-muted-foreground text-sm">{description}</p>
    )
  );
};
