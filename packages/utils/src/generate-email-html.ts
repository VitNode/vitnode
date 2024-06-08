import { render } from "@react-email/render";

export const generateHTMLEmail = async () => {
  const lang = "en";

  const Email = (await import(`./email`)).Email;

  const emailHtml = render(Email({ url: "https://example.com" }));

  return emailHtml;
};
