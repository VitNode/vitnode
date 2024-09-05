import { revalidateTag } from 'next/cache';

export const revalidateApi = (code?: string, prevCode?: string) => {
  revalidateTag('core_terms__show');
  if (code ?? prevCode) {
    revalidateTag(`core_terms__show_${code ?? prevCode}`);
  }
};
