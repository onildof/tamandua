import { mount } from '@vue/test-utils'
import EventList from '@/views/EventList.vue'
import { createStore } from '@/store2'
import router from '@/router'

/*
  Vai receber um objeto assim:
  {
    plugins,
    props,
    mountOptions,
  }

  Esse objeto será manipulado para formar um objeto que 
  seguirá a mesma interface de mountOptions (MountingOptions):
  {
    global, (dentro de global teremos plugins)
    props,
    data,
    attachTo,
    attrs,
    slots,
    shallow,
  }
*/
function mountEventList(config = {}) {
  config.mountOptions = config.mountOptions || {}
  config.plugins = config.plugins || {}

  return mount(EventList, {
    global: {
      plugins: [createStore(config.plugins.store), router],
    },
    ...config.mountOptions,
  })
}

xdescribe('EventList', () => {
  it('should render the events', () => {
    const page = 1
    const perPage = 1
    const wrapper = mountEventList({
      mountOptions: {
        props: {
          perPage,
          page,
        },
      },
    })

    expect(wrapper.exists()).toBeTruthy()
  })
})

xdescribe('page title', () => {
  it('is rendered with the correct text', () => {
    //Setup
    const page = 1
    const perPage = 1
    const wrapper = mountEventList({
      mountOptions: {
        props: {
          perPage,
          page,
        },
      },
    })

    //Find
    const title = wrapper.get('[data-testid="event-list-title"]')

    //Make Assertions
    expect(title.exists()).toBeTruthy()
    expect(title.text()).toContain('Events for Good')
  })
})

describe('events', () => {
  it('are rendered in a list', () => {
    //Setup
    const mockEvents = [{ description: 'An event', title: 'A title', id: 0 }]
    const wrapper = mountEventList({
      plugins: {
        store: {
          state: () => ({
            events: mockEvents,
          }),
        },
      },
    })

    //Find
    const events = wrapper.findAll('[data-testid="event"]')

    //Make Assertions
    expect(events).toHaveLength(mockEvents.length)
  })
})
