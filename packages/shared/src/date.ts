export const currentUnixDate = () => Math.floor(+new Date() / 1000);

export const convertDateToUnixTime = (date: string) =>
  Math.floor(new Date(date).getTime() / 1000);
