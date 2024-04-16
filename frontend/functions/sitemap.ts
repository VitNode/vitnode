export const generateAlternateLanguages = ({
  frontendUrl,
  languages,
  slug
}: {
  frontendUrl: string;
  languages: { code: string }[];
  slug?: (locale: string) => string;
}): { [lang: string]: string } => {
  return languages.reduce((acc: { [lang: string]: string }, { code }) => {
    acc[code] = `${frontendUrl}/${code}${slug ? slug(code) : ""}`;

    return acc;
  }, {});
};
