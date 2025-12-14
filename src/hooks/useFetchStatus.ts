import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '../config'

const fetchApiStatus = async () => {
  const response = await fetch(`${API_BASE_URL}/status`) 
  
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export const useApiStatus = () => {
  return useQuery({
    queryKey: ['apiStatus'],
    queryFn: fetchApiStatus,
    staleTime: 5 * 60 * 1000,
  })
}