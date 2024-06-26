import Link from "next/link";

import { ImgLanguageSectionTabsHome } from "./img";

import { SectionHome } from "../../section";

export const LanguageSectionTabsHome = () => {
  return (
    <>
      <SectionHome
        title="Multi-Language"
        description="No language limit unlocks a growing community."
        items={[
          {
            id: 1,
            text: (
              <>
                Easy <span className="font-bold text-primary">Import</span> and{" "}
                <span className="font-bold text-primary">Export</span> Language
                Pack
              </>
            )
          },
          {
            id: 2,
            text: "Auto Language Detection"
          },
          {
            id: 3,
            text: "Internationalized Routing"
          },
          {
            id: 4,
            text: (
              <>
                <span className="font-bold text-primary">Text Input</span> &{" "}
                <span className="font-bold text-primary">WYSIWYG Editor</span>{" "}
                with Translations
              </>
            )
          }
        ]}
        footer={
          <Link
            href="https://next-intl-docs.vercel.app/"
            className="text-muted-foreground text-xs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <span className="font-semibold">next-intl</span>
          </Link>
        }
      >
        <ImgLanguageSectionTabsHome />
      </SectionHome>
    </>
  );
};
