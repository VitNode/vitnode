import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextInputLanguage } from '@/components/text-input-language';

export const MainCreateActionsGroupsMembersAdmin = () => {
  const t = useTranslations('admin.members.groups.create.form');
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('name.label')}</FormLabel>
          <FormControl>
            <TextInputLanguage {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
