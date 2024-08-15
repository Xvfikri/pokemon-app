<template>
  <div class="search-bar">
    <input 
      v-model="searchQuery" 
      type="text" 
      placeholder="Cari Pokemon..."
      @input="handleSearch"
    >
  </div>
</template>
  
<script>
import { ref, watch } from 'vue'
  
export default {
  name: 'SearchView',
  props: {
    pokemons: {
      type: Array,
      required: true
    }
  },
  emits: ['filtered'],
  setup(props, { emit }) {
    const searchQuery = ref('')
  
    const handleSearch = () => {
      if (searchQuery.value) {
        const filtered = props.pokemons.filter(pokemon => 
          pokemon.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          pokemon.types.some(type => type.type.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
        )
        emit('filtered', filtered)
      } else {
        emit('filtered', props.pokemons)
      }
    }
  
    watch(() => props.pokemons, handleSearch)
  
    return {
      searchQuery,
      handleSearch
    }
  }
}
</script>
  
<style src="@/assets/styles/searchView.css" scoped></style>