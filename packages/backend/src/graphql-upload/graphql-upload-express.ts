import { IncomingMessage, ServerResponse } from 'http';

import { NextFunction, Request, Response } from 'express';

import defaultProcessRequest from './process-request';

export interface ProcessRequestOptions {
  maxFieldSize?: number;
  maxFileSize?: number;
  maxFiles?: number;
}

type ProcessRequestFunction = (
  request: IncomingMessage,
  response: ServerResponse,
  options?: ProcessRequestOptions,
) => Promise<Record<string, unknown> | Record<string, unknown>[]>;

export function graphqlUploadExpress({
  processRequest = defaultProcessRequest,
  ...processRequestOptions
}: ProcessRequestOptions & {
  processRequest?: ProcessRequestFunction;
} = {}) {
  /**
   * [Express](https://expressjs.com) middleware that processes incoming
   * [GraphQL multipart requests](https://github.com/jaydenseric/graphql-multipart-request-spec)
   * using {@linkcode processRequest}, ignoring non multipart requests. It sets
   * the request `body` to be similar to a conventional GraphQL POST request for
   * following GraphQL middleware to consume.
   */
  function graphqlUploadExpressMiddleware(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    if (!request.is('multipart/form-data')) return next();

    const requestEnd = new Promise(resolve => request.on('end', resolve));
    const { send } = response;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error Todo: Find a less hacky way to prevent sending a response
    // before the request has ended.
    response.send =
      /** @param {Array<unknown>} args */
      (...args: unknown[]) => {
        requestEnd.then(() => {
          response.send = send;
          response.send(...args);
        });
      };

    processRequest(request, response, processRequestOptions)
      .then(body => {
        request.body = body;
        next();
      })
      .catch(error => {
        if (error.status && error.expose) response.status(error.status);
        next(error);
      });
  }

  return graphqlUploadExpressMiddleware;
}
