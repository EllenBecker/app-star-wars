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
    this.$service = `${process.env.API_BASE_URL}/star_wars/films`;
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      for (const film of this.films) {
        try {
          const idFilm = film.split("/").slice(-2, -1)[0];
          const { data } = await axios.get(`${this.$service}/${idFilm}`, {});
          this.listFilms.push(data);
        } catch (err) {
          this.$toast.add({
            severity: "error",
            summary: "Erro ao buscar filmes!",
            detail: err,
            life: 3000,
          });
          this.loading = false;
          return;
        }
      }
      this.loading = false;
    },
  },
};
</script>
  
<style scoped>
</style>
  