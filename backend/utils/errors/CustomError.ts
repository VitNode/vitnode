import { GraphQLError } from 'graphql';

export interface CustomErrorArgs {
  code: string;
  message: string;
}

export class CustomError extends GraphQLError {
  constructor({ code, message }: CustomErrorArgs) {
    super(message, {
      extensions: { code }
    });

    Object.defineProperty(this, 'name', { value: 'CustomError' });
  }
}
