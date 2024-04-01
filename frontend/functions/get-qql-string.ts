import type { DocumentNode } from "graphql";

export const getGqlString = (doc: DocumentNode): string => {
  return (doc.loc && doc.loc.source.body) ?? "";
};
