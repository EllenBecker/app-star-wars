<template>
  <DataTable
    :value="listaPersonagens"
    tableStyle="min-width: 50rem"
    :loading="loading"
    :globalFilterFields="['name']"
  >
    <template #empty> Nenhum registro encontrado. </template>
    <template #loading> Carregando registros. Aguarde ... </template>

    <template #header>
      <table
        align="center"
        border="0"
        cellpadding="1"
        cellspacing="10"
        style="width: 100%"
      >
        <tbody>
          <tr>
            <td>
              <span class="font-bold text-5" style="font-size: 30px"
                >Lista de Personagens do Star Wars</span
              >
            </td>
            <td>
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  type="text"
                  class="p-inputtext-lg"
                  v-model="filter"
                  placeholder="Pesquisar"
                />
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <Column field="name" header="Nome"></Column>
    <Column headerStyle="width: 5rem">
      <template #body="{ data }">
        <Button
          type="button"
          icon="pi pi-window-maximize"
          text
          size="large"
          @click="openDialog(data)"
        />
      </template>
    </Column>
    <template #footer>
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
  </DataTable>

  <CharactersDetail
    v-if="openDialogDetails"
    v-model:visible="openDialogDetails"
    :character="character"
    @onClose="onClose()"
  ></CharactersDetail>
</template>
  
<script>
import axios from "axios";
import CharactersDetail from "./CharactersDetail.vue";

export default {
  name: "CharactersList",
  components: {
    CharactersDetail,
  },
  data() {
    return {
      listaPersonagens: [],
      page: 0,
      filter: "",
      loading: false,
      character: {},
      openDialogDetails: false,
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
    openDialog(data) {
      this.character = data;
      this.openDialogDetails = true;
    },
    onClose() {
      this.openDialogDetails = false;
      this.character = {};
    },
  },
};
</script>
  
<style scoped>
</style>
  