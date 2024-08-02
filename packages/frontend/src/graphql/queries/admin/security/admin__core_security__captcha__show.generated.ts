import * as Types from '../../../types';

import gql from 'graphql-tag';
export type Admin__Core_Security__Captcha__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Core_Security__Captcha__ShowQuery = { __typename?: 'Query', admin__core_security__captcha__show: { __typename?: 'ShowAdminCaptchaSecurityObj', secret_key: string, site_key: string, type: Types.CaptchaTypeEnum } };


export const Admin__Core_Security__Captcha__Show = gql`
    query Admin__core_security__captcha__show {
  admin__core_security__captcha__show {
    secret_key
    site_key
    type
  }
}
    `;