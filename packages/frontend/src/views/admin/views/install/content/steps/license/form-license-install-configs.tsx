import { AutoForm } from '@/components/auto-form/auto-form';
import { AutoFormCheckbox } from '@/components/auto-form/fields/checkbox';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import * as z from 'zod';

import { useInstallVitnode } from '../../hooks/use-install-vitnode';

export const FormLicenseInstallConfigs = () => {
  const tCore = useTranslations('core');
  const { setCurrentStep } = useInstallVitnode();

  const formSchema = z.object({
    agree: z.boolean({
      required_error: tCore('forms.empty'),
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = (_: z.infer<typeof formSchema>) => {
    setCurrentStep(prev => prev + 1);
  };

  return (
    <AutoForm
      fields={[
        {
          id: 'agree',
          component: AutoFormCheckbox,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      submitButton={props => <Button {...props}>Next step</Button>}
    />
  );
};
