'use client';
import { AutoForm } from '@/components/form/auto-form';
import * as z from 'zod';

export const AiAdminView = () => {
  const formSchema = z.object({});

  return (
    <>
      <AutoForm fields={[]} formSchema={formSchema} />
    </>
  );
};
