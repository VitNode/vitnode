import type { ReactNode } from "react";

import { Header } from "./header/header";
import { QuickMenu } from "./quick-menu/quick-menu";
import { PoweredByVitNode } from "@/admin/core/global/powered-by";
import "./global.scss";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  /**
   * Thanks for using VitNode!
   *
   * ! This is an open source project, you can use it for free.
   * ! If you want to support us, please consider donating.
   * ! You can remove this component if you want, but we will be very grateful if you leave it.
   * ! Thank you for your support!
   */
  const poweredBy = (
    <footer className="text-center p-5 text-sm md:mb-0 mb-16">
      <PoweredByVitNode className="text-muted-foreground no-underline" />
    </footer>
  );

  return (
    <>
      <Header />

      {children}
      {poweredBy}
      <QuickMenu />
    </>
  );
}
