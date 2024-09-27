import { cookies } from 'next/headers';
import 'server-only';

export const getUserIdCookie = () => {
  return cookies().get('vitnode-user-id')?.value;
};

export const getAdminIdCookie = () => {
  return cookies().get('vitnode-admin-id')?.value;
};
