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

export type AdminAuthorizationCoreSessionsObj = {
  __typename?: 'AdminAuthorizationCoreSessionsObj';
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  group_id: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type AuthorizationCoreSessionsObj = {
  __typename?: 'AuthorizationCoreSessionsObj';
  avatar?: Maybe<UploadCoreAttachmentsObj>;
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  group_id: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  is_admin: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateCoreGroupsObj = {
  __typename?: 'CreateCoreGroupsObj';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create_core_groups: CreateCoreGroupsObj;
  delete_avatar_core_members: Scalars['String']['output'];
  signIn_core_sessions: Scalars['String']['output'];
  signOut_core_sessions: Scalars['String']['output'];
  signUp_core_members: SignUpCoreMembersObj;
  upload_avatar_core_members: Scalars['String']['output'];
};


export type MutationCreate_Core_GroupsArgs = {
  name: Scalars['String']['input'];
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
  startCursor: Scalars['String']['output'];
  totalCount: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  admin_authorization_core_sessions: AdminAuthorizationCoreSessionsObj;
  authorization_core_sessions: AuthorizationCoreSessionsObj;
  show_core_members: ShowCoreMembersObj;
};


export type QueryShow_Core_MembersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<SortByArgs>>;
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

export type SortByArgs = {
  column: ShowCoreMembersSortingColumnEnum;
  direction: SortDirectionEnum;
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
  path: Scalars['String']['output'];
  position: Scalars['Int']['output'];
};

export type SignIn_Core_SessionsMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
  admin?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SignIn_Core_SessionsMutation = { __typename?: 'Mutation', signIn_core_sessions: string };

export type SignOut_Core_SessionsMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOut_Core_SessionsMutation = { __typename?: 'Mutation', signOut_core_sessions: string };

export type SignUp_Core_MembersMutationVariables = Exact<{
  birthday: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SignUp_Core_MembersMutation = { __typename?: 'Mutation', signUp_core_members: { __typename?: 'SignUpCoreMembersObj', birthday: number, email: string, name: string, newsletter?: boolean | null } };

export type Admin_Authorization_Core_SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Admin_Authorization_Core_SessionsQuery = { __typename?: 'Query', admin_authorization_core_sessions: { __typename?: 'AdminAuthorizationCoreSessionsObj', email: string, group_id: number, id: string, name: string } };

export type Authorization_Core_SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Authorization_Core_SessionsQuery = { __typename?: 'Query', authorization_core_sessions: { __typename?: 'AuthorizationCoreSessionsObj', birthday: number, email: string, id: string, name: string, newsletter?: boolean | null, group_id: number, is_admin: boolean, avatar?: { __typename?: 'UploadCoreAttachmentsObj', description?: string | null, name: string, path: string } | null } };


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
export const Admin_Authorization_Core_Sessions = gql`
    query Admin_authorization_core_sessions {
  admin_authorization_core_sessions {
    email
    group_id
    id
    name
  }
}
    `;
export const Authorization_Core_Sessions = gql`
    query Authorization_core_sessions {
  authorization_core_sessions {
    birthday
    email
    id
    name
    newsletter
    group_id
    is_admin
    avatar {
      description
      name
      path
    }
  }
}
    `;