/* eslint-disable @typescript-eslint/consistent-type-imports */

type IntlMessages =
  typeof import('../../apps/frontend/plugins/admin/langs/en.json') &
    typeof import('../../apps/frontend/plugins/core/langs/en.json');
