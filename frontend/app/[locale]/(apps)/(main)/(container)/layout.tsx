import { lazy, type LazyExoticComponent, type ReactNode } from "react";

import { getSessionData } from "@/functions/get-session-data";
import type { ContainerLayoutProps } from "@/themes/1/core/layout/container-layout";

interface Props {
  children: ReactNode;
}

export default async function Layout({ children }: Props) {
  const { theme_id } = await getSessionData();
  const ContainerLayout: LazyExoticComponent<
    ({ children }: ContainerLayoutProps) => JSX.Element
  > = lazy(() =>
    import(`@/themes/${theme_id}/core/layout/container-layout`).catch(
      () => import("@/themes/1/core/layout/container-layout")
    )
  );

  return <ContainerLayout>{children}</ContainerLayout>;
}
