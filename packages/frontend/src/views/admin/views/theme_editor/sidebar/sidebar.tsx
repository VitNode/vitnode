import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { ThemeEditorTab, useThemeEditor } from '../hooks/use-theme-editor';
import { ColorsTabThemeEditor } from './tabs/color';
import { LogosTabThemeEditor } from './tabs/logos';
import { MainTabThemeEditor } from './tabs/main';

export const SidebarThemeEditor = () => {
  const { activeTab, direction, form, onSubmit } = useThemeEditor();
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
        <AnimatePresence initial={false} mode="popLayout">
          <ScrollArea className="flex-1">
            <motion.div
              animate="active"
              className="p-4"
              custom={direction}
              exit="exit"
              initial="initial"
              key={activeTab}
              transition={{ duration: 0.25, type: 'spring', bounce: 0 }}
              variants={{
                initial: direction => {
                  return { x: `${110 * direction}%`, opacity: 0 };
                },
                active: { x: '0%', opacity: 1 },
                exit: direction => {
                  return { x: `${110 * direction}%`, opacity: 0 };
                },
              }}
            >
              {tabs[activeTab]}
            </motion.div>
          </ScrollArea>
        </AnimatePresence>

        <div className="bg-card/75 flex items-center gap-2 border-t p-3 backdrop-blur">
          <Button asChild className="w-full" size="sm" variant="ghost">
            <Link href="/admin/core/dashboard">{t('cancel')}</Link>
          </Button>

          <Button
            className="w-full"
            loading={form.formState.isSubmitting}
            size="sm"
            type="submit"
          >
            {t('save')}
          </Button>
        </div>
      </form>
    </Form>
  );
};
