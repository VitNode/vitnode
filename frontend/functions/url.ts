const uuidPattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

export const getUuidFromString = (str: string) => {
  const uuid = str.match(uuidPattern)?.at(-1);

  if (!uuid) return str;

  return uuid;
};
