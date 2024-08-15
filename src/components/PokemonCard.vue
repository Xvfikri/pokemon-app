<template>
    <div class="pokemon-card" @click="$emit('click')">
      <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
      <h3>{{ capitalizedName }}</h3>
      <div class="pokemon-types">
        <span 
          v-for="type in pokemon.types" 
          :key="type.slot" 
          class="type-badge"
          :class="type.type.name"
        >
          {{ type.type.name }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  
  export default {
    name: 'PokemonCard',
    props: {
      pokemon: Object
    },
    setup(props) {
      const capitalizedName = computed(() => {
        return props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
      })
  
      return { capitalizedName }
    }
  }
  </script>
  
<style src="@/assets/styles/pokemonCard.css" scoped></style>