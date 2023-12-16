const uuidPattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

export const getUuidFromString = (str: string | string[]) => {
  const value = Array.isArray(str) ? str[0] : str;

  const uuid = value.match(uuidPattern)?.at(-1);

  if (!uuid) return value;

  return uuid;
};
