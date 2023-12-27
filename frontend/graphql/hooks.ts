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
  user?: Maybe<AuthorizationCurrentUserObj>;
};

export type AuthorizationCurrentUserObj = {
  __typename?: 'AuthorizationCurrentUserObj';
  avatar?: Maybe<UploadCoreAttachmentsObj>;
  avatar_color: Scalars['String']['output'];
  cover?: Maybe<UploadCoreAttachmentsObj>;
  email: Scalars['String']['output'];
  group: GroupUser;
  id: Scalars['String']['output'];
  is_admin: Scalars['Boolean']['output'];
  is_mod: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  newsletter: Scalars['Boolean']['output'];
};

export type ChildrenShowForumForums = {
  __typename?: 'ChildrenShowForumForums';
  _count: ShowForumForumsCount;
  children?: Maybe<Array<ShowForumForums>>;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['String']['output'];
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
  id: Scalars['String']['output'];
  name: Array<TextLanguage>;
  parent?: Maybe<ShowForumForums>;
  position: Scalars['Int']['output'];
};

export type ForumTopicsForums = {
  __typename?: 'ForumTopicsForums';
  id: Scalars['String']['output'];
  name: Array<TextLanguage>;
};

export type GeneralAdminSettingsObj = {
  __typename?: 'GeneralAdminSettingsObj';
  side_name: Scalars['String']['output'];
};

export type GroupUser = {
  __typename?: 'GroupUser';
  id: Scalars['String']['output'];
  name: Array<TextLanguage>;
};

export type GroupsPermissionsCreateForumForums = {
  create: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  read: Scalars['Boolean']['input'];
  reply: Scalars['Boolean']['input'];
  view: Scalars['Boolean']['input'];
};

export type LanguageCoreMiddlewareObj = {
  __typename?: 'LanguageCoreMiddlewareObj';
  default: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  timezone: Scalars['String']['output'];
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
  admin_install__create_database: Scalars['String']['output'];
  admin_sessions__sign_out: Scalars['String']['output'];
  admin_settings__general__edit: GeneralAdminSettingsObj;
  core_groups__admin__delete: Scalars['String']['output'];
  core_groups__admin__edit: ShowAdminGroups;
  core_groups__admin_create: ShowAdminGroups;
  core_languages__edit: ShowCoreLanguages;
  core_members__avatar__delete: Scalars['String']['output'];
  core_members__avatar__upload: UploadCoreAttachmentsObj;
  core_members__sign_up: SignUpCoreMembersObj;
  core_sessions__sign_in: Scalars['String']['output'];
  core_sessions__sign_out: Scalars['String']['output'];
  core_staff_administrators__admin__create: ShowAdminStaffAdministrators;
  core_staff_moderators__admin__create: ShowAdminStaffModerators;
  forum_forums__admin__change_position: Scalars['String']['output'];
  forum_forums__admin__create: CreateForumForumsObj;
  forum_topics__create: ShowTopicsForums;
};


export type MutationAdmin_Settings__General__EditArgs = {
  side_name: Scalars['String']['input'];
};


export type MutationCore_Groups__Admin__DeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationCore_Groups__Admin__EditArgs = {
  id: Scalars['String']['input'];
  name: Array<TextLanguageInput>;
};


export type MutationCore_Groups__Admin_CreateArgs = {
  name: Array<TextLanguageInput>;
};


