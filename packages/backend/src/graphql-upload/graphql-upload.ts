// Part of GraphQL Upload implementation - 17.0.0

import { GraphQLError, GraphQLScalarType } from 'graphql';

import Upload from './upload';

export const GraphQLUpload = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue(value) {
    if (value instanceof Upload) return value.promise;
    throw new GraphQLError(
      'Upload value invalid. Make sure it is "files" array object provided in "fetcher".',
    );
  },
  parseLiteral(node) {
    throw new GraphQLError('Upload literal unsupported.', { nodes: node });
  },
  serialize() {
    throw new GraphQLError('Upload serialization unsupported.');
  },
});
