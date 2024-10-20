import { changeCodePluginToCapitalLetters } from '../../change-code-plugin-to-capital-letters';

export const changeDatabaseService = ({
  admin,
  code,
  content,
}: {
  admin?: boolean;
  code: string;
  content: string;
}) => {
  const name = `${admin ? 'Admin' : ''}${changeCodePluginToCapitalLetters(code)}`;

  return content
    .replace(
      '// ! === IMPORT ===',
      `import table${name} from '@/plugins/${code}/admin/database/index';\n// ! === IMPORT ===`,
    )
    .replace(
      '\n  // ! === MODULE ===',
      `\n  ...table${name},\n  // ! === MODULE ===`,
    );
};

export const changeLangTypes = ({
  code,
  content,
}: {
  code: string;
  content: string;
}) => {
  return content
    .replace(
      '// ! === IMPORT ===',
      `import ${code.replaceAll('-', '')} from '@/plugins/${code}/langs/en.json';\n// ! === IMPORT ===`,
    )
    .replace(
      '; // ! === MODULE ===',
      ` & typeof ${code.replaceAll('-', '')}; // ! === MODULE ===`,
    );
};
