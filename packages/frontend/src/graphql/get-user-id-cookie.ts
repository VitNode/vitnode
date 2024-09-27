import { cookies } from 'next/headers';
import 'server-only';

export const getUserIdCookie = () => {
  return cookies().get('vitnode-user-id')?.value;
};
