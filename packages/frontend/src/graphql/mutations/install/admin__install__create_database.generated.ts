import * as Types from '../../types';

import gql from 'graphql-tag';
export type Admin__Install__Create_DatabaseMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type Admin__Install__Create_DatabaseMutation = { __typename?: 'Mutation', admin__install__create_database: string };


export const Admin__Install__Create_Database = gql`
    mutation Admin__install__create_database {
  admin__install__create_database
}
    `;