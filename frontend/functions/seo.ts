import { removeSpecialCharacters } from './remove-special-characters';

export const convertTextToTextSEO = (text: string | undefined) => {
  if (!text) return text;

  return removeSpecialCharacters(text).replace(/\//g, '-');
};
