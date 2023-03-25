<template>
  <div class="flex justify-content-end">
    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText
        type="text"
        class="p-inputtext-lg"
        v-model="filter"
        placeholder="Pesquisar personagem"
      />
    </span>
  </div>
  <DataTable
    :value="listaPersonagens"
    tableStyle="min-width: 50rem"
    :loading="loading"
    :globalFilterFields="['name']"
  >
    <template #empty> Nenhum registro encontrado. </template>
    <template #loading> Carregando registros. Aguarde ... </template>

    <Column field="name" header="Nome"></Column>
  </DataTable>
  <Paginator
    v-if="!loading"
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
      filter: "",
      loading: false,
    };
  },
  mounted() {
    this.$service = "http://localhost:3000/star_wars/characters";
    this.load();
  },
  watch: {
    filter(newValue) {
      newValue !== "" ? this.search() : this.load();
    },
  },
  methods: {
    async load() {
      this.loading = true;
      const { data } = await axios.get(this.$service, {});
      this.listaPersonagens = data;
      this.loading = false;
    },
    async otherPage() {
      this.loading = true;
      const { data } = await axios.get(
        `${this.$service}/otherPage/${this.page + 1}`,
        {}
      );
      this.listaPersonagens = data;
      this.loading = false;
    },
    async search() {
      this.loading = true;
      const { data } = await axios.get(
        `${this.$service}/search/${this.filter}`,
        {}
      );
      this.listaPersonagens = data;
      this.loading = false;
    },
  },
};
</script>
  
<style scoped>
</style>
  