import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Nav__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Core_Nav__ShowQuery = { __typename?: 'Query', core_nav__show: { __typename?: 'ShowCoreNavObj', edges: Array<{ __typename?: 'ShowCoreNav', id: number, href: string, external: boolean, position: number, icon?: string, children: Array<{ __typename?: 'ShowCoreNavItem', id: number, href: string, external: boolean, position: number, icon?: string, description: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }>, description: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, name: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> }> } };


export const Admin__Core_Nav__Show = gql`
    query Admin__Core_nav__show {
  core_nav__show {
    edges {
      children {
        description {
          language_code
          value
        }
        id
        name {
          language_code
          value
        }
        href
        external
        position
        icon
      }
      description {
        language_code
        value
      }
      id
      name {
        language_code
        value
      }
      href
      external
      position
      icon
    }
  }
}
    `;