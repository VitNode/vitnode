export type ApiBridge = (request: Request) => Promise<Response> | Response

interface FetchableApp {
  fetch: (request: Request) => Promise<Response> | Response
}

export const createApiBridge =
  (app: FetchableApp | Promise<FetchableApp>): ApiBridge =>
  async (request) =>
    (await app).fetch(request)
