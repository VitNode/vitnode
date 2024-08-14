/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { nestjsMainApp } from 'vitnode-backend';

import { AppModule } from './app.module';

const removeLangFromTypes = ({
  code,
  content,
}: {
  code: string;
  content: string;
}) => {
  // Remove the import statement for the module
  const importRegex = new RegExp(
    `import\\s+type\\s+${code}\\s+from\\s+'.+?';\\n`,
    'g',
  );
  let updatedCode = content.replace(importRegex, '');

  // Remove the module from the type definition
  const typeRegex = new RegExp(`&\\s+typeof\\s+${code}`, 'g');
  updatedCode = updatedCode.replace(typeRegex, '');

  // Ensure there's no space before the comment after last module
  updatedCode = updatedCode.replace(
    /\s*;\s*\/\/\s*! === MODULE ===/g,
    '; // ! === MODULE ===',
  );

  return updatedCode;
};

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  nestjsMainApp(app, {
    cors: {
      origin: [
        process.env.NEXT_PUBLIC_FRONTEND_URL
          ? process.env.NEXT_PUBLIC_FRONTEND_URL
          : 'http://localhost:3000',
      ],
    },
  });

  await app.listen(process.env.PORT ?? '8080', '', () => {
    const test = `import type core from '@/plugins/core/langs/en.json';
import type admin from '@/plugins/admin/langs/en.json';
import type welcome from '@/plugins/welcome/langs/en.json';
import type blog from '@/plugins/blog/langs/en.json';
import type commerce from '@/plugins/commerce/langs/en.json';
import type test123 from '@/plugins/test123/langs/en.json';
// ! === IMPORT ===

type Messages = typeof core &
  typeof admin &
  typeof welcome &
  typeof commerce &
  typeof test123; // ! === MODULE ===

declare global {
  interface IntlMessages extends Messages {}
}
`;

    console.log(removeLangFromTypes({ code: 'test123', content: test }));

    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 8080}/graphql`,
    );
  });
}
bootstrap();
