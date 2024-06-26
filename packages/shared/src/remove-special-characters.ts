export const removeSpecialCharacters = (text: string) =>
  text
    .trimStart()
    .trimEnd()
    .replace(/\s/g, '-')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[#%&?^|'{}\\/]/g, '')
    .replace(/ł/g, 'l')
    .replace(/@/g, '-at-')
    .replace(/\./g, '-')
    .trim();

export const checkSpecialCharacters = (text: string) => {
  return /^[a-z0-9-]+$/i.test(text);
};
