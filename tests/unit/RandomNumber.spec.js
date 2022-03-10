import { mount } from '@vue/test-utils'
import RandomNumber from '@/components/RandomNumber'

describe('RandomNumber', () => {
  //necessário testar isso, pro caso de alguém mudar o valor inicial de $data.randomNumber
  it('By default, the random number should be 0', () => {
    //setup
    const wrapper = mount(RandomNumber)

    //assert
    expect(wrapper.html()).toContain('<span>0</span>')
  })

  //outra forma de testar a mesma coisa
  it('By default, the random number should be 0 (another way to test)', () => {
    //setup
    const wrapper = mount(RandomNumber)

    //assert
    expect(parseInt(wrapper.get('span').text())).toBe(0)
  })

  //aqui estamos testando se randomNumber fica entre os valores padrão dos props min e max após um clique
  //acho insuficiente porque é apenas um clique. Se no próximo clique sair um valor fora do intervalo [1,10]?
  //quantos cliques seriam suficientes para satisfazer esse teste?
  it('If button is clicked, the random number should be between 1 and 10', async () => {
    //setup
    const wrapper = mount(RandomNumber)

    //find, interact
    await wrapper.get('button').trigger('click')

    //assert
    const randomNumber = parseInt(wrapper.get('span').text())
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(10)
  })

  //testamos a mesma coisa do teste passado, mas agora considerando que o componente foi carregado com props
  // para min e max
  it('If button is clicked, and props set to { min: 200, max: 300 }, the random number should be between 200 and 300', async () => {
    //setup
    const wrapper = mount(RandomNumber, {
      props: {
        min: 200,
        max: 300,
      },
    })

    //find, interact
    await wrapper.get('button').trigger('click')

    //assert
    const randomNumber = parseInt(wrapper.get('span').text())
    expect(randomNumber).toBeGreaterThanOrEqual(200)
    expect(randomNumber).toBeLessThanOrEqual(300)
  })
})
