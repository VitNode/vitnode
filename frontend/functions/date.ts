import { fromUnixTime } from 'date-fns';

export const getCurrentDate = () => Math.floor(+new Date() / 1000);

export const convertUnixTime = (time: string | number) =>
  typeof time === 'string' ? new Date(time) : fromUnixTime(time);

export const convertDateToUnixTime = (date: string) => Math.floor(new Date(date).getTime() / 1000);
