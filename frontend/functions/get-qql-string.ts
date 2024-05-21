import type { DocumentNode } from "graphql";

export const getGqlString = (doc: DocumentNode) => {
  return doc.loc?.source.body ?? "";
};
