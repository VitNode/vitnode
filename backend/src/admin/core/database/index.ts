import * as groups from './schema/groups';
import * as languages from './schema/languages';
import * as users from './schema/users';
import * as sessions from './schema/sessions';
import * as files from './schema/files';
import * as admins from './schema/admins';
import * as moderators from './schema/moderators';
import * as plugins from './schema/plugins';
import * as themes from './schema/themes';
import * as nav from './schema/nav';

export default {
  ...groups,
  ...languages,
  ...users,
  ...sessions,
  ...files,
  ...admins,
  ...moderators,
  ...plugins,
  ...themes,
  ...nav
};
