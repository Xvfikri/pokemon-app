<template>
  <div class="model-overlay" @click="$emit('close')">
    <div class="model-content" @click.stop>
      <div v-if="!isEditing">
        <h2>{{ capitalizedName }}</h2>
        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
        <p>Height: {{ formatHeight(pokemon.height) }} m</p>
        <p>Weight: {{ formatWeight(pokemon.weight) }} kg</p>
        <h3>Types:</h3>
        <ul>
          <li v-for="type in pokemon.types" :key="type.slot">{{ type.type.name }}</li>
        </ul>
        <h3>Abilities:</h3>
        <ul>
          <li v-for="ability in pokemon.abilities" :key="ability.slot">{{ ability.ability.name }}</li>
        </ul>
        <button class="edit-button" @click="isEditing = true">Edit</button>
      </div>
      <div v-else>
        <h2 >Edit {{ capitalizedName }}</h2>
        <form @submit.prevent="savePokemon">
          <div class="form-group">
            <label for="name">Name:</label>
            <input id="name" v-model="editedPokemon.name" required>
          </div>
          <div class="form-group">
            <label for="height">Height (m):</label>
            <input id="height" v-model.number="editedPokemon.height" type="number" step="0.1" required>
          </div>
          <div class="form-group">
            <label for="weight">Weight (kg):</label>
            <input id="weight" v-model.number="editedPokemon.weight" type="number" step="0.1" required>
          </div>
          <button type="submit">Save</button>
          <button type="button" @click="isEditing = false">Cancel</button>
        </form>
      </div>
      <button class="close-button" @click="$emit('close')">×</button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'PokemonDetail',
  props: {
    pokemon: Object
  },
  emits: ['close', 'save'],
  setup(props, { emit }) {
    const isEditing = ref(false)
    const editedPokemon = ref({ ...props.pokemon })

    const capitalizedName = computed(() => {
      return props.pokemon.name.charAt(0).toUpperCase() + props.pokemon.name.slice(1)
    })

    const formatHeight = (height) => (height / 10).toFixed(1)
    const formatWeight = (weight) => (weight / 10).toFixed(1)

    const savePokemon = () => {
      const updatedPokemon = {
        ...editedPokemon.value,
        height: Math.round(editedPokemon.value.height * 10),
        weight: Math.round(editedPokemon.value.weight * 10)
      }
      emit('save', updatedPokemon)
      isEditing.value = false
    }

    return {
      isEditing,
      editedPokemon,
      capitalizedName,
      formatHeight,
      formatWeight,
      savePokemon
    }
  }
}
</script>

<style src="@/assets/styles/pokemonDetail.css" scoped></style>