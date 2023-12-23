export const removeSpecialCharacters = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s/g, '-')
    .replace(/ł/g, 'l');

export const checkSpecialCharacters = (text: string) => {
  return /^[a-z0-9-]+$/i.test(text);
};
