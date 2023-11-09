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
  avatar: AvatarObj;
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  group_id: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  is_admin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  name_seo: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type AvatarObj = {
  __typename?: 'AvatarObj';
  color: Scalars['String']['output'];
  img?: Maybe<UploadCoreAttachmentsObj>;
};

export type CreateCoreGroupsObj = {
  __typename?: 'CreateCoreGroupsObj';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type GeneralAdminSettingsObj = {
  __typename?: 'GeneralAdminSettingsObj';
  side_name: Scalars['String']['output'];
};

export enum LayoutAdminInstallEnum {
  Account = 'ACCOUNT',
  Database = 'DATABASE'
}

export type LayoutAdminInstallObj = {
  __typename?: 'LayoutAdminInstallObj';
  status: LayoutAdminInstallEnum;
};

export type Mutation = {
  __typename?: 'Mutation';
  create_core_groups: CreateCoreGroupsObj;
  delete_avatar_core_members: Scalars['String']['output'];
  edit_core_languages: ShowCoreLanguages;
  edit_general_admin_settings: GeneralAdminSettingsObj;
  signIn_core_sessions: Scalars['String']['output'];
  signOut_admin_sessions: Scalars['String']['output'];
  signOut_core_sessions: Scalars['String']['output'];
  signUp_core_members: SignUpCoreMembersObj;
  upload_avatar_core_members: UploadCoreAttachmentsObj;
};


export type MutationCreate_Core_GroupsArgs = {
  name: Scalars['String']['input'];
};


export type MutationEdit_Core_LanguagesArgs = {
  default: Scalars['Boolean']['input'];
  enabled: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  timezone: Scalars['String']['input'];
};


export type MutationEdit_General_Admin_SettingsArgs = {
  side_name: Scalars['String']['input'];
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
  authorization_admin_sessions: AuthorizationAdminSessionsObj;
  authorization_core_sessions: AuthorizationCoreSessionsObj;
  layout_admin_install: LayoutAdminInstallObj;
  show_core_groups: ShowCoreGroupsObj;
  show_core_languages: ShowCoreLanguagesObj;
  show_core_members: ShowCoreMembersObj;
};


export type QueryShow_Core_GroupsArgs = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreGroupsSortByArgs>>;
};


export type QueryShow_Core_LanguagesArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryShow_Core_MembersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreMembersSortByArgs>>;
};

export type ShowCoreGroups = {
  __typename?: 'ShowCoreGroups';
  created: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type ShowCoreGroupsObj = {
  __typename?: 'ShowCoreGroupsObj';
  edges: Array<ShowCoreGroups>;
  pageInfo: PageInfo;
};

export type ShowCoreGroupsSortByArgs = {
  column: ShowCoreGroupsSortingColumnEnum;
  direction: SortDirectionEnum;
};

export enum ShowCoreGroupsSortingColumnEnum {
  Created = 'created',
  Name = 'name'
}

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
  avatar?: Maybe<Scalars['String']['output']>;
  avatar_color: Scalars['String']['output'];
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  followers: Scalars['Int']['output'];
  group_id: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  image_cover?: Maybe<Scalars['String']['output']>;
  joined: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  name_seo: Scalars['String']['output'];
  newsletter: Scalars['Boolean']['output'];
  posts: Scalars['Int']['output'];
  reactions: Scalars['Int']['output'];
  unread_notifications: Scalars['Int']['output'];
};

export type ShowCoreMembersObj = {
  __typename?: 'ShowCoreMembersObj';
  edges: Array<ShowCoreMembers>;
  pageInfo: PageInfo;
};

export type ShowCoreMembersSortByArgs = {
  column: ShowCoreMembersSortingColumnEnum;
  direction: SortDirectionEnum;
};

export enum ShowCoreMembersSortingColumnEnum {
  Birthday = 'birthday',
  FirstName = 'first_name',
  Followers = 'followers',
  Joined = 'joined',
  LastName = 'last_name',
  Name = 'name',
  NameSeo = 'name_seo',
  Posts = 'posts',
  Reactions = 'reactions'
}

