import { SectionHome } from "../../section";

export const PluginsSectionTabsHome = () => {
  return (
    <SectionHome
      title="Plugins"
      description="Extend your application with amazing plugins."
      items={[
        {
          id: 1,
          text: (
            <>
              Easy <span className="font-bold text-primary">Import</span> and{" "}
              <span className="font-bold text-primary">Export</span> Plugin Pack
            </>
          )
        },
        {
          id: 2,
          text: (
            <>
              Auto Migrations & Auto Schema database with{" "}
              <span className="font-bold text-primary">Drizzle</span>
            </>
          )
        },
        {
          id: 3,
          text: "Version Control System"
        }
      ]}
      footer={<>Time saved: ∞ hours</>}
    >
      <div className="flex-1">test</div>
    </SectionHome>
  );
};
