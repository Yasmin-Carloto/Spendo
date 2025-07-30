import { useEffect, useState } from "react"

export function useFetch(url, options) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(url, { signal: controller.signal, ...options })

        if (!res.ok) {
          throw new Error(`Erro: ${res.status} - ${res.statusText}`)
        }

        const json = await res.json()
        setData(json)
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url, options])

  return { data, loading, error }
}
