export const removeSpecialCharacters = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s/g, '-')
    .replace(/ł/g, 'l')
    .replace(/@/g, '-at-');

export const checkSpecialCharacters = (text: string) => {
  return /^[a-z0-9-]+$/i.test(text);
};
