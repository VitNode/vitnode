import { removeSpecialCharacters } from "./remove-special-characters";

export const urlAllowedCharsRegex = /^[A-Za-z0-9-]*$/;

export const convertTextToTextSEO = (text: string | undefined) => {
  if (!text) return text;

  return removeSpecialCharacters(text).replace(/\//g, "-").toLowerCase();
};
