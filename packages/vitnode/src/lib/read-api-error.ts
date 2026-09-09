const MAX_MESSAGE_LENGTH = 400;

const clamp = (value: string): string =>
  value.length > MAX_MESSAGE_LENGTH
    ? `${value.slice(0, MAX_MESSAGE_LENGTH).trimEnd()}…`
    : value;

export const readApiErrorMessage = async (
  response: Response,
): Promise<null | string> => {
  const raw = await response.text().catch(() => "");

  try {
    const parsed: unknown = JSON.parse(raw);
    if (parsed !== null && typeof parsed === "object") {
      const body = parsed as { error?: unknown; message?: unknown };
      const message =
        typeof body.message === "string" && body.message !== ""
          ? body.message
          : typeof body.error === "string" && body.error !== ""
            ? body.error
            : null;

      if (message !== null) return clamp(message);
    }
  } catch {
    return readPlainText(raw);
  }

  return readPlainText(raw);
};

const readPlainText = (raw: string): null | string => {
  const text = raw.trim();
  if (text === "" || text.startsWith("<") || text.length >= 2000) return null;

  return clamp(text);
};
