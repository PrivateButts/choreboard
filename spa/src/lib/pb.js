import PocketBase from 'pocketbase'

// Single PocketBase instance shared across the app
const pb = new PocketBase(import.meta.env.VITE_APP_API_URL)

export default pb
