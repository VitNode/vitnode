import "server-only";

import { DocumentNode } from "graphql";
import { cookies, headers as nextHeaders } from "next/headers";

import { CONFIG } from "@/config";
import { setCookieFromApi } from "./cookie-from-string-to-object";

const getGqlString = (doc: DocumentNode) => {
  return doc.loc?.source.body ?? "";
};

interface Args<TVariables> {
  query: DocumentNode;
  cache?: RequestCache;
  headers?: HeadersInit;
  next?: NextFetchRequestConfig;
  signal?: AbortSignal;
  uploads?: {
    files: File | File[];
    variable: string;
  }[];
  variables?: TVariables;
}

export async function fetcher<TData, TVariables>({
  cache,
  headers,
  next,
  query,
  signal,
  uploads,
  variables,
}: Args<TVariables>): Promise<{
  data: TData;
  res: Response;
}> {
  const formData = new FormData();

  if (uploads) {
    const preVariables = {} as Record<string, unknown>;

    uploads.forEach(({ files, variable }) => {
      if (Array.isArray(files)) {
        preVariables[variable] = files.map(() => null);
      } else {
        preVariables[variable] = null;
      }
    });

    formData.append(
      "operations",
      JSON.stringify({
        query: getGqlString(query),
        variables: {
          ...variables,
          ...preVariables,
        },
      }),
    );

    const preMap = new Map<string, string[]>();

    // Map
    let mapIndex = 0;
    uploads.forEach(({ files, variable }) => {
      if (Array.isArray(files)) {
        files.forEach((_file, index) => {
          preMap.set(`${mapIndex}`, [`variables.${variable}.${index}`]);

          mapIndex += 1;
        });
      } else {
        if (files) {
          preMap.set(`${mapIndex}`, [`variables.${variable}`]);

          mapIndex += 1;
        }
      }
    });
    formData.append("map", JSON.stringify(Object.fromEntries(preMap)));

    let currentIndex = 0;
    uploads.forEach(({ files }) => {
      if (Array.isArray(files)) {
        files.forEach(file => {
          formData.append(`${currentIndex}`, file);

          currentIndex += 1;
        });
      } else {
        if (files) {
          formData.append(`${currentIndex}`, files);

          currentIndex += 1;
        }
      }
    });
  }

  const nextInternalHeaders = nextHeaders();

  const internalHeaders = {
    Cookie: cookies().toString(),
    ["user-agent"]: nextInternalHeaders.get("user-agent") ?? "node",
    ["x-forwarded-for"]:
      nextInternalHeaders.get("x-forwarded-for") ?? "0.0.0.0",
    ["x-real-ip"]: nextInternalHeaders.get("x-real-ip") ?? "0.0.0.0",
    "x-vitnode-user-language": cookies().get("NEXT_LOCALE")?.value ?? "en",
    ...headers,
  };

  const internalQuery = getGqlString(query);

  const res = await fetch(`${CONFIG.graphql_url}/graphql`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    signal,
    headers: uploads
      ? {
          "x-apollo-operation-name": "*",
          ...internalHeaders,
        }
      : {
          "Content-Type": "application/json",
          ...internalHeaders,
        },
    body: uploads
      ? formData
      : JSON.stringify({ query: internalQuery, variables }),
    next,
    cache,
  });

  if (internalQuery.trim().startsWith("mutation")) {
    setCookieFromApi({ res });
  }

  const json = await res.json();

  if (json.errors) {
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
    return Promise.reject(json.errors.at(0));
  }

  return {
    data: json.data,
    res,
  };
}

export interface ErrorType {
  message: string;
  extensions?: {
    code: string;
  };
}
