<template lang="">
    <h2>{{customTitle}}</h2>
    <p>Counter value: {{ counter }} <sup>2</sup> = {{ square }} </p>

    <div>
        <button @click="increment">+1</button>
        <button @click="decrement">-1</button>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        start: {
            type: Number,
            default: 34,
            validator(value) {
                return value > 30
            }
        },
    },
    name: 'Counter',
    data() {
        return {
            counter: this.start
        }
    },
    computed: {
        square() {
            console.log('computed square');
            return this.counter * this.counter
        },
        customTitle() {
            return this.title ?? 'Counter'
        }
    },
    methods: {
        increment() {
            this.counter++
        },
        decrement() {
            this.counter--
        }
    }
}
</script>

<style >
    button {
        background-color: #64BB87;
        border-radius: 5px;
        border: 1px solid white;
        color: white;
        cursor: pointer;
        margin: 0 10px;
        padding: 5px 5px;
        transition: 0.3s ease-in-out;
    }

    button:hover {
        background-color: #5aa67b;
        transition: 0.3s ease-in-out;
    }
</style>