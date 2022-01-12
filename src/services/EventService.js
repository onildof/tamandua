import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://my-json-server.typicode.com/onildof/mock-json-server',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents() {
    return instance.get('/events')
  },
  getEvent(id) {
    return instance.get(`/events/${id}`)
  },
}
