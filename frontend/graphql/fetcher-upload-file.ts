import axios from "axios";
import type { DocumentNode } from "graphql";

import { CONFIG } from "@/config";
import { getGqlString } from "@/functions/get-qql-string";

interface Args<TVariables> {
  query: DocumentNode;
  variables?: TVariables;
}

export async function fetcherUploadFile<TData, TVariables>({
  query,
  variables
}: Args<TVariables>): Promise<TData> {
  const internalQuery = getGqlString(query);

  return await axios.post(`${CONFIG.graphql_url}/graphql`, {
    query: internalQuery,
    variables
  });
}
