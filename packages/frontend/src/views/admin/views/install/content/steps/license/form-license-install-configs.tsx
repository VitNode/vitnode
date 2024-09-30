import { AutoForm } from '@/components/form/auto-form';
import { AutoFormCheckbox } from '@/components/form/fields/checkbox';
import { Button } from '@/components/ui/button';
import * as z from 'zod';

import { useInstallVitnode } from '../../hooks/use-install-vitnode';

export const FormLicenseInstallConfigs = () => {
  const { setCurrentStep } = useInstallVitnode();

  const formSchema = z.object({
    agree: z.boolean(),
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
          label: 'I agree to the terms of the license agreement.',
          component: AutoFormCheckbox,
        },
      ]}
      formSchema={formSchema}
      onSubmit={onSubmit}
      submitButton={props => <Button {...props}>Next step</Button>}
    />
  );
};
