import { mount } from '@vue/test-utils'
import LoginForm from '@/components/LoginForm.vue'

describe('LoginForm', () => {
  it('should emit an event with a payload', async () => {
    //setup, find, interact, assert
    const wrapper = mount(LoginForm)

    // 1. Encontrar o text input
    // 2. Escrever nele
    // 3. Submeter o formulário
    // 4. Assert the event has been emitted
    // 5. Assert the payload is correct
    const input = wrapper.get('[data-testid="name-input"]')
    await input.setValue('Ungoliant')
    await wrapper.trigger('submit')
    expect(wrapper.emitted())
  })
})
