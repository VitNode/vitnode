#!/usr/bin/env node
/* eslint-disable no-console */

import { join } from 'path';

const init = async () => {
  const initConsole = '\x1b[34m[VitNode]\x1b[0m \x1b[33m[Frontend]\x1b[0m';
  const paths = [join(process.cwd(), 'app')];

  console.log(`${initConsole} test`);
};

if (process.argv[2] === 'init') {
  init();
}
