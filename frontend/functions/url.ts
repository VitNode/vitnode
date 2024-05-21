import { removeSpecialCharacters } from "./remove-special-characters";

export const getIdFormString = (str: string[] | string) => {
  const value = Array.isArray(str) ? str[0] : str;
  const formatValue = removeSpecialCharacters(
    decodeURIComponent(value)
  ).toLowerCase();

  const split = formatValue.split("-").at(-1);

  if (!split) return 0;
  const convertToNumber = Number(split);
  if (isNaN(convertToNumber)) return 0;

  return convertToNumber;
};
