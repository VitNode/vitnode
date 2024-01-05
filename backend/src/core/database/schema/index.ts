import * as groups from './groups';
import * as languages from './languages';
import * as users from './users';
import * as sessions from './sessions';

export default {
  ...groups,
  ...languages,
  ...users,
  ...sessions
};
