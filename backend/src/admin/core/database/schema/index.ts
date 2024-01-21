import * as groups from './groups';
import * as languages from './languages';
import * as users from './users';
import * as sessions from './sessions';
import * as files from './files';
import * as admins from './admins';
import * as moderators from './moderators';
import * as plugins from './plugins';

export default {
  ...groups,
  ...languages,
  ...users,
  ...sessions,
  ...files,
  ...admins,
  ...moderators,
  ...plugins
};
