import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Patatex',
    events: [],
    eventsCount: 0,
    event: null,
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
    SET_EVENT(state, event) {
      state.event = event
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
    fetchEvent(context, id) {
      const alreadyFetchedEvent = context.state.events.find(
        (event) => event.id == id
      )
      if (alreadyFetchedEvent) {
        context.commit('SET_EVENT', alreadyFetchedEvent)
      } else {
        return EventService.getEvent(id)
          .then((response) => {
            context.commit('SET_EVENT', response.data)
          })
          .catch((error) => {
            throw error
          })
      }
    },
  },
})
