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
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  group_id: Scalars['String']['output'];
  id: Scalars['String']['output'];
  is_admin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type GeneralAdminSettingsObj = {
  __typename?: 'GeneralAdminSettingsObj';
  side_name: Scalars['String']['output'];
};

export type GroupShowCoreMembers = {
  __typename?: 'GroupShowCoreMembers';
  name: Array<TextLanguage>;
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
  delete_avatar_core_members: Scalars['String']['output'];
  edit_core_languages: ShowCoreLanguages;
  forum_forums__admin__change_position: Scalars['String']['output'];
  forum_forums__admin__create: ShowForumForumsWithParent;
  signIn_core_sessions: Scalars['String']['output'];
  signOut_core_sessions: Scalars['String']['output'];
  signUp_core_members: SignUpCoreMembersObj;
  upload_avatar_core_members: UploadCoreAttachmentsObj;
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


export type MutationEdit_Core_LanguagesArgs = {
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
};


export type MutationForum_Forums__Admin__Change_PositionArgs = {
  id: Scalars['String']['input'];
  index_to_move: Scalars['Int']['input'];
  parent_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationForum_Forums__Admin__CreateArgs = {
  description: Array<TextLanguageInput>;
  is_category?: InputMaybe<Scalars['Boolean']['input']>;
  name: Array<TextLanguageInput>;
  parent_id?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSignIn_Core_SessionsArgs = {
  admin?: InputMaybe<Scalars['Boolean']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationSignUp_Core_MembersArgs = {
  birthday: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
};


export type MutationUpload_Avatar_Core_MembersArgs = {
  file: Scalars['Upload']['input'];
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

export type Query = {
  __typename?: 'Query';
  admin_install__layout: LayoutAdminInstallObj;
  admin_sessions__authorization: AuthorizationAdminSessionsObj;
  authorization_core_sessions: AuthorizationCoreSessionsObj;
  core_groups__admin__show: ShowAdminGroupsObj;
  core_members__admin__show: ShowAdminMembersObj;
  show_core_languages: ShowCoreLanguagesObj;
  show_core_members: ShowCoreMembersObj;
  show_forum_forums: ShowForumForumsObj;
};


export type QueryCore_Groups__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs>>;
};


export type QueryCore_Members__Admin__ShowArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs>>;
};


export type QueryShow_Core_LanguagesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShow_Core_MembersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  findByIds?: InputMaybe<Array<Scalars['String']['input']>>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreMembersSortByArgs>>;
};


export type QueryShow_Forum_ForumsArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  parent_id?: InputMaybe<Scalars['String']['input']>;
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
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  followers: Scalars['Int']['output'];
  group: GroupShowCoreMembers;
  id: Scalars['String']['output'];
  joined: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  newsletter: Scalars['Boolean']['output'];
  posts: Scalars['Int']['output'];
  reactions: Scalars['Int']['output'];
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
  birthday: 'birthday',
  first_name: 'first_name',
  followers: 'followers',
  joined: 'joined',
  last_name: 'last_name',
  name: 'name',
  posts: 'posts',
  reactions: 'reactions'
} as const;

export type ShowAdminMembersSortingColumnEnum = typeof ShowAdminMembersSortingColumnEnum[keyof typeof ShowAdminMembersSortingColumnEnum];
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
  birthday: Scalars['Int']['output'];
  followers: Scalars['Int']['output'];
  group: GroupShowCoreMembers;
  id: Scalars['String']['output'];
  joined: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  posts: Scalars['Int']['output'];
  reactions: Scalars['Int']['output'];
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
  birthday: 'birthday',
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
  is_category: Scalars['Boolean']['output'];
  name: Array<TextLanguage>;
  position: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
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
  children?: Maybe<Array<ShowForumForums>>;
  created: Scalars['Int']['output'];
  description: Array<TextLanguage>;
  id: Scalars['String']['output'];
  is_category: Scalars['Boolean']['output'];
  name: Array<TextLanguage>;
  parent?: Maybe<ShowForumForums>;
  position: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
};

