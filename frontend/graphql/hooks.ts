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

export type AuthorizationCoreSessionsObj = {
  __typename?: 'AuthorizationCoreSessionsObj';
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  id: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type CreateCoreMembersObj = {
  __typename?: 'CreateCoreMembersObj';
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  create_core_members: CreateCoreMembersObj;
  signIn_core_sessions: Scalars['String']['output'];
};


export type MutationCreate_Core_MembersArgs = {
  birthday: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
};


export type MutationSignIn_Core_SessionsArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
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
  first_name: Scalars['String']['output'];
  followers: Scalars['Int']['output'];
  group_id: Scalars['Int']['output'];
  hide_real_name: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  image_cover?: Maybe<Scalars['String']['output']>;
  joined: Scalars['Int']['output'];
  last_name: Scalars['String']['output'];
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
}>;


export type SignIn_Core_SessionsMutation = { __typename?: 'Mutation', signIn_core_sessions: string };

export type Show_Core_MembersQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type Show_Core_MembersQuery = { __typename?: 'Query', show_core_members: { __typename?: 'ShowCoreMembersObj', pageInfo: { __typename?: 'PageInfo', count: number, endCursor: string, hasNextPage: boolean, startCursor: string, totalCount: number } } };


export const SignIn_Core_Sessions = gql`
    mutation SignIn_core_sessions($email: String!, $password: String!, $remember: Boolean) {
  signIn_core_sessions(email: $email, password: $password, remember: $remember)
}
    `;
export const Show_Core_Members = gql`
    query Show_core_members($first: Int!) {
  show_core_members(first: $first) {
    pageInfo {
      count
      endCursor
      hasNextPage
      startCursor
      totalCount
    }
  }
}
    `;