import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Terms__ShowQueryVariables = Types.Exact<{
  code?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Core_Terms__ShowQuery = { __typename?: 'Query', core_terms__show: { __typename?: 'ShowCoreTermsObj', edges: Array<{ __typename?: 'ShowCoreTerms', code: string, created: Date, href?: string, id: number, updated: Date, content: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }>, title: Array<{ __typename?: 'TextLanguage', language_code: string, value: string }> }> } };


export const Core_Terms__Show = gql`
    query Core_terms__show($code: String) {
  core_terms__show(code: $code) {
    edges {
      content {
        language_code
        value
      }
      code
      created
      href
      id
      title {
        language_code
        value
      }
      updated
    }
  }
}
    `;