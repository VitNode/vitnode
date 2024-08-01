import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Security__Captcha__EditMutationVariables = Types.Exact<{
  secretKey: Types.Scalars['String']['input'];
  siteKey: Types.Scalars['String']['input'];
  type: Types.CaptchaTypeEnum;
}>;


export type Admin__Core_Security__Captcha__EditMutation = { __typename?: 'Mutation', admin__core_security__captcha__edit: { __typename?: 'ShowAdminCaptchaSecurityObj', type: Types.CaptchaTypeEnum } };


export const Admin__Core_Security__Captcha__Edit = gql`
    mutation Admin__core_security__captcha__edit($secretKey: String!, $siteKey: String!, $type: CaptchaTypeEnum!) {
  admin__core_security__captcha__edit(
    secret_key: $secretKey
    site_key: $siteKey
    type: $type
  ) {
    type
  }
}
    `;