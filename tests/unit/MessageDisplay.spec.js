import { mount } from '@vue/test-utils'
import MessageDisplay from '@/components/MessageDisplay.vue'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'

jest.mock('@/services/axios')
beforeEach(() => {
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {
  // it('makes actual successful call to getMessage(). Displays returned message', async () => {
  //   // API call bem-sucedida
  //   const expectedMessage = 'Hello from the db YOHOHO!'

  //   // jest.spyOn(object, methodName) cria uma função mock que repassa as chamadas à função verdadeira em object[methodName].
  //   // É basicamente um ataque de homem-do-meio
  //   // Devemos espiar a definição do componente, não a instância
  //   const spy = jest.spyOn(MessageDisplay, 'created')

  //   // componente é montado
  //   const wrapper = mount(MessageDisplay)

  //   // esse trecho de código é um macete para garantir que os ciclos de vida do componente montado se completem antes de nossa primeira asserção
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve()
  //     }, 1000)
  //   })

  //   // checar que a chamada foi feita uma vez
  //   expect(spy).toHaveBeenCalledTimes(1)

  //   // checar que o componente exibe a mensagem
  //   const message = wrapper.get('[data-testid="message"]').text()
  //   expect(message).toEqual(expectedMessage)
  // })

  it('This mocks API method getMessage, then MessageDisplay makes successful call to getMessage(). Displays returned message', async () => {
    //mock da API call bem-sucedida
    const expectedMessage = 'Hello from the db HA!'
    getMessage.mockResolvedValueOnce({ text: expectedMessage })

    const wrapper = mount(MessageDisplay)

    await flushPromises() //usamos essa biblioteca externa pq vue-test-utils não tem como fazer um await nos lifecycle hooks do componente envelopado

    //checar que a chamada foi feita uma vez
    expect(getMessage).toHaveBeenCalledTimes(1)

    //checar que o componente exibe a mensagem
    const message = wrapper.get('[data-testid="message"').text()
    expect(message).toEqual(expectedMessage)
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
