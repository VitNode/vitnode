const uuidPattern = /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g;

export const getUuidFromString = (str: string | string[]) => {
  const value = Array.isArray(str) ? str[0] : str;

  const uuid = value.match(uuidPattern)?.at(-1);

  if (!uuid) return value;

  return uuid;
};

export const getIdFormString = (str: string | string[]) => {
  const value = Array.isArray(str) ? str[0] : str;

  const split = value.split('-').at(-1);

  if (!split) return 0;
  const convertToNumber = Number(split);
  if (isNaN(convertToNumber)) return 0;

  return convertToNumber;
};
