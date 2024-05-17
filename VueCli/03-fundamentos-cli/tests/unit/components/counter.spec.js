import Counter from "@/components/Counter.vue"
import { shallowMount } from "@vue/test-utils"

describe('Counter Component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(Counter);
    });
    
    // test('debe de hacer match con el snapshot', () => { 
    //     const wrapper = shallowMount(Counter)
    //     expect( wrapper.html() ).toMatchSnapshot()
    //  })

    test('h2 debe de tener el valor por defecto', () => {
        expect(wrapper.find('h2').exists()).toBeTruthy()

        const h2 = wrapper.find('h2').text();

        expect(h2).toBe('Counter');
    })

    test('El valor por defecto debe ser 100 en el p', async () => {

        const pTags = wrapper.find('[data-testid="counter"]').text();

        expect(pTags).toBe('100');
    });

    test('It should incrment and decrement value by one', async () => {
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button');

        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');
        await increaseBtn.trigger('click');

        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        let value = wrapper.find('[data-testid="counter"]').text()

        expect(value).toBe('101');
    });

    test('Debe de establecer el valor por defecto', () => {
        const { start } = wrapper.props()
        const value = wrapper.find('[data-testid="counter"]').text()
        expect(Number(value)).toBe(start)
    });

    test('Debe de mostrar la prop title', () => {
        const wrapper = shallowMount(Counter, {
            props: {
                title: 'Hola mundo'
            }
        });

        expect( wrapper.find('h2').text()).toBe('Hola mundo')
    })
})