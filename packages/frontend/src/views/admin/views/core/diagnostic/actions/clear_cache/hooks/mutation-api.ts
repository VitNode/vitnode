'use server';

import { revalidatePath } from 'next/cache';

export const mutationApi = async () => {
  revalidatePath('/', 'layout');
};
