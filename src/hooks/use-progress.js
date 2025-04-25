import {
  useCallback,
  useMemo,
  useState,
} from 'react'

// utility hook to track loading progress
export function useProgress() {
  const [fetched, setFetched] = useState(0)
  const [total, setTotal] = useState(0)

  const onProgress = useCallback((rowsFetched, totalRows) => {
    setFetched(rowsFetched)
    setTotal(totalRows)
  }, [])

  const percent = useMemo(() => total ? Math.round((fetched / total) * 100) : 0, [fetched, total])

  return {
    fetched,
    total,
    percent,
    onProgress,
  }
}

