import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Core_Main_Settings__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_Main_Settings__ShowQuery = { __typename?: 'Query', core_settings__show: { __typename?: 'ShowSettingsObj', site_name: string, site_short_name: string, contact_email: string, site_copyright: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }>, site_description: Array<{ __typename?: 'StringLanguage', language_code: string, value: string }> } };


export const Core_Main_Settings__Show = gql`
    query Core_main_settings__show {
  core_settings__show {
    site_name
    site_short_name
    contact_email
    site_copyright {
      language_code
      value
    }
    site_description {
      language_code
      value
    }
  }
}
    `;