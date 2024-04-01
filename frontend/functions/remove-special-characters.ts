export const removeSpecialCharacters = (text: string): string =>
  text
    .trimStart()
    .trimEnd()
    .replace(/\s/g, "-")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[#%&?^|'{}\\/]/g, "")
    .replace(/ł/g, "l")
    .trim();

export const checkSpecialCharacters = (text: string): boolean => {
  return /^[a-z0-9-]+$/i.test(text);
};
