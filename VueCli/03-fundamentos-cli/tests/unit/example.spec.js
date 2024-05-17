// import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       props: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('Example Component', () => {
  test('Debe ser mayor a 10', () => {
    // Arreglar
    let value = 6;

    // Estímulo
    value += 5

    // Observar el resultado
    expect( value ).toBeGreaterThan(10);
  })
});