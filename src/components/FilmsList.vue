<template>
  <DataTable :value="listFilms" :loading="loading">
    <template #empty> Nenhum registro encontrado. </template>
    <Column field="title" header="Título"></Column>
    <Column field="release_date" header="Data de lançamento"></Column>
  </DataTable>
</template>
  
<script>
import axios from "axios";

export default {
  name: "FilmsList",
  props: {
    films: {
      type: Array,
    },
  },
  data() {
    return {
      listFilms: [],
      loading: false,
    };
  },
  mounted() {
    this.$service = "http://localhost:3000/star_wars/films";
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      for (const film of this.films) {
        const idFilm = film.substring(27).replaceAll("/", "");
        const { data } = await axios.get(`${this.$service}/${idFilm}`, {});
        this.listFilms.push(data);
      }
      this.loading = false;
    },
  },
};
</script>
  
<style scoped>
</style>
  