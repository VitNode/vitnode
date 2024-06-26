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
  nav: Array<NavAdminPluginsAuthorization>;
  user?: Maybe<AuthorizationCurrentUserObj>;
  version: Scalars['String']['output'];
};

export type AuthorizationCoreSessionsObj = {
  __typename?: 'AuthorizationCoreSessionsObj';
  files: FilesAuthorizationCoreSessions;
  plugin_default: Scalars['String']['output'];
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
  file_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
};

export type ColorsEditAdminThemeEditor = {
  accent: ThemeVariableInput;
  accent_foreground: ThemeVariableInput;
  background: ThemeVariableInput;
  border: ThemeVariableInput;
  card: ThemeVariableInput;
  cover: ThemeVariableInput;
  cover_foreground: ThemeVariableInput;
  destructive: ThemeVariableInput;
  destructive_foreground: ThemeVariableInput;
  muted: ThemeVariableInput;
  muted_foreground: ThemeVariableInput;
  primary: ThemeVariableInput;
  primary_foreground: ThemeVariableInput;
  secondary: ThemeVariableInput;
  secondary_foreground: ThemeVariableInput;
};

export type ColorsShowCoreThemeEditor = {
  __typename?: 'ColorsShowCoreThemeEditor';
  accent: ThemeVariable;
  accent_foreground: ThemeVariable;
  background: ThemeVariable;
  border: ThemeVariable;
  card: ThemeVariable;
  cover: ThemeVariable;
  cover_foreground: ThemeVariable;
  destructive: ThemeVariable;
  destructive_foreground: ThemeVariable;
  muted: ThemeVariable;
  muted_foreground: ThemeVariable;
  primary: ThemeVariable;
  primary_foreground: ThemeVariable;
  secondary: ThemeVariable;
  secondary_foreground: ThemeVariable;
};

export type ContentCreateAdminGroups = {
  files_allow_upload: Scalars['Boolean']['input'];
  files_max_storage_for_submit: Scalars['Int']['input'];
  files_total_max_storage: Scalars['Int']['input'];
};

export type ContentShowAdminGroups = {
  __typename?: 'ContentShowAdminGroups';
  files_allow_upload: Scalars['Boolean']['output'];
  files_max_storage_for_submit: Scalars['Int']['output'];
  files_total_max_storage: Scalars['Int']['output'];
};

export type EditAdminMembersObj = {
  __typename?: 'EditAdminMembersObj';
  birthday: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  newsletter: Scalars['Boolean']['output'];
};

export type EditAdminSettingsObj = {
  __typename?: 'EditAdminSettingsObj';
  site_copyright: Array<TextLanguage>;
  site_description: Array<TextLanguage>;
  site_name: Scalars['String']['output'];
};

export type FilesAdminPluginsObj = {
  __typename?: 'FilesAdminPluginsObj';
  admin_pages: Scalars['Int']['output'];
  admin_templates: Scalars['Int']['output'];
  databases: Scalars['Int']['output'];
  default_page: Scalars['Boolean']['output'];
  pages: Scalars['Int']['output'];
  pages_container: Scalars['Int']['output'];
  templates: Scalars['Int']['output'];
};

export type FilesAuthorizationCoreSessions = {
  __typename?: 'FilesAuthorizationCoreSessions';
  allow_upload: Scalars['Boolean']['output'];
  max_storage_for_submit: Scalars['Int']['output'];
  space_used: Scalars['Float']['output'];
  total_max_storage: Scalars['Int']['output'];
};

export type GroupUser = {
  __typename?: 'GroupUser';
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
};

export type GroupsPermissionsCreatePluginCategories = {
  can_create: Scalars['Boolean']['input'];
  can_download_files: Scalars['Boolean']['input'];
  can_read: Scalars['Boolean']['input'];
  can_reply: Scalars['Boolean']['input'];
  group_id: Scalars['Int']['input'];
};

export type HslColor = {
  __typename?: 'HslColor';
  h: Scalars['Int']['output'];
  l: Scalars['Int']['output'];
  s: Scalars['Int']['output'];
};

