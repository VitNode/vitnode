import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Languages__CreateMutationVariables = Types.Exact<{
  code: Types.Scalars['String']['input'];
  name: Types.Scalars['String']['input'];
  timezone: Types.Scalars['String']['input'];
  locale: Types.Scalars['String']['input'];
  time24: Types.Scalars['Boolean']['input'];
  allowInInput: Types.Scalars['Boolean']['input'];
}>;


export type Admin__Core_Languages__CreateMutation = { __typename?: 'Mutation', admin__core_languages__create: { __typename?: 'ShowCoreLanguages', id: number } };


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
    id
  }
}
    `;