export const increaseVersionString = (version: string): string => {
  const [major, minor, patch] = version.split(".");

  return `${major}.${minor}.${parseInt(patch) + 1}`;
};
