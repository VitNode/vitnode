import * as React from "react";

export interface ErrorViewProps {
  code: string | "403" | "404" | "500";
  className?: string;
}

interface Props extends ErrorViewProps {
  theme_id: number;
}

export const ErrorViewSSR = ({ theme_id, ...props }: Props) => {
  const ErrorView: React.LazyExoticComponent<
    (props: ErrorViewProps) => JSX.Element
  > = React.lazy(async () =>
    import(`@/themes/${theme_id}/core/views/global/error/error-view`).catch(
      async () => import("@/themes/1/core/views/global/error/error-view")
    )
  );

  return <ErrorView {...props} />;
};
