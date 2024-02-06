import type { DocumentNode } from "graphql";

export const getGqlString = (doc: DocumentNode) => {
  return (doc.loc && doc.loc.source.body) ?? "";
};
