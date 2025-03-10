import {
  keepPreviousData,
  UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { EntityType } from "~/types/entity";
import { PaginatedResponseType, ParamsType } from "~/types/uri";

export function useFetchPaginatedData<
  T extends EntityType,
  P extends PaginatedResponseType<T> = PaginatedResponseType<T>
>(
  context: string,
  params?: ParamsType,
  options?: Partial<
    UndefinedInitialDataOptions<P> & {
      withAuth?: boolean;
    }
  >
) {
  const withAuth = options?.withAuth;
  const queryKey =
    typeof withAuth === "boolean"
      ? [context, params, withAuth]
      : [context, params];

  const {
    data: response,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
    error,
  } = useQuery<P>({
    queryKey,
    retry: false,
    placeholderData: keepPreviousData,
    ...options,
  });

  const data = useMemo(() => {
    return response ? response.data : [];
  }, [response]);

  const meta = useMemo(() => {
    return response?.meta;
  }, [response]);

  return {
    data,
    meta,
    error,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
  };
}
