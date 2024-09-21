import { revalidateTag } from 'next/cache';

export const revalidateApi = (code?: string, prevCode?: string) => {
  revalidateTag('core_terms__show');

  if (code) {
    revalidateTag(`core_terms__show-${code}`);
  }

  if (prevCode) {
    revalidateTag(`core_terms__show-${prevCode}`);
  }
};
