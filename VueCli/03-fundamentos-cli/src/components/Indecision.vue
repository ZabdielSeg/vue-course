<template lang="">
    <img v-if="bgImageUrl" :src='bgImageUrl' alt='Bg' />
    <div class="bg-dark"></div>

    <div class="indecision-container">
        <input type="text" placeholder='Realiza una pregunta' v-model="question" >
        <p>Recuerda terminar con un signo de interrogación (?)</p>

        <div v-if="isValidQuestion" >
            <h2>{{ question }}</h2>
            <h1>{{ answer }}</h1>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            question: null,
            answer: null,
            bgImageUrl: null,
            isValidQuestion: false
        }
    },
    methods: {
        async getAnswer() {
            try {
                this.answer = 'Pensando...'
                const { answer, image } = await fetch('https://yesno.wtf/api').then(res => res.json());
                this.answer = answer == 'yes' ? 'Sí!!' : 'No!!' ;
                this.bgImageUrl = image
            } catch (error) {
                this.answer = 'No se pudo cargar del API';
                this.bgImageUrl = null;
            }
        }
    },
    watch: {
        question(val, oldVal) {
            this.isValidQuestion = false
            console.log({ val })
            if (!val.includes('?')) return;
            this.isValidQuestion = true
            this.getAnswer()
        }
    }
}
</script>
<style scoped>

    img, .bg-dark {
        height: 100vh;
        left: 0px;
        max-height: 100%;
        max-width: 100%;
        position: fixed;
        top: 0px;
        width: 100vw;
    }

    .bg-dark {
        background-color: rgba(0, 0, 0, 0.4);
    }

    .indecision-container {
        position: relative;
        z-index: 99;
    }
    
    input {
        width: 250px;
        padding: 10px 15px;
        border-radius: 5px;
        border: none;
    }
    input:focus {
        outline: none;
    }

    p {
        color: white;
        font-size: 20px;
        margin-top: 0px;
    }

    h1, h2 {
        color: white;
    }
    
    h2 {
        margin-top: 150px;
    }

</style>