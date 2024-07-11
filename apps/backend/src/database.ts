// ! DO NOT REMOVE, MODIFY OR MOVE THIS FILE!!!

import tableCore from '@/plugins/core/admin/database/index';
import tableBlog from '@/plugins/blog/admin/database/index';
import tableWelcome from '@/plugins/welcome/admin/database/index';
// ! === IMPORT ===

export const schemaDatabase = {
  ...tableBlog,
  ...tableWelcome,
  // ! === MODULE ===
  ...tableCore,
};

export const DATABASE_ENVS = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_DATABASE || 'vitnode',
};
