'use server';

import { revalidatePath } from 'next/cache';

export const mutationClearCache = () => {
  revalidatePath('/', 'layout');
};
