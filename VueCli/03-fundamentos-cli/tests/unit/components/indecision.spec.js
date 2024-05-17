import Indecision from "@/components/Indecision.vue";
import { shallowMount } from "@vue/test-utils";


describe('Indecision Component', () => {
    let wrapper;
    let clgSpy;

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/14-b57c6dc03aa15a4b18f53eb50d6197ee.gif'
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount(Indecision);
        clgSpy = jest.spyOn(console, 'log');
        jest.clearAllMocks()
    });

    test('Debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    test('Escribir en el input no debe disparar nada (console.log)', async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');

        const input = wrapper.find('input');
        await input.setValue('Hola mundo');

        expect(clgSpy).toHaveBeenCalledTimes(1)
        expect(getAnswerSpy).toHaveBeenCalledTimes(0)
    });

    test('Debe de disparar getAnswer al escribir "?"', async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm, 'getAnswer');
        const input = wrapper.find('input');
        await input.setValue('Hola mundo?');

        expect(getAnswerSpy).toHaveBeenCalled()
    });

    test('Pruebas en getAnswer', async () => {
        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');
        expect(img.exists()).toBeTruthy();
        expect(wrapper.vm.bgImageUrl).toBe('https://yesno.wtf/assets/yes/14-b57c6dc03aa15a4b18f53eb50d6197ee.gif');
        expect(wrapper.vm.answer).toBe('Sí!!')

    });

    test('Pruebas en getAnswer -- Fallo en API', async () => {
        fetch.mockImplementationOnce(() => Promise.reject('API not working'));
        await wrapper.vm.getAnswer();

        const img = wrapper.find('img');

        expect(img.exists()).toBeFalsy();
        expect(wrapper.vm.answer).toBe('No se pudo cargar del API')
    })
})