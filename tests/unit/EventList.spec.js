import { mount, flushPromises } from '@vue/test-utils'
import EventList from '@/views/EventList.vue'
import { createStore } from '@/store2'
import router from '@/router'
import { events as mockEvents } from '../../db.json'

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

const page = 1
const perPage = 1
let wrapper

describe('EventList', () => {
  beforeEach(async () => {
    wrapper = mountEventList({
      mountOptions: {
        props: {
          perPage,
          page,
        },
      },
    })

    // Final do setup: esperar pelo DOM ser atualizado, o que significa que todos
    // os lifecycle hooks do componente foram fulfilled
    await flushPromises()
  })

  it('should render the events', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  describe('page title', () => {
    it('is rendered with the correct text', () => {
      //Find
      const title = wrapper.get('[data-testid="event-list-title"]')

      //Make Assertions
      expect(title.exists()).toBeTruthy()
      expect(title.text()).toContain('Events for Good')
    })
  })

  describe('events', () => {
    it('are rendered in a list with necessary information', async () => {
      //Setup
      wrapper = mountEventList({
        mountOptions: {
          props: {
            perPage,
            page,
          },
        },
        plugins: {
          store: {
            state: () => ({
              events: mockEvents,
            }),
          },
        },
      })

      // Final do setup: esperar pelo DOM ser atualizado, o que significa que todos
      // os lifecycle hooks do componente foram fulfilled
      await flushPromises()

      //Find
      const events = wrapper.findAll('[data-testid="event"]')

      //Make Assertions
      expect(events).toHaveLength(mockEvents.length)

      events.forEach((element, index) => {
        const event = element
        const eventText = event.text()

        expect(eventText).toContain(mockEvents[index].time)
        expect(eventText).toContain(mockEvents[index].date)
        expect(eventText).toContain(mockEvents[index].title)
      })
    })
  })
})
