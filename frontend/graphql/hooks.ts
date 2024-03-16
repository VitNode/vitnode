import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  Upload: { input: any; output: any; }
};

export type AuthorizationAdminSessionsObj = {
  __typename?: 'AuthorizationAdminSessionsObj';
  rebuild_required: RebuildRequiredObj;
  user?: Maybe<AuthorizationCurrentUserObj>;
  version: Scalars['String']['output'];
};

export type AuthorizationCoreSessionsObj = {
  __typename?: 'AuthorizationCoreSessionsObj';
  plugin_default: Scalars['String']['output'];
  rebuild_required: RebuildRequiredObj;
  theme_id?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<AuthorizationCurrentUserObj>;
};

export type AuthorizationCurrentUserObj = {
  __typename?: 'AuthorizationCurrentUserObj';
  avatar?: Maybe<AvatarUser>;
  avatar_color: Scalars['String']['output'];
  email: Scalars['String']['output'];
  group: GroupUser;
  id: Scalars['Int']['output'];
  is_admin: Scalars['Boolean']['output'];
  is_mod: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  name_seo: Scalars['String']['output'];
  newsletter: Scalars['Boolean']['output'];
};

export type AvatarUser = {
  __typename?: 'AvatarUser';
  dir_folder: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type BreadcrumbsForumForums = {
  __typename?: 'BreadcrumbsForumForums';
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
};

export type CheckDownloadAdminPluginsObj = {
  __typename?: 'CheckDownloadAdminPluginsObj';
  admin_pages: Scalars['Int']['output'];
  admin_templates: Scalars['Int']['output'];
  databases: Scalars['Int']['output'];
  default_page: Scalars['Boolean']['output'];
  graphql_mutations: Scalars['Int']['output'];
  graphql_queries: Scalars['Int']['output'];
  hooks: Scalars['Int']['output'];
  language: Scalars['Boolean']['output'];
  pages: Scalars['Int']['output'];
  pages_container: Scalars['Int']['output'];
  templates: Scalars['Int']['output'];
};

export type ChildrenShowForumForums = {
  __typename?: 'ChildrenShowForumForums';
  _count: ShowForumForumsCounts;
  breadcrumbs: Array<BreadcrumbsForumForums>;
  children: Array<LastChildShowForumForums>;
  created: Scalars['DateTime']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  last_posts: LastPostsShowForumForumsObj;
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type CreateForumForumsObj = {
  __typename?: 'CreateForumForumsObj';
  _count: ShowForumForumsCounts;
  breadcrumbs: Array<BreadcrumbsForumForums>;
  children: Array<ChildrenShowForumForums>;
  created: Scalars['DateTime']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  last_posts: LastPostsShowForumForumsObj;
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type GeneralAdminSettingsObj = {
  __typename?: 'GeneralAdminSettingsObj';
  side_name: Scalars['String']['output'];
};

export type GroupUser = {
  __typename?: 'GroupUser';
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
};

export type GroupsPermissionsCreateForumForums = {
  can_create: Scalars['Boolean']['input'];
  can_read: Scalars['Boolean']['input'];
  can_reply: Scalars['Boolean']['input'];
  can_view: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
};

export type GroupsPermissionsForumForums = {
  __typename?: 'GroupsPermissionsForumForums';
  can_create: Scalars['Boolean']['output'];
  can_read: Scalars['Boolean']['output'];
  can_reply: Scalars['Boolean']['output'];
  can_view: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
};

export type LastChildShowForumForums = {
  __typename?: 'LastChildShowForumForums';
  created: Scalars['DateTime']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type LastPostsShowForumForums = {
  __typename?: 'LastPostsShowForumForums';
  created: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  topic: TopicLastPostsShowForumForums;
  user: User;
};

export type LastPostsShowForumForumsArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<LastPostsShowForumForumsSortByArgs>>;
};

export type LastPostsShowForumForumsObj = {
  __typename?: 'LastPostsShowForumForumsObj';
  edges: Array<LastPostsShowForumForums>;
  pageInfo: PageInfo;
};

export type LastPostsShowForumForumsSortByArgs = {
  column: LastPostsShowForumForumsSortingColumnEnum | `${LastPostsShowForumForumsSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const LastPostsShowForumForumsSortingColumnEnum = {
  created: 'created',
  updated: 'updated'
} as const;

export type LastPostsShowForumForumsSortingColumnEnum = typeof LastPostsShowForumForumsSortingColumnEnum[keyof typeof LastPostsShowForumForumsSortingColumnEnum];
export const LayoutAdminInstallEnum = {
  account: 'ACCOUNT',
  database: 'DATABASE',
  finish: 'FINISH'
} as const;

export type LayoutAdminInstallEnum = typeof LayoutAdminInstallEnum[keyof typeof LayoutAdminInstallEnum];
export type LayoutAdminInstallObj = {
  __typename?: 'LayoutAdminInstallObj';
  status: LayoutAdminInstallEnum | `${LayoutAdminInstallEnum}`;
};

export type Mutation = {
  __typename?: 'Mutation';
  admin__core_groups__delete: Scalars['String']['output'];
  admin__core_groups__edit: ShowAdminGroups;
  admin__core_languages__create: ShowCoreLanguages;
  admin__core_languages__delete: Scalars['String']['output'];
  admin__core_languages__download: Scalars['String']['output'];
  admin__core_languages__edit: ShowCoreLanguages;
  admin__core_languages__update: Scalars['String']['output'];
  admin__core_nav__change_position: Scalars['String']['output'];
  admin__core_nav__create: ShowCoreNav;
  admin__core_nav__delete: Scalars['String']['output'];
  admin__core_nav__edit: ShowCoreNav;
  admin__core_plugins__create: ShowAdminPlugins;
  admin__core_plugins__delete: Scalars['String']['output'];
  admin__core_plugins__download: Scalars['String']['output'];
  admin__core_plugins__edit: ShowAdminPlugins;
  admin__core_plugins__upload: ShowAdminPlugins;
  admin__core_staff_administrators__create: ShowAdminStaffAdministrators;
  admin__core_staff_administrators__delete: Scalars['String']['output'];
  admin__core_staff_moderators__create: ShowAdminStaffModerators;
  admin__core_staff_moderators__delete: Scalars['String']['output'];
  admin__core_themes__create: ShowAdminThemes;
  admin__core_themes__delete: Scalars['String']['output'];
  admin__core_themes__download: Scalars['String']['output'];
  admin__core_themes__edit: ShowAdminThemes;
  admin__core_themes__upload: ShowAdminThemes;
  admin__forum_forums__change_position: Scalars['String']['output'];
  admin__forum_forums__create: CreateForumForumsObj;
  admin__forum_forums__delete: Scalars['String']['output'];
  admin__forum_forums__edit: CreateForumForumsObj;
  admin__install__create_database: Scalars['String']['output'];
  admin_sessions__sign_out: Scalars['String']['output'];
  admin_settings__general__edit: GeneralAdminSettingsObj;
  core_groups__admin_create: ShowAdminGroups;
  core_members__avatar__delete: Scalars['String']['output'];
  core_members__avatar__upload: UploadAvatarCoreMembersObj;
  core_members__sign_up: SignUpCoreMembersObj;
  core_sessions__sign_in: Scalars['String']['output'];
  core_sessions__sign_out: Scalars['String']['output'];
  core_themes__change: Scalars['String']['output'];
  forum_posts__create: ShowPostsForums;
  forum_topics__actions__lock_toggle: Scalars['Boolean']['output'];
  forum_topics__create: ShowTopicsForums;
  forum_topics__edit: ShowTopicsForums;
};


export type MutationAdmin__Core_Groups__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Groups__EditArgs = {
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput>;
};


export type MutationAdmin__Core_Languages__CreateArgs = {
  code: Scalars['String']['input'];
  locale: Scalars['String']['input'];
  name: Scalars['String']['input'];
  time_24: Scalars['Boolean']['input'];
  timezone: Scalars['String']['input'];
};


export type MutationAdmin__Core_Languages__DeleteArgs = {
  code: Scalars['String']['input'];
};


export type MutationAdmin__Core_Languages__DownloadArgs = {
  all: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  plugins: Array<Scalars['String']['input']>;
};


export type MutationAdmin__Core_Languages__EditArgs = {
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  locale: Scalars['String']['input'];
  name: Scalars['String']['input'];
  time_24: Scalars['Boolean']['input'];
  timezone: Scalars['String']['input'];
};


export type MutationAdmin__Core_Languages__UpdateArgs = {
  code: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
};


export type MutationAdmin__Core_Nav__Change_PositionArgs = {
  id: Scalars['Int']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Core_Nav__CreateArgs = {
  description: Array<TextLanguageInput>;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  name: Array<TextLanguageInput>;
};


export type MutationAdmin__Core_Nav__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Nav__EditArgs = {
  description: Array<TextLanguageInput>;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput>;
};


export type MutationAdmin__Core_Plugins__CreateArgs = {
  author: Scalars['String']['input'];
  author_url?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  support_url: Scalars['String']['input'];
};


export type MutationAdmin__Core_Plugins__DeleteArgs = {
  code: Scalars['String']['input'];
};


export type MutationAdmin__Core_Plugins__DownloadArgs = {
  code: Scalars['String']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
  version_code?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Core_Plugins__EditArgs = {
  author: Scalars['String']['input'];
  author_url?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  default?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  support_url: Scalars['String']['input'];
};


export type MutationAdmin__Core_Plugins__UploadArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  file: Scalars['Upload']['input'];
};


export type MutationAdmin__Core_Staff_Administrators__CreateArgs = {
  group_id?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
  user_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Core_Staff_Administrators__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Staff_Moderators__CreateArgs = {
  group_id?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
  user_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Core_Staff_Moderators__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Themes__CreateArgs = {
  author: Scalars['String']['input'];
  author_url?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  support_url: Scalars['String']['input'];
};


export type MutationAdmin__Core_Themes__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Themes__DownloadArgs = {
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
  version_code?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Core_Themes__EditArgs = {
  author: Scalars['String']['input'];
  author_url?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  support_url: Scalars['String']['input'];
};


export type MutationAdmin__Core_Themes__UploadArgs = {
  file: Scalars['Upload']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Forum_Forums__Change_PositionArgs = {
  id: Scalars['Int']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Forum_Forums__CreateArgs = {
  description: Array<TextLanguageInput>;
  name: Array<TextLanguageInput>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  permissions: PermissionsCreateForumForums;
};


export type MutationAdmin__Forum_Forums__DeleteArgs = {
  id: Scalars['Int']['input'];
  move_topics_to?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationAdmin__Forum_Forums__EditArgs = {
  description: Array<TextLanguageInput>;
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  permissions: PermissionsCreateForumForums;
};


export type MutationAdmin_Settings__General__EditArgs = {
  side_name: Scalars['String']['input'];
};


export type MutationCore_Groups__Admin_CreateArgs = {
  name: Array<TextLanguageInput>;
};


export type MutationCore_Members__Avatar__UploadArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationCore_Members__Sign_UpArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
};


export type MutationCore_Sessions__Sign_InArgs = {
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCore_Themes__ChangeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationForum_Posts__CreateArgs = {
  content: Array<TextLanguageInput>;
  topic_id: Scalars['Int']['input'];
};


export type MutationForum_Topics__Actions__Lock_ToggleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationForum_Topics__CreateArgs = {
  content: Array<TextLanguageInput>;
  forum_id: Scalars['Int']['input'];
  title: Array<TextLanguageInput>;
};


export type MutationForum_Topics__EditArgs = {
  content: Array<TextLanguageInput>;
  id: Scalars['Int']['input'];
  title: Array<TextLanguageInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count: Scalars['Float']['output'];
  endCursor?: Maybe<Scalars['Int']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['Int']['output']>;
  totalCount: Scalars['Float']['output'];
};

export type PermissionsCreateForumForums = {
  can_all_create: Scalars['Boolean']['input'];
  can_all_read: Scalars['Boolean']['input'];
  can_all_reply: Scalars['Boolean']['input'];
  can_all_view: Scalars['Boolean']['input'];
  groups: Array<GroupsPermissionsCreateForumForums>;
};

export type PermissionsForumForums = {
  __typename?: 'PermissionsForumForums';
  can_create: Scalars['Boolean']['output'];
  can_read: Scalars['Boolean']['output'];
  can_reply: Scalars['Boolean']['output'];
};

export type PermissionsForumForumsAdmin = {
  __typename?: 'PermissionsForumForumsAdmin';
  can_all_create: Scalars['Boolean']['output'];
  can_all_read: Scalars['Boolean']['output'];
  can_all_reply: Scalars['Boolean']['output'];
  can_all_view: Scalars['Boolean']['output'];
  groups: Array<GroupsPermissionsForumForums>;
};

export type PermissionsTopicForums = {
  __typename?: 'PermissionsTopicForums';
  can_edit: Scalars['Boolean']['output'];
  can_reply: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  admin__core_groups__show: ShowAdminGroupsObj;
  admin__core_members__show: ShowAdminMembersObj;
  admin__core_members__stats_sign_up: Array<SignUpStatsAdminMembers>;
  admin__core_plugins__download_check: CheckDownloadAdminPluginsObj;
  admin__core_plugins__show: ShowAdminPluginsObj;
  admin__core_staff_administrators__show: ShowAdminStaffAdministratorsObj;
  admin__core_staff_moderators__show: ShowAdminStaffModeratorsObj;
  admin__core_themes__show: ShowAdminThemesObj;
  admin__forum_forums__show: ShowForumForumsAdminObj;
  admin__install__layout: LayoutAdminInstallObj;
  admin__sessions__authorization: AuthorizationAdminSessionsObj;
  admin__settings__general__show: ShowGeneralAdminSettingsObj;
  core_languages__show: ShowCoreLanguagesObj;
  core_members__show: ShowCoreMembersObj;
  core_nav__show: ShowCoreNavObj;
  core_sessions__authorization: AuthorizationCoreSessionsObj;
  core_themes__show: ShowCoreThemesObj;
  forum_forums__show: ShowForumForumsObj;
  forum_posts__show: ShowPostsForumsObj;
  forum_topics__show: ShowTopicsForumsObj;
};


export type QueryAdmin__Core_Groups__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs>>;
};


export type QueryAdmin__Core_Members__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groups?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs>>;
};


export type QueryAdmin__Core_Plugins__Download_CheckArgs = {
  code: Scalars['String']['input'];
};


export type QueryAdmin__Core_Plugins__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminPluginsSortByArgs>>;
};


export type QueryAdmin__Core_Staff_Administrators__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffAdministratorsSortByArgs>>;
};


export type QueryAdmin__Core_Staff_Moderators__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffModeratorsSortByArgs>>;
};


export type QueryAdmin__Core_Themes__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminThemesSortByArgs>>;
};


export type QueryAdmin__Forum_Forums__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  last_posts_args?: InputMaybe<LastPostsShowForumForumsArgs>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  show_all_forums?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCore_Languages__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreLanguagesSortByArgs>>;
};


export type QueryCore_Members__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name_seo?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreMembersSortByArgs>>;
};


export type QueryCore_Nav__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCore_Themes__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryForum_Forums__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  last_posts_args?: InputMaybe<LastPostsShowForumForumsArgs>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  show_all_forums?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryForum_Posts__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  firstEdges?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowPostsForumsSortingEnum>;
  topic_id: Scalars['Int']['input'];
};


export type QueryForum_Topics__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forum_id?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type RebuildRequiredObj = {
  __typename?: 'RebuildRequiredObj';
  langs: Scalars['Boolean']['output'];
  plugins: Scalars['Boolean']['output'];
  themes: Scalars['Boolean']['output'];
};

export type ShowAdminGroups = {
  __typename?: 'ShowAdminGroups';
  created: Scalars['DateTime']['output'];
  default: Scalars['Boolean']['output'];
  guest: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  protected: Scalars['Boolean']['output'];
  root: Scalars['Boolean']['output'];
  updated: Scalars['DateTime']['output'];
  users_count: Scalars['Int']['output'];
};

export type ShowAdminGroupsObj = {
  __typename?: 'ShowAdminGroupsObj';
  edges: Array<ShowAdminGroups>;
  pageInfo: PageInfo;
};

export type ShowAdminGroupsSortByArgs = {
  column: ShowAdminGroupsSortingColumnEnum | `${ShowAdminGroupsSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowAdminGroupsSortingColumnEnum = {
  created: 'created',
  updated: 'updated'
} as const;

export type ShowAdminGroupsSortingColumnEnum = typeof ShowAdminGroupsSortingColumnEnum[keyof typeof ShowAdminGroupsSortingColumnEnum];
export type ShowAdminMembers = {
  __typename?: 'ShowAdminMembers';
  avatar?: Maybe<AvatarUser>;
  avatar_color: Scalars['String']['output'];
  email: Scalars['String']['output'];
  group: GroupUser;
  id: Scalars['Int']['output'];
  joined: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  name_seo: Scalars['String']['output'];
  newsletter: Scalars['Boolean']['output'];
  posts: Scalars['Int']['output'];
};

export type ShowAdminMembersObj = {
  __typename?: 'ShowAdminMembersObj';
  edges: Array<ShowAdminMembers>;
  pageInfo: PageInfo;
};

export type ShowAdminMembersSortByArgs = {
  column: ShowAdminMembersSortingColumnEnum | `${ShowAdminMembersSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowAdminMembersSortingColumnEnum = {
  first_name: 'first_name',
  followers: 'followers',
  joined: 'joined',
  last_name: 'last_name',
  name: 'name',
  posts: 'posts',
  reactions: 'reactions'
} as const;

export type ShowAdminMembersSortingColumnEnum = typeof ShowAdminMembersSortingColumnEnum[keyof typeof ShowAdminMembersSortingColumnEnum];
export type ShowAdminPlugins = {
  __typename?: 'ShowAdminPlugins';
  allow_default: Scalars['Boolean']['output'];
  author: Scalars['String']['output'];
  author_url?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  created: Scalars['DateTime']['output'];
  default: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  support_url: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
  version?: Maybe<Scalars['String']['output']>;
  version_code?: Maybe<Scalars['Int']['output']>;
};

export type ShowAdminPluginsObj = {
  __typename?: 'ShowAdminPluginsObj';
  edges: Array<ShowAdminPlugins>;
  pageInfo: PageInfo;
};

export type ShowAdminPluginsSortByArgs = {
  column: ShowAdminPluginsSortingColumnEnum | `${ShowAdminPluginsSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowAdminPluginsSortingColumnEnum = {
  created: 'created',
  updated: 'updated'
} as const;

export type ShowAdminPluginsSortingColumnEnum = typeof ShowAdminPluginsSortingColumnEnum[keyof typeof ShowAdminPluginsSortingColumnEnum];
export type ShowAdminStaffAdministrators = {
  __typename?: 'ShowAdminStaffAdministrators';
  created: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  protected: Scalars['Boolean']['output'];
  unrestricted: Scalars['Boolean']['output'];
  updated: Scalars['DateTime']['output'];
  user_or_group: UserOrGroupCoreStaffUnion;
};

export type ShowAdminStaffAdministratorsObj = {
  __typename?: 'ShowAdminStaffAdministratorsObj';
  edges: Array<ShowAdminStaffAdministrators>;
  pageInfo: PageInfo;
};

export type ShowAdminStaffAdministratorsSortByArgs = {
  column: ShowAdminStaffAdministratorsSortingColumnEnum | `${ShowAdminStaffAdministratorsSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowAdminStaffAdministratorsSortingColumnEnum = {
  updated: 'updated'
} as const;

export type ShowAdminStaffAdministratorsSortingColumnEnum = typeof ShowAdminStaffAdministratorsSortingColumnEnum[keyof typeof ShowAdminStaffAdministratorsSortingColumnEnum];
export type ShowAdminStaffModerators = {
  __typename?: 'ShowAdminStaffModerators';
  created: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  protected: Scalars['Boolean']['output'];
  unrestricted: Scalars['Boolean']['output'];
  updated: Scalars['DateTime']['output'];
  user_or_group: UserOrGroupCoreStaffUnion;
};

export type ShowAdminStaffModeratorsObj = {
  __typename?: 'ShowAdminStaffModeratorsObj';
  edges: Array<ShowAdminStaffModerators>;
  pageInfo: PageInfo;
};

export type ShowAdminStaffModeratorsSortByArgs = {
  column: ShowAdminStaffModeratorsSortingColumnEnum | `${ShowAdminStaffModeratorsSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowAdminStaffModeratorsSortingColumnEnum = {
  updated: 'updated'
} as const;

export type ShowAdminStaffModeratorsSortingColumnEnum = typeof ShowAdminStaffModeratorsSortingColumnEnum[keyof typeof ShowAdminStaffModeratorsSortingColumnEnum];
export type ShowAdminThemes = {
  __typename?: 'ShowAdminThemes';
  author: Scalars['String']['output'];
  author_url?: Maybe<Scalars['String']['output']>;
  created: Scalars['DateTime']['output'];
  default: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  protected: Scalars['Boolean']['output'];
  support_url: Scalars['String']['output'];
  version?: Maybe<Scalars['String']['output']>;
  version_code?: Maybe<Scalars['Int']['output']>;
};

export type ShowAdminThemesObj = {
  __typename?: 'ShowAdminThemesObj';
  edges: Array<ShowAdminThemes>;
  pageInfo: PageInfo;
};

export type ShowAdminThemesSortByArgs = {
  column: ShowAdminThemesSortingColumnEnum | `${ShowAdminThemesSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowAdminThemesSortingColumnEnum = {
  created: 'created'
} as const;

export type ShowAdminThemesSortingColumnEnum = typeof ShowAdminThemesSortingColumnEnum[keyof typeof ShowAdminThemesSortingColumnEnum];
export type ShowCoreLanguages = {
  __typename?: 'ShowCoreLanguages';
  code: Scalars['String']['output'];
  created: Scalars['DateTime']['output'];
  default: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  locale: Scalars['String']['output'];
  name: Scalars['String']['output'];
  protected: Scalars['Boolean']['output'];
  time_24: Scalars['Boolean']['output'];
  timezone: Scalars['String']['output'];
  updated: Scalars['DateTime']['output'];
};

export type ShowCoreLanguagesObj = {
  __typename?: 'ShowCoreLanguagesObj';
  edges: Array<ShowCoreLanguages>;
  pageInfo: PageInfo;
};

export type ShowCoreLanguagesSortByArgs = {
  column: ShowCoreLanguagesSortingColumnEnum | `${ShowCoreLanguagesSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowCoreLanguagesSortingColumnEnum = {
  created: 'created',
  updated: 'updated'
} as const;

export type ShowCoreLanguagesSortingColumnEnum = typeof ShowCoreLanguagesSortingColumnEnum[keyof typeof ShowCoreLanguagesSortingColumnEnum];
export type ShowCoreMembers = {
  __typename?: 'ShowCoreMembers';
  avatar?: Maybe<AvatarUser>;
  avatar_color: Scalars['String']['output'];
  group: GroupUser;
  id: Scalars['Int']['output'];
  joined: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
  name_seo: Scalars['String']['output'];
  posts: Scalars['Int']['output'];
};

export type ShowCoreMembersObj = {
  __typename?: 'ShowCoreMembersObj';
  edges: Array<ShowCoreMembers>;
  pageInfo: PageInfo;
};

export type ShowCoreMembersSortByArgs = {
  column: ShowCoreMembersSortingColumnEnum | `${ShowCoreMembersSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowCoreMembersSortingColumnEnum = {
  first_name: 'first_name',
  followers: 'followers',
  joined: 'joined',
  last_name: 'last_name',
  name: 'name',
  posts: 'posts',
  reactions: 'reactions'
} as const;

export type ShowCoreMembersSortingColumnEnum = typeof ShowCoreMembersSortingColumnEnum[keyof typeof ShowCoreMembersSortingColumnEnum];
export type ShowCoreNav = {
  __typename?: 'ShowCoreNav';
  children: Array<ShowCoreNavItem>;
  description: Array<TextLanguage>;
  external: Scalars['Boolean']['output'];
  href: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type ShowCoreNavItem = {
  __typename?: 'ShowCoreNavItem';
  description: Array<TextLanguage>;
  external: Scalars['Boolean']['output'];
  href: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type ShowCoreNavObj = {
  __typename?: 'ShowCoreNavObj';
  edges: Array<ShowCoreNav>;
  pageInfo: PageInfo;
};

export type ShowCoreSessionDevices = {
  __typename?: 'ShowCoreSessionDevices';
  device_id: Scalars['Int']['output'];
  expires: Scalars['DateTime']['output'];
  last_seen: Scalars['DateTime']['output'];
  login_token: Scalars['String']['output'];
  user_id: Scalars['Int']['output'];
};

export type ShowCoreThemes = {
  __typename?: 'ShowCoreThemes';
  default: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ShowCoreThemesObj = {
  __typename?: 'ShowCoreThemesObj';
  edges: Array<ShowCoreThemes>;
  pageInfo: PageInfo;
};

export type ShowForumForumsAdmin = {
  __typename?: 'ShowForumForumsAdmin';
  _count: ShowForumForumsCounts;
  breadcrumbs: Array<BreadcrumbsForumForums>;
  children: Array<ChildrenShowForumForums>;
  created: Scalars['DateTime']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  last_posts: LastPostsShowForumForumsObj;
  name: Array<TextLanguage>;
  permissions: PermissionsForumForumsAdmin;
  position: Scalars['Int']['output'];
};

export type ShowForumForumsAdminObj = {
  __typename?: 'ShowForumForumsAdminObj';
  edges: Array<ShowForumForumsAdmin>;
  pageInfo: PageInfo;
};

export type ShowForumForumsCounts = {
  __typename?: 'ShowForumForumsCounts';
  posts: Scalars['Int']['output'];
  topics: Scalars['Int']['output'];
  total_posts: Scalars['Int']['output'];
  total_topics: Scalars['Int']['output'];
};

export type ShowForumForumsObj = {
  __typename?: 'ShowForumForumsObj';
  edges: Array<ShowForumForumsWithChildren>;
  pageInfo: PageInfo;
};

export type ShowForumForumsWithChildren = {
  __typename?: 'ShowForumForumsWithChildren';
  _count: ShowForumForumsCounts;
  breadcrumbs: Array<BreadcrumbsForumForums>;
  children: Array<ChildrenShowForumForums>;
  created: Scalars['DateTime']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  last_posts: LastPostsShowForumForumsObj;
  name: Array<TextLanguage>;
  permissions: PermissionsForumForums;
  position: Scalars['Int']['output'];
};

export type ShowGeneralAdminSettingsObj = {
  __typename?: 'ShowGeneralAdminSettingsObj';
  side_name: Scalars['String']['output'];
};

export type ShowPostsForums = {
  __typename?: 'ShowPostsForums';
  content: Array<TextLanguage>;
  created: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  post_id: Scalars['Int']['output'];
  user: User;
};

export type ShowPostsForumsMetaTags = {
  __typename?: 'ShowPostsForumsMetaTags';
  action: TopicActions | `${TopicActions}`;
  action_id: Scalars['Int']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  user: User;
};

export type ShowPostsForumsObj = {
  __typename?: 'ShowPostsForumsObj';
  edges: Array<PostsWithMetaTagsUnion>;
  lastEdges: Array<PostsWithMetaTagsUnion>;
  pageInfo: PageInfo;
};

export const ShowPostsForumsSortingEnum = {
  newest: 'newest',
  oldest: 'oldest'
} as const;

export type ShowPostsForumsSortingEnum = typeof ShowPostsForumsSortingEnum[keyof typeof ShowPostsForumsSortingEnum];
export type ShowTopicsForums = {
  __typename?: 'ShowTopicsForums';
  breadcrumbs: Array<BreadcrumbsForumForums>;
  content: Array<TextLanguage>;
  created: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  locked: Scalars['Boolean']['output'];
  permissions: PermissionsTopicForums;
  title: Array<TextLanguage>;
  user: User;
};

export type ShowTopicsForumsObj = {
  __typename?: 'ShowTopicsForumsObj';
  edges: Array<ShowTopicsForums>;
  pageInfo: PageInfo;
};

export type SignUpCoreMembersObj = {
  __typename?: 'SignUpCoreMembersObj';
  email: Scalars['String']['output'];
  group_id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type SignUpStatsAdminMembers = {
  __typename?: 'SignUpStatsAdminMembers';
  joined_date: Scalars['String']['output'];
  users_joined: Scalars['Int']['output'];
};

export const SortDirectionEnum = {
  asc: 'asc',
  desc: 'desc'
} as const;

export type SortDirectionEnum = typeof SortDirectionEnum[keyof typeof SortDirectionEnum];
export type StaffGroupUser = {
  __typename?: 'StaffGroupUser';
  group_name: Array<TextLanguage>;
  id: Scalars['Int']['output'];
};

export type TextLanguage = {
  __typename?: 'TextLanguage';
  language_code: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TextLanguageInput = {
  language_code: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export const TopicActions = {
  lock: 'lock',
  unlock: 'unlock'
} as const;

export type TopicActions = typeof TopicActions[keyof typeof TopicActions];
export type TopicLastPostsShowForumForums = {
  __typename?: 'TopicLastPostsShowForumForums';
  id: Scalars['Int']['output'];
  title: Array<TextLanguage>;
};

export type UploadAvatarCoreMembersObj = {
  __typename?: 'UploadAvatarCoreMembersObj';
  dir_folder: Scalars['String']['output'];
  extension: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  mimetype: Scalars['String']['output'];
  module_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  size: Scalars['Int']['output'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<AvatarUser>;
  avatar_color: Scalars['String']['output'];
  group: GroupUser;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  name_seo: Scalars['String']['output'];
};

export type UserOrGroupCoreStaffUnion = StaffGroupUser | User;

export type PostsWithMetaTagsUnion = ShowPostsForums | ShowPostsForumsMetaTags;

export type Admin__Install__Create_DatabaseMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin__Install__Create_DatabaseMutation = { __typename?: 'Mutation', admin__install__create_database: string };

export type Admin__Core_Languages__CreateMutationVariables = Exact<{
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
  locale: Scalars['String']['input'];
  time24: Scalars['Boolean']['input'];
}>;


export type Admin__Core_Languages__CreateMutation = { __typename?: 'Mutation', admin__core_languages__create: { __typename?: 'ShowCoreLanguages', code: string, id: number, name: string } };

export type Admin__Core_Languages__DeleteMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Admin__Core_Languages__DeleteMutation = { __typename?: 'Mutation', admin__core_languages__delete: string };

export type Admin__Core_Languages__DownloadMutationVariables = Exact<{
  all: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  plugins: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type Admin__Core_Languages__DownloadMutation = { __typename?: 'Mutation', admin__core_languages__download: string };

export type Admin__Core_Languages__EditMutationVariables = Exact<{
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
  locale: Scalars['String']['input'];
  time24: Scalars['Boolean']['input'];
}>;


export type Admin__Core_Languages__EditMutation = { __typename?: 'Mutation', admin__core_languages__edit: { __typename?: 'ShowCoreLanguages', code: string, default: boolean, enabled: boolean, id: number, name: string, protected: boolean, timezone: string } };

export type Admin__Core_Languages__UpdateMutationVariables = Exact<{
  code: Scalars['String']['input'];
  file: Scalars['Upload']['input'];
}>;


export type Admin__Core_Languages__UpdateMutation = { __typename?: 'Mutation', admin__core_languages__update: string };

export type Admin__Core_Groups__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Admin__Core_Groups__DeleteMutation = { __typename?: 'Mutation', admin__core_groups__delete: string };

export type Admin__Core_Groups__EditMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Admin__Core_Groups__EditMutation = { __typename?: 'Mutation', admin__core_groups__edit: { __typename?: 'ShowAdminGroups', created: Date, id: number, protected: boolean, users_count: number, guest: boolean, updated: Date, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Groups__Admin_CreateMutationVariables = Exact<{
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Core_Groups__Admin_CreateMutation = { __typename?: 'Mutation', core_groups__admin_create: { __typename?: 'ShowAdminGroups', created: Date, id: number, protected: boolean, users_count: number, guest: boolean, updated: Date, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Admin__Core_Staff_Administrators__CreateMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
}>;


export type Admin__Core_Staff_Administrators__CreateMutation = { __typename?: 'Mutation', admin__core_staff_administrators__create: { __typename?: 'ShowAdminStaffAdministrators', created: Date, id: number, protected: boolean, unrestricted: boolean, updated: Date } };

export type Admin__Core_Staff_Administrators__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Admin__Core_Staff_Administrators__DeleteMutation = { __typename?: 'Mutation', admin__core_staff_administrators__delete: string };

export type Admin__Core_Staff_Moderators__CreateMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
}>;


export type Admin__Core_Staff_Moderators__CreateMutation = { __typename?: 'Mutation', admin__core_staff_moderators__create: { __typename?: 'ShowAdminStaffModerators', created: Date, id: number, protected: boolean, unrestricted: boolean, updated: Date } };

export type Admin__Core_Staff_Moderators__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Admin__Core_Staff_Moderators__DeleteMutation = { __typename?: 'Mutation', admin__core_staff_moderators__delete: string };

export type Admin__Core_Nav__Change_PositionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  indexToMove: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Nav__Change_PositionMutation = { __typename?: 'Mutation', admin__core_nav__change_position: string };

export type Admin__Core_Nav__CreateMutationVariables = Exact<{
  description: Array<TextLanguageInput> | TextLanguageInput;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Admin__Core_Nav__CreateMutation = { __typename?: 'Mutation', admin__core_nav__create: { __typename?: 'ShowCoreNav', id: number } };

export type Admin__Core_Nav__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Admin__Core_Nav__DeleteMutation = { __typename?: 'Mutation', admin__core_nav__delete: string };

export type Admin__Core_Nav__EditMutationVariables = Exact<{
  description: Array<TextLanguageInput> | TextLanguageInput;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Admin__Core_Nav__EditMutation = { __typename?: 'Mutation', admin__core_nav__edit: { __typename?: 'ShowCoreNav', id: number } };

export type Admin__Core_Plugins__CreateMutationVariables = Exact<{
  author: Scalars['String']['input'];
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  supportUrl: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__CreateMutation = { __typename?: 'Mutation', admin__core_plugins__create: { __typename?: 'ShowAdminPlugins', code: string } };

export type Admin__Core_Plugins__DeleteMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__DeleteMutation = { __typename?: 'Mutation', admin__core_plugins__delete: string };

export type Admin__Core_Plugins__DownloadMutationVariables = Exact<{
  code: Scalars['String']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
  versionCode?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Plugins__DownloadMutation = { __typename?: 'Mutation', admin__core_plugins__download: string };

export type Admin__Core_Plugins__EditMutationVariables = Exact<{
  author: Scalars['String']['input'];
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  supportUrl: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  default?: InputMaybe<Scalars['Boolean']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type Admin__Core_Plugins__EditMutation = { __typename?: 'Mutation', admin__core_plugins__edit: { __typename?: 'ShowAdminPlugins', id: number, name: string } };

export type Admin__Core_Plugins__UploadMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__UploadMutation = { __typename?: 'Mutation', admin__core_plugins__upload: { __typename?: 'ShowAdminPlugins', id: number, name: string } };

export type Admin_Sessions__Sign_OutMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__Sign_OutMutation = { __typename?: 'Mutation', admin_sessions__sign_out: string };

export type Admin_Settings__General__EditMutationVariables = Exact<{
  sideName: Scalars['String']['input'];
}>;


export type Admin_Settings__General__EditMutation = { __typename?: 'Mutation', admin_settings__general__edit: { __typename?: 'GeneralAdminSettingsObj', side_name: string } };

export type Admin__Core_Themes__CreateMutationVariables = Exact<{
  author: Scalars['String']['input'];
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  supportUrl: Scalars['String']['input'];
}>;


export type Admin__Core_Themes__CreateMutation = { __typename?: 'Mutation', admin__core_themes__create: { __typename?: 'ShowAdminThemes', id: number } };

export type Admin__Core_Themes__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Admin__Core_Themes__DeleteMutation = { __typename?: 'Mutation', admin__core_themes__delete: string };

export type Admin__Core_Themes__DownloadMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
  versionCode?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Themes__DownloadMutation = { __typename?: 'Mutation', admin__core_themes__download: string };

export type Admin__Core_Themes__EditMutationVariables = Exact<{
  author: Scalars['String']['input'];
  authorUrl?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  supportUrl: Scalars['String']['input'];
}>;


export type Admin__Core_Themes__EditMutation = { __typename?: 'Mutation', admin__core_themes__edit: { __typename?: 'ShowAdminThemes', id: number } };

export type Admin__Core_Themes__UploadMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Themes__UploadMutation = { __typename?: 'Mutation', admin__core_themes__upload: { __typename?: 'ShowAdminThemes', id: number, name: string } };

export type Core_Members__Sign_UpMutationVariables = Exact<{
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type Core_Members__Sign_UpMutation = { __typename?: 'Mutation', core_members__sign_up: { __typename?: 'SignUpCoreMembersObj', email: string, name: string, newsletter?: boolean | null } };

export type Core_Members__Avatar__DeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type Core_Members__Avatar__DeleteMutation = { __typename?: 'Mutation', core_members__avatar__delete: string };

export type Core_Members__Avatar__UploadMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type Core_Members__Avatar__UploadMutation = { __typename?: 'Mutation', core_members__avatar__upload: { __typename?: 'UploadAvatarCoreMembersObj', dir_folder: string, extension: string, id: number, mimetype: string, module_name: string, name: string, size: number } };

export type Core_Sessions__Sign_InMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type Core_Sessions__Sign_InMutation = { __typename?: 'Mutation', core_sessions__sign_in: string };

export type Core_Sessions__Sign_OutMutationVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__Sign_OutMutation = { __typename?: 'Mutation', core_sessions__sign_out: string };

export type Core_Themes__ChangeMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Core_Themes__ChangeMutation = { __typename?: 'Mutation', core_themes__change: string };

export type Admin__Forum_Forums__Change_PositionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  indexToMove: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Forum_Forums__Change_PositionMutation = { __typename?: 'Mutation', admin__forum_forums__change_position: string };

export type Admin__Forum_Forums__CreateMutationVariables = Exact<{
  name: Array<TextLanguageInput> | TextLanguageInput;
  description: Array<TextLanguageInput> | TextLanguageInput;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  permissions: PermissionsCreateForumForums;
}>;


export type Admin__Forum_Forums__CreateMutation = { __typename?: 'Mutation', admin__forum_forums__create: { __typename?: 'CreateForumForumsObj', created: Date, id: number, position: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Admin__Forum_Forums__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  moveTopicsTo?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Forum_Forums__DeleteMutation = { __typename?: 'Mutation', admin__forum_forums__delete: string };

export type Admin__Forum_Forums__EditMutationVariables = Exact<{
  description: Array<TextLanguageInput> | TextLanguageInput;
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
  permissions: PermissionsCreateForumForums;
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Forum_Forums__EditMutation = { __typename?: 'Mutation', admin__forum_forums__edit: { __typename?: 'CreateForumForumsObj', id: number, position: number, created: Date, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Admin__Forum_Forums__Show_ShortQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  showAllForums?: InputMaybe<Scalars['Boolean']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Forum_Forums__Show_ShortQuery = { __typename?: 'Query', admin__forum_forums__show: { __typename?: 'ShowForumForumsAdminObj', edges: Array<{ __typename?: 'ShowForumForumsAdmin', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Forum_Posts__CreateMutationVariables = Exact<{
  content: Array<TextLanguageInput> | TextLanguageInput;
  topicId: Scalars['Int']['input'];
}>;


export type Forum_Posts__CreateMutation = { __typename?: 'Mutation', forum_posts__create: { __typename?: 'ShowPostsForums', created: Date, id: number, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', dir_folder: string, id: number, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } };

export type Forum_Topics__Actions__Lock_ToggleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Forum_Topics__Actions__Lock_ToggleMutation = { __typename?: 'Mutation', forum_topics__actions__lock_toggle: boolean };

export type Forum_Topics__CreateMutationVariables = Exact<{
  content: Array<TextLanguageInput> | TextLanguageInput;
  forumId: Scalars['Int']['input'];
  title: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Forum_Topics__CreateMutation = { __typename?: 'Mutation', forum_topics__create: { __typename?: 'ShowTopicsForums', created: Date, id: number, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Forum_Topics__EditMutationVariables = Exact<{
  content: Array<TextLanguageInput> | TextLanguageInput;
  id: Scalars['Int']['input'];
  title: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Forum_Topics__EditMutation = { __typename?: 'Mutation', forum_topics__edit: { __typename?: 'ShowTopicsForums', id: number, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Admin__Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Sessions__AuthorizationQuery = { __typename?: 'Query', admin__sessions__authorization: { __typename?: 'AuthorizationAdminSessionsObj', version: string, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } | null, rebuild_required: { __typename?: 'RebuildRequiredObj', themes: boolean, langs: boolean, plugins: boolean } } };

export type Admin__Install__LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Install__LayoutQuery = { __typename?: 'Query', admin__install__layout: { __typename?: 'LayoutAdminInstallObj', status: LayoutAdminInstallEnum } };

export type Admin__Core__DashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Core__DashboardQuery = { __typename?: 'Query', admin__core_members__stats_sign_up: Array<{ __typename?: 'SignUpStatsAdminMembers', joined_date: string, users_joined: number }> };

export type Admin__Core_Groups__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs> | ShowAdminGroupsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Groups__ShowQuery = { __typename?: 'Query', admin__core_groups__show: { __typename?: 'ShowAdminGroupsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, startCursor?: number | null, totalCount: number, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'ShowAdminGroups', created: Date, updated: Date, id: number, users_count: number, protected: boolean, guest: boolean, root: boolean, default: boolean, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Admin__Core_Groups__Show_ShortQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Groups__Show_ShortQuery = { __typename?: 'Query', admin__core_groups__show: { __typename?: 'ShowAdminGroupsObj', edges: Array<{ __typename?: 'ShowAdminGroups', id: number, guest: boolean, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Admin__Core_Staff_Administrators__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffAdministratorsSortByArgs> | ShowAdminStaffAdministratorsSortByArgs>;
}>;


export type Admin__Core_Staff_Administrators__ShowQuery = { __typename?: 'Query', admin__core_staff_administrators__show: { __typename?: 'ShowAdminStaffAdministratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffAdministrators', created: Date, id: number, unrestricted: boolean, updated: Date, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: number, group_name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, name_seo: string, id: number, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin__Core_Staff_Moderators__ShowQueryVariables = Exact<{
  sortBy?: InputMaybe<Array<ShowAdminStaffModeratorsSortByArgs> | ShowAdminStaffModeratorsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Staff_Moderators__ShowQuery = { __typename?: 'Query', admin__core_staff_moderators__show: { __typename?: 'ShowAdminStaffModeratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffModerators', created: Date, id: number, unrestricted: boolean, updated: Date, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: number, group_name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin__Core_Members__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs> | ShowAdminMembersSortByArgs>;
  groups?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type Admin__Core_Members__ShowQuery = { __typename?: 'Query', admin__core_members__show: { __typename?: 'ShowAdminMembersObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminMembers', avatar_color: string, email: string, id: number, name_seo: string, joined: Date, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Admin__Core_Nav__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Core_Nav__ShowQuery = { __typename?: 'Query', core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, href: string, external: boolean, position: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Admin__Core_Plugins__Download_CheckQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__Download_CheckQuery = { __typename?: 'Query', admin__core_plugins__download_check: { __typename?: 'CheckDownloadAdminPluginsObj', admin_pages: number, admin_templates: number, databases: number, graphql_mutations: number, graphql_queries: number, hooks: number, language: boolean, pages: number, pages_container: number, templates: number, default_page: boolean } };

export type Admin__Core_Plugins__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminPluginsSortByArgs> | ShowAdminPluginsSortByArgs>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__ShowQuery = { __typename?: 'Query', admin__core_plugins__show: { __typename?: 'ShowAdminPluginsObj', edges: Array<{ __typename?: 'ShowAdminPlugins', author: string, author_url?: string | null, code: string, default: boolean, description?: string | null, enabled: boolean, id: number, name: string, support_url: string, updated: Date, version?: string | null, created: Date, version_code?: number | null, allow_default: boolean }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin__Settings__General__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Settings__General__ShowQuery = { __typename?: 'Query', admin__settings__general__show: { __typename?: 'ShowGeneralAdminSettingsObj', side_name: string } };

export type Admin_Core_Themes__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminThemesSortByArgs> | ShowAdminThemesSortByArgs>;
}>;


export type Admin_Core_Themes__ShowQuery = { __typename?: 'Query', admin__core_themes__show: { __typename?: 'ShowAdminThemesObj', edges: Array<{ __typename?: 'ShowAdminThemes', author: string, author_url?: string | null, created: Date, default: boolean, id: number, name: string, protected: boolean, support_url: string, version?: string | null, version_code?: number | null }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_MiddlewareQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_MiddlewareQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', default: boolean, code: string, id: number, name: string, timezone: string, enabled: boolean, locale: string, time_24: boolean }> }, core_themes__show: { __typename?: 'ShowCoreThemesObj', edges: Array<{ __typename?: 'ShowCoreThemes', id: number, name: string }> } };

export type Core_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__AuthorizationQuery = { __typename?: 'Query', core_sessions__authorization: { __typename?: 'AuthorizationCoreSessionsObj', theme_id?: number | null, plugin_default: string, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } | null, rebuild_required: { __typename?: 'RebuildRequiredObj', themes: boolean, langs: boolean, plugins: boolean } }, core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string }> }, core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, position: number, external: boolean, href: string, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Core_Languages__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreLanguagesSortByArgs> | ShowCoreLanguagesSortByArgs>;
}>;


export type Core_Languages__ShowQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string, default: boolean, enabled: boolean, id: number, name: string, protected: boolean, timezone: string, locale: string, time_24: boolean, updated: Date, created: Date }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_Members__Show__SearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Members__Show__SearchQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Core_Members__ProfilesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  nameSeo: Scalars['String']['input'];
}>;


export type Core_Members__ProfilesQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, joined: Date, name: string, name_seo: string, posts: number, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Admin__Forum_Forums__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Forum_Forums__ShowQuery = { __typename?: 'Query', admin__forum_forums__show: { __typename?: 'ShowForumForumsAdminObj', edges: Array<{ __typename?: 'ShowForumForumsAdmin', id: number, position: number, created: Date, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children: Array<{ __typename?: 'ChildrenShowForumForums', created: Date, id: number, position: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, _count: { __typename?: 'ShowForumForumsCounts', posts: number, topics: number, total_posts: number, total_topics: number } }>, permissions: { __typename?: 'PermissionsForumForumsAdmin', can_all_create: boolean, can_all_read: boolean, can_all_reply: boolean, can_all_view: boolean, groups: Array<{ __typename?: 'GroupsPermissionsForumForums', can_create: boolean, can_read: boolean, can_reply: boolean, can_view: boolean, id: number }> }, _count: { __typename?: 'ShowForumForumsCounts', posts: number, topics: number, total_posts: number, total_topics: number } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Forum_Forums__ShowQueryVariables = Exact<{
  lastPostsArgs?: InputMaybe<LastPostsShowForumForumsArgs>;
}>;


export type Forum_Forums__ShowQuery = { __typename?: 'Query', forum_forums__show: { __typename?: 'ShowForumForumsObj', edges: Array<{ __typename?: 'ShowForumForumsWithChildren', id: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children: Array<{ __typename?: 'ChildrenShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children: Array<{ __typename?: 'LastChildShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, _count: { __typename?: 'ShowForumForumsCounts', total_posts: number, total_topics: number, topics: number, posts: number }, last_posts: { __typename?: 'LastPostsShowForumForumsObj', edges: Array<{ __typename?: 'LastPostsShowForumForums', id: number, created: Date, user: { __typename?: 'User', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', dir_folder: string, id: number, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }, topic: { __typename?: 'TopicLastPostsShowForumForums', id: number, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } }> }> } };

export type Forum_Forums__Show_ItemQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  forumId: Scalars['Int']['input'];
  lastPostsArgs?: InputMaybe<LastPostsShowForumForumsArgs>;
}>;


export type Forum_Forums__Show_ItemQuery = { __typename?: 'Query', forum_forums__show: { __typename?: 'ShowForumForumsObj', edges: Array<{ __typename?: 'ShowForumForumsWithChildren', id: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children: Array<{ __typename?: 'ChildrenShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children: Array<{ __typename?: 'LastChildShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, _count: { __typename?: 'ShowForumForumsCounts', total_posts: number, total_topics: number, topics: number, posts: number }, last_posts: { __typename?: 'LastPostsShowForumForumsObj', edges: Array<{ __typename?: 'LastPostsShowForumForums', created: Date, id: number, user: { __typename?: 'User', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', dir_folder: string, id: number, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }, topic: { __typename?: 'TopicLastPostsShowForumForums', id: number, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } }>, permissions: { __typename?: 'PermissionsForumForums', can_create: boolean }, breadcrumbs: Array<{ __typename?: 'BreadcrumbsForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> }> }, forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: Date, id: number, locked: boolean, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', id: number, name_seo: string, name: string, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Forum_Forums__Show_Item_MoreQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  forumId: Scalars['Int']['input'];
}>;


export type Forum_Forums__Show_Item_MoreQuery = { __typename?: 'Query', forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: Date, id: number, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', id: number, name_seo: string, name: string, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Forum_Posts__Show_MoreQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowPostsForumsSortingEnum>;
}>;


export type Forum_Posts__Show_MoreQuery = { __typename?: 'Query', forum_posts__show: { __typename?: 'ShowPostsForumsObj', edges: Array<{ __typename: 'ShowPostsForums', id: number, created: Date, post_id: number, content: Array<{ __typename?: 'TextLanguage', value: string, language_code: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } | { __typename: 'ShowPostsForumsMetaTags', action: TopicActions, id: number, created: Date, action_id: number, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Forum_Topics__ShowQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowPostsForumsSortingEnum>;
  firstEdges?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Forum_Topics__ShowQuery = { __typename?: 'Query', forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: Date, id: number, locked: boolean, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }, breadcrumbs: Array<{ __typename?: 'BreadcrumbsForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', value: string, language_code: string }> }>, permissions: { __typename?: 'PermissionsTopicForums', can_reply: boolean, can_edit: boolean } }> }, forum_posts__show: { __typename?: 'ShowPostsForumsObj', edges: Array<{ __typename: 'ShowPostsForums', id: number, created: Date, post_id: number, content: Array<{ __typename?: 'TextLanguage', value: string, language_code: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } | { __typename: 'ShowPostsForumsMetaTags', action: TopicActions, id: number, created: Date, action_id: number, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number }, lastEdges: Array<{ __typename: 'ShowPostsForums', id: number, created: Date, post_id: number, content: Array<{ __typename?: 'TextLanguage', value: string, language_code: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } | { __typename: 'ShowPostsForumsMetaTags', action: TopicActions, id: number, created: Date, action_id: number, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }> } };


export const Admin__Install__Create_Database = gql`
    mutation Admin__install__create_database {
  admin__install__create_database
}
    `;
export const Admin__Core_Languages__Create = gql`
    mutation Admin__core_languages__create($code: String!, $name: String!, $timezone: String!, $locale: String!, $time24: Boolean!) {
  admin__core_languages__create(
    code: $code
    name: $name
    timezone: $timezone
    locale: $locale
    time_24: $time24
  ) {
    code
    id
    name
  }
}
    `;
export const Admin__Core_Languages__Delete = gql`
    mutation Admin__core_languages__delete($code: String!) {
  admin__core_languages__delete(code: $code)
}
    `;
export const Admin__Core_Languages__Download = gql`
    mutation Admin__core_languages__download($all: Boolean!, $code: String!, $plugins: [String!]!) {
  admin__core_languages__download(all: $all, code: $code, plugins: $plugins)
}
    `;
export const Admin__Core_Languages__Edit = gql`
    mutation Admin__core_languages__edit($default: Boolean!, $enabled: Boolean!, $id: Int!, $name: String!, $timezone: String!, $locale: String!, $time24: Boolean!) {
  admin__core_languages__edit(
    default: $default
    enabled: $enabled
    id: $id
    name: $name
    timezone: $timezone
    locale: $locale
    time_24: $time24
  ) {
    code
    default
    enabled
    id
    name
    protected
    timezone
  }
}
    `;
export const Admin__Core_Languages__Update = gql`
    mutation Admin__core_languages__update($code: String!, $file: Upload!) {
  admin__core_languages__update(code: $code, file: $file)
}
    `;
export const Admin__Core_Groups__Delete = gql`
    mutation Admin__core_groups__delete($id: Int!) {
  admin__core_groups__delete(id: $id)
}
    `;
export const Admin__Core_Groups__Edit = gql`
    mutation Admin__core_groups__edit($id: Int!, $name: [TextLanguageInput!]!) {
  admin__core_groups__edit(id: $id, name: $name) {
    created
    id
    name {
      language_code
      value
    }
    protected
    users_count
    guest
    updated
  }
}
    `;
export const Core_Groups__Admin_Create = gql`
    mutation core_groups__admin_create($name: [TextLanguageInput!]!) {
  core_groups__admin_create(name: $name) {
    created
    id
    name {
      language_code
      value
    }
    protected
    users_count
    guest
    updated
  }
}
    `;
export const Admin__Core_Staff_Administrators__Create = gql`
    mutation Admin__core_staff_administrators__create($groupId: Int, $userId: Int, $unrestricted: Boolean!) {
  admin__core_staff_administrators__create(
    group_id: $groupId
    user_id: $userId
    unrestricted: $unrestricted
  ) {
    created
    id
    protected
    unrestricted
    updated
  }
}
    `;
export const Admin__Core_Staff_Administrators__Delete = gql`
    mutation Admin__core_staff_administrators__delete($id: Int!) {
  admin__core_staff_administrators__delete(id: $id)
}
    `;
export const Admin__Core_Staff_Moderators__Create = gql`
    mutation Admin__core_staff_moderators__create($groupId: Int, $userId: Int, $unrestricted: Boolean!) {
  admin__core_staff_moderators__create(
    group_id: $groupId
    user_id: $userId
    unrestricted: $unrestricted
  ) {
    created
    id
    protected
    unrestricted
    updated
  }
}
    `;
export const Admin__Core_Staff_Moderators__Delete = gql`
    mutation Admin__core_staff_moderators__delete($id: Int!) {
  admin__core_staff_moderators__delete(id: $id)
}
    `;
export const Admin__Core_Nav__Change_Position = gql`
    mutation Admin__core_nav__change_position($id: Int!, $indexToMove: Int!, $parentId: Int) {
  admin__core_nav__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;
export const Admin__Core_Nav__Create = gql`
    mutation Admin__core_nav__create($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $name: [TextLanguageInput!]!) {
  admin__core_nav__create(
    description: $description
    external: $external
    href: $href
    name: $name
  ) {
    id
  }
}
    `;
export const Admin__Core_Nav__Delete = gql`
    mutation Admin__core_nav__delete($id: Int!) {
  admin__core_nav__delete(id: $id)
}
    `;
export const Admin__Core_Nav__Edit = gql`
    mutation Admin__core_nav__edit($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $id: Int!, $name: [TextLanguageInput!]!) {
  admin__core_nav__edit(
    description: $description
    external: $external
    href: $href
    id: $id
    name: $name
  ) {
    id
  }
}
    `;
export const Admin__Core_Plugins__Create = gql`
    mutation Admin__core_plugins__create($author: String!, $authorUrl: String, $code: String!, $name: String!, $supportUrl: String!, $description: String) {
  admin__core_plugins__create(
    author: $author
    author_url: $authorUrl
    code: $code
    name: $name
    support_url: $supportUrl
    description: $description
  ) {
    code
  }
}
    `;
export const Admin__Core_Plugins__Delete = gql`
    mutation Admin__core_plugins__delete($code: String!) {
  admin__core_plugins__delete(code: $code)
}
    `;
export const Admin__Core_Plugins__Download = gql`
    mutation Admin__core_plugins__download($code: String!, $version: String, $versionCode: Int) {
  admin__core_plugins__download(
    code: $code
    version: $version
    version_code: $versionCode
  )
}
    `;
export const Admin__Core_Plugins__Edit = gql`
    mutation Admin__core_plugins__edit($author: String!, $authorUrl: String, $code: String!, $name: String!, $supportUrl: String!, $description: String, $default: Boolean, $enabled: Boolean) {
  admin__core_plugins__edit(
    author: $author
    author_url: $authorUrl
    code: $code
    name: $name
    support_url: $supportUrl
    description: $description
    default: $default
    enabled: $enabled
  ) {
    id
    name
  }
}
    `;
export const Admin__Core_Plugins__Upload = gql`
    mutation Admin__core_plugins__upload($file: Upload!, $code: String) {
  admin__core_plugins__upload(file: $file, code: $code) {
    id
    name
  }
}
    `;
export const Admin_Sessions__Sign_Out = gql`
    mutation Admin_sessions__sign_out {
  admin_sessions__sign_out
}
    `;
export const Admin_Settings__General__Edit = gql`
    mutation Admin_settings__general__edit($sideName: String!) {
  admin_settings__general__edit(side_name: $sideName) {
    side_name
  }
}
    `;
export const Admin__Core_Themes__Create = gql`
    mutation Admin__core_themes__create($author: String!, $authorUrl: String, $name: String!, $supportUrl: String!) {
  admin__core_themes__create(
    author: $author
    author_url: $authorUrl
    name: $name
    support_url: $supportUrl
  ) {
    id
  }
}
    `;
export const Admin__Core_Themes__Delete = gql`
    mutation Admin__core_themes__delete($id: Int!) {
  admin__core_themes__delete(id: $id)
}
    `;
export const Admin__Core_Themes__Download = gql`
    mutation Admin__core_themes__download($id: Int!, $version: String, $versionCode: Int) {
  admin__core_themes__download(
    id: $id
    version: $version
    version_code: $versionCode
  )
}
    `;
export const Admin__Core_Themes__Edit = gql`
    mutation Admin__core_themes__edit($author: String!, $authorUrl: String, $id: Int!, $name: String!, $supportUrl: String!) {
  admin__core_themes__edit(
    author: $author
    author_url: $authorUrl
    id: $id
    name: $name
    support_url: $supportUrl
  ) {
    id
  }
}
    `;
export const Admin__Core_Themes__Upload = gql`
    mutation Admin__core_themes__upload($file: Upload!, $id: Int) {
  admin__core_themes__upload(file: $file, id: $id) {
    id
    name
  }
}
    `;
export const Core_Members__Sign_Up = gql`
    mutation Core_members__sign_up($email: String!, $name: String!, $password: String!, $newsletter: Boolean) {
  core_members__sign_up(
    email: $email
    name: $name
    password: $password
    newsletter: $newsletter
  ) {
    email
    name
    newsletter
  }
}
    `;
export const Core_Members__Avatar__Delete = gql`
    mutation Core_members__avatar__delete {
  core_members__avatar__delete
}
    `;
export const Core_Members__Avatar__Upload = gql`
    mutation Core_members__avatar__upload($file: Upload!) {
  core_members__avatar__upload(file: $file) {
    dir_folder
    extension
    id
    mimetype
    module_name
    name
    size
  }
}
    `;
export const Core_Sessions__Sign_In = gql`
    mutation Core_sessions__sign_in($email: String!, $password: String!, $remember: Boolean, $admin: Boolean) {
  core_sessions__sign_in(
    email: $email
    password: $password
    remember: $remember
    admin: $admin
  )
}
    `;
export const Core_Sessions__Sign_Out = gql`
    mutation Core_sessions__sign_out {
  core_sessions__sign_out
}
    `;
export const Core_Themes__Change = gql`
    mutation Core_themes__change($id: Int!) {
  core_themes__change(id: $id)
}
    `;
export const Admin__Forum_Forums__Change_Position = gql`
    mutation Admin__forum_forums__change_position($id: Int!, $indexToMove: Int!, $parentId: Int) {
  admin__forum_forums__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;
export const Admin__Forum_Forums__Create = gql`
    mutation Admin__forum_forums__create($name: [TextLanguageInput!]!, $description: [TextLanguageInput!]!, $parentId: Int, $permissions: PermissionsCreateForumForums!) {
  admin__forum_forums__create(
    name: $name
    description: $description
    parent_id: $parentId
    permissions: $permissions
  ) {
    created
    description {
      language_code
      value
    }
    id
    name {
      language_code
      value
    }
    position
  }
}
    `;
export const Admin__Forum_Forums__Delete = gql`
    mutation Admin__forum_forums__delete($id: Int!, $moveTopicsTo: Int) {
  admin__forum_forums__delete(id: $id, move_topics_to: $moveTopicsTo)
}
    `;
export const Admin__Forum_Forums__Edit = gql`
    mutation Admin__forum_forums__edit($description: [TextLanguageInput!]!, $id: Int!, $name: [TextLanguageInput!]!, $permissions: PermissionsCreateForumForums!, $parentId: Int) {
  admin__forum_forums__edit(
    description: $description
    id: $id
    name: $name
    permissions: $permissions
    parent_id: $parentId
  ) {
    id
    name {
      language_code
      value
    }
    description {
      language_code
      value
    }
    position
    created
  }
}
    `;
export const Admin__Forum_Forums__Show_Short = gql`
    query Admin__forum_forums__show_short($search: String, $showAllForums: Boolean, $first: Int) {
  admin__forum_forums__show(
    search: $search
    show_all_forums: $showAllForums
    first: $first
  ) {
    edges {
      name {
        language_code
        value
      }
      id
    }
  }
}
    `;
export const Forum_Posts__Create = gql`
    mutation Forum_posts__create($content: [TextLanguageInput!]!, $topicId: Int!) {
  forum_posts__create(content: $content, topic_id: $topicId) {
    content {
      language_code
      value
    }
    created
    id
    user {
      avatar {
        dir_folder
        id
        name
      }
      avatar_color
      group {
        id
        name {
          language_code
          value
        }
      }
      id
      name
      name_seo
    }
  }
}
    `;
export const Forum_Topics__Actions__Lock_Toggle = gql`
    mutation Forum_topics__actions__lock_toggle($id: Int!) {
  forum_topics__actions__lock_toggle(id: $id)
}
    `;
export const Forum_Topics__Create = gql`
    mutation Forum_topics__create($content: [TextLanguageInput!]!, $forumId: Int!, $title: [TextLanguageInput!]!) {
  forum_topics__create(content: $content, forum_id: $forumId, title: $title) {
    created
    id
    title {
      language_code
      value
    }
  }
}
    `;
export const Forum_Topics__Edit = gql`
    mutation Forum_topics__edit($content: [TextLanguageInput!]!, $id: Int!, $title: [TextLanguageInput!]!) {
  forum_topics__edit(content: $content, id: $id, title: $title) {
    id
    title {
      language_code
      value
    }
    content {
      language_code
      value
    }
  }
}
    `;
export const Admin__Sessions__Authorization = gql`
    query Admin__sessions__authorization {
  admin__sessions__authorization {
    user {
      email
      id
      name_seo
      is_admin
      is_mod
      name
      newsletter
      avatar_color
      avatar {
        id
        dir_folder
        name
      }
      group {
        name {
          language_code
          value
        }
        id
      }
    }
    rebuild_required {
      themes
      langs
      plugins
    }
    version
  }
}
    `;
export const Admin__Install__Layout = gql`
    query Admin__install__layout {
  admin__install__layout {
    status
  }
}
    `;
export const Admin__Core__Dashboard = gql`
    query Admin__core__dashboard {
  admin__core_members__stats_sign_up {
    joined_date
    users_joined
  }
}
    `;
export const Admin__Core_Groups__Show = gql`
    query Admin__Core_groups__show($first: Int, $cursor: Int, $search: String, $sortBy: [ShowAdminGroupsSortByArgs!], $last: Int) {
  admin__core_groups__show(
    first: $first
    cursor: $cursor
    search: $search
    sortBy: $sortBy
    last: $last
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      startCursor
      totalCount
      hasPreviousPage
    }
    edges {
      created
      updated
      id
      users_count
      protected
      guest
      name {
        language_code
        value
      }
      root
      default
    }
  }
}
    `;
export const Admin__Core_Groups__Show_Short = gql`
    query Admin__Core_groups__show_short($first: Int, $search: String) {
  admin__core_groups__show(first: $first, search: $search) {
    edges {
      id
      name {
        language_code
        value
      }
      guest
    }
  }
}
    `;
export const Admin__Core_Staff_Administrators__Show = gql`
    query Admin__core_staff_administrators__show($cursor: Int, $first: Int, $last: Int, $sortBy: [ShowAdminStaffAdministratorsSortByArgs!]) {
  admin__core_staff_administrators__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
  ) {
    edges {
      created
      id
      unrestricted
      user_or_group {
        __typename
        ... on User {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          name_seo
          id
          name
        }
        ... on StaffGroupUser {
          group_name {
            language_code
            value
          }
          id
        }
      }
      updated
      protected
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Admin__Core_Staff_Moderators__Show = gql`
    query Admin__core_staff_moderators__show($sortBy: [ShowAdminStaffModeratorsSortByArgs!], $last: Int, $first: Int, $cursor: Int) {
  admin__core_staff_moderators__show(
    sortBy: $sortBy
    last: $last
    first: $first
    cursor: $cursor
  ) {
    edges {
      created
      id
      unrestricted
      user_or_group {
        __typename
        ... on User {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        ... on StaffGroupUser {
          group_name {
            language_code
            value
          }
          id
        }
      }
      updated
      protected
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Admin__Core_Members__Show = gql`
    query Admin__core_members__show($cursor: Int, $first: Int, $last: Int, $search: String, $sortBy: [ShowAdminMembersSortByArgs!], $groups: [Int!]) {
  admin__core_members__show(
    cursor: $cursor
    first: $first
    last: $last
    search: $search
    sortBy: $sortBy
    groups: $groups
  ) {
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        name
      }
      email
      id
      name_seo
      joined
      name
      group {
        id
        name {
          language_code
          value
        }
      }
    }
  }
}
    `;
export const Admin__Core_Nav__Show = gql`
    query Admin__Core_nav__show {
  core_nav__show {
    edges {
      children {
        description {
          language_code
          value
        }
        id
        name {
          language_code
          value
        }
        href
        external
        position
      }
      description {
        language_code
        value
      }
      id
      name {
        language_code
        value
      }
      href
      external
      position
    }
  }
}
    `;
export const Admin__Core_Plugins__Download_Check = gql`
    query Admin__core_plugins__download_check($code: String!) {
  admin__core_plugins__download_check(code: $code) {
    admin_pages
    admin_templates
    databases
    graphql_mutations
    graphql_queries
    hooks
    language
    pages
    pages_container
    templates
    default_page
  }
}
    `;
export const Admin__Core_Plugins__Show = gql`
    query Admin__core_plugins__show($cursor: Int, $first: Int, $last: Int, $sortBy: [ShowAdminPluginsSortByArgs!], $search: String) {
  admin__core_plugins__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    search: $search
  ) {
    edges {
      author
      author_url
      code
      default
      description
      enabled
      id
      name
      support_url
      updated
      version
      created
      version_code
      allow_default
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Admin__Settings__General__Show = gql`
    query Admin__settings__general__show {
  admin__settings__general__show {
    side_name
  }
}
    `;
export const Admin_Core_Themes__Show = gql`
    query Admin_core_themes__show($cursor: Int, $first: Int, $last: Int, $sortBy: [ShowAdminThemesSortByArgs!]) {
  admin__core_themes__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
  ) {
    edges {
      author
      author_url
      created
      default
      id
      name
      protected
      support_url
      version
      version_code
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Core_Middleware = gql`
    query Core_middleware {
  core_languages__show {
    edges {
      default
      code
      id
      name
      timezone
      enabled
      locale
      time_24
    }
  }
  core_themes__show {
    edges {
      id
      name
    }
  }
}
    `;
export const Core_Sessions__Authorization = gql`
    query Core_sessions__authorization {
  core_sessions__authorization {
    user {
      email
      id
      name_seo
      is_admin
      is_mod
      name
      newsletter
      avatar_color
      avatar {
        id
        dir_folder
        name
      }
      group {
        name {
          language_code
          value
        }
        id
      }
    }
    theme_id
    rebuild_required {
      themes
      langs
      plugins
    }
    plugin_default
  }
  core_languages__show {
    edges {
      code
    }
  }
  core_nav__show {
    edges {
      children {
        description {
          language_code
          value
        }
        id
        name {
          language_code
          value
        }
        position
        external
        href
      }
      description {
        language_code
        value
      }
      id
      name {
        language_code
        value
      }
      href
      external
      position
    }
  }
}
    `;
export const Core_Languages__Show = gql`
    query Core_languages__show($first: Int, $last: Int, $cursor: Int, $search: String, $sortBy: [ShowCoreLanguagesSortByArgs!]) {
  core_languages__show(
    first: $first
    last: $last
    cursor: $cursor
    search: $search
    sortBy: $sortBy
  ) {
    edges {
      code
      default
      enabled
      id
      name
      protected
      timezone
      locale
      time_24
      updated
      created
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Core_Members__Show__Search = gql`
    query Core_members__show__search($search: String, $first: Int) {
  core_members__show(search: $search, first: $first) {
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        name
      }
      group {
        id
        name {
          language_code
          value
        }
      }
      id
      name
      name_seo
    }
  }
}
    `;
export const Core_Members__Profiles = gql`
    query Core_members__profiles($first: Int, $nameSeo: String!) {
  core_members__show(first: $first, name_seo: $nameSeo) {
    edges {
      avatar_color
      avatar {
        id
        dir_folder
        name
      }
      group {
        name {
          language_code
          value
        }
      }
      id
      joined
      name
      name_seo
      posts
    }
  }
}
    `;
export const Admin__Forum_Forums__Show = gql`
    query Admin__forum_forums__show($first: Int, $cursor: Int, $parentId: Int) {
  admin__forum_forums__show(first: $first, cursor: $cursor, parent_id: $parentId) {
    edges {
      id
      description {
        language_code
        value
      }
      name {
        language_code
        value
      }
      position
      created
      children {
        created
        description {
          language_code
          value
        }
        id
        name {
          language_code
          value
        }
        position
        _count {
          posts
          topics
          total_posts
          total_topics
        }
      }
      permissions {
        can_all_create
        can_all_read
        can_all_reply
        can_all_view
        groups {
          can_create
          can_read
          can_reply
          can_view
          id
        }
      }
      _count {
        posts
        topics
        total_posts
        total_topics
      }
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Forum_Forums__Show = gql`
    query Forum_forums__show($lastPostsArgs: LastPostsShowForumForumsArgs) {
  forum_forums__show(last_posts_args: $lastPostsArgs) {
    edges {
      id
      description {
        language_code
        value
      }
      name {
        language_code
        value
      }
      children {
        id
        name {
          language_code
          value
        }
        children {
          id
          name {
            language_code
            value
          }
        }
        description {
          language_code
          value
        }
        _count {
          total_posts
          total_topics
          topics
          posts
        }
        last_posts {
          edges {
            id
            user {
              avatar {
                dir_folder
                id
                name
              }
              avatar_color
              group {
                id
                name {
                  language_code
                  value
                }
              }
              id
              name
              name_seo
            }
            topic {
              id
              title {
                language_code
                value
              }
            }
            created
          }
        }
      }
    }
  }
}
    `;
export const Forum_Forums__Show_Item = gql`
    query Forum_forums__show_item($cursor: Int, $first: Int, $last: Int, $forumId: Int!, $lastPostsArgs: LastPostsShowForumForumsArgs) {
  forum_forums__show(ids: [$forumId], last_posts_args: $lastPostsArgs) {
    edges {
      id
      description {
        language_code
        value
      }
      name {
        language_code
        value
      }
      children {
        id
        name {
          language_code
          value
        }
        children {
          id
          name {
            language_code
            value
          }
        }
        description {
          language_code
          value
        }
        _count {
          total_posts
          total_topics
          topics
          posts
        }
        last_posts {
          edges {
            created
            id
            user {
              avatar {
                dir_folder
                id
                name
              }
              avatar_color
              group {
                id
                name {
                  language_code
                  value
                }
              }
              id
              name
              name_seo
            }
            topic {
              id
              title {
                language_code
                value
              }
            }
          }
        }
      }
      permissions {
        can_create
      }
      breadcrumbs {
        id
        name {
          language_code
          value
        }
      }
    }
  }
  forum_topics__show(
    cursor: $cursor
    first: $first
    last: $last
    forum_id: $forumId
  ) {
    edges {
      created
      id
      title {
        language_code
        value
      }
      user {
        id
        name_seo
        name
        avatar_color
        avatar {
          id
          dir_folder
          name
        }
        group {
          id
          name {
            language_code
            value
          }
        }
      }
      content {
        language_code
        value
      }
      locked
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Forum_Forums__Show_Item_More = gql`
    query Forum_forums__show_item_more($cursor: Int, $first: Int, $last: Int, $forumId: Int!) {
  forum_topics__show(
    cursor: $cursor
    first: $first
    last: $last
    forum_id: $forumId
  ) {
    edges {
      created
      id
      title {
        language_code
        value
      }
      user {
        id
        name_seo
        name
        avatar_color
        avatar {
          id
          dir_folder
          name
        }
        group {
          id
          name {
            language_code
            value
          }
        }
      }
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Forum_Posts__Show_More = gql`
    query Forum_posts__show_more($id: Int!, $first: Int, $cursor: Int, $last: Int, $sortBy: ShowPostsForumsSortingEnum) {
  forum_posts__show(
    topic_id: $id
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
  ) {
    edges {
      __typename
      ... on ShowPostsForums {
        content {
          value
          language_code
        }
        id
        user {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        created
        post_id
      }
      ... on ShowPostsForumsMetaTags {
        action
        id
        user {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        created
        action_id
      }
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
  }
}
    `;
export const Forum_Topics__Show = gql`
    query Forum_topics__show($id: Int!, $first: Int, $cursor: Int, $last: Int, $sortBy: ShowPostsForumsSortingEnum, $firstEdges: Int) {
  forum_topics__show(id: $id) {
    edges {
      content {
        language_code
        value
      }
      created
      id
      locked
      title {
        language_code
        value
      }
      user {
        avatar_color
        avatar {
          id
          dir_folder
          name
        }
        group {
          id
          name {
            language_code
            value
          }
        }
        id
        name_seo
        name
      }
      breadcrumbs {
        id
        name {
          value
          language_code
        }
      }
      permissions {
        can_reply
        can_edit
      }
    }
  }
  forum_posts__show(
    topic_id: $id
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    firstEdges: $firstEdges
  ) {
    edges {
      __typename
      ... on ShowPostsForums {
        content {
          value
          language_code
        }
        id
        user {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        created
        post_id
      }
      ... on ShowPostsForumsMetaTags {
        action
        id
        user {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        created
        action_id
      }
    }
    pageInfo {
      count
      endCursor
      hasNextPage
      hasPreviousPage
      startCursor
      totalCount
    }
    lastEdges {
      __typename
      ... on ShowPostsForums {
        content {
          value
          language_code
        }
        id
        user {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        created
        post_id
      }
      ... on ShowPostsForumsMetaTags {
        action
        id
        user {
          avatar_color
          avatar {
            id
            dir_folder
            name
          }
          group {
            id
            name {
              language_code
              value
            }
          }
          id
          name_seo
          name
        }
        created
        action_id
      }
    }
  }
}
    `;