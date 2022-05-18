import { createStore as vuexCreateStore } from 'vuex'
import EventService from '@/services/EventService.js'

const storeConfiguration = {
  state: {
    user: 'Patatex',
    events: [],
    eventsCount: 0,
    event: null,
    todos: [
      { chore: 'Trim bushes', done: false },
      { chore: 'Do dishes', done: false },
      { chore: 'Clean pool', done: true },
      { chore: 'Walk dog', done: true },
    ],
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
  getters: {
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done)
    },
    doneTodosCount(state, getters) {
      return getters.doneTodos.length
    },
    events(state) {
      return state.events
    },
    eventsCount(state, getters) {
      return getters.events.length
    },
  },
}

const defaultOverrides = {
  state: () => {
    return {}
  },
}

function makeState(initialState, overrideState) {
  return {
    ...(typeof initialState === 'function' ? initialState() : initialState),
    ...overrideState(),
  }
}

export function createStore(storeOverrides = defaultOverrides) {
  return vuexCreateStore({
    ...storeConfiguration,
    ...storeOverrides,
    ...{
      state: makeState(storeConfiguration.state, storeOverrides.state),
    },
  })
}

export default createStore()
