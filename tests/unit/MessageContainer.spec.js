import MessageContainer from '@/components/MessageContainer'
import { mount } from '@vue/test-utils'

describe('MessageContainer', () => {
  xit('wraps the MessageDisplay component WHICH CALLS THE API', async () => {
    const expectedMessage = 'Hello from the db HARR!'
    const wrapper = mount(MessageContainer)

    // gambiarra para que os lifecycle hooks do componente se resolvam todos antes de fazermos a primeira asserção
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    const message = wrapper.get('[data-testid="message"]').text()
    expect(message).toEqual(expectedMessage)
  })

  it('wraps the MessageDisplay component USING A STUB', async () => {
    const expectedMessage = 'Hello from the db HARR!'
    const wrapper = mount(MessageContainer, {
      global: {
        stubs: {
          MessageDisplay: {
            template: `<p data-testid="message">${expectedMessage}</p>`,
          },
        },
      },
    })

    const message = wrapper.get('[data-testid="message"]').text()
    expect(message).toEqual(expectedMessage)
  })
})
