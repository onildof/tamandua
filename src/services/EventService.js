import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/onildof/mock-json-server',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 0, //modifique para simular um timeout na requisição à API
})

export default {
  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },
}
