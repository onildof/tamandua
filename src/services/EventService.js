import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 0, //modifique para simular um timeout na requisição à API
})

export default {
  getEvents(perPage, page) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        apiClient
          .get(`/events?_limit=${perPage}&_page=${page}`)
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      }, 0) //modifique para simular um delay na resposta da API
    })
  },
  getEvent(id) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        apiClient
          .get(`/events/${id}`)
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      }, 0) //modifique para simular um delay na resposta da API
    })
  },
  postEvent(event) {
    return apiClient.post('/events', event)
  },
}
