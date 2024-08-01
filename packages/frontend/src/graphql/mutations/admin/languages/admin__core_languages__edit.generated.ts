import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Languages__EditMutationVariables = Types.Exact<{
  default: Types.Scalars['Boolean']['input'];
  enabled: Types.Scalars['Boolean']['input'];
  id: Types.Scalars['Int']['input'];
  name: Types.Scalars['String']['input'];
  timezone: Types.Scalars['String']['input'];
  locale: Types.Scalars['String']['input'];
  time24: Types.Scalars['Boolean']['input'];
  allowInInput: Types.Scalars['Boolean']['input'];
}>;


export type Admin__Core_Languages__EditMutation = { __typename?: 'Mutation', admin__core_languages__edit: { __typename?: 'ShowCoreLanguages', id: number } };


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
    id
  }
}
    `;