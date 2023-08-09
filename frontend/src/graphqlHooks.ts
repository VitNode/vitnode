import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import { fetcher } from './fetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  Boolean: { input: boolean; output: boolean };
  Float: { input: number; output: number };
  ID: { input: string; output: string };
  Int: { input: number; output: number };
  String: { input: string; output: string };
};

export type CreateCoreMembersObj = {
  birthday: Scalars['Int']['output'];
  email: Scalars['String']['output'];
  first_name: Scalars['String']['output'];
  last_name: Scalars['String']['output'];
  name: Scalars['String']['output'];
  __typename?: 'CreateCoreMembersObj';
  newsletter?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  create_core_members: CreateCoreMembersObj;
  signIn_core_sessions: Scalars['String']['output'];
  __typename?: 'Mutation';
};

export type MutationCreate_Core_MembersArgs = {
  birthday: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  newsletter?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MutationSignIn_Core_SessionsArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  remember?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Query = {
  show_core_members: Scalars['String']['output'];
  __typename?: 'Query';
};

export type TestQueryVariables = Exact<{ [key: string]: never }>;

export type TestQuery = { show_core_members: string; __typename?: 'Query' };

export const TestDocument = `
    query Test {
  show_core_members
}
    `;
export const useTestQuery = <TData = TestQuery, TError = unknown>(
  variables?: TestQueryVariables,
  options?: UseQueryOptions<TestQuery, TError, TData>
) =>
  useQuery<TestQuery, TError, TData>(
    variables === undefined ? ['Test'] : ['Test', variables],
    fetcher<TestQuery, TestQueryVariables>(TestDocument, variables),
    options
  );
