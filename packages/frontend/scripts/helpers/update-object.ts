export function updateObject<T extends Record<string, any>>(
  config: T,
  defaultData: T,
): T {
  const updatedConfig = config;
  for (const key in defaultData) {
    if (Array.isArray(defaultData[key])) {
      // If the key corresponds to an array and it's not empty, don't edit
      if (!config[key] || config[key].length === 0) {
        updatedConfig[key] = [] as any;
      }
    } else if (
      typeof defaultData[key] === "object" &&
      defaultData[key] !== null
    ) {
      // Handle nested objects
      if (!config[key]) {
        updatedConfig[key] = {} as T[Extract<keyof T, string>];
      }
      updatedConfig[key] = updateObject(
        (config[key] || {}) as T[Extract<keyof T, string>],
        defaultData[key],
      );
    } else {
      // Handle primitive values
      if (!config[key]) {
        updatedConfig[key] = defaultData[key];
      }
    }
  }

  return updatedConfig;
}
