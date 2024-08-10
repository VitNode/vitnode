import { useTranslations } from 'next-intl';
import * as z from 'zod';

import { Button } from '@/components/ui/button';

import { useInstallVitnode } from '../../hooks/use-install-vitnode';
import { AutoForm } from '@/components/ui/auto-form';
import { AutoFormCheckbox } from '@/components/ui/auto-form/fields/checkbox';

export const FormLicenseInstallConfigs = () => {
  const tCore = useTranslations('core');
  const { setCurrentStep } = useInstallVitnode();

  const formSchema = z.object({
    agree: z.boolean({
      required_error: tCore('forms.empty'),
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async (_: z.infer<typeof formSchema>) => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <AutoForm
      formSchema={formSchema}
      onSubmit={onSubmit}
      submitButton={props => <Button {...props}>Next step</Button>}
      fieldConfig={{
        agree: {
          label: 'I agree to the terms of the license agreement.',
          fieldType: AutoFormCheckbox,
        },
      }}
    />
  );
};
