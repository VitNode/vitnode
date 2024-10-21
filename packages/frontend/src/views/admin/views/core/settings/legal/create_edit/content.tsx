import { AutoForm, DependencyType } from '@/components/form/auto-form';
import { AutoFormEditor } from '@/components/form/fields/editor';
import { AutoFormInput } from '@/components/form/fields/input';
import { AutoFormSwitch } from '@/components/form/fields/switch';
import { AutoFormStringLanguageInput } from '@/components/form/fields/text-language-input';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/components/ui/dialog';
import { Admin_Core_Terms__ShowQuery } from '@/graphql/queries/admin/settings/terms/Admin_core_terms__show.generated';
import { removeSpecialCharacters } from '@/helpers/special-characters';
import { zodLanguageInput } from '@/helpers/zod';
import { useTextLang } from '@/hooks/use-text-lang';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

import { createMutationApi } from './create-mutation-api';
import { editMutationApi } from './edit-mutation-api';

export const ContentCreateEditLegalPage = ({
  data,
}: {
  data?: Admin_Core_Terms__ShowQuery['core_terms__show']['edges'][0];
}) => {
  const t = useTranslations('admin.core.settings.legal.create_edit');
  const tCore = useTranslations('core.global.errors');
  const { convertText } = useTextLang();
  const { setOpen } = useDialog();

  const formSchema = z
    .object({
      title: zodLanguageInput.default(data?.title ?? []),
      content: zodLanguageInput.default(data?.content ?? []).optional(),
      code: z.string().default(data?.code ?? ''),
      external_href: z.boolean().default(!!data?.href).optional(),
      href: z
        .string()
        .default(data?.href ?? '')
        .optional(),
    })
    .refine(data => {
      if (data.external_href) {
        return data.href;
      }

      return data.content?.length;
    });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    form: UseFormReturn<z.infer<typeof formSchema>>,
  ) => {
    let error = '';

    if (data) {
      const mutation = await editMutationApi({
        id: data.id,
        title: values.title,
        content: values.external_href ? [] : (values.content ?? []),
        href: values.external_href ? values.href : undefined,
        code: values.code,
        prevCode: data.code,
      });

      if (mutation?.error) {
        error = mutation.error;
      }
    } else {
      const mutation = await createMutationApi({
        title: values.title,
        content: values.external_href ? [] : (values.content ?? []),
        href: values.external_href ? values.href : undefined,
        code: values.code,
      });

      if (mutation?.error) {
        error = mutation.error;
      }
    }

    if (error) {
      if (error === 'ALREADY_EXISTS') {
        form.setError('code', {
          message: t('form.code.already_exists'),
        });

        return;
      }

      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    setOpen?.(false);
    toast.success(t(`success.${data ? 'edit' : 'create'}`), {
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
            component: AutoFormStringLanguageInput,
          },
          {
            id: 'code',
            label: t('form.code.title'),
            description: t('form.code.desc'),
            component: props => <AutoFormInput {...props} />,
            wrapper: ({ field, children }) => {
              const value: string = field.value ?? '';
              const parsedValue = removeSpecialCharacters(value);

              return (
                <>
                  {children}
                  <div className="text-muted-foreground mt-1 text-sm">
                    {t.rich('form.code.preview_url', {
                      url: () => (
                        <span className="text-foreground font-semibold">{`/legal/${parsedValue}`}</span>
                      ),
                    })}
                  </div>
                </>
              );
            },
          },
          {
            id: 'external_href',
            label: t('form.external_href'),
            component: AutoFormSwitch,
          },
          {
            id: 'href',
            label: t('form.href'),
            component: props => <AutoFormInput {...props} type="url" />,
          },
          {
            id: 'content',
            label: t('form.content'),
            component: props => (
              <AutoFormEditor
                {...props}
                allowUploadFiles={{
                  folder: 'legal',
                  plugin: 'core',
                }}
              />
            ),
          },
        ]}
        formSchema={formSchema}
        onSubmit={onSubmit}
        submitButton={props => (
          <Button {...props}>{t(`submit.${data ? 'edit' : 'create'}`)}</Button>
        )}
      />
    </>
  );
};
