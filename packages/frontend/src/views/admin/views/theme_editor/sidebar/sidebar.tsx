import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ThemeEditorTab, useThemeEditor } from '../hooks/use-theme-editor';
import { ColorsTabThemeEditor } from './tabs/color';
import { MainTabThemeEditor } from './tabs/main';
import { SubmitSidebarThemeEditor } from './submit';
import { Form } from '@/components/ui/form';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/navigation';
import { LogosTabThemeEditor } from './tabs/logos';
import { ScrollArea } from '@/components/ui/scroll-area';

export const SidebarThemeEditor = () => {
  const {
    activeTab,
    direction,
    form,
    onSubmit,
    openSubmitDialog,
    setOpenSubmitDialog,
  } = useThemeEditor();
  const t = useTranslations('core');
  const tabs = {
    [ThemeEditorTab.Main]: <MainTabThemeEditor />,
    [ThemeEditorTab.Colors]: <ColorsTabThemeEditor />,
    [ThemeEditorTab.Logos]: <LogosTabThemeEditor />,
  };

  return (
    <Form {...form}>
      <form
        className="relative flex h-full w-64 flex-1 flex-col border-e"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <ScrollArea className="flex-1">
            <motion.div
              key={activeTab}
              className="p-4"
              variants={{
                initial: direction => {
                  return { x: `${110 * direction}%`, opacity: 0 };
                },
                active: { x: '0%', opacity: 1 },
                exit: direction => {
                  return { x: `${110 * direction}%`, opacity: 0 };
                },
              }}
              initial="initial"
              animate="active"
              exit="exit"
              custom={direction}
              transition={{ duration: 0.25, type: 'spring', bounce: 0 }}
            >
              {tabs[activeTab]}
            </motion.div>
          </ScrollArea>

          <div className="bg-card/75 flex items-center gap-2 border-t p-3 backdrop-blur">
            <Link
              href="/admin/core/dashboard"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className: 'w-full',
              })}
              aria-label={t('close')}
            >
              {t('cancel')}
            </Link>

            <SubmitSidebarThemeEditor
              onClick={async () => form.handleSubmit(onSubmit)()}
              isPending={form.formState.isSubmitting}
              disable={!form.formState.isDirty}
              openSubmitDialog={openSubmitDialog}
              setOpenSubmitDialog={setOpenSubmitDialog}
            />
          </div>
        </AnimatePresence>
      </form>
    </Form>
  );
};