export type MutationCore_Languages__EditArgs = {
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
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


export type MutationCore_Sessions__Sign_InArgs = {
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCore_Staff_Administrators__Admin__CreateArgs = {
  group_id?: InputMaybe<Scalars['String']['input']>;
  member_id?: InputMaybe<Scalars['String']['input']>;
  unrestricted: Scalars['Boolean']['input'];
};


export type MutationCore_Staff_Moderators__Admin__CreateArgs = {
  group_id?: InputMaybe<Scalars['String']['input']>;
  member_id?: InputMaybe<Scalars['String']['input']>;
  unrestricted: Scalars['Boolean']['input'];
};


export type MutationForum_Forums__Admin__Change_PositionArgs = {
  id: Scalars['String']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationForum_Forums__Admin__CreateArgs = {
  description: Array<TextLanguageInput>;
  name: Array<TextLanguageInput>;
  parent_id?: InputMaybe<Scalars['String']['input']>;
  permissions: PermissionsCreateForumForums;
};


export type MutationForum_Topics__CreateArgs = {
  content: Array<TextLanguageInput>;
  forum_id: Scalars['String']['input'];
  title: Array<TextLanguageInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  count: Scalars['Float']['output'];
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
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
  core_sessions__authorization: AuthorizationCoreSessionsObj;
  core_staff_administrators__admin__show: ShowAdminStaffAdministratorsObj;
  core_staff_moderators__admin__show: ShowAdminStaffModeratorsObj;
  forum_forums__admin__show: ShowForumForumsAdminObj;
  forum_forums__show: ShowForumForumsObj;
  forum_posts__show: ShowPostsForumsObj;
  forum_topics__show: ShowTopicsForumsObj;
};


export type QueryCore_Groups__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs>>;
};


export type QueryCore_Languages__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCore_Members__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs>>;
};


export type QueryCore_Members__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  findByIds?: InputMaybe<Array<Scalars['String']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreMembersSortByArgs>>;
};


export type QueryCore_Staff_Administrators__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffAdministratorsSortByArgs>>;
};


export type QueryCore_Staff_Moderators__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffModeratorsSortByArgs>>;
};