export type HslColorInput = {
  h: Scalars['Int']['input'];
  l: Scalars['Int']['input'];
  s: Scalars['Int']['input'];
};

export type LanguagesCoreMiddleware = {
  __typename?: 'LanguagesCoreMiddleware';
  code: Scalars['String']['output'];
  default: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
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
  admin__blog_categories__create: ShowBlogCategories;
  admin__core_email_settings__edit: ShowAdminEmailSettingsServiceObj;
  admin__core_email_settings__test: Scalars['String']['output'];
  admin__core_files__delete: Scalars['String']['output'];
  admin__core_groups__delete: Scalars['String']['output'];
  admin__core_groups__edit: ShowAdminGroups;
  admin__core_languages__create: ShowCoreLanguages;
  admin__core_languages__delete: Scalars['String']['output'];
  admin__core_languages__download: Scalars['String']['output'];
  admin__core_languages__edit: ShowCoreLanguages;
  admin__core_languages__update: Scalars['String']['output'];
  admin__core_main_settings__edit: EditAdminSettingsObj;
  admin__core_manifest_metadata__edit: ShowAdminManifestMetadataObj;
  admin__core_members__edit: EditAdminMembersObj;
  admin__core_nav__change_position: Scalars['String']['output'];
  admin__core_nav__create: ShowCoreNav;
  admin__core_nav__delete: Scalars['String']['output'];
  admin__core_nav__edit: ShowCoreNav;
  admin__core_plugins__create: ShowAdminPlugins;
  admin__core_plugins__delete: Scalars['String']['output'];
  admin__core_plugins__download: Scalars['String']['output'];
  admin__core_plugins__edit: ShowAdminPlugins;
  admin__core_plugins__nav__change_position: Scalars['String']['output'];
  admin__core_plugins__nav__create: ShowAdminNavPluginsObj;
  admin__core_plugins__nav__delete: Scalars['String']['output'];
  admin__core_plugins__nav__edit: ShowAdminNavPluginsObj;
  admin__core_plugins__upload: ShowAdminPlugins;
  admin__core_staff_administrators__create: ShowAdminStaffAdministrators;
  admin__core_staff_administrators__delete: Scalars['String']['output'];
  admin__core_staff_moderators__create: ShowAdminStaffModerators;
  admin__core_staff_moderators__delete: Scalars['String']['output'];
  admin__core_theme_editor__edit: Scalars['String']['output'];
  admin__install__create_database: Scalars['String']['output'];
  admin_sessions__sign_out: Scalars['String']['output'];
  core_editor_files__delete: Scalars['String']['output'];
  core_editor_files__upload: ShowCoreFiles;
  core_groups__admin_create: ShowAdminGroups;
  core_members__avatar__delete: Scalars['String']['output'];
  core_members__avatar__upload: UploadAvatarCoreMembersObj;
  core_members__delete: Scalars['String']['output'];
  core_members__sign_up: SignUpCoreMembersObj;
  core_sessions__sign_in: Scalars['String']['output'];
  core_sessions__sign_out: Scalars['String']['output'];
};


export type MutationAdmin__Blog_Categories__CreateArgs = {
  color: Scalars['String']['input'];
  description: Array<TextLanguageInput>;
  name: Array<TextLanguageInput>;
  permissions: PermissionsCreatePluginCategories;
};


export type MutationAdmin__Core_Email_Settings__EditArgs = {
  color_primary: Scalars['String']['input'];
  color_primary_foreground: Scalars['String']['input'];
  smtp_host: Scalars['String']['input'];
  smtp_password: Scalars['String']['input'];
  smtp_port: Scalars['Int']['input'];
  smtp_secure: Scalars['Boolean']['input'];
  smtp_user: Scalars['String']['input'];
};


export type MutationAdmin__Core_Email_Settings__TestArgs = {
  from: Scalars['String']['input'];
  message: Scalars['String']['input'];
  subject: Scalars['String']['input'];
  to: Scalars['String']['input'];
};


