import { FeaturesHome } from "./features/features";
import { HeaderHome } from "./header/header";
import { PreviewSectionHome } from "./sections/preview";
import { AnimatedBeamDemo } from "./test";

export const HomeView = () => {
  return (
    <>
      <HeaderHome />
      {/* <PreviewSectionHome /> */}
      <FeaturesHome />

      <AnimatedBeamDemo />

      {/* <PluginsSectionHome />

      <TabsSectionHome /> */}
    </>
  );
};
