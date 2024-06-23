import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "vitnode-frontend/navigation";

import { ThemeEditorTab, useThemeEditor } from "../hooks/use-theme-editor";
import { ColorTabThemeEditor } from "./tabs/color-tab";
import { MainTabThemeEditor } from "./tabs/main";
import { Form } from "@/components/ui/form";
import { buttonVariants } from "@/components/ui/button";
import { SubmitContentThemeEditor } from "./submit";

export const ContentThemeEditor = () => {
  const {
    activeTab,
    direction,
    form,
    onSubmit,
    openSubmitDialog,
    setOpenSubmitDialog,
  } = useThemeEditor();
  const t = useTranslations("core");
  const tabs = {
    [ThemeEditorTab.Main]: <MainTabThemeEditor />,
    [ThemeEditorTab.Colors]: <ColorTabThemeEditor />,
  };

  return (
    <div className="relative flex flex-1 flex-col">
      <Form {...form}>
        <form
          className="relative flex flex-1 flex-col overflow-hidden"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
                },
              }}
              initial="initial"
              animate="active"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.25, type: "spring", bounce: 0 }}
            >
              {tabs[activeTab]}
            </motion.div>

            <div className="bg-card/75 sticky bottom-0 left-0 mt-auto flex w-full items-center gap-1 border-t p-3 backdrop-blur">
              <Link
                href="/"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "w-full",
                })}
                aria-label={t("close")}
              >
                {t("cancel")}
              </Link>

              <SubmitContentThemeEditor
                onClick={async () => form.handleSubmit(onSubmit)()}
                isPending={form.formState.isSubmitting}
                openSubmitDialog={openSubmitDialog}
                setOpenSubmitDialog={setOpenSubmitDialog}
              />
            </div>
          </AnimatePresence>
        </form>
      </Form>
    </div>
  );
};
