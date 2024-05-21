export const generateAlternateLanguages = ({
  frontendUrl,
  languages,
  slug
}: {
  frontendUrl: string;
  languages: { code: string }[];
  slug?: (locale: string) => string;
}): Record<string, string> => {
  return languages.reduce((acc: Record<string, string>, { code }) => {
    acc[code] = `${frontendUrl}/${code}${slug ? slug(code) : ""}`;

    return acc;
  }, {});
};
