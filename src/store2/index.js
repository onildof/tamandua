import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Patatex',
    events: [],
    eventsCount: 0,
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENTS_COUNT(state, eventsCount) {
      state.eventsCount = eventsCount
    },
  },
  actions: {
    createEvent(context, event) {
      EventService.postEvent(event)
        .then(() => {
          context.commit('ADD_EVENT', event)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchEvents(context, payload) {
      const { perPage, page } = payload
      return EventService.getEvents(perPage, page)
        .then((response) => {
          context.commit('SET_EVENTS', response.data)
          context.commit('SET_EVENTS_COUNT', response.headers['x-total-count'])
        })
        .catch((error) => {
          throw error
        })
    },
  },
})
