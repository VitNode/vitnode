import * as fs from "fs";

import { renderAsync } from "@react-email/render";

export const generateHTMLEmail = async ({
  pathToTemplate
}: {
  pathToTemplate: string;
}) => {
  if (!fs.existsSync(pathToTemplate)) {
    throw new Error(`File ${pathToTemplate} does not exist`);
  }

  const Email = (await import(pathToTemplate)).default;

  const emailHtml = renderAsync(Email());

  return emailHtml;
};
