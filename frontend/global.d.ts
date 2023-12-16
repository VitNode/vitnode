type IntlMessages = typeof import('@/langs/en/core.json') &
  typeof import('@/langs/en/admin.json') &
  typeof import('@/langs/en/forum.json');
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Record<string, any>;
