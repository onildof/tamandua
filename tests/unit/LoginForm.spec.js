import { mount } from '@vue/test-utils'
import LoginForm from '@/views/LoginForm.vue'

describe('LoginForm', () => {
  it('should emit an event with a payload', async () => {
    //setup, find, interact, assert
    const wrapper = mount(LoginForm)

    // 1. Encontrar o text input
    const input = wrapper.get('[data-testid="name-input"]')

    // 2. Escrever nele
    await input.setValue('Ungoliant')

    // 3. Submeter o formulário
    await wrapper.trigger('submit')

    // 4. Assert the event has been emitted
    const formSubmittedEmissions = wrapper.emitted('formSubmitted')
    expect(formSubmittedEmissions).toHaveLength(1)

    // 5. Assert the payload is correct
    const expectedPayload = { name: 'Ungoliant' }
    expect(formSubmittedEmissions[0][0]).toEqual(expectedPayload) //usa-se o matcher toEqual() para objetos iguais com referências diferentes
  })
})
