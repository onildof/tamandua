import { createStore as vuexCreateStore } from 'vuex'
import user from './modules/user.js'
import event from './modules/event.js'

const storeConfiguration = {
  state: {
    todos: [
      { chore: 'Trim bushes', done: false },
      { chore: 'Do dishes', done: false },
      { chore: 'Clean pool', done: true },
      { chore: 'Walk dog', done: true },
    ],
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter((todo) => todo.done)
    },
    doneTodosCount(state, getters) {
      return getters.doneTodos.length
    },
  },
  modules: { user, event },
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
