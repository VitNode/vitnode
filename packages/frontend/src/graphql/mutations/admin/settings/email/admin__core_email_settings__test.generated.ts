import * as Types from '../../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Email_Settings__TestMutationVariables = Types.Exact<{
  to: Types.Scalars['String']['input'];
  from: Types.Scalars['String']['input'];
  message: Types.Scalars['String']['input'];
  subject: Types.Scalars['String']['input'];
  previewText?: Types.InputMaybe<Types.Scalars['String']['input']>;
}>;


export type Admin__Core_Email_Settings__TestMutation = { __typename?: 'Mutation', admin__core_email_settings__test: string };


export const Admin__Core_Email_Settings__Test = gql`
    mutation Admin__core_email_settings__test($to: String!, $from: String!, $message: String!, $subject: String!, $previewText: String) {
  admin__core_email_settings__test(
    to: $to
    from: $from
    message: $message
    subject: $subject
    preview_text: $previewText
  )
}
    `;