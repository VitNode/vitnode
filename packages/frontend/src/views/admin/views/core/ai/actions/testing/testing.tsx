'use client';

import { AutoForm } from '@/components/form/auto-form';
import {
  AutoFormInput,
  AutoFormInputProps,
} from '@/components/form/fields/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FlaskConical } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { mutationApi } from './mutation-api';

export const TestingActionAiAdmin = ({ disabled }: { disabled: boolean }) => {
  const t = useTranslations('admin.core.ai.settings.testing');
  const tCore = useTranslations('core.global.errors');
  const [response, setResponse] = React.useState<string>('');

  const formSchema = z.object({
    prompt: z.string().default(''),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mutation = await mutationApi(values);

    if (mutation.error || !mutation.data) {
      toast.error(tCore('title'), {
        description: tCore('internal_server_error'),
      });

      return;
    }

    setResponse(mutation.data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">
          <FlaskConical />
          {t('title')}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('desc')}</DialogDescription>
        </DialogHeader>

        <AutoForm
          fields={[
            {
              id: 'prompt',
              component: AutoFormInput,
              label: t('prompt'),
              componentProps: {
                placeholder: t('prompt_placeholder'),
              } as AutoFormInputProps,
            },
          ]}
          formSchema={formSchema}
          onSubmit={onSubmit}
          submitButton={props => <Button {...props}>{t('submit')}</Button>}
        >
          {response && (
            <div className="space-y-2">
              <Label htmlFor="response">{t('response')}</Label>
              <Textarea
                className="text-primary min-h-32"
                id="response"
                readOnly
                value={response}
              />
              <p className="text-muted-foreground text-sm">
                {t('response_success')}
              </p>
            </div>
          )}
        </AutoForm>
      </DialogContent>
    </Dialog>
  );
};
