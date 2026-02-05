import axios, { type AxiosError } from 'axios'

export type Foodspot = { id: number; name: string }

// Create Axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    let errorMessage = 'An unexpected error occurred'

    if (error.response) {
      // Server responded with error status
      switch (error.response.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your input.'
          break
        case 404:
          errorMessage = 'Resource not found.'
          break
        case 500:
          errorMessage = 'Server error. Please try again later.'
          break
        default:
          errorMessage = `Error: ${error.response.status} - ${error.response.statusText}`
      }
    } else if (error.request) {
      // Request made but no response received
      errorMessage = 'Network error. Please check your connection.'
    } else {
      // Error in request configuration
      errorMessage = error.message
    }

    return Promise.reject(new Error(errorMessage))
  }
)

export async function fetchFoodspots(): Promise<Foodspot[]> {
  const { data } = await api.get<Foodspot[]>('/foodspots')
  return data
}

export async function createFoodspot(name: string): Promise<Foodspot> {
  const { data } = await api.post<Foodspot>('/foodspots', { name })
  return data
}

export async function deleteFoodspot(id: number): Promise<void> {
  await api.delete(`/foodspots/${id}`)
}
