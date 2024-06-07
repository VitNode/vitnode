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
  admin__core_themes__create: ShowAdminThemes;
  admin__core_themes__delete: Scalars['String']['output'];
  admin__core_themes__download: Scalars['String']['output'];
  admin__core_themes__edit: ShowAdminThemes;
  admin__core_themes__upload: ShowAdminThemes;
  admin__install__create_database: Scalars['String']['output'];
  admin_sessions__sign_out: Scalars['String']['output'];
  core_editor_files__delete: Scalars['String']['output'];
  core_editor_files__upload: ShowCoreFiles;
  core_groups__admin_create: ShowAdminGroups;
  core_members__avatar__delete: Scalars['String']['output'];
  core_members__avatar__upload: UploadAvatarCoreMembersObj;
  core_members__sign_up: SignUpCoreMembersObj;
  core_sessions__sign_in: Scalars['String']['output'];
  core_sessions__sign_out: Scalars['String']['output'];
  core_themes__change: Scalars['String']['output'];
};


export type MutationAdmin__Blog_Categories__CreateArgs = {
  color: Scalars['String']['input'];
  description: Array<TextLanguageInput>;
  name: Array<TextLanguageInput>;
};


export type MutationAdmin__Core_Email_Settings__EditArgs = {
  host: Scalars['String']['input'];
  password: Scalars['String']['input'];
  port: Scalars['Int']['input'];
  secure: Scalars['Boolean']['input'];
  user: Scalars['String']['input'];
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
  admin__core_themes__show: ShowAdminThemesObj;
  admin__install__layout: LayoutAdminInstallObj;
  admin__sessions__authorization: AuthorizationAdminSessionsObj;
  blog_categories__show: ShowBlogCategoriesObj;
  core_files__show: ShowCoreFilesObj;
  core_languages__show: ShowCoreLanguagesObj;
  core_members__show: ShowCoreMembersObj;
  core_nav__show: ShowCoreNavObj;
  core_plugins__show: Array<ShowCorePluginsObj>;
  core_sessions__authorization: AuthorizationCoreSessionsObj;
  core_sessions__devices__show: Array<ShowCoreSessionDevicesObj>;
  core_settings__show: ShowSettingsObj;
  core_theme_editor__show: ShowCoreThemeEditorObj;
  core_themes__show: ShowCoreThemesObj;
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


export type QueryAdmin__Core_Themes__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowAdminThemesSortByArgs>;
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


export type QueryCore_Themes__ShowArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ShowAdminEmailSettingsServiceObj = {
  __typename?: 'ShowAdminEmailSettingsServiceObj';
  host: Scalars['String']['output'];
  port: Scalars['Int']['output'];
  secure: Scalars['Boolean']['output'];
  user: Scalars['String']['output'];
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

export type ShowSettingsObj = {
  __typename?: 'ShowSettingsObj';
  site_copyright: Array<TextLanguage>;
  site_description: Array<TextLanguage>;
  site_name: Scalars['String']['output'];
  site_short_name: Scalars['String']['output'];
  theme_id?: Maybe<Scalars['Float']['output']>;
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

export type Admin__Core_Files__DeleteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type Admin__Core_Files__DeleteMutation = { __typename?: 'Mutation', admin__core_files__delete: string };

export type Admin__Install__Create_DatabaseMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin__Install__Create_DatabaseMutation = { __typename?: 'Mutation', admin__install__create_database: string };

export type Admin__Core_Languages__CreateMutationVariables = Exact<{
  code: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
  locale: Scalars['String']['input'];
  time24: Scalars['Boolean']['input'];
  allowInInput: Scalars['Boolean']['input'];
}>;


export type Admin__Core_Languages__CreateMutation = { __typename?: 'Mutation', admin__core_languages__create: { __typename?: 'ShowCoreLanguages', code: string, id: number, name: string } };

export type Admin__Core_Languages__DeleteMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Admin__Core_Languages__DeleteMutation = { __typename?: 'Mutation', admin__core_languages__delete: string };

export type Admin__Core_Languages__DownloadMutationVariables = Exact<{
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
  allowInInput: Scalars['Boolean']['input'];
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
  content: ContentCreateAdminGroups;
}>;


export type Admin__Core_Groups__EditMutation = { __typename?: 'Mutation', admin__core_groups__edit: { __typename?: 'ShowAdminGroups', id: number } };

export type Core_Groups__Admin_CreateMutationVariables = Exact<{
  name: Array<TextLanguageInput> | TextLanguageInput;
  content: ContentCreateAdminGroups;
}>;


export type Core_Groups__Admin_CreateMutation = { __typename?: 'Mutation', core_groups__admin_create: { __typename?: 'ShowAdminGroups', id: number } };

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
  parentId: Scalars['Int']['input'];
}>;


export type Admin__Core_Nav__Change_PositionMutation = { __typename?: 'Mutation', admin__core_nav__change_position: string };

export type Admin__Core_Nav__CreateMutationVariables = Exact<{
  description: Array<TextLanguageInput> | TextLanguageInput;
  external: Scalars['Boolean']['input'];
  href: Scalars['String']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
  icon?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Nav__CreateMutation = { __typename?: 'Mutation', admin__core_nav__create: { __typename?: 'ShowCoreNav', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

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
  icon?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Nav__EditMutation = { __typename?: 'Mutation', admin__core_nav__edit: { __typename?: 'ShowCoreNav', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

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

export type Admin__Core_Plugins__UploadMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
  code?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__UploadMutation = { __typename?: 'Mutation', admin__core_plugins__upload: { __typename?: 'ShowAdminPlugins', id: number, name: string } };

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

export type Admin__Core_Plugins__Nav__Change_PositionMutationVariables = Exact<{
  indexToMove: Scalars['Int']['input'];
  pluginCode: Scalars['String']['input'];
  code: Scalars['String']['input'];
  parentCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Nav__Change_PositionMutation = { __typename?: 'Mutation', admin__core_plugins__nav__change_position: string };

export type Admin__Core_Plugins__Nav__CreateMutationVariables = Exact<{
  code: Scalars['String']['input'];
  pluginCode: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  href: Scalars['String']['input'];
  parentCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Nav__CreateMutation = { __typename?: 'Mutation', admin__core_plugins__nav__create: { __typename?: 'ShowAdminNavPluginsObj', code: string, icon?: string | null, href: string } };

export type Admin__Core_Plugins__Nav__DeleteMutationVariables = Exact<{
  code: Scalars['String']['input'];
  pluginCode: Scalars['String']['input'];
  parentCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Nav__DeleteMutation = { __typename?: 'Mutation', admin__core_plugins__nav__delete: string };

export type Admin__Core_Plugins__Nav__EditMutationVariables = Exact<{
  code: Scalars['String']['input'];
  href: Scalars['String']['input'];
  icon?: InputMaybe<Scalars['String']['input']>;
  pluginCode: Scalars['String']['input'];
  previousCode: Scalars['String']['input'];
  parentCode?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__Nav__EditMutation = { __typename?: 'Mutation', admin__core_plugins__nav__edit: { __typename?: 'ShowAdminNavPluginsObj', code: string } };

export type Admin_Sessions__Sign_OutMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__Sign_OutMutation = { __typename?: 'Mutation', admin_sessions__sign_out: string };

export type Admin__Core_Email_Settings__EditMutationVariables = Exact<{
  host: Scalars['String']['input'];
  password: Scalars['String']['input'];
  port: Scalars['Int']['input'];
  secure: Scalars['Boolean']['input'];
  user: Scalars['String']['input'];
}>;


export type Admin__Core_Email_Settings__EditMutation = { __typename?: 'Mutation', admin__core_email_settings__edit: { __typename?: 'ShowAdminEmailSettingsServiceObj', host: string } };

export type Admin__Core_Main_Settings__EditMutationVariables = Exact<{
  siteName: Scalars['String']['input'];
  siteShortName: Scalars['String']['input'];
  siteDescription: Array<TextLanguageInput> | TextLanguageInput;
  siteCopyright: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Admin__Core_Main_Settings__EditMutation = { __typename?: 'Mutation', admin__core_main_settings__edit: { __typename?: 'EditAdminSettingsObj', site_name: string } };

export type Admin__Core_Manifest_Metadata__EditMutationVariables = Exact<{
  display: Scalars['String']['input'];
  startUrl: Scalars['String']['input'];
  backgroundColor: Scalars['String']['input'];
  themeColor: Scalars['String']['input'];
}>;


export type Admin__Core_Manifest_Metadata__EditMutation = { __typename?: 'Mutation', admin__core_manifest_metadata__edit: { __typename?: 'ShowAdminManifestMetadataObj', display: string } };

export type Admin__Core_Theme_Editor__EditMutationVariables = Exact<{
  colors: ColorsEditAdminThemeEditor;
}>;


export type Admin__Core_Theme_Editor__EditMutation = { __typename?: 'Mutation', admin__core_theme_editor__edit: string };

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

export type Admin__Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Sessions__AuthorizationQuery = { __typename?: 'Query', admin__sessions__authorization: { __typename?: 'AuthorizationAdminSessionsObj', version: string, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } | null, nav: Array<{ __typename?: 'NavAdminPluginsAuthorization', code: string, nav: Array<{ __typename?: 'ShowAdminNavPluginsObj', code: string, href: string, icon?: string | null, children?: Array<{ __typename?: 'ShowAdminNavPlugins', code: string, href: string }> | null }> }> } };

export type Admin__Core_Files__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowCoreFilesSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Files__ShowQuery = { __typename?: 'Query', admin__core_files__show: { __typename?: 'ShowAdminFilesObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminFiles', count_uses: number, created: Date, dir_folder: string, extension: string, file_alt?: string | null, file_name: string, file_name_original: string, file_size: number, height?: number | null, id: number, mimetype: string, security_key?: string | null, width?: number | null, user: { __typename?: 'User', id: number, name: string, name_seo: string } }> } };

export type Admin__Install__LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Install__LayoutQuery = { __typename?: 'Query', admin__install__layout: { __typename?: 'LayoutAdminInstallObj', status: LayoutAdminInstallEnum } };

export type Admin__Core__DashboardQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Core__DashboardQuery = { __typename?: 'Query', admin__core_members__stats_sign_up: Array<{ __typename?: 'SignUpStatsAdminMembers', joined_date: string, users_joined: number }> };

export type Admin__Core_Groups__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowAdminGroupsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Groups__ShowQuery = { __typename?: 'Query', admin__core_groups__show: { __typename?: 'ShowAdminGroupsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, startCursor?: number | null, totalCount: number, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'ShowAdminGroups', created: Date, updated: Date, id: number, users_count: number, protected: boolean, guest: boolean, root: boolean, default: boolean, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, content: { __typename?: 'ContentShowAdminGroups', files_allow_upload: boolean, files_max_storage_for_submit: number, files_total_max_storage: number } }> } };

export type Admin__Core_Groups__Show_ShortQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Groups__Show_ShortQuery = { __typename?: 'Query', admin__core_groups__show: { __typename?: 'ShowAdminGroupsObj', edges: Array<{ __typename?: 'ShowAdminGroups', id: number, guest: boolean, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Admin__Core_Staff_Administrators__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowAdminStaffAdministratorsSortByArgs>;
}>;


export type Admin__Core_Staff_Administrators__ShowQuery = { __typename?: 'Query', admin__core_staff_administrators__show: { __typename?: 'ShowAdminStaffAdministratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffAdministrators', created: Date, id: number, unrestricted: boolean, updated: Date, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: number, group_name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, name_seo: string, id: number, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin__Core_Staff_Moderators__ShowQueryVariables = Exact<{
  sortBy?: InputMaybe<ShowAdminStaffModeratorsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Staff_Moderators__ShowQuery = { __typename?: 'Query', admin__core_staff_moderators__show: { __typename?: 'ShowAdminStaffModeratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffModerators', created: Date, id: number, unrestricted: boolean, updated: Date, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: number, group_name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } | { __typename: 'User', avatar_color: string, id: number, name_seo: string, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin__Core_Members__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowAdminMembersSortByArgs>;
  groups?: InputMaybe<Array<Scalars['Int']['input']> | Scalars['Int']['input']>;
}>;


export type Admin__Core_Members__ShowQuery = { __typename?: 'Query', admin__core_members__show: { __typename?: 'ShowAdminMembersObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminMembers', avatar_color: string, email: string, id: number, name_seo: string, joined: Date, name: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Admin__Core_Nav__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Core_Nav__ShowQuery = { __typename?: 'Query', core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, icon?: string | null, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, href: string, external: boolean, position: number, icon?: string | null, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

export type Admin__Core_Plugins__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowAdminPluginsSortByArgs>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Admin__Core_Plugins__ShowQuery = { __typename?: 'Query', admin__core_plugins__show: { __typename?: 'ShowAdminPluginsObj', edges: Array<{ __typename?: 'ShowAdminPlugins', author: string, author_url?: string | null, code: string, default: boolean, description?: string | null, enabled: boolean, id: number, name: string, support_url: string, updated: Date, version?: string | null, created: Date, version_code?: number | null, allow_default: boolean }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin__Core_Plugins__FilesQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__FilesQuery = { __typename?: 'Query', admin__core_plugins__files: { __typename?: 'FilesAdminPluginsObj', admin_pages: number, admin_templates: number, databases: number, pages: number, pages_container: number, templates: number, default_page: boolean } };

export type Admin__Core_Plugins__Show__ItemQueryVariables = Exact<{
  code?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Admin__Core_Plugins__Show__ItemQuery = { __typename?: 'Query', admin__core_plugins__show: { __typename?: 'ShowAdminPluginsObj', edges: Array<{ __typename?: 'ShowAdminPlugins', allow_default: boolean, author: string, author_url?: string | null, code: string, created: Date, default: boolean, description?: string | null, enabled: boolean, id: number, name: string, support_url: string, updated: Date, version?: string | null, version_code?: number | null }> } };

export type Admin__Core_Plugins__Nav__ShowQueryVariables = Exact<{
  pluginCode: Scalars['String']['input'];
}>;


export type Admin__Core_Plugins__Nav__ShowQuery = { __typename?: 'Query', admin__core_plugins__nav__show: Array<{ __typename?: 'ShowAdminNavPluginsObj', code: string, icon?: string | null, href: string, children?: Array<{ __typename?: 'ShowAdminNavPlugins', code: string, href: string, icon?: string | null }> | null }> };

export type Admin__Core_Email_Settings__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Core_Email_Settings__ShowQuery = { __typename?: 'Query', admin__core_email_settings__show: { __typename?: 'ShowAdminEmailSettingsServiceObj', host: string, port: number, secure: boolean, user: string } };

export type Admin__Core_Manifest_Metadata__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin__Core_Manifest_Metadata__ShowQuery = { __typename?: 'Query', admin__core_manifest_metadata__show: { __typename?: 'ShowAdminManifestMetadataObj', display: string, start_url: string, theme_color: string, background_color: string } };

export type Core_Main_Settings__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Main_Settings__ShowQuery = { __typename?: 'Query', core_settings__show: { __typename?: 'ShowSettingsObj', site_name: string, site_short_name: string, site_copyright: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Theme_Editor__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Theme_Editor__ShowQuery = { __typename?: 'Query', core_theme_editor__show: { __typename?: 'ShowCoreThemeEditorObj', colors: { __typename?: 'ColorsShowCoreThemeEditor', background: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, primary: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, secondary: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, primary_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, secondary_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, destructive: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, destructive_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, cover: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, cover_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, muted: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, muted_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, accent: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, accent_foreground: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, card: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } }, border: { __typename?: 'ThemeVariable', dark: { __typename?: 'HslColor', h: number, l: number, s: number }, light: { __typename?: 'HslColor', h: number, l: number, s: number } } } } };

export type Admin_Core_Themes__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowAdminThemesSortByArgs>;
}>;


export type Admin_Core_Themes__ShowQuery = { __typename?: 'Query', admin__core_themes__show: { __typename?: 'ShowAdminThemesObj', edges: Array<{ __typename?: 'ShowAdminThemes', author: string, author_url?: string | null, created: Date, default: boolean, id: number, name: string, protected: boolean, support_url: string, version?: string | null, version_code?: number | null }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Admin__Blog_Categories__CreateMutationVariables = Exact<{
  description: Array<TextLanguageInput> | TextLanguageInput;
  name: Array<TextLanguageInput> | TextLanguageInput;
  color: Scalars['String']['input'];
}>;


export type Admin__Blog_Categories__CreateMutation = { __typename?: 'Mutation', admin__blog_categories__create: { __typename?: 'ShowBlogCategories', id: number } };

export type Admin_Blog_Categories__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Blog_Categories__ShowQuery = { __typename?: 'Query', blog_categories__show: { __typename?: 'ShowBlogCategoriesObj', edges: Array<{ __typename?: 'ShowBlogCategories', color: string, id: number, position: number, description?: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> | null, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };

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


export type Core_Members__Avatar__UploadMutation = { __typename?: 'Mutation', core_members__avatar__upload: { __typename?: 'UploadAvatarCoreMembersObj', id: number } };

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

export type Core_MetadataQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_MetadataQuery = { __typename?: 'Query', core_settings__show: { __typename?: 'ShowSettingsObj', site_name: string, site_short_name: string, site_copyright: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_MiddlewareQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_MiddlewareQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', default: boolean, code: string, id: number, name: string, timezone: string, enabled: boolean, locale: string, allow_in_input: boolean, time_24: boolean }> }, core_themes__show: { __typename?: 'ShowCoreThemesObj', edges: Array<{ __typename?: 'ShowCoreThemes', id: number, name: string }> }, core_plugins__show: Array<{ __typename?: 'ShowCorePluginsObj', code: string }>, core_settings__show: { __typename?: 'ShowSettingsObj', site_name: string, theme_id?: number | null, site_copyright: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__AuthorizationQuery = { __typename?: 'Query', core_sessions__authorization: { __typename?: 'AuthorizationCoreSessionsObj', plugin_default: string, user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: number, name_seo: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } } | null, files: { __typename?: 'FilesAuthorizationCoreSessions', allow_upload: boolean, max_storage_for_submit: number, total_max_storage: number, space_used: number } }, core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string }> }, core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, icon?: string | null, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, position: number, external: boolean, href: string, icon?: string | null, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> }, core_plugins__show: Array<{ __typename?: 'ShowCorePluginsObj', code: string, allow_default: boolean }>, core_settings__show: { __typename?: 'ShowSettingsObj', theme_id?: number | null, site_copyright: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } };

export type Core_Languages__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<ShowCoreLanguagesSortByArgs>;
}>;


export type Core_Languages__ShowQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', code: string, default: boolean, allow_in_input: boolean, enabled: boolean, id: number, name: string, protected: boolean, timezone: string, locale: string, time_24: boolean, updated: Date, created: Date }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_Members__Show__SearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Members__Show__SearchQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, name: string, name_seo: string, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', id: number, name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };

export type Core_Members__Files__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<ShowCoreFilesSortByArgs>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Members__Files__ShowQuery = { __typename?: 'Query', core_files__show: { __typename?: 'ShowCoreFilesObj', edges: Array<{ __typename?: 'ShowCoreFiles', created: Date, dir_folder: string, extension: string, file_name: string, file_size: number, file_name_original: string, height?: number | null, id: number, mimetype: string, width?: number | null, file_alt?: string | null, count_uses: number, security_key?: string | null }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor?: number | null, hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: number | null, totalCount: number } } };

export type Core_Sessions__Devices__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__Devices__ShowQuery = { __typename?: 'Query', core_sessions__devices__show: Array<{ __typename?: 'ShowCoreSessionDevicesObj', expires: Date, id: number, last_seen: Date, uagent_browser: string, uagent_os: string, uagent_version: string, login_token: string, ip_address: string, created: Date }> };

export type Core_Members__ProfilesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  nameSeo: Scalars['String']['input'];
}>;


export type Core_Members__ProfilesQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: number, joined: Date, name: string, name_seo: string, posts: number, avatar?: { __typename?: 'AvatarUser', id: number, dir_folder: string, file_name: string } | null, group: { __typename?: 'GroupUser', name: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> } }> } };


export const Admin__Core_Files__Delete = gql`
    mutation Admin__core_files__delete($id: Int!) {
  admin__core_files__delete(id: $id)
}
    `;
export const Admin__Install__Create_Database = gql`
    mutation Admin__install__create_database {
  admin__install__create_database
}
    `;
export const Admin__Core_Languages__Create = gql`
    mutation Admin__core_languages__create($code: String!, $name: String!, $timezone: String!, $locale: String!, $time24: Boolean!, $allowInInput: Boolean!) {
  admin__core_languages__create(
    code: $code
    name: $name
    timezone: $timezone
    locale: $locale
    time_24: $time24
    allow_in_input: $allowInInput
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
    mutation Admin__core_languages__download($code: String!, $plugins: [String!]!) {
  admin__core_languages__download(code: $code, plugins: $plugins)
}
    `;
export const Admin__Core_Languages__Edit = gql`
    mutation Admin__core_languages__edit($default: Boolean!, $enabled: Boolean!, $id: Int!, $name: String!, $timezone: String!, $locale: String!, $time24: Boolean!, $allowInInput: Boolean!) {
  admin__core_languages__edit(
    default: $default
    enabled: $enabled
    id: $id
    name: $name
    timezone: $timezone
    locale: $locale
    time_24: $time24
    allow_in_input: $allowInInput
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
    mutation Admin__core_groups__edit($id: Int!, $name: [TextLanguageInput!]!, $content: ContentCreateAdminGroups!) {
  admin__core_groups__edit(id: $id, name: $name, content: $content) {
    id
  }
}
    `;
export const Core_Groups__Admin_Create = gql`
    mutation core_groups__admin_create($name: [TextLanguageInput!]!, $content: ContentCreateAdminGroups!) {
  core_groups__admin_create(name: $name, content: $content) {
    id
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
    mutation Admin__core_nav__change_position($id: Int!, $indexToMove: Int!, $parentId: Int!) {
  admin__core_nav__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;
export const Admin__Core_Nav__Create = gql`
    mutation Admin__core_nav__create($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $name: [TextLanguageInput!]!, $icon: String) {
  admin__core_nav__create(
    description: $description
    external: $external
    href: $href
    name: $name
    icon: $icon
  ) {
    id
    name {
      language_code
      value
    }
  }
}
    `;
export const Admin__Core_Nav__Delete = gql`
    mutation Admin__core_nav__delete($id: Int!) {
  admin__core_nav__delete(id: $id)
}
    `;
export const Admin__Core_Nav__Edit = gql`
    mutation Admin__core_nav__edit($description: [TextLanguageInput!]!, $external: Boolean!, $href: String!, $id: Int!, $name: [TextLanguageInput!]!, $icon: String) {
  admin__core_nav__edit(
    description: $description
    external: $external
    href: $href
    id: $id
    name: $name
    icon: $icon
  ) {
    id
    name {
      language_code
      value
    }
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
export const Admin__Core_Plugins__Upload = gql`
    mutation Admin__core_plugins__upload($file: Upload!, $code: String) {
  admin__core_plugins__upload(file: $file, code: $code) {
    id
    name
  }
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
export const Admin__Core_Plugins__Nav__Change_Position = gql`
    mutation Admin__core_plugins__nav__change_position($indexToMove: Int!, $pluginCode: String!, $code: String!, $parentCode: String) {
  admin__core_plugins__nav__change_position(
    index_to_move: $indexToMove
    plugin_code: $pluginCode
    code: $code
    parent_code: $parentCode
  )
}
    `;
export const Admin__Core_Plugins__Nav__Create = gql`
    mutation Admin__core_plugins__nav__create($code: String!, $pluginCode: String!, $icon: String, $href: String!, $parentCode: String) {
  admin__core_plugins__nav__create(
    code: $code
    plugin_code: $pluginCode
    icon: $icon
    href: $href
    parent_code: $parentCode
  ) {
    code
    icon
    href
  }
}
    `;
export const Admin__Core_Plugins__Nav__Delete = gql`
    mutation Admin__core_plugins__nav__delete($code: String!, $pluginCode: String!, $parentCode: String) {
  admin__core_plugins__nav__delete(
    code: $code
    plugin_code: $pluginCode
    parent_code: $parentCode
  )
}
    `;
export const Admin__Core_Plugins__Nav__Edit = gql`
    mutation Admin__core_plugins__nav__edit($code: String!, $href: String!, $icon: String, $pluginCode: String!, $previousCode: String!, $parentCode: String) {
  admin__core_plugins__nav__edit(
    code: $code
    href: $href
    icon: $icon
    plugin_code: $pluginCode
    previous_code: $previousCode
    parent_code: $parentCode
  ) {
    code
  }
}
    `;
export const Admin_Sessions__Sign_Out = gql`
    mutation Admin_sessions__sign_out {
  admin_sessions__sign_out
}
    `;
export const Admin__Core_Email_Settings__Edit = gql`
    mutation Admin__core_email_settings__edit($host: String!, $password: String!, $port: Int!, $secure: Boolean!, $user: String!) {
  admin__core_email_settings__edit(
    host: $host
    password: $password
    port: $port
    secure: $secure
    user: $user
  ) {
    host
  }
}
    `;
export const Admin__Core_Main_Settings__Edit = gql`
    mutation Admin__core_main_settings__edit($siteName: String!, $siteShortName: String!, $siteDescription: [TextLanguageInput!]!, $siteCopyright: [TextLanguageInput!]!) {
  admin__core_main_settings__edit(
    site_name: $siteName
    site_short_name: $siteShortName
    site_description: $siteDescription
    site_copyright: $siteCopyright
  ) {
    site_name
  }
}
    `;
export const Admin__Core_Manifest_Metadata__Edit = gql`
    mutation Admin__core_manifest_metadata__edit($display: String!, $startUrl: String!, $backgroundColor: String!, $themeColor: String!) {
  admin__core_manifest_metadata__edit(
    display: $display
    start_url: $startUrl
    background_color: $backgroundColor
    theme_color: $themeColor
  ) {
    display
  }
}
    `;
export const Admin__Core_Theme_Editor__Edit = gql`
    mutation Admin__core_theme_editor__edit($colors: ColorsEditAdminThemeEditor!) {
  admin__core_theme_editor__edit(colors: $colors)
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
    version
    nav {
      code
      nav {
        code
        href
        icon
        children {
          code
          href
        }
      }
    }
  }
}
    `;
export const Admin__Core_Files__Show = gql`
    query Admin__core_files__show($cursor: Int, $first: Int, $sortBy: ShowCoreFilesSortByArgs, $last: Int, $search: String) {
  admin__core_files__show(
    cursor: $cursor
    first: $first
    sortBy: $sortBy
    last: $last
    search: $search
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
      count_uses
      created
      dir_folder
      extension
      file_alt
      file_name
      file_name_original
      file_size
      height
      id
      mimetype
      security_key
      user {
        id
        name
        name_seo
      }
      width
    }
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
    query Admin__Core_groups__show($first: Int, $cursor: Int, $search: String, $sortBy: ShowAdminGroupsSortByArgs, $last: Int) {
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
      content {
        files_allow_upload
        files_max_storage_for_submit
        files_total_max_storage
      }
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
    query Admin__core_staff_administrators__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminStaffAdministratorsSortByArgs) {
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
            file_name
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
    query Admin__core_staff_moderators__show($sortBy: ShowAdminStaffModeratorsSortByArgs, $last: Int, $first: Int, $cursor: Int) {
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
            file_name
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
    query Admin__core_members__show($cursor: Int, $first: Int, $last: Int, $search: String, $sortBy: ShowAdminMembersSortByArgs, $groups: [Int!]) {
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
        file_name
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
}
    `;
export const Admin__Core_Plugins__Show = gql`
    query Admin__core_plugins__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminPluginsSortByArgs, $search: String) {
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
export const Admin__Core_Plugins__Files = gql`
    query Admin__core_plugins__files($code: String!) {
  admin__core_plugins__files(code: $code) {
    admin_pages
    admin_templates
    databases
    pages
    pages_container
    templates
    default_page
  }
}
    `;
export const Admin__Core_Plugins__Show__Item = gql`
    query Admin__core_plugins__show__item($code: String, $first: Int) {
  admin__core_plugins__show(code: $code, first: $first) {
    edges {
      allow_default
      author
      author_url
      code
      created
      default
      description
      enabled
      id
      name
      support_url
      updated
      version
      version_code
    }
  }
}
    `;
export const Admin__Core_Plugins__Nav__Show = gql`
    query Admin__core_plugins__nav__show($pluginCode: String!) {
  admin__core_plugins__nav__show(plugin_code: $pluginCode) {
    code
    icon
    href
    children {
      code
      href
      icon
    }
  }
}
    `;
export const Admin__Core_Email_Settings__Show = gql`
    query Admin__core_email_settings__show {
  admin__core_email_settings__show {
    host
    port
    secure
    user
  }
}
    `;
export const Admin__Core_Manifest_Metadata__Show = gql`
    query Admin__core_manifest_metadata__show {
  admin__core_manifest_metadata__show {
    display
    start_url
    theme_color
    background_color
  }
}
    `;
export const Core_Main_Settings__Show = gql`
    query Core_main_settings__show {
  core_settings__show {
    site_name
    site_short_name
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
export const Core_Theme_Editor__Show = gql`
    query Core_theme_editor__show {
  core_theme_editor__show {
    colors {
      background {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      primary {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      secondary {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      primary_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      secondary_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      destructive {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      destructive_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      cover {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      cover_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      muted {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      muted_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      accent {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      accent_foreground {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      card {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
      border {
        dark {
          h
          l
          s
        }
        light {
          h
          l
          s
        }
      }
    }
  }
}
    `;
export const Admin_Core_Themes__Show = gql`
    query Admin_core_themes__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowAdminThemesSortByArgs) {
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
export const Admin__Blog_Categories__Create = gql`
    mutation Admin__blog_categories__create($description: [TextLanguageInput!]!, $name: [TextLanguageInput!]!, $color: String!) {
  admin__blog_categories__create(
    description: $description
    name: $name
    color: $color
  ) {
    id
  }
}
    `;
export const Admin_Blog_Categories__Show = gql`
    query Admin_blog_categories__show {
  blog_categories__show {
    edges {
      color
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
}
    `;
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
    id
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
export const Core_Metadata = gql`
    query Core_metadata {
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
    site_short_name
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
  core_themes__show {
    edges {
      id
      name
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
    theme_id
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
    theme_id
  }
}
    `;
export const Core_Languages__Show = gql`
    query Core_languages__show($first: Int, $last: Int, $cursor: Int, $search: String, $sortBy: ShowCoreLanguagesSortByArgs) {
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
      allow_in_input
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
        file_name
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
export const Core_Members__Files__Show = gql`
    query Core_members__files__show($cursor: Int, $first: Int, $last: Int, $sortBy: ShowCoreFilesSortByArgs, $search: String) {
  core_files__show(
    cursor: $cursor
    first: $first
    last: $last
    sortBy: $sortBy
    search: $search
  ) {
    edges {
      created
      dir_folder
      extension
      file_name
      file_size
      file_name_original
      height
      id
      mimetype
      width
      file_alt
      count_uses
      security_key
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
export const Core_Sessions__Devices__Show = gql`
    query Core_sessions__devices__show {
  core_sessions__devices__show {
    expires
    id
    last_seen
    uagent_browser
    uagent_os
    uagent_version
    login_token
    ip_address
    created
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
        file_name
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