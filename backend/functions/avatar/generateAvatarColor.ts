import { generateHSLFromName } from './generateHSLFromName';
import { hslToRgb } from './hslToRgb';

export const generateAvatarColor = (name: string) => {
  const hslName = generateHSLFromName(name);

  return hslToRgb(hslName[0], hslName[1], hslName[2]);
};
