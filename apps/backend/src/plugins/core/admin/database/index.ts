<<<<<<< HEAD
import * as groups from "./schema/groups";
import * as languages from "./schema/languages";
import * as users from "./schema/users";
import * as sessions from "./schema/sessions";
import * as files from "./schema/files";
import * as admins from "./schema/admins";
import * as moderators from "./schema/moderators";
import * as plugins from "./schema/plugins";
import * as nav from "./schema/nav";
import * as keys from "./schema/keys";
=======
import * as groups from './schema/groups';
import * as languages from './schema/languages';
import * as users from './schema/users';
import * as sessions from './schema/sessions';
import * as files from './schema/files';
import * as admins from './schema/admins';
import * as moderators from './schema/moderators';
import * as plugins from './schema/plugins';
import * as nav from './schema/nav';
>>>>>>> 1b3c841d (chore: Change prettier singleQuote to true)

export default {
  ...groups,
  ...languages,
  ...users,
  ...sessions,
  ...files,
  ...admins,
  ...moderators,
  ...plugins,
<<<<<<< HEAD
  ...themes,
  ...nav,
  ...keys
=======
  ...nav,
>>>>>>> 95500191 (chore: Change prettier config)
};
