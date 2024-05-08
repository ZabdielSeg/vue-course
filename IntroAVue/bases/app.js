const app = Vue.createApp({
    // template: `
    // <h1> Hola mundo </h1>
    // <p> {{ 1 + 1 }} </p>
    // `

    data() {
        return {
            author: 'Bruce Wayne',
            quote: "I'm batman"
        }
    },

    methods: {
        changeQuote(e){
            this.author = 'Zabdiel Segura';
            this.capitalize()
        },
        capitalize(){
            this.quote = this.quote.toUpperCase();
        }
    },
});

app.mount('#myApp')