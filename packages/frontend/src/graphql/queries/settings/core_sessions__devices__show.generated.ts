import * as Types from '../../types';

import gql from 'graphql-tag';
export type Core_Sessions__Devices__ShowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type Core_Sessions__Devices__ShowQuery = { __typename?: 'Query', core_sessions__devices__show: Array<{ __typename?: 'ShowCoreSessionDevicesObj', expires: Date, id: number, last_seen: Date, uagent_browser: string, uagent_os: string, uagent_version: string, login_token: string, ip_address: string, created: Date }> };


export const Core_Sessions__Devices__Show = gql`
    query Core_sessions__devices__show {
  core_sessions__devices__show {
    expires
    id
    last_seen
    uagent_browser
    uagent_os
    uagent_version
    login_token
    ip_address
    created
  }
}
    `;