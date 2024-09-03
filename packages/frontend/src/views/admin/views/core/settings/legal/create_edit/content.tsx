import { AutoForm, DependencyType } from '@/components/form/auto-form';
import { AutoFormEditor } from '@/components/form/fields/editor';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { AutoFormTextLanguageInput } from '@/components/form/fields/text-language-input';
import { useDialog } from '@/components/ui/dialog';
import { zodLanguageInput } from '@/helpers/zod';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import * as z from 'zod';

import { createMutationApi } from './create-mutation-api';

export const ContentCreateEditLegalPage = () => {
  const t = useTranslations('admin.core.settings.legal.create_edit');
  const tCore = useTranslations('core.errors');
  const { convertText } = useTextLang();
  const { setOpen } = useDialog();

  const formSchema = z
    .object({
      title: zodLanguageInput,
      content: zodLanguageInput.optional(),
      external_href: z.boolean().optional(),
      href: z.string().optional(),
    })
    .refine(data => {
      if (data.external_href) {
        return data.href;
      }

      return data.content?.length;
    });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const createMutation = await createMutationApi({
      title: values.title,
      content: values.external_href ? [] : (values.content ?? []),
      href: values.external_href ? values.href : undefined,
    });

    if (createMutation?.error) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    setOpen?.(false);
    toast.success(t('create_success'), {
      description: convertText(values.title),
    });
  };

  return (
    <>
      <AutoForm
        dependencies={[
          {
            sourceField: 'external_href',
            type: DependencyType.HIDES,
            targetField: 'href',
            when: (state: boolean) => !state,
          },
          {
            sourceField: 'external_href',
            type: DependencyType.REQUIRES,
            targetField: 'href',
            when: (state: boolean) => state,
          },
          {
            sourceField: 'external_href',
            type: DependencyType.HIDES,
            targetField: 'content',
            when: (state: boolean) => state,
          },
          {
            sourceField: 'external_href',
            type: DependencyType.REQUIRES,
            targetField: 'content',
            when: (state: boolean) => !state,
          },
        ]}
        fields={[
          {
            id: 'title',
            label: t('form.title'),
            component: AutoFormTextLanguageInput,
          },
          {
            id: 'external_href',
            label: t('form.external_href'),
            component: AutoFormSwitch,
          },
          {
            id: 'href',
            label: t('form.href'),
            component: AutoFormInput,
            componentProps: {
              type: 'url',
            } as AutoFormInputProps,
          },
          {
            id: 'content',
            label: t('form.content'),
            component: AutoFormEditor,
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
      />
    </>
  );
};
