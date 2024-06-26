import * as React from "react";
import { AuthLayout } from "vitnode-frontend/views/auth-layout";

import { Layout as LayoutCore } from "@/plugins/core/templates/layout/layout";

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default async function Layout({ children }: Props) {
  return (
    <AuthLayout>
      <LayoutCore>{children}</LayoutCore>
    </AuthLayout>
  );
}
