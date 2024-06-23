import { GraphQLError } from "graphql";

export class AccessDeniedError extends GraphQLError {
  constructor() {
    super("Access denied!", {
      extensions: { code: "ACCESS_DENIED" },
    });

    Object.defineProperty(this, "name", { value: "AccessDeniedError" });
  }
}
