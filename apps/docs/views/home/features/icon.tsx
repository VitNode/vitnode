interface Props {
  children: React.ReactNode;
}

export const IconFeatures = ({ children }: Props) => {
  return (
    <div className="inline-flex size-14 items-center justify-center rounded-md border bg-card">
      {children}
    </div>
  );
};
