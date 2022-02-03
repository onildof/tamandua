import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Patatex',
    events: [],
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
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
  },
})
