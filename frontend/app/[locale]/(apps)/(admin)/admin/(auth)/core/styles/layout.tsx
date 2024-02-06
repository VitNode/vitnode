import type { ReactNode } from "react";

import { StylesAdminLayout } from "@/admin/core/views/core/styles/styles-admin-layout";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return <StylesAdminLayout>{children}</StylesAdminLayout>;
}
