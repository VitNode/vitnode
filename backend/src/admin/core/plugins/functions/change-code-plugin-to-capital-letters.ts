export const changeCodePluginToCapitalLetters = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-([a-z])/g, g => g[1].toUpperCase());
};
