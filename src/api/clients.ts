import axios from 'axios'
const apiRootUrl = 'https://api.vandvietnam.com'

const apiClient = axios.create({
  baseURL: apiRootUrl,
})
export default apiClient
