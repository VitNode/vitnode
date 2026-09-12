export const callUsersApi = async (
  call: () => Promise<Response>,
): Promise<null | Response> => {
  try {
    return await call();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[auth] users API call failed", error);

    return null;
  }
};

export const readJson = async (response: Response): Promise<unknown> => {
  try {
    return await response.json();
  } catch {
    return undefined;
  }
};

export const readText = async (response: Response): Promise<string> => {
  try {
    return await response.text();
  } catch {
    return "";
  }
};