export type SignUpCoreMembersObj = {
  __typename?: 'SignUpCoreMembersObj';
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  group_id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export enum SortDirectionEnum {
  Asc = 'asc',
  Desc = 'desc'
}

export type UploadCoreAttachmentsObj = {
  __typename?: 'UploadCoreAttachmentsObj';
  created: Scalars['Int']['output'];
  description?: Maybe<Scalars['String']['output']>;
  extension: Scalars['String']['output'];
  file_size: Scalars['Int']['output'];
  member_id: Scalars['String']['output'];
  mimetype: Scalars['String']['output'];
  module: Scalars['String']['output'];
  module_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  position: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type SignOut_Admin_SessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOut_Admin_SessionsMutation = { __typename?: 'Mutation', signOut_admin_sessions: string };

export type Edit_General_Admin_SettingsMutationVariables = Exact<{
  sideName: Scalars['String']['input'];
}>;


export type Edit_General_Admin_SettingsMutation = { __typename?: 'Mutation', edit_general_admin_settings: { __typename?: 'GeneralAdminSettingsObj', side_name: string } };

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


export type Upload_Avatar_Core_MembersMutation = { __typename?: 'Mutation', upload_avatar_core_members: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } };

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

export type Authorization_Admin_SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Authorization_Admin_SessionsQuery = { __typename?: 'Query', authorization_admin_sessions: { __typename?: 'AuthorizationAdminSessionsObj', user?: { __typename?: 'AuthorizationCurrentUserObj', birthday: number, email: string, group_id: number, id: string, is_admin: boolean, name: string, name_seo: string, newsletter?: boolean | null, avatar: { __typename?: 'AvatarObj', color: string, img?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null } } | null }, show_core_languages: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', id: string, name: string, enabled: boolean, timezone: string, default: boolean }> } };

export type Layout_Admin_InstallQueryVariables = Exact<{ [key: string]: never; }>;


export type Layout_Admin_InstallQuery = { __typename?: 'Query', layout_admin_install: { __typename?: 'LayoutAdminInstallObj', status: LayoutAdminInstallEnum } };

export type Show_Core_GroupsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<ShowCoreGroupsSortByArgs> | ShowCoreGroupsSortByArgs>;
  last?: InputMaybe<Scalars['Int']['input']>;
}>;


export type Show_Core_GroupsQuery = { __typename?: 'Query', show_core_groups: { __typename?: 'ShowCoreGroupsObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, startCursor: string, totalCount: number, hasPreviousPage: boolean }, edges: Array<{ __typename?: 'ShowCoreGroups', created: number, id: number, name: string }> } };

export type Middleware_Core_LanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type Middleware_Core_LanguagesQuery = { __typename?: 'Query', show_core_languages: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', id: string, enabled: boolean, default: boolean }> } };

export type Show_Core_LanguagesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
}>;


export type Show_Core_LanguagesQuery = { __typename?: 'Query', show_core_languages: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', default: boolean, enabled: boolean, id: string, name: string, protected: boolean, timezone: string }>, pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, totalCount: number } } };

export type Authorization_Core_SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Authorization_Core_SessionsQuery = { __typename?: 'Query', authorization_core_sessions: { __typename?: 'AuthorizationCoreSessionsObj', user?: { __typename?: 'AuthorizationCurrentUserObj', birthday: number, email: string, group_id: number, id: string, is_admin: boolean, name: string, name_seo: string, newsletter?: boolean | null, avatar: { __typename?: 'AvatarObj', color: string, img?: { __typename?: 'UploadCoreAttachmentsObj', created: number, description?: string | null, extension: string, file_size: number, member_id: string, mimetype: string, module: string, module_id: string, name: string, position: number, url: string } | null } } | null }, show_core_languages: { __typename?: 'ShowCoreLanguagesObj', edges: Array<{ __typename?: 'ShowCoreLanguages', id: string, name: string, enabled: boolean, timezone: string, default: boolean }> } };


export const SignOut_Admin_Sessions = gql`
    mutation SignOut_admin_sessions {
  signOut_admin_sessions
}
    `;
export const Edit_General_Admin_Settings = gql`
    mutation Edit_general_admin_settings($sideName: String!) {
  edit_general_admin_settings(side_name: $sideName) {
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
export const Authorization_Admin_Sessions = gql`
    query Authorization_admin_sessions {
  authorization_admin_sessions {
    user {
      birthday
      email
      group_id
      id
      is_admin
      name
      name_seo
      newsletter
      avatar {
        color
        img {
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
    }
  }
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
export const Layout_Admin_Install = gql`
    query Layout_admin_install {
  layout_admin_install {
    status
  }
}
    `;
export const Show_Core_Groups = gql`
    query Show_core_groups($first: Int, $cursor: Int, $search: String, $sortBy: [ShowCoreGroupsSortByArgs!], $last: Int) {
  show_core_groups(
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
      id
      name
    }
  }
}
    `;
export const Middleware_Core_Languages = gql`
    query Middleware_core_languages {
  show_core_languages {
    edges {
      id
      enabled
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
export const Authorization_Core_Sessions = gql`
    query Authorization_core_sessions {
  authorization_core_sessions {
    user {
      avatar {
        color
        img {
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
      birthday
      email
      group_id
      id
      is_admin
      name
      name_seo
      newsletter
    }
  }
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