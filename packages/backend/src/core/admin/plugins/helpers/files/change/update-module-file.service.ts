import { ABSOLUTE_PATHS_BACKEND } from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { changeCodePluginToCapitalLetters } from '../../change-code-plugin-to-capital-letters';

@Injectable()
export class UpdateModuleFileAdminPluginsService {
  async updatePluginModuleFile(code: string, action: 'add' | 'delete') {
    const filePath = join(ABSOLUTE_PATHS_BACKEND.plugins, 'plugins.module.ts');
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileContent = await readFile(filePath, 'utf8');

    // Regular expressions to extract import statements and imports array
    const importRegex = /import { (\w+) } from ['"](.*)['"];/g;
    const importsArrayRegex = /imports:\s*\[([^\]]*)\]/;

    const existingImports = new Map<string, string>();
    const existingModuleNames = new Set<string>();

    // Extract existing import statements
    let match: null | RegExpExecArray;
    while ((match = importRegex.exec(fileContent)) !== null) {
      const moduleName = match[1];
      const modulePath = match[2];

      if (moduleName === 'Module' && modulePath === '@nestjs/common') {
        continue; // Skip the NestJS Module import
      }

      existingImports.set(moduleName, modulePath);
      existingModuleNames.add(moduleName);
    }

    // Extract existing module names from the imports array
    const importsArrayMatch = importsArrayRegex.exec(fileContent);
    if (importsArrayMatch?.[1]) {
      const modulesList = importsArrayMatch[1]
        .split(',')
        .map(m => m.trim())
        .filter(m => m.length > 0);

      modulesList.forEach(moduleName => existingModuleNames.add(moduleName));
    }

    // Determine the module name and path
    const moduleName = `${changeCodePluginToCapitalLetters(code)}Module`;
    const modulePath = `./${code}/${code}.module`;

    // Add or remove the module based on the action
    if (action === 'add') {
      existingImports.set(moduleName, modulePath);
      existingModuleNames.add(moduleName);
    } else if (action === 'delete') {
      existingImports.delete(moduleName);
      existingModuleNames.delete(moduleName);
    } else {
      throw new Error(`Invalid action: ${action}`);
    }

    // Reconstruct import statements
    let newFileContent = `import { Module } from '@nestjs/common';\n\n`;

    existingImports.forEach((modulePath, moduleName) => {
      newFileContent += `import { ${moduleName} } from '${modulePath}';\n`;
    });

    // Reconstruct the @Module decorator
    const allModuleNames = Array.from(existingModuleNames).join(', ');
    newFileContent += `\n@Module({\n  imports: [${allModuleNames}],\n})\nexport class PluginsModule {}\n`;

    // Write the updated content back to the file
    await writeFile(filePath, newFileContent, 'utf8');
  }
}
