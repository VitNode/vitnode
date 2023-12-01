import { useTranslations } from 'next-intl';
import { useFormContext } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextLanguageInput } from '@/components/text-language-input';

export const MainContentCreateEditFormForumAdmin = () => {
  const t = useTranslations('admin.forum.forums.create_edit.form');
  const form = useFormContext();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('name.label')}</FormLabel>
            <FormControl>
              <TextLanguageInput {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