export type MutationAdmin__Core_Files__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Groups__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Groups__EditArgs = {
  content: ContentCreateAdminGroups;
  id: Scalars['Int']['input'];
  name: Array<TextLanguageInput>;
};


export type MutationAdmin__Core_Languages__CreateArgs = {
  allow_in_input: Scalars['Boolean']['input'];
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
  code: Scalars['String']['input'];
  plugins: Array<Scalars['String']['input']>;
};


export type MutationAdmin__Core_Languages__EditArgs = {
  allow_in_input: Scalars['Boolean']['input'];
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


export type MutationAdmin__Core_Main_Settings__EditArgs = {
  site_copyright: Array<TextLanguageInput>;
  site_description: Array<TextLanguageInput>;
  site_name: Scalars['String']['input'];
  site_short_name: Scalars['String']['input'];
};


export type MutationAdmin__Core_Manifest_Metadata__EditArgs = {
  background_color: Scalars['String']['input'];
  display: Scalars['String']['input'];
  start_url: Scalars['String']['input'];
  theme_color: Scalars['String']['input'];
};


export type MutationAdmin__Core_Members__EditArgs = {
  birthday: Scalars['DateTime']['input'];
  email: Scalars['String']['input'];
  first_name: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  last_name: Scalars['String']['input'];
  name: Scalars['String']['input'];
  newsletter: Scalars['Boolean']['input'];
};


export type MutationAdmin__Core_Nav__Change_PositionArgs = {
  id: Scalars['Int']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Nav__CreateArgs = {
  description: Array<TextLanguageInput>;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Array<TextLanguageInput>;
};


export type MutationAdmin__Core_Nav__DeleteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdmin__Core_Nav__EditArgs = {
  description: Array<TextLanguageInput>;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
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


export type MutationAdmin__Core_Plugins__Nav__Change_PositionArgs = {
  code: Scalars['String']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_code?: InputMaybe<Scalars['String']['input']>;
  plugin_code: Scalars['String']['input'];
};


export type MutationAdmin__Core_Plugins__Nav__CreateArgs = {
  code: Scalars['String']['input'];
  href: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  parent_code?: InputMaybe<Scalars['String']['input']>;
  plugin_code: Scalars['String']['input'];
};


export type MutationAdmin__Core_Plugins__Nav__DeleteArgs = {
  code: Scalars['String']['input'];
  parent_code?: InputMaybe<Scalars['String']['input']>;
  plugin_code: Scalars['String']['input'];
};


export type MutationAdmin__Core_Plugins__Nav__EditArgs = {
  code: Scalars['String']['input'];
  href: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  parent_code?: InputMaybe<Scalars['String']['input']>;
  plugin_code: Scalars['String']['input'];
  previous_code: Scalars['String']['input'];
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


export type MutationAdmin__Core_Theme_Editor__EditArgs = {
  colors: ColorsEditAdminThemeEditor;
};


export type MutationCore_Editor_Files__DeleteArgs = {
  id: Scalars['Int']['input'];
  security_key?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCore_Editor_Files__UploadArgs = {
  file: Scalars['Upload']['input'];
  folder: Scalars['String']['input'];
  plugin: Scalars['String']['input'];
};


export type MutationCore_Groups__Admin_CreateArgs = {
  content: ContentCreateAdminGroups;
  name: Array<TextLanguageInput>;
};


export type MutationCore_Members__Avatar__UploadArgs = {
  file: Scalars['Upload']['input'];
};


export type MutationCore_Members__DeleteArgs = {
  id: Scalars['Int']['input'];
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

export type NavAdminPluginsAuthorization = {
  __typename?: 'NavAdminPluginsAuthorization';
  code: Scalars['String']['output'];
  nav: Array<ShowAdminNavPluginsObj>;
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

export type PermissionsCreatePluginCategories = {
  can_all_create: Scalars['Boolean']['input'];
  can_all_download_files: Scalars['Boolean']['input'];
  can_all_read: Scalars['Boolean']['input'];
  can_all_reply: Scalars['Boolean']['input'];
  groups: Array<GroupsPermissionsCreatePluginCategories>;
};

export type Query = {
  __typename?: 'Query';
  admin__core_email_settings__show: ShowAdminEmailSettingsServiceObj;
  admin__core_files__show: ShowAdminFilesObj;
  admin__core_groups__show: ShowAdminGroupsObj;
  admin__core_manifest_metadata__show: ShowAdminManifestMetadataObj;
  admin__core_members__show: ShowAdminMembersObj;
  admin__core_members__stats_sign_up: Array<SignUpStatsAdminMembers>;
  admin__core_plugins__files: FilesAdminPluginsObj;
  admin__core_plugins__nav__show: Array<ShowAdminNavPluginsObj>;
  admin__core_plugins__show: ShowAdminPluginsObj;
  admin__core_staff_administrators__show: ShowAdminStaffAdministratorsObj;
  admin__core_staff_moderators__show: ShowAdminStaffModeratorsObj;
  admin__install__layout: LayoutAdminInstallObj;
  admin__sessions__authorization: AuthorizationAdminSessionsObj;
  blog_categories__show: ShowBlogCategoriesObj;
  core_files__show: ShowCoreFilesObj;
  core_languages__show: ShowCoreLanguagesObj;
  core_members__show: ShowCoreMembersObj;
  core_middleware__show: ShowCoreMiddlewareObj;
  core_nav__show: ShowCoreNavObj;
  core_plugins__show: Array<ShowCorePluginsObj>;
  core_sessions__authorization: AuthorizationCoreSessionsObj;
  core_sessions__devices__show: Array<ShowCoreSessionDevicesObj>;
  core_settings__show: ShowSettingsObj;
  core_theme_editor__show: ShowCoreThemeEditorObj;
};


export type QueryAdmin__Core_Files__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowCoreFilesSortByArgs>;
};


export type QueryAdmin__Core_Groups__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowAdminGroupsSortByArgs>;
};


export type QueryAdmin__Core_Members__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groups?: InputMaybe<Array<Scalars['Int']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowAdminMembersSortByArgs>;
};


export type QueryAdmin__Core_Plugins__FilesArgs = {
  code: Scalars['String']['input'];
};


export type QueryAdmin__Core_Plugins__Nav__ShowArgs = {
  plugin_code: Scalars['String']['input'];
};


export type QueryAdmin__Core_Plugins__ShowArgs = {
  code?: InputMaybe<Scalars['String']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowAdminPluginsSortByArgs>;
};


export type QueryAdmin__Core_Staff_Administrators__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowAdminStaffAdministratorsSortByArgs>;
};


export type QueryAdmin__Core_Staff_Moderators__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowAdminStaffModeratorsSortByArgs>;
};


export type QueryBlog_Categories__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCore_Files__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowCoreFilesSortByArgs>;
};


export type QueryCore_Languages__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowCoreLanguagesSortByArgs>;
};


