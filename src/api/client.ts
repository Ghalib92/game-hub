import axios from "axios"

// Create and configure axios client for RAWG API
// Environment variables are loaded from .env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_RAWG_API_URL,
  params: {
    key: import.meta.env.VITE_RAWG_API_KEY,
  },
})

export default apiClient
