import { join } from "path";
import * as fs from "fs";

export const getTranslationForEmail = (plugin: string) => {
  const resolvePlugin = plugin.split(".");
  const path = join(
    process.cwd(),
    "..",
    "frontend",
    "plugins",
    resolvePlugin[0],
    "langs",
    "en.json"
  );

  const read = fs.readFileSync(path, "utf-8");
  const messages = JSON.parse(read);

  return (key: string) => {
    let message = messages;

    [...resolvePlugin, ...key.split(".")].forEach(part => {
      try {
        const next = message[part as any];

        if (part == null || next == null) {
          return key;
        }

        message = next;
      } catch (e) {
        return key;
      }
    });

    return message;
  };
};
