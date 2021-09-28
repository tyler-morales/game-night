import { useState } from 'react'

const useLoading = () => {
  const [loading, updateLoading] = useState(true)

  const dataLoaded = () => updateLoading(false)

  return { dataLoaded, loading }
}

export default useLoading
