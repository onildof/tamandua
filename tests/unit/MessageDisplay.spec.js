import { mount } from '@vue/test-utils'
import MessageDisplay from '@/components/MessageDisplay.vue'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'

jest.mock('@/services/axios')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {
  it('makes successful call to getMessage() returns a message. Displays message', async () => {
    //mock da API call bem-sucedida
    const mockMessage = 'Hello from the mocked db!'
    getMessage.mockResolvedValueOnce({ text: mockMessage })

    const wrapper = mount(MessageDisplay)

    await flushPromises() //usamos essa biblioteca externa pq vue-test-utils não tem como fazer um await nos lifecycle hooks do componente envelopado

    //checar que a chamada foi feita uma vez
    expect(getMessage).toHaveBeenCalledTimes(1)

    //checar que o componente exibe a mensagem
    const message = wrapper.get('[data-testid="message"').text()
    expect(message).toEqual(mockMessage)
  })

  it('makes failed call to getMessage() returns an error. Displays error', async () => {
    //mock da API call mal-sucedida
    const mockError = 'Oops! Something went wrong.'
    getMessage.mockRejectedValueOnce(mockError)

    const wrapper = mount(MessageDisplay)

    await flushPromises() //usamos essa biblioteca externa pq vue-test-utils não tem como fazer um await nos lifecycle hooks do componente envelopado

    //checar que a chamada foi feita uma vez
    expect(getMessage).toHaveBeenCalledTimes(1)

    //checar que o componente exibe o erro
    const error = wrapper.get('[data-testid="message-error"]').text()
    expect(error).toEqual(mockError)
  })
})
