import * as React from "react";

import { LayoutConfigs } from "@/admin/core/configs/layout-configs";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <LayoutConfigs>{children}</LayoutConfigs>;
}
