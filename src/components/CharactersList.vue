<template>
  <DataTable :value="listaPersonagens" tableStyle="min-width: 50rem">
    <Column field="name" header="Nome"></Column>
  </DataTable>
  <Paginator
    :rows="1"
    v-model:first="page"
    :totalPages="82"
    :totalRecords="9"
    @page="otherPage($event)"
    template="PrevPageLink PageLinks NextPageLink CurrentPageReport"
    currentPageReportTemplate="Página {currentPage} de {totalPages}"
  />
</template>
  
<script>
import axios from "axios";

export default {
  name: "CharactersList",
  data() {
    return {
      listaPersonagens: [],
      page: 0,
    };
  },
  mounted() {
    this.$service = "http://localhost:3000/star_wars/characters";
    this.load();
  },
  methods: {
    async load() {
      const { data } = await axios.get(this.$service, {});
      this.listaPersonagens = data;
    },
    async otherPage() {
      const { data } = await axios.get(
        `${this.$service}/otherPage/${this.page + 1}`,
        {}
      );
      this.listaPersonagens = data;
    },
  },
};
</script>
  
<style scoped>
</style>
  