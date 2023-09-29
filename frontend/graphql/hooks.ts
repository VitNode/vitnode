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
};

export type AuthorizationAdminCoreSessionsObj = {
  __typename?: 'AuthorizationAdminCoreSessionsObj';
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  group_id: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type AuthorizationCoreSessionsObj = {
  __typename?: 'AuthorizationCoreSessionsObj';
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  group_id: Scalars['Int']['output'];
  id: Scalars['String']['output'];
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
  signIn_core_sessions: Scalars['String']['output'];
  signOut_core_sessions: Scalars['String']['output'];
  signUp_core_members: SignUpCoreMembersObj;
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
  authorization_admin_core_sessions: AuthorizationAdminCoreSessionsObj;
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

export type Authorization_Admin_Core_SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Authorization_Admin_Core_SessionsQuery = { __typename?: 'Query', authorization_admin_core_sessions: { __typename?: 'AuthorizationAdminCoreSessionsObj', email: string, group_id: number, id: string, name: string } };

export type Authorization_Core_SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type Authorization_Core_SessionsQuery = { __typename?: 'Query', authorization_core_sessions: { __typename?: 'AuthorizationCoreSessionsObj', birthday: number, email: string, id: string, name: string, newsletter?: boolean | null, group_id: number } };


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
export const Authorization_Admin_Core_Sessions = gql`
    query Authorization_admin_core_sessions {
  authorization_admin_core_sessions {
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
  }
}
    `;