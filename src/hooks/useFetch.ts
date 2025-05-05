import { useEffect, useRef, useState } from "react"

type AsyncFetcher<T> = () => Promise<T>

interface UseFetchOptions {
  immediate?: boolean         // Whether to run the fetcher immediately on mount or deps change
  cacheKey?: string           // Key to cache the data in localStorage
  log?: boolean               // Whether to log the request and response
  deps?: unknown[]            // Dependencies that trigger the fetch when changed
  method?: "GET" | "POST" | "PUT" | "DELETE" | string // HTTP method used (for logging purposes)
  payload?: unknown           // Payload sent with the request (for logging purposes)
}

export function useFetch<T>(
  key: string,                        // Key used for logging in localStorage
  fetcher: AsyncFetcher<T>,          // Async function to fetch data
  options: UseFetchOptions = {}      // Optional configurations
) {
  const {
    immediate = true,
    cacheKey,
    log = true,
    deps = [],
    method = "GET",
    payload = null,
  } = options

  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const isFirstRun = useRef(true)

  // Function to execute the fetcher
  const execute = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetcher()
      setData(response)

      // Optionally cache the result
      if (cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify(response))
      }

      // Optionally log the request and response
      if (log) {
        const logs: unknown[] = JSON.parse(localStorage.getItem(key) || "[]")
        logs.push({
          method,
          payload,
          response,
          status: 200,
          timestamp: new Date().toISOString(),
        })
        localStorage.setItem(key, JSON.stringify(logs))
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)

      // Optionally log the error
      if (log) {
        const logs: unknown[] = JSON.parse(localStorage.getItem(key) || "[]")
        logs.push({
          method,
          payload,
          response: null,
          status: "error",
          error: errorMessage,
          timestamp: new Date().toISOString(),
        })
        localStorage.setItem(key, JSON.stringify(logs))
      }
    } finally {
      setIsLoading(false)
    }
  }

  // Run the fetcher on mount or when deps change
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      if (immediate) {
        execute()
      }
    } else {
      execute()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return {
    data,
    error,
    isLoading,
    refetch: execute,
  }
}