export type QueryForum_Forums__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryForum_Forums__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryForum_Posts__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  topic_id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryForum_Topics__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  forum_id?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type ShowAdminGroups = {
  __typename?: 'ShowAdminGroups';
  created: Scalars['Int']['output'];
  default: Scalars['Boolean']['output'];
  guest: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
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
  avatar?: Maybe<UploadCoreAttachmentsObj>;
  avatar_color: Scalars['String']['output'];
  cover?: Maybe<UploadCoreAttachmentsObj>;
  email: Scalars['String']['output'];
  group: GroupUser;
  id: Scalars['String']['output'];
  joined: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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
export type ShowAdminStaffAdministrators = {
  __typename?: 'ShowAdminStaffAdministrators';
  created: Scalars['Int']['output'];
  id: Scalars['String']['output'];
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
  id: Scalars['String']['output'];
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
export type ShowCoreLanguages = {
  __typename?: 'ShowCoreLanguages';
  default: Scalars['Boolean']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
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
  avatar?: Maybe<UploadCoreAttachmentsObj>;
  avatar_color: Scalars['String']['output'];
  cover?: Maybe<UploadCoreAttachmentsObj>;
  group: GroupUser;
  id: Scalars['String']['output'];
  joined: Scalars['Int']['output'];
  name: Scalars['String']['output'];
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
export type ShowForumForums = {
  __typename?: 'ShowForumForums';
  _count: ShowForumForumsCount;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['String']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
};

export type ShowForumForumsAdmin = {
  __typename?: 'ShowForumForumsAdmin';
  _count: ShowForumForumsCount;
  children?: Maybe<Array<ChildrenShowForumForums>>;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['String']['output'];
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
  id: Scalars['String']['output'];
  name: Array<TextLanguage>;
  parent?: Maybe<ShowForumForums>;
  permissions: PermissionsForumForumsCount;
  position: Scalars['Int']['output'];
};

export type ShowPostsForums = {
  __typename?: 'ShowPostsForums';
  content: Array<TextLanguage>;
  id: Scalars['String']['output'];
};

export type ShowPostsForumsObj = {
  __typename?: 'ShowPostsForumsObj';
  edges: Array<ShowPostsForums>;
  pageInfo: PageInfo;
};

export type ShowTopicsForums = {
  __typename?: 'ShowTopicsForums';
  author: User;
  content: Array<TextLanguage>;
  created: Scalars['Int']['output'];
  forum: ForumTopicsForums;
  id: Scalars['String']['output'];
  locked: Scalars['Boolean']['output'];
  title: Array<TextLanguage>;
};

export type ShowTopicsForumsObj = {
  __typename?: 'ShowTopicsForumsObj';
  edges: Array<ShowTopicsForums>;
  pageInfo: PageInfo;
};

export type SignUpCoreMembersObj = {
  __typename?: 'SignUpCoreMembersObj';
  email: Scalars['String']['output'];
  group_id: Scalars['String']['output'];
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
  id: Scalars['String']['output'];
};

export type TextLanguage = {
  __typename?: 'TextLanguage';
  id_language: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type TextLanguageInput = {
  id_language: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type UploadCoreAttachmentsObj = {
  __typename?: 'UploadCoreAttachmentsObj';
  created: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  extension: Scalars['String']['output'];
  file_size: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  member_id: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
  module: Scalars['String']['output'];
  module_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<UploadCoreAttachmentsObj>;
  avatar_color: Scalars['String']['output'];
  cover?: Maybe<UploadCoreAttachmentsObj>;
  group: GroupUser;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UserOrGroupCoreStaffUnion = StaffGroupUser | User;

export type Admin_Install__Create_DatabaseMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin_Install__Create_DatabaseMutation = { __typename?: 'Mutation', admin_install__create_database: string };

export type Forum_Forums__Admin__Change_PositionMutationVariables = Exact<{
  id: Scalars['String']['input'];
  indexToMove: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['String']['input']>;
}>;


export type Forum_Forums__Admin__Change_PositionMutation = { __typename?: 'Mutation', forum_forums__admin__change_position: string };

export type Forum_Forums__Admin__CreateMutationVariables = Exact<{
  name: Array<TextLanguageInput> | TextLanguageInput;
  description: Array<TextLanguageInput> | TextLanguageInput;
  parentId?: InputMaybe<Scalars['String']['input']>;
  permissions: PermissionsCreateForumForums;
}>;


export type Forum_Forums__Admin__CreateMutation = { __typename?: 'Mutation', forum_forums__admin__create: { __typename?: 'CreateForumForumsObj', created: number, id: string, position: number, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } };

export type Core_Groups__Admin__DeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type Core_Groups__Admin__DeleteMutation = { __typename?: 'Mutation', core_groups__admin__delete: string };

export type Core_Groups__Admin__EditMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Core_Groups__Admin__EditMutation = { __typename?: 'Mutation', core_groups__admin__edit: { __typename?: 'ShowAdminGroups', created: number, id: string, protected: boolean, users_count: number, guest: boolean, updated: number, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } };

export type Core_Groups__Admin_CreateMutationVariables = Exact<{
  name: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Core_Groups__Admin_CreateMutation = { __typename?: 'Mutation', core_groups__admin_create: { __typename?: 'ShowAdminGroups', created: number, id: string, protected: boolean, users_count: number, guest: boolean, updated: number, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } };

export type Core_Staff_Administrators__Admin__CreateMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['String']['input']>;
  memberId?: InputMaybe<Scalars['String']['input']>;
  unrestricted: Scalars['Boolean']['input'];
}>;


export type Core_Staff_Administrators__Admin__CreateMutation = { __typename?: 'Mutation', core_staff_administrators__admin__create: { __typename?: 'ShowAdminStaffAdministrators', created: number, id: string, protected: boolean, unrestricted: boolean, updated: number } };

export type Core_Staff_Moderators__Admin__CreateMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['String']['input']>;
  memberId?: InputMaybe<Scalars['String']['input']>;
  unrestricted: Scalars['Boolean']['input'];
}>;


export type Core_Staff_Moderators__Admin__CreateMutation = { __typename?: 'Mutation', core_staff_moderators__admin__create: { __typename?: 'ShowAdminStaffModerators', created: number, id: string, protected: boolean, unrestricted: boolean, updated: number } };

export type Admin_Sessions__Sign_OutMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__Sign_OutMutation = { __typename?: 'Mutation', admin_sessions__sign_out: string };

export type Admin_Settings__General__EditMutationVariables = Exact<{
  sideName: Scalars['String']['input'];
}>;


export type Admin_Settings__General__EditMutation = { __typename?: 'Mutation', admin_settings__general__edit: { __typename?: 'GeneralAdminSettingsObj', side_name: string } };

export type Core_Languages__EditMutationVariables = Exact<{
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
}>;


export type Core_Languages__EditMutation = { __typename?: 'Mutation', core_languages__edit: { __typename?: 'ShowCoreLanguages', default: boolean, enabled: boolean, id: string, name: string, protected: boolean, timezone: string } };

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


export type Core_Members__Avatar__UploadMutation = { __typename?: 'Mutation', core_members__avatar__upload: { __typename?: 'UploadCoreAttachmentsObj', id: string, created: number, description?: string | null, extension: string, file_size: number, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } };

export type Core_Sessions__Sign_InMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type Core_Sessions__Sign_InMutation = { __typename?: 'Mutation', core_sessions__sign_in: string };

export type Core_Sessions__Sign_OutMutationVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__Sign_OutMutation = { __typename?: 'Mutation', core_sessions__sign_out: string };

export type Forum_Topics__CreateMutationVariables = Exact<{
  content: Array<TextLanguageInput> | TextLanguageInput;
  forumId: Scalars['String']['input'];
  title: Array<TextLanguageInput> | TextLanguageInput;
}>;


export type Forum_Topics__CreateMutation = { __typename?: 'Mutation', forum_topics__create: { __typename?: 'ShowTopicsForums', created: number, id: string, title: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } };

export type Admin_Install__LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Install__LayoutQuery = { __typename?: 'Query', admin_install__layout: { __typename?: 'LayoutAdminInstallObj', status: LayoutAdminInstallEnum } };

export type Forum_Forums__Admin__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
}>;


export type Forum_Forums__Admin__ShowQuery = { __typename?: 'Query', forum_forums__admin__show: { __typename?: 'ShowForumForumsAdminObj', edges: Array<{ __typename?: 'ShowForumForumsAdmin', id: string, position: number, created: number, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, children?: Array<{ __typename?: 'ChildrenShowForumForums', created: number, id: string, position: number, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, _count: { __typename?: 'ShowForumForumsCount', children: number } }> | null, _count: { __typename?: 'ShowForumForumsCount', children: number } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Core_Groups__Admin__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs> | ShowAdminGroupsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Groups__Admin__ShowQuery = { __typename?: 'Query', core_groups__admin__show: { __typename?: 'ShowAdminGroupsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, startCursor: string, totalCount: number, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'ShowAdminGroups', created: number, updated: number, id: string, users_count: number, protected: boolean, guest: boolean, root: boolean, default: boolean, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> } };

export type Core_Groups__Admin__Show_ShortQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Groups__Admin__Show_ShortQuery = { __typename?: 'Query', core_groups__admin__show: { __typename?: 'ShowAdminGroupsObj', edges: Array<{ __typename?: 'ShowAdminGroups', id: string, guest: boolean, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> } };

export type Core_Staff_Administrators__Admin__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminStaffAdministratorsSortByArgs> | ShowAdminStaffAdministratorsSortByArgs>;
}>;


export type Core_Staff_Administrators__Admin__ShowQuery = { __typename?: 'Query', core_staff_administrators__admin__show: { __typename?: 'ShowAdminStaffAdministratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffAdministrators', created: number, id: string, unrestricted: boolean, updated: number, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: string, group_name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } | { __typename: 'User', avatar_color: string, id: string, name: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, cover?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Core_Staff_Moderators__Admin__ShowQueryVariables = Exact<{
  sortBy?: InputMaybe<Array<ShowAdminStaffModeratorsSortByArgs> | ShowAdminStaffModeratorsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Staff_Moderators__Admin__ShowQuery = { __typename?: 'Query', core_staff_moderators__admin__show: { __typename?: 'ShowAdminStaffModeratorsObj', edges: Array<{ __typename?: 'ShowAdminStaffModerators', created: number, id: string, unrestricted: boolean, updated: number, protected: boolean, user_or_group: { __typename: 'StaffGroupUser', id: string, group_name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } | { __typename: 'User', avatar_color: string, id: string, name: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, cover?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Core_Members__Admin__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs> | ShowAdminMembersSortByArgs>;
  groups?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type Core_Members__Admin__ShowQuery = { __typename?: 'Query', core_members__admin__show: { __typename?: 'ShowAdminMembersObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminMembers', avatar_color: string, email: string, id: string, joined: number, name: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } }> } };

export type Admin_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__AuthorizationQuery = { __typename?: 'Query', admin_sessions__authorization: { __typename?: 'AuthorizationAdminSessionsObj', user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } } | null } };

export type Core_MiddlewareQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_MiddlewareQuery = { __typename?: 'Query', core_middleware: { __typename?: 'CoreMiddlewareObj', default_language: string, languages: Array<{ __typename?: 'LanguageCoreMiddlewareObj', default: boolean, id: string, name: string, timezone: string }> } };

export type Core_Languages__MiddlewareQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Languages__MiddlewareQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', id: string, name: string, enabled: boolean, timezone: string, default: boolean }> } };

export type Core_Languages__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Languages__ShowQuery = { __typename?: 'Query', core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', default: boolean, enabled: boolean, id: string, name: string, protected: boolean, timezone: string }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Core_Members__Show__SearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Members__Show__SearchQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: string, name: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } }> } };

export type Core_Members__ProfilesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  findByIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type Core_Members__ProfilesQuery = { __typename?: 'Query', core_members__show: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, id: string, joined: number, name: string, posts: number, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } }> } };

export type Core_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Core_Sessions__AuthorizationQuery = { __typename?: 'Query', core_sessions__authorization: { __typename?: 'AuthorizationCoreSessionsObj', user?: { __typename?: 'AuthorizationCurrentUserObj', email: string, id: string, is_admin: boolean, is_mod: boolean, name: string, newsletter: boolean, avatar_color: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } } | null }, core_languages__show: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', id: string }> } };

export type Forum_Forums__ShowQueryVariables = Exact<{ [key: string]: never; }>;


export type Forum_Forums__ShowQuery = { __typename?: 'Query', forum_forums__show: { __typename?: 'ShowForumForumsObj', edges: Array<{ __typename?: 'ShowForumForumsWithParent', id: string, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, children?: Array<{ __typename?: 'ChildrenShowForumForums', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, children?: Array<{ __typename?: 'ShowForumForums', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> | null, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> | null }> } };

export type Forum_Forums__Show_ItemQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  forumId: Scalars['String']['input'];
}>;


export type Forum_Forums__Show_ItemQuery = { __typename?: 'Query', forum_forums__show: { __typename?: 'ShowForumForumsObj', edges: Array<{ __typename?: 'ShowForumForumsWithParent', id: string, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, children?: Array<{ __typename?: 'ChildrenShowForumForums', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, children?: Array<{ __typename?: 'ShowForumForums', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> | null, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> | null, permissions: { __typename?: 'PermissionsForumForumsCount', can_create: boolean } }> }, forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: number, id: string, title: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, author: { __typename?: 'User', id: string, name: string, avatar_color: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Forum_Topics__ShowQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Forum_Topics__ShowQuery = { __typename?: 'Query', forum_topics__show: { __typename?: 'ShowTopicsForumsObj', edges: Array<{ __typename?: 'ShowTopicsForums', created: number, id: string, locked: boolean, content: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, title: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, author: { __typename?: 'User', avatar_color: string, id: string, name: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, cover?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupUser', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } }, forum: { __typename?: 'ForumTopicsForums', id: string, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } }> } };


export const Admin_Install__Create_Database = gql`
    mutation Admin_install__create_database {
  admin_install__create_database
}
    `;
export const Forum_Forums__Admin__Change_Position = gql`
    mutation Forum_forums__admin__change_position($id: String!, $indexToMove: Int!, $parentId: String) {
  forum_forums__admin__change_position(
    id: $id
    index_to_move: $indexToMove
    parent_id: $parentId
  )
}
    `;
export const Forum_Forums__Admin__Create = gql`
    mutation Forum_forums__admin__create($name: [TextLanguageInput!]!, $description: [TextLanguageInput!]!, $parentId: String, $permissions: PermissionsCreateForumForums!) {
  forum_forums__admin__create(
    name: $name
    description: $description
    parent_id: $parentId
    permissions: $permissions
  ) {
    created
    description {
      id_language
      value
    }
    id
    name {
      id_language
      value
    }
    position
  }
}
    `;
export const Core_Groups__Admin__Delete = gql`
    mutation Core_groups__admin__delete($id: String!) {
  core_groups__admin__delete(id: $id)
}
    `;
export const Core_Groups__Admin__Edit = gql`
    mutation Core_groups__admin__edit($id: String!, $name: [TextLanguageInput!]!) {
  core_groups__admin__edit(id: $id, name: $name) {
    created
    id
    name {
      id_language
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
      id_language
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
    mutation Core_staff_administrators__admin__create($groupId: String, $memberId: String, $unrestricted: Boolean!) {
  core_staff_administrators__admin__create(
    group_id: $groupId
    member_id: $memberId
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
export const Core_Staff_Moderators__Admin__Create = gql`
    mutation Core_staff_moderators__admin__create($groupId: String, $memberId: String, $unrestricted: Boolean!) {
  core_staff_moderators__admin__create(
    group_id: $groupId
    member_id: $memberId
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
export const Core_Languages__Edit = gql`
    mutation Core_languages__edit($default: Boolean!, $enabled: Boolean!, $id: String!, $name: String!, $timezone: String!) {
  core_languages__edit(
    default: $default
    enabled: $enabled
    id: $id
    name: $name
    timezone: $timezone
  ) {
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
    id
    created
    description
    extension
    file_size
    member_id
    mimetype
    module
    module_id
    name
    position
    url
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
export const Forum_Topics__Create = gql`
    mutation Forum_topics__create($content: [TextLanguageInput!]!, $forumId: String!, $title: [TextLanguageInput!]!) {
  forum_topics__create(content: $content, forum_id: $forumId, title: $title) {
    created
    id
    title {
      id_language
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
    query Forum_forums__admin__show($first: Int, $cursor: String, $parentId: String) {
  forum_forums__admin__show(first: $first, cursor: $cursor, parent_id: $parentId) {
    edges {
      id
      description {
        id_language
        value
      }
      name {
        id_language
        value
      }
      position
      created
      children {
        created
        description {
          id_language
          value
        }
        id
        name {
          id_language
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
    query Core_groups__admin__show($first: Int, $cursor: String, $search: String, $sortBy: [ShowAdminGroupsSortByArgs!], $last: Int) {
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
        id_language
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
        id_language
        value
      }
      guest
    }
  }
}
    `;
export const Core_Staff_Administrators__Admin__Show = gql`
    query Core_staff_administrators__admin__show($cursor: String, $first: Int, $last: Int, $sortBy: [ShowAdminStaffAdministratorsSortByArgs!]) {
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
          avatar {
            created
            description
            extension
            file_size
            id
            member_id
            mimetype
            module
            module_id
            name
            position
            url
          }
          avatar_color
          cover {
            created
            description
            extension
            file_size
            id
            member_id
            mimetype
            module
            module_id
            name
            position
            url
          }
          group {
            id
            name {
              id_language
              value
            }
          }
          id
          name
        }
        ... on StaffGroupUser {
          group_name {
            id_language
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
    query Core_staff_moderators__admin__show($sortBy: [ShowAdminStaffModeratorsSortByArgs!], $last: Int, $first: Int, $cursor: String) {
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
          avatar {
            created
            description
            extension
            file_size
            id
            member_id
            mimetype
            module
            module_id
            name
            position
            url
          }
          avatar_color
          cover {
            created
            description
            extension
            file_size
            id
            member_id
            mimetype
            module
            module_id
            name
            position
            url
          }
          group {
            id
            name {
              id_language
              value
            }
          }
          id
          name
        }
        ... on StaffGroupUser {
          group_name {
            id_language
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
    query Core_members__admin__show($cursor: String, $first: Int, $last: Int, $search: String, $sortBy: [ShowAdminMembersSortByArgs!], $groups: [String!]) {
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
      avatar {
        created
        description
        extension
        file_size
        id
        member_id
        mimetype
        module
        module_id
        name
        position
        url
      }
      avatar_color
      email
      id
      joined
      name
      group {
        id
        name {
          id_language
          value
        }
      }
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
      is_admin
      is_mod
      name
      newsletter
      avatar_color
      avatar {
        created
        description
        extension
        file_size
        id
        member_id
        mimetype
        module
        module_id
        name
        position
        url
      }
      group {
        name {
          id_language
          value
        }
        id
      }
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
      id
      name
      timezone
    }
  }
}
    `;
export const Core_Languages__Middleware = gql`
    query Core_languages__middleware {
  core_languages__show {
    edges {
      id
      name
      enabled
      timezone
      default
    }
  }
}
    `;
export const Core_Languages__Show = gql`
    query Core_languages__show($first: Int, $last: Int, $cursor: String) {
  core_languages__show(first: $first, last: $last, cursor: $cursor) {
    edges {
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
      avatar {
        created
        description
        extension
        file_size
        id
        member_id
        mimetype
        module
        module_id
        name
        position
        url
      }
      avatar_color
      group {
        id
        name {
          id_language
          value
        }
      }
      id
      name
    }
  }
}
    `;
export const Core_Members__Profiles = gql`
    query Core_members__profiles($first: Int, $findByIds: [String!]) {
  core_members__show(first: $first, findByIds: $findByIds) {
    edges {
      avatar {
        created
        description
        extension
        file_size
        id
        member_id
        mimetype
        module
        module_id
        name
        position
        url
      }
      avatar_color
      group {
        name {
          id_language
          value
        }
      }
      id
      joined
      name
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
      is_admin
      is_mod
      name
      newsletter
      avatar_color
      avatar {
        created
        description
        extension
        file_size
        id
        member_id
        mimetype
        module
        module_id
        name
        position
        url
      }
      group {
        name {
          id_language
          value
        }
        id
      }
    }
  }
  core_languages__show {
    edges {
      id
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
        id_language
        value
      }
      name {
        id_language
        value
      }
      children {
        id
        name {
          id_language
          value
        }
        children {
          id
          name {
            id_language
            value
          }
        }
        description {
          id_language
          value
        }
      }
    }
  }
}
    `;
export const Forum_Forums__Show_Item = gql`
    query Forum_forums__show_item($cursor: String, $first: Int, $last: Int, $forumId: String!) {
  forum_forums__show(ids: [$forumId]) {
    edges {
      id
      description {
        id_language
        value
      }
      name {
        id_language
        value
      }
      children {
        id
        name {
          id_language
          value
        }
        children {
          id
          name {
            id_language
            value
          }
        }
        description {
          id_language
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
        id_language
        value
      }
      author {
        avatar {
          created
          description
          extension
          file_size
          id
          member_id
          mimetype
          module
          module_id
          name
          position
          url
        }
        id
        name
        avatar_color
        group {
          id
          name {
            id_language
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
export const Forum_Topics__Show = gql`
    query Forum_topics__show($ids: [String!], $first: Int) {
  forum_topics__show(ids: $ids, first: $first) {
    edges {
      content {
        id_language
        value
      }
      created
      id
      locked
      title {
        id_language
        value
      }
      author {
        avatar {
          created
          description
          extension
          file_size
          id
          member_id
          mimetype
          module
          module_id
          name
          position
          url
        }
        avatar_color
        cover {
          created
          description
          extension
          file_size
          id
          member_id
          mimetype
          module
          module_id
          name
          position
          url
        }
        group {
          id
          name {
            id_language
            value
          }
        }
        id
        name
      }
      forum {
        id
        name {
          id_language
          value
        }
      }
    }
  }
}
    `;