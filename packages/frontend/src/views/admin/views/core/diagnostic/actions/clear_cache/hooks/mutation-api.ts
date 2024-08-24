'use server';

import { revalidatePath } from 'next/cache';

export const mutationApi = () => {
  revalidatePath('/', 'layout');
};
