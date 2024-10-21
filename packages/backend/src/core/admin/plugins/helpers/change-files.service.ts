import {
  ABSOLUTE_PATHS_BACKEND,
  configPath,
  ConfigType,
  getConfigFile,
} from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync, promises as fs } from 'fs';
import { join } from 'path';

import { changeCodePluginToCapitalLetters } from './change-code-plugin-to-capital-letters';

const { readFile, writeFile } = fs;

@Injectable()
export class ChangeFilesAdminPluginsService {
  private async updateConfigFile(code: string, action: 'add' | 'delete') {
    const filePath = join(
      ABSOLUTE_PATHS_BACKEND.backend,
      'database',
      'config.ts',
    );

    await this.updateFileContent({
      code,
      action,
      filePath,
      importRegex: /import (\w+) from ['"](.*)['"];/g,
      entryRegex: /export const schemaDatabase = {([\s\S]*?)};/,
      getImportNameAndPath: code => ({
        importName: `table${changeCodePluginToCapitalLetters(code)}`,
        importPath: `@/plugins/${code}/admin/database/index`,
      }),
      getEntryName: code => `...table${changeCodePluginToCapitalLetters(code)}`,
      reconstructFileContent: (imports, entries, originalContent) => {
        let newContent = '';
        imports.forEach((path, name) => {
          newContent += `import ${name} from '${path}';\n`;
        });

        newContent += `\nexport const schemaDatabase = {\n`;
        const allEntries = Array.from(entries).join(',\n  ');
        newContent += `  ${allEntries},\n};`;

        // Append the rest of the file
        const restOfFile = originalContent.split(
          /export const schemaDatabase = {[\s\S]*?};/,
        )[1];
        if (restOfFile) {
          newContent += restOfFile;
        }

        return newContent;
      },
    });
  }

  private async updateFileContent(params: {
    action: 'add' | 'delete';
    code: string;
    entryRegex: RegExp;
    filePath: string;
    getEntryName: (code: string) => string;
    getImportNameAndPath: (code: string) => {
      importName: string;
      importPath: string;
    };
    importRegex: RegExp;
    reconstructFileContent: (
      imports: Map<string, string>,
      entries: Set<string>,
      originalContent: string,
    ) => string;
  }) {
    const {
      code,
      action,
      filePath,
      importRegex,
      entryRegex,
      getImportNameAndPath,
      getEntryName,
      reconstructFileContent,
    } = params;

    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = await readFile(filePath, 'utf8');

    const existingImports = new Map<string, string>();
    const existingEntries = new Set<string>();

    // Extract existing import statements
    let match: null | RegExpExecArray;
    while ((match = importRegex.exec(fileContent)) !== null) {
      const importName = match[1];
      const importPath = match[2];
      existingImports.set(importName, importPath);
    }

    // Extract existing entries
    const entryMatch = entryRegex.exec(fileContent);
    if (entryMatch?.[1]) {
      const entriesList = entryMatch[1]
        .split(/[,&]/)
        .map(entry => entry.trim())
        .filter(entry => entry.length > 0);
      entriesList.forEach(entry => existingEntries.add(entry));
    }

    // Get import name and path
    const { importName, importPath } = getImportNameAndPath(code);
    const entryName = getEntryName(code);

    // Add or remove based on action
    if (action === 'add') {
      existingImports.set(importName, importPath);
      existingEntries.add(entryName);
    } else if (action === 'delete') {
      existingImports.delete(importName);
      existingEntries.delete(entryName);
    } else {
      throw new Error(`Invalid action: ${action}`);
    }

    // Reconstruct file content
    const newFileContent = reconstructFileContent(
      existingImports,
      existingEntries,
      fileContent,
    );

    // Write the updated content back to the file
    await writeFile(filePath, newFileContent, 'utf8');
  }

  private async updateGlobalDTSFile(code: string, action: 'add' | 'delete') {
    const filePath = join(ABSOLUTE_PATHS_BACKEND.frontend.init, 'global.d.ts');

    await this.updateFileContent({
      code,
      action,
      filePath,
      importRegex: /import type (\w+) from ['"](.*)['"];/g,
      entryRegex: /type Messages = ([^;]+);/,
      getImportNameAndPath: code => ({
        importName: code,
        importPath: `@/plugins/${code}/langs/en.json`,
      }),
      getEntryName: code => `typeof ${code}`,
      reconstructFileContent: (imports, entries, originalContent) => {
        let newContent = '';
        imports.forEach((path, name) => {
          newContent += `import type ${name} from '${path}';\n`;
        });

        newContent += `\n`;

        const allEntries = Array.from(entries).join(' & ');
        newContent += `type Messages = ${allEntries};`;

        // Append the rest of the file
        const restOfFile = originalContent.split(/type Messages = [^;]+;/)[1];
        if (restOfFile) {
          newContent += restOfFile;
        }

        return newContent;
      },
    });
  }

  private async updatePluginModuleFile(code: string, action: 'add' | 'delete') {
    const filePath = join(ABSOLUTE_PATHS_BACKEND.plugins, 'plugins.module.ts');

    await this.updateFileContent({
      code,
      action,
      filePath,
      importRegex: /import { (\w+) } from ['"](.*)['"];/g,
      entryRegex: /imports:\s*\[([^\]]*)\]/,
      getImportNameAndPath: code => ({
        importName: `${changeCodePluginToCapitalLetters(code)}Module`,
        importPath: `./${code}/${code}.module`,
      }),
      getEntryName: code => `${changeCodePluginToCapitalLetters(code)}Module`,
      reconstructFileContent: (imports, entries) => {
        let newContent = `import { Module } from '@nestjs/common';\n\n`;
        for (const [name, path] of imports) {
          if (name === 'Module' && path === '@nestjs/common') {
            continue;
          }

          newContent += `import { ${name} } from '${path}';\n`;
        }

        const allEntries = Array.from(entries).join(', ');
        newContent += `\n@Module({\n  imports: [${allEntries}],\n})\nexport class PluginsModule {}\n`;

        return newContent;
      },
    });
  }

  async changeFiles({
    code,
    action,
  }: {
    action: 'add' | 'delete';
    code: string;
  }) {
    await Promise.all([
      this.updateGlobalDTSFile(code, action),
      this.updatePluginModuleFile(code, action),
      this.updateConfigFile(code, action),
    ]);
  }

  async setServerToRestartConfig() {
    const config = getConfigFile();

    const updatedConfig: ConfigType = {
      ...config,
      restart_server: true,
    };

    await writeFile(configPath, JSON.stringify(updatedConfig, null, 2), 'utf8');
  }
}
