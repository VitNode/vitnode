import { join } from "path";
import * as fs from "fs";

export const getTranslationForEmail = (plugin: string) => {
  const path = join(
    process.cwd(),
    "..",
    "frontend",
    "plugins",
    plugin,
    "langs",
    "en.json"
  );

  const read = fs.readFileSync(path, "utf-8");
  const en = JSON.parse(read);

  return (key: string) => {
    return en[plugin][key] ?? key;
  };
};
