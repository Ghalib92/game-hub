import { useEffect, useState } from "react"
import apiClient from "../services/axios"
import { FetchResponse } from "../types"
import type { AxiosRequestConfig } from "axios"

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps: unknown[] = []
) => {
  const [data, setData] = useState<T[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Generic fetch hook that handles loading, error, and abort.
  useEffect(() => {
    const controller = new AbortController()
    setIsLoading(true)

    apiClient
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        ...requestConfig,
      })
      .then((response) => {
        setData(response.data.results)
        setError(null)
      })
      .catch((err) => {
        if (err.name === "CanceledError") return
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })

    return () => controller.abort()
  }, deps)

  return { data, error, isLoading }
}

export default useData
