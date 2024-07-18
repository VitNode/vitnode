import { ImgAuthorizationSectionTabsHome } from "./img";

import { SectionHome } from "../../section";

export const AuthorizationSectionTabsHome = () => {
  return (
    <SectionHome
      title="Authentication"
      description="Secure your application with a powerful authentication."
      animateFromRight
      items={[
        {
          id: 1,
          text: (
            <>
              Protected <span className="font-bold text-primary">Pages</span> &{" "}
              <span className="font-bold text-primary">GraphQL API</span>
            </>
          )
        },
        {
          id: 2,
          text: (
            <>
              <span className="font-bold text-primary">Admin</span> &{" "}
              <span className="font-bold text-primary">Moderator</span> Control
              Panel
            </>
          )
        },
        {
          id: 3,
          text: "Groups, Roles & Permissions"
        },
        {
          id: 4,
          text: "Session save in Database"
        }
      ]}
    >
      <ImgAuthorizationSectionTabsHome />
    </SectionHome>
  );
};
