import { useQuery, UseQueryResult } from "@tanstack/react-query"
import apiClient from "../../../api/client"
import { FetchResponse } from "../../../shared/types"
import type { AxiosRequestConfig } from "axios"

// Generic data fetching hook that works with React Query
// T = type of data in the array (e.g., Game, Genre, Platform)
// This hook handles caching, background refetching, and error states
const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  queryKey: (string | unknown)[] = [endpoint]
): UseQueryResult<T[], Error> => {
  return useQuery<T[], Error>({
    queryKey: queryKey,
    queryFn: async () => {
      const response = await apiClient.get<FetchResponse<T>>(endpoint, requestConfig)
      return response.data.results
    },
  })
}

export default useData