export type QueryCore_Members__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  name_seo?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowCoreMembersSortByArgs>;
};


export type QueryCore_Nav__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ShowAdminEmailSettingsServiceObj = {
  __typename?: 'ShowAdminEmailSettingsServiceObj';
  color_primary: Scalars['String']['output'];
  smtp_host: Scalars['String']['output'];
  smtp_port: Scalars['Int']['output'];
  smtp_secure: Scalars['Boolean']['output'];
  smtp_user: Scalars['String']['output'];
};

export type ShowAdminFiles = {
  __typename?: 'ShowAdminFiles';
  count_uses: Scalars['Int']['output'];
  created: Scalars['DateTime']['output'];
  dir_folder: Scalars['String']['output'];
  extension: Scalars['String']['output'];
  file_alt?: Maybe<Scalars['String']['output']>;
  file_name: Scalars['String']['output'];
  file_name_original: Scalars['String']['output'];
  file_size: Scalars['Int']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  mimetype: Scalars['String']['output'];
  security_key?: Maybe<Scalars['String']['output']>;
  user: User;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ShowAdminFilesObj = {
  __typename?: 'ShowAdminFilesObj';
  edges: Array<ShowAdminFiles>;
  pageInfo: PageInfo;
};

export type ShowAdminGroups = {
  __typename?: 'ShowAdminGroups';
  content: ContentShowAdminGroups;
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
export type ShowAdminManifestMetadataObj = {
  __typename?: 'ShowAdminManifestMetadataObj';
  background_color: Scalars['String']['output'];
  display: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lang: Scalars['String']['output'];
  start_url: Scalars['String']['output'];
  theme_color: Scalars['String']['output'];
};

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
export type ShowAdminNavPlugins = {
  __typename?: 'ShowAdminNavPlugins';
  code: Scalars['String']['output'];
  href: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
};

export type ShowAdminNavPluginsObj = {
  __typename?: 'ShowAdminNavPluginsObj';
  children?: Maybe<Array<ShowAdminNavPlugins>>;
  code: Scalars['String']['output'];
  href: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
};

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
export type ShowBlogCategories = {
  __typename?: 'ShowBlogCategories';
  color: Scalars['String']['output'];
  description?: Maybe<Array<TextLanguage>>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type ShowBlogCategoriesObj = {
  __typename?: 'ShowBlogCategoriesObj';
  edges: Array<ShowBlogCategories>;
  pageInfo: PageInfo;
};

export type ShowCoreFiles = {
  __typename?: 'ShowCoreFiles';
  count_uses: Scalars['Int']['output'];
  created: Scalars['DateTime']['output'];
  dir_folder: Scalars['String']['output'];
  extension: Scalars['String']['output'];
  file_alt?: Maybe<Scalars['String']['output']>;
  file_name: Scalars['String']['output'];
  file_name_original: Scalars['String']['output'];
  file_size: Scalars['Int']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  mimetype: Scalars['String']['output'];
  security_key?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export type ShowCoreFilesObj = {
  __typename?: 'ShowCoreFilesObj';
  edges: Array<ShowCoreFiles>;
  pageInfo: PageInfo;
};

export type ShowCoreFilesSortByArgs = {
  column: ShowCoreFilesSortingColumnEnum | `${ShowCoreFilesSortingColumnEnum}`;
  direction: SortDirectionEnum | `${SortDirectionEnum}`;
};

export const ShowCoreFilesSortingColumnEnum = {
  created: 'created',
  file_size: 'file_size'
} as const;

export type ShowCoreFilesSortingColumnEnum = typeof ShowCoreFilesSortingColumnEnum[keyof typeof ShowCoreFilesSortingColumnEnum];
export type ShowCoreLanguages = {
  __typename?: 'ShowCoreLanguages';
  allow_in_input: Scalars['Boolean']['output'];
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
export type ShowCoreMiddlewareObj = {
  __typename?: 'ShowCoreMiddlewareObj';
  languages: Array<LanguagesCoreMiddleware>;
  plugins: Array<Scalars['String']['output']>;
};

export type ShowCoreNav = {
  __typename?: 'ShowCoreNav';
  children: Array<ShowCoreNavItem>;
  description: Array<TextLanguage>;
  external: Scalars['Boolean']['output'];
  href: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type ShowCoreNavItem = {
  __typename?: 'ShowCoreNavItem';
  description: Array<TextLanguage>;
  external: Scalars['Boolean']['output'];
  href: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type ShowCoreNavObj = {
  __typename?: 'ShowCoreNavObj';
  edges: Array<ShowCoreNav>;
  pageInfo: PageInfo;
};

export type ShowCorePluginsObj = {
  __typename?: 'ShowCorePluginsObj';
  allow_default: Scalars['Boolean']['output'];
  code: Scalars['String']['output'];
};

export type ShowCoreSessionDevicesObj = {
  __typename?: 'ShowCoreSessionDevicesObj';
  created: Scalars['DateTime']['output'];
  expires: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  ip_address: Scalars['String']['output'];
  last_seen: Scalars['DateTime']['output'];
  login_token: Scalars['String']['output'];
  uagent_browser: Scalars['String']['output'];
  uagent_os: Scalars['String']['output'];
  uagent_version: Scalars['String']['output'];
};

export type ShowCoreThemeEditorObj = {
  __typename?: 'ShowCoreThemeEditorObj';
  colors: ColorsShowCoreThemeEditor;
};

export type ShowSettingsObj = {
  __typename?: 'ShowSettingsObj';
  site_copyright: Array<TextLanguage>;
  site_description: Array<TextLanguage>;
  site_name: Scalars['String']['output'];
  site_short_name: Scalars['String']['output'];
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

export type ThemeVariable = {
  __typename?: 'ThemeVariable';
  dark: HslColor;
  light: HslColor;
};

export type ThemeVariableInput = {
  dark: HslColorInput;
  light: HslColorInput;
};

export type UploadAvatarCoreMembersObj = {
  __typename?: 'UploadAvatarCoreMembersObj';
  dir_folder: Scalars['String']['output'];
  extension: Scalars['String']['output'];
  file_name: Scalars['String']['output'];
  file_name_original: Scalars['String']['output'];
  file_size: Scalars['Int']['output'];
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  mimetype: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
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

export type Core_Editor_Files__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  securityKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Editor_Files__DeleteMutation = { __typename?: 'Mutation', core_editor_files__delete: string };

export type Core_Editor_Files__UploadMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  folder: Scalars['String']['input'];
  plugin: Scalars['String']['input'];
}>;


export type Core_Editor_Files__UploadMutation = { __typename?: 'Mutation', core_editor_files__upload: { __typename?: 'ShowCoreFiles', extension: string, file_name: string, file_size: number, mimetype: string, id: number, height?: number | null, width?: number | null, dir_folder: string, security_key?: string | null, file_alt?: string | null, file_name_original: string } };

export type Core_MiddlewareQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_MiddlewareQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', default: boolean, code: string, id: number, name: string, timezone: string, enabled: boolean, locale: string, allow_in_input: boolean, time_24: boolean }> }, core_plugins__show: Array<{ __typename?: 'ShowCorePluginsObj', code: string }>, core_settings__show: { __typename?: 'ShowSettingsObj', site_name: string, site_copyright: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__AuthorizationQuery = { __typename?: 'Query', core_sessions__authorization: { __typename?: 'AuthorizationCoreSessionsObj', plugin_default: string, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } | null, files: { __typename?: 'FilesAuthorizationCoreSessions', allow_upload: boolean, max_storage_for_submit: number, total_max_storage: number, space_used: number } }, core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string }> }, core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, icon?: string | null, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, position: number, external: boolean, href: string, icon?: string | null, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> }, core_plugins__show: Array<{ __typename?: 'ShowCorePluginsObj', code: string, allow_default: boolean }>, core_settings__show: { __typename?: 'ShowSettingsObj', site_copyright: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };


export const Core_Editor_Files__Delete = gql`
    mutation Core_editor_files__delete($id: Int!, $securityKey: String) {
  core_editor_files__delete(id: $id, security_key: $securityKey)
}
    `;
export const Core_Editor_Files__Upload = gql`
    mutation core_editor_files__upload($file: Upload!, $folder: String!, $plugin: String!) {
  core_editor_files__upload(file: $file, folder: $folder, plugin: $plugin) {
    extension
    file_name
    file_size
    mimetype
    id
    height
    width
    dir_folder
    security_key
    file_alt
    file_name_original
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
      allow_in_input
      time_24
    }
  }
  core_plugins__show {
    code
  }
  core_settings__show {
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
    site_name
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
        file_name
      }
      group {
        name {
          language_code
          value
        }
        id
      }
    }
    plugin_default
    files {
      allow_upload
      max_storage_for_submit
      total_max_storage
      space_used
    }
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
        icon
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
      icon
    }
  }
  core_plugins__show {
    code
    allow_default
  }
  core_settings__show {
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
  }
}
    `;