export type SignUpCoreMembersObj = {
  __typename?: 'SignUpCoreMembersObj';
  birthday: Scalars['Int']['output'];
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
  isCategory?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type Forum_Forums__Admin__CreateMutation = { __typename?: 'Mutation', forum_forums__admin__create: { __typename?: 'ShowForumForumsWithParent', created: number, id: string, is_category: boolean, position: number, views: number, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } };

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

export type Admin_Sessions__Sign_OutMutationVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__Sign_OutMutation = { __typename?: 'Mutation', admin_sessions__sign_out: string };

export type Admin_Settings__General__EditMutationVariables = Exact<{
  sideName: Scalars['String']['input'];
}>;


export type Admin_Settings__General__EditMutation = { __typename?: 'Mutation', admin_settings__general__edit: { __typename?: 'GeneralAdminSettingsObj', side_name: string } };

export type Edit_Core_LanguagesMutationVariables = Exact<{
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
}>;


export type Edit_Core_LanguagesMutation = { __typename?: 'Mutation', edit_core_languages: { __typename?: 'ShowCoreLanguages', default: boolean, enabled: boolean, id: string, name: string, protected: boolean, timezone: string } };

export type Delete_Avatar_Core_MembersMutationVariables = Exact<{ [key: string]: never; }>;


export type Delete_Avatar_Core_MembersMutation = { __typename?: 'Mutation', delete_avatar_core_members: string };

export type Upload_Avatar_Core_MembersMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type Upload_Avatar_Core_MembersMutation = { __typename?: 'Mutation', upload_avatar_core_members: { __typename?: 'UploadCoreAttachmentsObj', id: string, created: number, description?: string | null, extension: string, file_size: number, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } };

export type SignUp_Core_MembersMutationVariables = Exact<{
  birthday: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SignUp_Core_MembersMutation = { __typename?: 'Mutation', signUp_core_members: { __typename?: 'SignUpCoreMembersObj', birthday: number, email: string, name: string, newsletter?: boolean | null } };

export type SignIn_Core_SessionsMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SignIn_Core_SessionsMutation = { __typename?: 'Mutation', signIn_core_sessions: string };

export type SignOut_Core_SessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOut_Core_SessionsMutation = { __typename?: 'Mutation', signOut_core_sessions: string };

export type Admin_Install__LayoutQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Install__LayoutQuery = { __typename?: 'Query', admin_install__layout: { __typename?: 'LayoutAdminInstallObj', status: LayoutAdminInstallEnum } };

export type Show_Forum_Forums_AdminQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
}>;


export type Show_Forum_Forums_AdminQuery = { __typename?: 'Query', show_forum_forums: { __typename?: 'ShowForumForumsObj', edges: Array<{ __typename?: 'ShowForumForumsWithParent', id: string, is_category: boolean, position: number, views: number, created: number, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, children?: Array<{ __typename?: 'ShowForumForums', created: number, id: string, is_category: boolean, position: number, views: number, description: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }>, _count: { __typename?: 'ShowForumForumsCount', children: number } }> | null, _count: { __typename?: 'ShowForumForumsCount', children: number } }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Core_Groups__Admin__ShowQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminGroupsSortByArgs> | ShowAdminGroupsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Core_Groups__Admin__ShowQuery = { __typename?: 'Query', core_groups__admin__show: { __typename?: 'ShowAdminGroupsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, startCursor: string, totalCount: number, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'ShowAdminGroups', created: number, updated: number, id: string, users_count: number, protected: boolean, guest: boolean, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> } };

export type Core_Groups__Admin__Show_ShortQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type Core_Groups__Admin__Show_ShortQuery = { __typename?: 'Query', core_groups__admin__show: { __typename?: 'ShowAdminGroupsObj', edges: Array<{ __typename?: 'ShowAdminGroups', id: string, guest: boolean, name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> }> } };

export type Core_Members__Admin__ShowQueryVariables = Exact<{
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowAdminMembersSortByArgs> | ShowAdminMembersSortByArgs>;
  groups?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type Core_Members__Admin__ShowQuery = { __typename?: 'Query', core_members__admin__show: { __typename?: 'ShowAdminMembersObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number }, edges: Array<{ __typename?: 'ShowAdminMembers', avatar_color: string, email: string, id: string, joined: number, name: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupShowCoreMembers', name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } }> } };

export type Admin_Sessions__AuthorizationQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Sessions__AuthorizationQuery = { __typename?: 'Query', admin_sessions__authorization: { __typename?: 'AuthorizationAdminSessionsObj', user?: { __typename?: 'AuthorizationCurrentUserObj', birthday: number, email: string, group_id: string, id: string, is_admin: boolean, name: string, newsletter?: boolean | null, avatar_color: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null } | null } };

export type Middleware_Core_LanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type Middleware_Core_LanguagesQuery = { __typename?: 'Query', show_core_languages: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', id: string, name: string, enabled: boolean, timezone: string, default: boolean }> } };

export type Show_Core_LanguagesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type Show_Core_LanguagesQuery = { __typename?: 'Query', show_core_languages: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', default: boolean, enabled: boolean, id: string, name: string, protected: boolean, timezone: string }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Profiles_Core_MembersQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  findByIds?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type Profiles_Core_MembersQuery = { __typename?: 'Query', show_core_members: { __typename?: 'ShowCoreMembersObj', edges: Array<{ __typename?: 'ShowCoreMembers', avatar_color: string, birthday: number, followers: number, id: string, joined: number, name: string, posts: number, reactions: number, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null, group: { __typename?: 'GroupShowCoreMembers', name: Array<{ __typename?: 'TextLanguage', id_language: string, value: string }> } }> } };

export type Authorization_Core_SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Authorization_Core_SessionsQuery = { __typename?: 'Query', authorization_core_sessions: { __typename?: 'AuthorizationCoreSessionsObj', user?: { __typename?: 'AuthorizationCurrentUserObj', birthday: number, email: string, group_id: string, id: string, is_admin: boolean, name: string, newsletter?: boolean | null, avatar_color: string, avatar?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, id: string, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null } | null }, show_core_languages: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', id: string }> } };


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
    mutation Forum_forums__admin__create($name: [TextLanguageInput!]!, $description: [TextLanguageInput!]!, $parentId: String, $isCategory: Boolean) {
  forum_forums__admin__create(
    name: $name
    description: $description
    parent_id: $parentId
    is_category: $isCategory
  ) {
    created
    description {
      id_language
      value
    }
    id
    is_category
    name {
      id_language
      value
    }
    position
    views
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
export const Edit_Core_Languages = gql`
    mutation Edit_core_languages($default: Boolean!, $enabled: Boolean!, $id: String!, $name: String!, $timezone: String!) {
  edit_core_languages(
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
export const Delete_Avatar_Core_Members = gql`
    mutation Delete_avatar_core_members {
  delete_avatar_core_members
}
    `;
export const Upload_Avatar_Core_Members = gql`
    mutation Upload_avatar_core_members($file: Upload!) {
  upload_avatar_core_members(file: $file) {
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
export const SignUp_Core_Members = gql`
    mutation SignUp_core_members($birthday: Int!, $email: String!, $name: String!, $password: String!, $newsletter: Boolean) {
  signUp_core_members(
    birthday: $birthday
    email: $email
    name: $name
    password: $password
    newsletter: $newsletter
  ) {
    birthday
    email
    name
    newsletter
  }
}
    `;
export const SignIn_Core_Sessions = gql`
    mutation SignIn_core_sessions($email: String!, $password: String!, $remember: Boolean, $admin: Boolean) {
  signIn_core_sessions(
    email: $email
    password: $password
    remember: $remember
    admin: $admin
  )
}
    `;
export const SignOut_Core_Sessions = gql`
    mutation SignOut_core_sessions {
  signOut_core_sessions
}
    `;
export const Admin_Install__Layout = gql`
    query Admin_install__layout {
  admin_install__layout {
    status
  }
}
    `;
export const Show_Forum_Forums_Admin = gql`
    query Show_forum_forums_admin($first: Int, $cursor: String, $parentId: String) {
  show_forum_forums(first: $first, cursor: $cursor, parent_id: $parentId) {
    edges {
      id
      is_category
      description {
        id_language
        value
      }
      name {
        id_language
        value
      }
      position
      views
      created
      children {
        created
        description {
          id_language
          value
        }
        id
        is_category
        name {
          id_language
          value
        }
        position
        views
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
      birthday
      email
      group_id
      id
      is_admin
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
    }
  }
}
    `;
export const Middleware_Core_Languages = gql`
    query Middleware_core_languages {
  show_core_languages {
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
export const Show_Core_Languages = gql`
    query Show_core_languages($first: Int, $last: Int, $cursor: String) {
  show_core_languages(first: $first, last: $last, cursor: $cursor) {
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
export const Profiles_Core_Members = gql`
    query Profiles_core_members($first: Int, $findByIds: [String!]) {
  show_core_members(first: $first, findByIds: $findByIds) {
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
      birthday
      followers
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
      reactions
    }
  }
}
    `;
export const Authorization_Core_Sessions = gql`
    query Authorization_core_sessions {
  authorization_core_sessions {
    user {
      birthday
      email
      group_id
      id
      is_admin
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
    }
  }
  show_core_languages {
    edges {
      id
    }
  }
}
    `;