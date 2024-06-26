import { ImgThemesSectionTabsHome } from "./img";

import { SectionHome } from "../../section";

export const ThemesSectionTabsHome = () => {
  return (
    <SectionHome
      title="Themes"
      description="Extend your application with amazing plugins."
      animateFromRight
      items={[
        {
          id: 1,
          text: (
            <>
              <span className="font-bold text-primary">Designer</span> Mode
            </>
          )
        },
        {
          id: 2,
          text: <>Tailwind CSS, Radix UI, Shadcn UI</>
        },
        {
          id: 3,
          text: "Version Control System"
        },
        {
          id: 4,
          text: (
            <>
              Theme <span className="font-bold text-primary">Switcher</span>
            </>
          )
        }
      ]}
      footer={<>Time saved: ∞ hours</>}
    >
      <ImgThemesSectionTabsHome />
    </SectionHome>
  );
};
