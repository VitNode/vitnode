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
  Upload: { input: any; output: any; }
};

export type AuthorizationAdminSessionsObj = {
  __typename?: 'AuthorizationAdminSessionsObj';
  user?: Maybe<AuthorizationCurrentUserObj>;
};

export type AuthorizationCoreSessionsObj = {
  __typename?: 'AuthorizationCoreSessionsObj';
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

export type ChildrenShowForumForums = {
  __typename?: 'ChildrenShowForumForums';
  _count: ShowForumForumsCount;
  children?: Maybe<Array<LastChildShowForumForums>>;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type CoreMiddlewareObj = {
  __typename?: 'CoreMiddlewareObj';
  default_language: Scalars['String']['output'];
  languages: Array<LanguageCoreMiddlewareObj>;
};

export type CreateForumForumsObj = {
  __typename?: 'CreateForumForumsObj';
  _count: ShowForumForumsCount;
  children?: Maybe<Array<ChildrenShowForumForums>>;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  parent?: Maybe<ShowForumForums>;
  position: Scalars['Int']['output'];
};

export type ForumTopicsForums = {
  __typename?: 'ForumTopicsForums';
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
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
  create: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  read: Scalars['Boolean']['input'];
  reply: Scalars['Boolean']['input'];
  view: Scalars['Boolean']['input'];
};

export type LanguageCoreMiddlewareObj = {
  __typename?: 'LanguageCoreMiddlewareObj';
  code: Scalars['String']['output'];
  default: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
};

export type LastChildShowForumForums = {
  __typename?: 'LastChildShowForumForums';
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

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
  admin_core_plugins__test: Scalars['String']['output'];
  admin_install__create_database: Scalars['String']['output'];
  admin_sessions__sign_out: Scalars['String']['output'];
  admin_settings__general__edit: GeneralAdminSettingsObj;
  core_groups__admin__delete: Scalars['String']['output'];
  core_groups__admin__edit: ShowAdminGroups;
  core_groups__admin_create: ShowAdminGroups;
  core_languages__edit: ShowCoreLanguages;
  core_members__avatar__delete: Scalars['String']['output'];
  core_members__avatar__upload: UploadAvatarCoreMembersObj;
  core_members__sign_up: SignUpCoreMembersObj;
  core_nav__admin__change_position: Scalars['String']['output'];
  core_nav__admin__create: ShowCoreNav;
  core_nav__admin__delete: Scalars['String']['output'];
  core_plugins__admin__create: ShowAdminPlugins;
  core_plugins__admin__delete: Scalars['String']['output'];
  core_sessions__sign_in: Scalars['String']['output'];
  core_sessions__sign_out: Scalars['String']['output'];
  core_staff_administrators__admin__create: ShowAdminStaffAdministrators;
  core_staff_administrators__admin__delete: Scalars['String']['output'];
  core_staff_moderators__admin__create: ShowAdminStaffModerators;
  core_staff_moderators__admin__delete: Scalars['String']['output'];
  core_themes__admin__create: Scalars['String']['output'];
  core_themes__admin__delete: Scalars['String']['output'];
  core_themes__admin__download: Scalars['String']['output'];
  core_themes__admin__upload: Scalars['String']['output'];
  core_themes__change: Scalars['String']['output'];
  forum_forums__admin__change_position: Scalars['String']['output'];
  forum_forums__admin__create: CreateForumForumsObj;
  forum_posts__create: ShowPostsForums;
  forum_topics__actions__lock_toggle: Scalars['Boolean']['output'];
  forum_topics__create: ShowTopicsForums;
};


export type MutationAdmin_Settings__General__EditArgs = {
  side_name: Scalars['String']['input'];
};


export type MutationCore_Groups__Admin__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCore_Groups__Admin__EditArgs = {
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput>;
};


export type MutationCore_Groups__Admin_CreateArgs = {
  name: Array<TextLanguageInput>;
};


export type MutationCore_Languages__EditArgs = {
  code: Scalars['String']['input'];
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
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


export type MutationCore_Nav__Admin__Change_PositionArgs = {
  id: Scalars['Int']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCore_Nav__Admin__CreateArgs = {
  description: Array<TextLanguageInput>;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  name: Array<TextLanguageInput>;
};


export type MutationCore_Nav__Admin__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCore_Plugins__Admin__CreateArgs = {
  author: Scalars['String']['input'];
  author_url: Scalars['String']['input'];
  code: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  support_url: Scalars['String']['input'];
};


export type MutationCore_Plugins__Admin__DeleteArgs = {
  code: Scalars['String']['input'];
};


export type MutationCore_Sessions__Sign_InArgs = {
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCore_Staff_Administrators__Admin__CreateArgs = {
  group_id?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
  user_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCore_Staff_Administrators__Admin__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCore_Staff_Moderators__Admin__CreateArgs = {
  group_id?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
  user_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCore_Staff_Moderators__Admin__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCore_Themes__Admin__CreateArgs = {
  author: Scalars['String']['input'];
  author_url: Scalars['String']['input'];
  name: Scalars['String']['input'];
  support_url: Scalars['String']['input'];
};


export type MutationCore_Themes__Admin__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationCore_Themes__Admin__DownloadArgs = {
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
  version_code?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationCore_Themes__Admin__UploadArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationCore_Themes__ChangeArgs = {
  id: Scalars['Int']['input'];
};


export type MutationForum_Forums__Admin__Change_PositionArgs = {
  id: Scalars['Int']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationForum_Forums__Admin__CreateArgs = {
  description: Array<TextLanguageInput>;
  name: Array<TextLanguageInput>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
  permissions: PermissionsCreateForumForums;
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

export type PermissionsForumForumsCount = {
  __typename?: 'PermissionsForumForumsCount';
  can_create: Scalars['Boolean']['output'];
  can_read: Scalars['Boolean']['output'];
  can_reply: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  admin_install__layout: LayoutAdminInstallObj;
  admin_sessions__authorization: AuthorizationAdminSessionsObj;
  core_groups__admin__show: ShowAdminGroupsObj;
  core_languages__show: ShowCoreLanguagesObj;
  core_members__admin__show: ShowAdminMembersObj;
  core_members__show: ShowCoreMembersObj;
  core_middleware: CoreMiddlewareObj;
  core_nav__show: ShowCoreNavObj;
  core_plugins__admin__show: ShowAdminPluginsObj;
  core_sessions__authorization: AuthorizationCoreSessionsObj;
  core_staff_administrators__admin__show: ShowAdminStaffAdministratorsObj;
  core_staff_moderators__admin__show: ShowAdminStaffModeratorsObj;
  core_themes__admin__show: ShowAdminThemesObj;
  core_themes__show: ShowCoreThemesObj;
  forum_forums__admin__show: ShowForumForumsAdminObj;
  forum_forums__show: ShowForumForumsObj;
  forum_posts__show: ShowPostsForumsObj;
  forum_topics__show: ShowTopicsForumsObj;
};


export type QueryCore_Groups__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs>>;
};


export type QueryCore_Languages__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCore_Members__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groups?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs>>;
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


export type QueryCore_Plugins__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminPluginsSortByArgs>>;
};


export type QueryCore_Staff_Administrators__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffAdministratorsSortByArgs>>;
};


export type QueryCore_Staff_Moderators__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffModeratorsSortByArgs>>;
};


export type QueryCore_Themes__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminThemesSortByArgs>>;
};


export type QueryCore_Themes__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryForum_Forums__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryForum_Forums__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['Int']['input']>;
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

export type ShowAdminGroups = {
  __typename?: 'ShowAdminGroups';
  created: Scalars['Int']['output'];
  default: Scalars['Boolean']['output'];
  guest: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  protected: Scalars['Boolean']['output'];
  root: Scalars['Boolean']['output'];
  updated: Scalars['Int']['output'];
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
  joined: Scalars['Int']['output'];
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
  author: Scalars['String']['output'];
  author_url: Scalars['String']['output'];
  code: Scalars['String']['output'];
  created: Scalars['Int']['output'];
  default: Scalars['Boolean']['output'];
  description?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  protected: Scalars['Boolean']['output'];
  support_url?: Maybe<Scalars['String']['output']>;
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
  created: 'created'
} as const;

export type ShowAdminPluginsSortingColumnEnum = typeof ShowAdminPluginsSortingColumnEnum[keyof typeof ShowAdminPluginsSortingColumnEnum];
export type ShowAdminStaffAdministrators = {
  __typename?: 'ShowAdminStaffAdministrators';
  created: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  protected: Scalars['Boolean']['output'];
  unrestricted: Scalars['Boolean']['output'];
  updated: Scalars['Int']['output'];
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
  created: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  protected: Scalars['Boolean']['output'];
  unrestricted: Scalars['Boolean']['output'];
  updated: Scalars['Int']['output'];
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
  author_url: Scalars['String']['output'];
  created: Scalars['Int']['output'];
  default: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  protected: Scalars['Boolean']['output'];
  support_url?: Maybe<Scalars['String']['output']>;
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
  default: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  protected: Scalars['Boolean']['output'];
  timezone: Scalars['String']['output'];
};

export type ShowCoreLanguagesObj = {
  __typename?: 'ShowCoreLanguagesObj';
  edges: Array<ShowCoreLanguages>;
  pageInfo: PageInfo;
};

export type ShowCoreMembers = {
  __typename?: 'ShowCoreMembers';
  avatar?: Maybe<AvatarUser>;
  avatar_color: Scalars['String']['output'];
  group: GroupUser;
  id: Scalars['Int']['output'];
  joined: Scalars['Int']['output'];
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

export type ShowForumForums = {
  __typename?: 'ShowForumForums';
  _count: ShowForumForumsCount;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type ShowForumForumsAdmin = {
  __typename?: 'ShowForumForumsAdmin';
  _count: ShowForumForumsCount;
  children?: Maybe<Array<ChildrenShowForumForums>>;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  parent?: Maybe<ShowForumForums>;
  position: Scalars['Int']['output'];
};

export type ShowForumForumsAdminObj = {
  __typename?: 'ShowForumForumsAdminObj';
  edges: Array<ShowForumForumsAdmin>;
  pageInfo: PageInfo;
};

export type ShowForumForumsCount = {
  __typename?: 'ShowForumForumsCount';
  children: Scalars['Int']['output'];
};

export type ShowForumForumsObj = {
  __typename?: 'ShowForumForumsObj';
  edges: Array<ShowForumForumsWithParent>;
  pageInfo: PageInfo;
};

export type ShowForumForumsWithParent = {
  __typename?: 'ShowForumForumsWithParent';
  _count: ShowForumForumsCount;
  children?: Maybe<Array<ChildrenShowForumForums>>;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  parent?: Maybe<ShowForumForums>;
  permissions: PermissionsForumForumsCount;
  position: Scalars['Int']['output'];
};

export type ShowPostsForums = {
  __typename?: 'ShowPostsForums';
  content: Array<TextLanguage>;
  created: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  post_id: Scalars['Int']['output'];
  user: User;
};

export type ShowPostsForumsMetaTags = {
  __typename?: 'ShowPostsForumsMetaTags';
  action: TopicActions | `${TopicActions}`;
  action_id: Scalars['Int']['output'];
  created: Scalars['Int']['output'];
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
  content: Array<TextLanguage>;
  created: Scalars['Int']['output'];
  forum: ForumTopicsForums;
  id: Scalars['Int']['output'];
  locked: Scalars['Boolean']['output'];
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

export type Admin_Install__Create_DatabaseMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin_Install__Create_DatabaseMutation = { __typename?: 'Mutation', admin_install__create_database: string };

export type Forum_Forums__Admin__Change_PositionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  indexToMove: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Forum_Forums__Admin__Change_PositionMutation = { __typename?: 'Mutation', forum_forums__admin__change_position: string };

export type Forum_Forums__Admin__CreateMutationVariables = Exact<{
  name: Array<TextLanguageInput> | TextLanguageInput;
  description: Array<TextLanguageInput> | TextLanguageInput;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  permissions: PermissionsCreateForumForums;
}>;


export type Forum_Forums__Admin__CreateMutation = { __typename?: 'Mutation', forum_forums__admin__create: { __typename?: 'CreateForumForumsObj', created: number, id: number, position: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Groups__Admin__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Core_Groups__Admin__DeleteMutation = { __typename?: 'Mutation', core_groups__admin__delete: string };

export type Core_Groups__Admin__EditMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Core_Groups__Admin__EditMutation = { __typename?: 'Mutation', core_groups__admin__edit: { __typename?: 'ShowAdminGroups', created: number, id: number, protected: boolean, users_count: number, guest: boolean, updated: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Groups__Admin_CreateMutationVariables = Exact<{
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Core_Groups__Admin_CreateMutation = { __typename?: 'Mutation', core_groups__admin_create: { __typename?: 'ShowAdminGroups', created: number, id: number, protected: boolean, users_count: number, guest: boolean, updated: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Staff_Administrators__Admin__CreateMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
}>;


export type Core_Staff_Administrators__Admin__CreateMutation = { __typename?: 'Mutation', core_staff_administrators__admin__create: { __typename?: 'ShowAdminStaffAdministrators', created: number, id: number, protected: boolean, unrestricted: boolean, updated: number } };

export type Core_Staff_Administrators__Admin__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Core_Staff_Administrators__Admin__DeleteMutation = { __typename?: 'Mutation', core_staff_administrators__admin__delete: string };

export type Core_Staff_Moderators__Admin__CreateMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']['input']>;
  userId?: InputMaybe<Scalars['Int']['input']>;
  unrestricted: Scalars['Boolean']['input'];
}>;


export type Core_Staff_Moderators__Admin__CreateMutation = { __typename?: 'Mutation', core_staff_moderators__admin__create: { __typename?: 'ShowAdminStaffModerators', created: number, id: number, protected: boolean, unrestricted: boolean, updated: number } };

export type Core_Staff_Moderators__Admin__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Core_Staff_Moderators__Admin__DeleteMutation = { __typename?: 'Mutation', core_staff_moderators__admin__delete: string };

export type Core_Nav__Admin__Change_PositionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  indexToMove: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Nav__Admin__Change_PositionMutation = { __typename?: 'Mutation', core_nav__admin__change_position: string };

export type Core_Nav__Admin__CreateMutationVariables = Exact<{
  description: Array<TextLanguageInput> | TextLanguageInput;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Core_Nav__Admin__CreateMutation = { __typename?: 'Mutation', core_nav__admin__create: { __typename?: 'ShowCoreNav', id: number } };

export type Core_Nav__Admin__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Core_Nav__Admin__DeleteMutation = { __typename?: 'Mutation', core_nav__admin__delete: string };

export type Core_Plugins__Admin__CreateMutationVariables = Exact<{
  author: Scalars['String']['input'];
  authorUrl: Scalars['String']['input'];
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  supportUrl: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Plugins__Admin__CreateMutation = { __typename?: 'Mutation', core_plugins__admin__create: { __typename?: 'ShowAdminPlugins', code: string } };

export type Core_Plugins__Admin__DeleteMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Core_Plugins__Admin__DeleteMutation = { __typename?: 'Mutation', core_plugins__admin__delete: string };

export type Admin_Sessions__Sign_OutMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__Sign_OutMutation = { __typename?: 'Mutation', admin_sessions__sign_out: string };

export type Admin_Settings__General__EditMutationVariables = Exact<{
  sideName: Scalars['String']['input'];
}>;


export type Admin_Settings__General__EditMutation = { __typename?: 'Mutation', admin_settings__general__edit: { __typename?: 'GeneralAdminSettingsObj', side_name: string } };

export type Core_Themes__Admin__CreateMutationVariables = Exact<{
  author: Scalars['String']['input'];
  authorUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  supportUrl: Scalars['String']['input'];
}>;


export type Core_Themes__Admin__CreateMutation = { __typename?: 'Mutation', core_themes__admin__create: string };

export type Core_Themes__Admin__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Core_Themes__Admin__DeleteMutation = { __typename?: 'Mutation', core_themes__admin__delete: string };

export type Core_Themes__Admin__DownloadMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  version?: InputMaybe<Scalars['String']['input']>;
  versionCode?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Themes__Admin__DownloadMutation = { __typename?: 'Mutation', core_themes__admin__download: string };

export type Core_Themes__Admin__UploadMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type Core_Themes__Admin__UploadMutation = { __typename?: 'Mutation', core_themes__admin__upload: string };

export type Core_Languages__EditMutationVariables = Exact<{
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type Core_Languages__EditMutation = { __typename?: 'Mutation', core_languages__edit: { __typename?: 'ShowCoreLanguages', code: string, default: boolean, enabled: boolean, id: number, name: string, protected: boolean, timezone: string } };

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

export type Forum_Posts__CreateMutationVariables = Exact<{
  content: Array<TextLanguageInput> | TextLanguageInput;
  topicId: Scalars['Int']['input'];
}>;


export type Forum_Posts__CreateMutation = { __typename?: 'Mutation', forum_posts__create: { __typename?: 'ShowPostsForums', created: number, id: number, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', dir_folder: string, id: number, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } };

export type Forum_Topics__Actions__Lock_ToggleMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Forum_Topics__Actions__Lock_ToggleMutation = { __typename?: 'Mutation', forum_topics__actions__lock_toggle: boolean };

export type Forum_Topics__CreateMutationVariables = Exact<{
  content: Array<TextLanguageInput> | TextLanguageInput;
  forumId: Scalars['Int']['input'];
  title: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Forum_Topics__CreateMutation = { __typename?: 'Mutation', forum_topics__create: { __typename?: 'ShowTopicsForums', created: number, id: number, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Admin_Install__LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Install__LayoutQuery = { __typename?: 'Query', admin_install__layout: { __typename?: 'LayoutAdminInstallObj', status: LayoutAdminInstallEnum } };

export type Forum_Forums__Admin__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Forum_Forums__Admin__ShowQuery = { __typename?: 'Query', forum_forums__admin__show: { __typename?: 'ShowForumForumsAdminObj', edges: Array<{ __typename?: 'ShowForumForumsAdmin', id: number, position: number, created: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children?: Array<{ __typename?: 'ChildrenShowForumForums', created: number, id: number, position: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, _count: { __typename?: 'ShowForumForumsCount', children: number } }> | null, _count: { __typename?: 'ShowForumForumsCount', children: number } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_Groups__Admin__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs> | ShowAdminGroupsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Groups__Admin__ShowQuery = { __typename?: 'Query', core_groups__admin__show: { __typename?: 'ShowAdminGroupsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, startCursor?: number | null, totalCount: number, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'ShowAdminGroups', created: number, updated: number, id: number, users_count: number, protected: boolean, guest: boolean, root: boolean, default: boolean, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Core_Groups__Admin__Show_ShortQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Groups__Admin__Show_ShortQuery = { __typename?: 'Query', core_groups__admin__show: { __typename?: 'ShowAdminGroupsObj', edges: Array<{ __typename?: 'ShowAdminGroups', id: number, guest: boolean, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Core_Staff_Administrators__Admin__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffAdministratorsSortByArgs> | ShowAdminStaffAdministratorsSortByArgs>;
}>;


export type Core_Staff_Administrators__Admin__ShowQuery = { __typename?: 'Query', core_staff_administrators__admin__show: { __typename?: 'ShowAdminStaffAdministratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffAdministrators', created: number, id: number, unrestricted: boolean, updated: number, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: number, group_name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, name_seo: string, id: number, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_Staff_Moderators__Admin__ShowQueryVariables = Exact<{
  sortBy?: InputMaybe<Array<ShowAdminStaffModeratorsSortByArgs> | ShowAdminStaffModeratorsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Staff_Moderators__Admin__ShowQuery = { __typename?: 'Query', core_staff_moderators__admin__show: { __typename?: 'ShowAdminStaffModeratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffModerators', created: number, id: number, unrestricted: boolean, updated: number, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: number, group_name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_Members__Admin__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs> | ShowAdminMembersSortByArgs>;
  groups?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type Core_Members__Admin__ShowQuery = { __typename?: 'Query', core_members__admin__show: { __typename?: 'ShowAdminMembersObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminMembers', avatar_color: string, email: string, id: number, name_seo: string, joined: number, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Core_Nav__Admin__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Nav__Admin__ShowQuery = { __typename?: 'Query', core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, href: string, external: boolean, position: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Core_Plugins__Admin__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminPluginsSortByArgs> | ShowAdminPluginsSortByArgs>;
}>;


export type Core_Plugins__Admin__ShowQuery = { __typename?: 'Query', core_plugins__admin__show: { __typename?: 'ShowAdminPluginsObj', edges: Array<{ __typename?: 'ShowAdminPlugins', author: string, author_url: string, code: string, default: boolean, description?: string | null, enabled: boolean, id: number, name: string, protected: boolean, support_url?: string | null, created: number, version?: string | null, version_code?: number | null }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__AuthorizationQuery = { __typename?: 'Query', admin_sessions__authorization: { __typename?: 'AuthorizationAdminSessionsObj', user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } | null } };

export type Core_Themes__Admin__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminThemesSortByArgs> | ShowAdminThemesSortByArgs>;
}>;


export type Core_Themes__Admin__ShowQuery = { __typename?: 'Query', core_themes__admin__show: { __typename?: 'ShowAdminThemesObj', edges: Array<{ __typename?: 'ShowAdminThemes', author: string, author_url: string, created: number, default: boolean, id: number, name: string, protected: boolean, support_url?: string | null, version?: string | null, version_code?: number | null }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_MiddlewareQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_MiddlewareQuery = { __typename?: 'Query', core_middleware: { __typename?: 'CoreMiddlewareObj', default_language: string, languages: Array<{ __typename?: 'LanguageCoreMiddlewareObj', default: boolean, code: string, id: number, name: string, timezone: string, enabled: boolean }> }, core_themes__show: { __typename?: 'ShowCoreThemesObj', edges: Array<{ __typename?: 'ShowCoreThemes', id: number, name: string }> } };

export type Core_Languages__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Languages__ShowQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string, default: boolean, enabled: boolean, id: number, name: string, protected: boolean, timezone: string }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_Members__Show__SearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Members__Show__SearchQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Core_Members__ProfilesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  nameSeo: Scalars['String']['input'];
}>;


export type Core_Members__ProfilesQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, joined: number, name: string, name_seo: string, posts: number, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Core_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__AuthorizationQuery = { __typename?: 'Query', core_sessions__authorization: { __typename?: 'AuthorizationCoreSessionsObj', theme_id?: number | null, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } | null }, core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string }> }, core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, position: number, external: boolean, href: string, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Forum_Forums__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Forum_Forums__ShowQuery = { __typename?: 'Query', forum_forums__show: { __typename?: 'ShowForumForumsObj', edges: Array<{ __typename?: 'ShowForumForumsWithParent', id: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children?: Array<{ __typename?: 'ChildrenShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children?: Array<{ __typename?: 'LastChildShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> | null, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> | null }> } };

export type Forum_Forums__Show_ItemQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  forumId: Scalars['Int']['input'];
}>;


export type Forum_Forums__Show_ItemQuery = { __typename?: 'Query', forum_forums__show: { __typename?: 'ShowForumForumsObj', edges: Array<{ __typename?: 'ShowForumForumsWithParent', id: number, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children?: Array<{ __typename?: 'ChildrenShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, children?: Array<{ __typename?: 'LastChildShowForumForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> | null, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> | null, permissions: { __typename?: 'PermissionsForumForumsCount', can_create: boolean } }> }, forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: number, id: number, locked: boolean, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', id: number, name_seo: string, name: string, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, forum: { __typename?: 'ForumTopicsForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Forum_Forums__Show_Item_MoreQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  forumId: Scalars['Int']['input'];
}>;


export type Forum_Forums__Show_Item_MoreQuery = { __typename?: 'Query', forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: number, id: number, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', id: number, name_seo: string, name: string, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Forum_Posts__Show_MoreQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowPostsForumsSortingEnum>;
}>;


export type Forum_Posts__Show_MoreQuery = { __typename?: 'Query', forum_posts__show: { __typename?: 'ShowPostsForumsObj', edges: Array<{ __typename: 'ShowPostsForums', id: number, created: number, post_id: number, content: Array<{ __typename?: 'TextLanguage', value: string, language_code: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } | { __typename: 'ShowPostsForumsMetaTags', action: TopicActions, id: number, created: number, action_id: number, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Forum_Topics__ShowQueryVariables = Exact<{
  id: Scalars['Int']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowPostsForumsSortingEnum>;
  firstEdges?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Forum_Topics__ShowQuery = { __typename?: 'Query', forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: number, id: number, locked: boolean, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }, forum: { __typename?: 'ForumTopicsForums', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> }, forum_posts__show: { __typename?: 'ShowPostsForumsObj', edges: Array<{ __typename: 'ShowPostsForums', id: number, created: number, post_id: number, content: Array<{ __typename?: 'TextLanguage', value: string, language_code: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } | { __typename: 'ShowPostsForumsMetaTags', action: TopicActions, id: number, created: number, action_id: number, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number }, lastEdges: Array<{ __typename: 'ShowPostsForums', id: number, created: number, post_id: number, content: Array<{ __typename?: 'TextLanguage', value: string, language_code: string }>, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } } | { __typename: 'ShowPostsForumsMetaTags', action: TopicActions, id: number, created: number, action_id: number, user: { __typename?: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }> } };


export const Admin_Install__Create_Database = gql`
    mutation Admin_install__create_database {
  admin_install__create_database
}
    `;
export const Forum_Forums__Admin__Change_Position = gql`
    mutation Forum_forums__admin__change_position($id: Int!, $indexToMove: Int!, $parentId: Int) {
  forum_forums__admin__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;
export const Forum_Forums__Admin__Create = gql`
    mutation Forum_forums__admin__create($name: [TextLanguageInput!]!, $description: [TextLanguageInput!]!, $parentId: Int, $permissions: PermissionsCreateForumForums!) {
  forum_forums__admin__create(
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
export const Core_Groups__Admin__Delete = gql`
    mutation Core_groups__admin__delete($id: Int!) {
  core_groups__admin__delete(id: $id)
}
    `;
export const Core_Groups__Admin__Edit = gql`
    mutation Core_groups__admin__edit($id: Int!, $name: [TextLanguageInput!]!) {
  core_groups__admin__edit(id: $id, name: $name) {
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
export const Core_Staff_Administrators__Admin__Create = gql`
    mutation Core_staff_administrators__admin__create($groupId: Int, $userId: Int, $unrestricted: Boolean!) {
  core_staff_administrators__admin__create(
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
export const Core_Staff_Administrators__Admin__Delete = gql`
    mutation Core_staff_administrators__admin__delete($id: Int!) {
  core_staff_administrators__admin__delete(id: $id)
}
    `;
export const Core_Staff_Moderators__Admin__Create = gql`
    mutation Core_staff_moderators__admin__create($groupId: Int, $userId: Int, $unrestricted: Boolean!) {
  core_staff_moderators__admin__create(
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
export const Core_Staff_Moderators__Admin__Delete = gql`
    mutation Core_staff_moderators__admin__delete($id: Int!) {
  core_staff_moderators__admin__delete(id: $id)
}
    `;
export const Core_Nav__Admin__Change_Position = gql`
    mutation Core_nav__admin__change_position($id: Int!, $indexToMove: Int!, $parentId: Int) {
  core_nav__admin__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;
export const Core_Nav__Admin__Create = gql`
    mutation Core_nav__admin__create($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $name: [TextLanguageInput!]!) {
  core_nav__admin__create(
    description: $description
    external: $external
    href: $href
    name: $name
  ) {
    id
  }
}
    `;
export const Core_Nav__Admin__Delete = gql`
    mutation Core_nav__admin__delete($id: Int!) {
  core_nav__admin__delete(id: $id)
}
    `;
export const Core_Plugins__Admin__Create = gql`
    mutation Core_plugins__admin__create($author: String!, $authorUrl: String!, $code: String!, $name: String!, $supportUrl: String!, $description: String) {
  core_plugins__admin__create(
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
export const Core_Plugins__Admin__Delete = gql`
    mutation Core_plugins__admin__delete($code: String!) {
  core_plugins__admin__delete(code: $code)
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
export const Core_Themes__Admin__Create = gql`
    mutation Core_themes__admin__create($author: String!, $authorUrl: String!, $name: String!, $supportUrl: String!) {
  core_themes__admin__create(
    author: $author
    author_url: $authorUrl
    name: $name
    support_url: $supportUrl
  )
}
    `;
export const Core_Themes__Admin__Delete = gql`
    mutation Core_themes__admin__delete($id: Int!) {
  core_themes__admin__delete(id: $id)
}
    `;
export const Core_Themes__Admin__Download = gql`
    mutation Core_themes__admin__download($id: Int!, $version: String, $versionCode: Int) {
  core_themes__admin__download(
    id: $id
    version: $version
    version_code: $versionCode
  )
}
    `;
export const Core_Themes__Admin__Upload = gql`
    mutation Core_themes__admin__upload($file: Upload!) {
  core_themes__admin__upload(file: $file)
}
    `;
export const Core_Languages__Edit = gql`
    mutation Core_languages__edit($default: Boolean!, $enabled: Boolean!, $id: Int!, $name: String!, $timezone: String!, $code: String!) {
  core_languages__edit(
    default: $default
    enabled: $enabled
    id: $id
    name: $name
    timezone: $timezone
    code: $code
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
export const Admin_Install__Layout = gql`
    query Admin_install__layout {
  admin_install__layout {
    status
  }
}
    `;
export const Forum_Forums__Admin__Show = gql`
    query Forum_forums__admin__show($first: Int, $cursor: Int, $parentId: Int) {
  forum_forums__admin__show(first: $first, cursor: $cursor, parent_id: $parentId) {
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
          children
        }
      }
      _count {
        children
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
export const Core_Groups__Admin__Show = gql`
    query Core_groups__admin__show($first: Int, $cursor: Int, $search: String, $sortBy: [ShowAdminGroupsSortByArgs!], $last: Int) {
  core_groups__admin__show(
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
export const Core_Groups__Admin__Show_Short = gql`
    query Core_groups__admin__show_short($first: Int, $search: String) {
  core_groups__admin__show(first: $first, search: $search) {
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
export const Core_Staff_Administrators__Admin__Show = gql`
    query Core_staff_administrators__admin__show($cursor: Int, $first: Int, $last: Int, $sortBy: [ShowAdminStaffAdministratorsSortByArgs!]) {
  core_staff_administrators__admin__show(
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
export const Core_Staff_Moderators__Admin__Show = gql`
    query Core_staff_moderators__admin__show($sortBy: [ShowAdminStaffModeratorsSortByArgs!], $last: Int, $first: Int, $cursor: Int) {
  core_staff_moderators__admin__show(
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
export const Core_Members__Admin__Show = gql`
    query Core_members__admin__show($cursor: Int, $first: Int, $last: Int, $search: String, $sortBy: [ShowAdminMembersSortByArgs!], $groups: [Int!]) {
  core_members__admin__show(
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
export const Core_Nav__Admin__Show = gql`
    query Core_nav__admin__show {
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
export const Core_Plugins__Admin__Show = gql`
    query Core_plugins__admin__show($cursor: Int, $first: Int, $last: Int, $sortBy: [ShowAdminPluginsSortByArgs!]) {
  core_plugins__admin__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
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
      protected
      support_url
      created
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
export const Admin_Sessions__Authorization = gql`
    query Admin_sessions__authorization {
  admin_sessions__authorization {
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
  }
}
    `;
export const Core_Themes__Admin__Show = gql`
    query Core_themes__admin__show($cursor: Int, $first: Int, $last: Int, $sortBy: [ShowAdminThemesSortByArgs!]) {
  core_themes__admin__show(
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
  core_middleware {
    default_language
    languages {
      default
      code
      id
      name
      timezone
      enabled
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
export const Core_Languages__Show = gql`
    query Core_languages__show($first: Int, $last: Int, $cursor: Int) {
  core_languages__show(first: $first, last: $last, cursor: $cursor) {
    edges {
      code
      default
      enabled
      id
      name
      protected
      timezone
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
export const Forum_Forums__Show = gql`
    query Forum_forums__show {
  forum_forums__show {
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
      }
    }
  }
}
    `;
export const Forum_Forums__Show_Item = gql`
    query Forum_forums__show_item($cursor: Int, $first: Int, $last: Int, $forumId: Int!) {
  forum_forums__show(ids: [$forumId]) {
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
      }
      permissions {
        can_create
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
      forum {
        id
        name {
          language_code
          value
        }
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
      forum {
        id
        name {
          language_code
          value
        }
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