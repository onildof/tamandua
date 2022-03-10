import { mount } from '@vue/test-utils'
import EventList from '@/views/EventList.vue'
import store from '@/store2'
import router from '@/router'

describe('EventList', () => {
  it('should render the events', () => {
    const page = 1
    const perPage = 1
    const wrapper = mount(EventList, {
      props: {
        perPage,
        page,
      },
      global: {
        plugins: [store, router],
      },
    })

    expect(wrapper.exists()).toBeTruthy()
  })
})

describe('page title', () => {
  it('is rendered with the correct text', () => {
    const page = 1
    const perPage = 1
    const wrapper = mount(EventList, {
      props: {
        perPage,
        page,
      },
      global: {
        plugins: [store, router],
      },
    })
    const title = wrapper.get('[data-testid="event-list-title"]')

    expect(title.exists()).toBeTruthy()
    expect(title.text()).toContain('Events for Good')
  })
})
