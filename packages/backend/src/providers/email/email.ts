import * as fs from 'fs';
import { join } from 'path';

export const getTranslationForEmail = (
  namespaces: string,
  language: string,
) => {
  const resolveNamespace = namespaces.split('.');
  let path = join(
    process.cwd(),
    '..',
    'frontend',
    'plugins',
    resolveNamespace[0],
    'langs',
    `${language}.json`,
  );

  if (!fs.existsSync(path)) {
    path = join(
      process.cwd(),
      '..',
      'frontend',
      'plugins',
      resolveNamespace[0],
      'langs',
      'en.json',
    );
  }

  const read = fs.readFileSync(path, 'utf-8');
  const messages = JSON.parse(read);

  return (key: string) => {
    let message = messages;

    [...resolveNamespace, ...key.split('.')].forEach(part => {
      try {
        const next = message[part as any];

        if (part === null || next === null) {
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
