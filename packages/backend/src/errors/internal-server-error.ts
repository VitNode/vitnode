import { GraphQLError } from 'graphql';

export class InternalServerError extends GraphQLError {
  constructor() {
    super('Something is wrong. Please check the source code!', {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });

    Object.defineProperty(this, 'name', { value: 'InternalServerError' });
  }
}
