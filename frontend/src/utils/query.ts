"use client";

import { isServer, QueryClient } from "@tanstack/react-query";
import { ParamsType } from "~/types/uri";
import { request } from "./request";
import { generateApiUrl } from "./uri";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        queryFn: async ({ queryKey }) => {
          const [context, params] = queryKey as [
            string,
            ParamsType | undefined
          ];

          return await request(generateApiUrl(context, params));
        },
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
