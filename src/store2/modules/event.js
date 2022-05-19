import EventService from '@/services/EventService.js'

export default {
  namespaced: true,
  state: {
    events: [],
    eventsCount: 0,
    currentEvent: null, // RENOMEADO
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
      state.currentEvent = event // RENOMEADO
    },
  },
  actions: {
    createEvent(context, event) {
      return EventService.postEvent(event)
        .then(() => {
          context.commit('ADD_EVENT', event)
        })
        .catch((error) => {
          throw error
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
}
