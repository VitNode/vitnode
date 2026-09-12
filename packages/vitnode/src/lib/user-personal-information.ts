export const USER_FIRST_NAME_MAX_LENGTH = 128;
export const USER_LAST_NAME_MAX_LENGTH = 128;
export const USER_HEADLINE_MAX_LENGTH = 100;

export interface UserPersonalInformation {
  firstName: null | string;
  headline: null | string;
  lastName: null | string;
  showRealName: boolean;
}

export const PERSONAL_INFORMATION_TEXT_FIELDS = [
  "firstName",
  "lastName",
  "headline",
] as const satisfies readonly (keyof UserPersonalInformation)[];

export type UserPersonalInformationTextField =
  (typeof PERSONAL_INFORMATION_TEXT_FIELDS)[number];

export const normalizePersonalField = (value: unknown): null | string => {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : null;
};

export const personalInformationChanges = (
  input: Partial<Record<keyof UserPersonalInformation, unknown>>,
): Partial<UserPersonalInformation> => ({
  ...Object.fromEntries(
    PERSONAL_INFORMATION_TEXT_FIELDS.filter(field => field in input).map(
      field => [field, normalizePersonalField(input[field])],
    ),
  ),
  ...(typeof input.showRealName === "boolean"
    ? { showRealName: input.showRealName }
    : {}),
});

export const fullNameOf = ({
  firstName,
  lastName,
}: Pick<UserPersonalInformation, "firstName" | "lastName">): null | string => {
  const parts = [firstName, lastName]
    .map(normalizePersonalField)
    .filter((part): part is string => part !== null);

  return parts.length > 0 ? parts.join(" ") : null;
};

export const displayNameOf = ({
  firstName,
  lastName,
  name,
  showRealName,
}: Pick<UserPersonalInformation, "firstName" | "lastName" | "showRealName"> & {
  name: string;
}): string => {
  if (!showRealName) return name;

  return fullNameOf({ firstName, lastName }) ?? name;
};
