'use client';

import { AutoForm } from '@/components/form/auto-form';
import { AutoFormEditor } from '@/components/form/fields/editor';
import { Card, CardContent } from '@/components/ui/card';
import { zodLanguageInput } from '@/helpers/zod';
import React from 'react';
import * as z from 'zod';

export const Test = () => {
  const formSchema = z.object({
    content: zodLanguageInput,
  });

  return (
    <Card>
      <CardContent className="p-6">
        <AutoForm
          fields={[
            {
              id: 'content',
              component: AutoFormEditor,
            },
          ]}
          formSchema={formSchema}
        />
      </CardContent>
    </Card>
  );
};
