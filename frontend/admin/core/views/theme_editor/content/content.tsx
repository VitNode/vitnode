import { AnimatePresence, motion } from "framer-motion";

import { ThemeEditorTab, useThemeEditor } from "../hooks/use-theme-editor";
import { ColorTabThemeEditor } from "./tabs/color-tab";
import { MainTabThemeEditor } from "./tabs/main";

export const ContentThemeEditor = () => {
  const { activeTab, direction } = useThemeEditor();
  const tabs = {
    [ThemeEditorTab.Main]: MainTabThemeEditor,
    [ThemeEditorTab.Colors]: ColorTabThemeEditor
  };

  return (
    <form className="px-2 relative overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeTab}
          variants={{
            initial: direction => {
              return { x: `${110 * direction}%`, opacity: 0 };
            },
            active: { x: "0%", opacity: 1 },
            exit: direction => {
              return { x: `${110 * direction}%`, opacity: 0 };
            }
          }}
          initial="initial"
          animate="active"
          exit="exit"
          custom={direction}
          transition={{ duration: 0.5, type: "spring", bounce: 0 }}
        >
          {tabs[activeTab]()}
        </motion.div>
      </AnimatePresence>
    </form>
  );
};
