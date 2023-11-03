import { GraphQLError } from 'graphql';

export class NotFountError extends GraphQLError {
  constructor(module: string) {
    super(`${module} not found!`, {
      extensions: { code: 'NOT_FOUND' }
    });

    Object.defineProperty(this, 'name', { value: 'NotFountError' });
  }
}
