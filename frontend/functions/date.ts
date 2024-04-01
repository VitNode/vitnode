import { fromUnixTime } from "date-fns";

export const currentDate = (): number => Math.floor(+new Date() / 1000);

export const convertUnixTime = (time: string | number): Date =>
  typeof time === "string" ? new Date(time) : fromUnixTime(time);

export const convertDateToUnixTime = (date: string): number =>
  Math.floor(new Date(date).getTime() / 1000);
