<template>
  <div class="pokemons-view">
    <SearchView :pokemons="pokemons" @filtered="updateFilteredPokemons" />
    <div class="pokemon-grid">
      <PokemonCard 
        v-for="pokemon in displayedPokemons" 
        :key="pokemon.id" 
        :pokemon="pokemon"
        @click="selectPokemon(pokemon)"
      />
    </div>
    <button v-if="hasMorePokemons" @click="loadMorePokemons" class="load-more-button">
      Load More
    </button>
    <div v-if="showModel" class="modal-container">
      <div class="blur-overlay"></div>
      <PokemonDetail 
        :pokemon="selectedPokemon"
        @close="closeModel"
        @save="savePokemon"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import PokemonCard from './PokemonCard.vue'
import PokemonDetail from './PokemonDetail.vue'
import SearchView from './SearchView.vue'
import { getPokemonListUrl, getPokemonDetailUrl } from '@/modules/pokemons'

export default {
  name: 'PokemonsView',
  components: { PokemonCard, PokemonDetail, SearchView },
  setup() {
    const pokemons = ref([])
    const filteredPokemons = ref([])
    const displayedPokemons = ref([])
    const selectedPokemon = ref(null)
    const showModel = ref(false)
    const currentPage = ref(1)
    const pokemonsPerPage = 20

    const hasMorePokemons = computed(() => {
      return displayedPokemons.value.length < filteredPokemons.value.length
    })

    onMounted(async () => {
      const response = await fetch(getPokemonListUrl())
      const data = await response.json()
      pokemons.value = await Promise.all(data.results.map(async (pokemon) => {
        const detailResponse = await fetch(getPokemonDetailUrl(pokemon.url))
        return await detailResponse.json()
      }))
      filteredPokemons.value = [...pokemons.value]
      loadMorePokemons()
    })

    const updateFilteredPokemons = (filtered) => {
      filteredPokemons.value = filtered
      currentPage.value = 1
      displayedPokemons.value = filteredPokemons.value.slice(0, pokemonsPerPage)
    }

    const loadMorePokemons = () => {
      const start = (currentPage.value - 1) * pokemonsPerPage
      const end = start + pokemonsPerPage
      displayedPokemons.value = [
        ...displayedPokemons.value,
        ...filteredPokemons.value.slice(start, end)
      ]
      currentPage.value++
    }

    const selectPokemon = (pokemon) => {
      selectedPokemon.value = {...pokemon}
      showModel.value = true
    }

    const closeModel = () => {
      showModel.value = false
      selectedPokemon.value = null
    }

    const savePokemon = (editedPokemon) => {
      const index = pokemons.value.findIndex(p => p.id === editedPokemon.id)
      if (index !== -1) {
        pokemons.value[index] = {...pokemons.value[index], ...editedPokemon}
        pokemons.value = [...pokemons.value] // Trigger reactivity
        filteredPokemons.value = filteredPokemons.value.map(p => 
          p.id === editedPokemon.id ? {...p, ...editedPokemon} : p
        )
      }
      closeModel()
    }

    return {
      pokemons,
      displayedPokemons,
      selectedPokemon,
      showModel,
      hasMorePokemons,
      selectPokemon,
      closeModel,
      savePokemon,
      updateFilteredPokemons,
      loadMorePokemons
    }
  }
}
</script>

<style src="@/assets/styles/pokemonsView.css" scoped></style>