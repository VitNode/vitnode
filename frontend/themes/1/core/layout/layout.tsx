import { ReactNode } from "react";

import { Header } from "./header/header";
import { QuickMenu } from "./quick-menu/quick-menu";
import { PoweredByVitNode } from "@/admin/core/global/powered-by";
import { TextLanguage } from "@/graphql/hooks";
import { useTextLang } from "@/hooks/core/use-text-lang";
import "./global.css";

interface Props {
  children: ReactNode;
  copyright?: TextLanguage[];
}

export default function Layout({ children, copyright }: Props) {
  const { convertText } = useTextLang();

  /**
   * Thanks for using VitNode!
   *
   * ! This is an open source project, you can use it for free.
   * ! If you want to support us, please consider donating.
   * ! You can remove this component if you want, but we will be very grateful if you leave it.
   * ! Thank you for your support!
   */
  const poweredBy = (
    <footer className="text-center p-5 text-sm md:mb-0 mb-16 flex flex-col gap-2 items-center justify-center">
      {copyright && <span>{convertText(copyright)}</span>}
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
