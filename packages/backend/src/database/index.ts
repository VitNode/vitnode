import * as admins from './schema/admins';
import * as files from './schema/files';
import * as groups from './schema/groups';
import * as languages from './schema/languages';
import * as moderators from './schema/moderators';
import * as nav from './schema/nav';
import * as plugins from './schema/plugins';
import * as sessions from './schema/sessions';
import * as terms from './schema/terms';
import * as users from './schema/users';

export default {
  ...groups,
  ...languages,
  ...terms,
  ...users,
  ...sessions,
  ...files,
  ...admins,
  ...moderators,
  ...plugins,
  ...nav,
};
