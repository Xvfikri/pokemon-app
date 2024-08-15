<template>
  <img alt="logo" src="./assets/pokemonlogo.png" class="logo">
  <SearchView />
  <Suspense>
    <template #default>
      <PokemonsView />
    </template>
    <template #fallback>
      <LoadingView />
    </template>
  </Suspense>
</template>

<script>
import LoadingView from './components/LoadingView.vue';
import PokemonsView from './components/PokemonsView.vue';

export default {
  name: 'App',
  components: {
    PokemonsView,
    LoadingView,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo{
  height: 200px;
}
</style>