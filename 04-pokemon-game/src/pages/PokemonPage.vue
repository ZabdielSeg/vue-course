<template>
    <h1 v-if="!pokemon" >Espere por favor...</h1>
    <div v-else>
        <h1>
            ¿Quién es este Pokemón?
        </h1>
    
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon" />
        <PokemonOptions 
        :pokemons="pokemonArr" 
        @selection="checkAnswer"
        />

        <template v-if="showAnswer">
            <h2 class="fade-in" >{{ message }}</h2>
            <button @click="newGame" >Nuevo juego</button>
        </template>
    </div>
</template>
<script>
import PokemonPicture from '@/components/PokemonPicture.vue';
import PokemonOptions from '@/components/PokemonOptions.vue';
import getPokemonOptions from '@/helpers/getPokemonOptions';

export default {
    name: 'PokemonPage',
    components: {
        PokemonPicture,
        PokemonOptions
    },
    data(){
        return {
            pokemonArr: [],
            pokemon: null,
            showPokemon: false,
            showAnswer: false,
            message: ''
        }
    },
    methods: {
        async mixedPokemonsArr() {
            this.pokemonArr = await getPokemonOptions()
            const rndInt = Math.floor(Math.random() * 4)
            this.pokemon = this.pokemonArr[rndInt];
        },
        checkAnswer(selectedId){
            this.showPokemon = true;
            this.showAnswer = true;

            if(selectedId === this.pokemon.id) {
                this.message = `Correcto! ${this.pokemon.name}`
            } else {
                this.message = `Oooops, era ${this.pokemon.name}`
            }
        },
        newGame(){
            this.showPokemon = false;
            this.mixedPokemonsArr();
            this.showAnswer = false;
            this.message = ''
        }
    },
    mounted() {
        this.mixedPokemonsArr()
    }
}
</script>
<style>
    
</style>