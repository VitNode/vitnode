export const getIdFormString = (str: string | string[]) => {
  const value = Array.isArray(str) ? str[0] : str;

  const split = value.split('-').at(-1);

  if (!split) return 0;
  const convertToNumber = Number(split);
  if (isNaN(convertToNumber)) return 0;

  return convertToNumber;
};
