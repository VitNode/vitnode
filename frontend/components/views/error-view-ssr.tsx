import { lazy, type LazyExoticComponent } from "react";

export interface ErrorViewProps {
  code: "403" | "404" | "500" | string;
  className?: string;
}

interface Props extends ErrorViewProps {
  theme_id: number;
}

export const ErrorViewSSR = ({ theme_id, ...props }: Props) => {
  const ErrorView: LazyExoticComponent<(props: ErrorViewProps) => JSX.Element> =
    lazy(() =>
      import(`@/themes/${theme_id}/core/views/global/error/error-view`).catch(
        () => import("@/themes/1/core/views/global/error/error-view")
      )
    );

  return <ErrorView {...props} />;
};
