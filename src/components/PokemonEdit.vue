<template>
  <div class="pokemon-edit">
    <h2>Edit {{ capitalizedName }}</h2>
    <form @submit.prevent="savePokemon">
      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="editedPokemon.name" required>
      </div>
      <div>
        <label for="height">Height:</label>
        <input id="height" v-model.number="editedPokemon.height" type="number" required>
      </div>
      <div>
        <label for="weight">Weight:</label>
        <input id="weight" v-model.number="editedPokemon.weight" type="number" required>
      </div>
      <button type="submit">Save</button>
      <button type="button" @click="$emit('cancel')">Cancel</button>
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'PokemonEdit',
  props: {
    pokemon: Object
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const editedPokemon = ref({ ...props.pokemon })

    const capitalizedName = computed(() => {
      return editedPokemon.value.name.charAt(0).toUpperCase() + editedPokemon.value.name.slice(1)
    })

    const savePokemon = () => {
      emit('save', editedPokemon.value)
    }

    return {
      editedPokemon,
      capitalizedName,
      savePokemon
    }
  }
}
</script>

<style src="@/assets/styles/pokemonEdit.css" scoped></style>
