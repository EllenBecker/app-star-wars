<template>
  <Toast/>
  <CharactersList/>
</template>

<script>
import CharactersList from './components/CharactersList.vue';

export default {
  name: 'App',
  components: {
    CharactersList
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
  margin-top: 50px;
  padding: 30px;
}
</style>
