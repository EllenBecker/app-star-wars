<template>
  <Toast />

  <DataTable
    :value="listCharacters"
    class="w-full"
    :loading="loading"
    :globalFilterFields="['name']"
  >
    <template #empty> Nenhum registro encontrado. </template>
    <template #header>
      <div class="flex flex-col md:flex-row items-center justify-between mb-4">
        <div>
          <span class="font-bold text-5" style="font-size: 30px"
            >Lista de Personagens do Star Wars</span
          >
        </div>
        <div class="mt-2 md:mt-0">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              type="text"
              class="p-inputtext-lg"
              v-model="filter"
              placeholder="Pesquisar"
            />
          </span>
        </div>
      </div>
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
      <div class="flex items-center justify-center mt-4">
        <Paginator
          v-if="!loading"
          :rows="perPage"
          :totalRecords="totalRecords"
          v-model:first="page"
          @page="otherPage($event)"
          template="PrevPageLink PageLinks NextPageLink CurrentPageReport"
          currentPageReportTemplate="Página {currentPage} de {totalPages}"
        />
      </div>
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
      listCharacters: [],
      page: 0,
      perPage: 1,
      totalRecords: 1,
      filter: "",
      loading: false,
      character: {},
      openDialogDetails: false,
    };
  },
  mounted() {
    this.$service = "http://localhost:3000/star_wars/characters";
    this.$serviceSearch = "http://localhost:3000/star_wars/characters/search";
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
      try {
        const { data } = await axios.get(this.$service, {});
        this.totalRecords = data?.totalPages;
        this.listCharacters = data?.items;
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Erro ao listar personagens!",
          detail: err,
          life: 3000,
        });
      }
      this.loading = false;
    },
    async otherPage() {
      this.loading = true;
      let url;
      if (this.filter) {
        url = `${this.$serviceSearch}/${this.filter}/otherPage/${
          this.page + 1
        }`;
      } else {
        url = `${this.$service}/otherPage/${this.page + 1}`;
      }
      try {
        const { data } = await axios.get(url, {});
        this.totalRecords = data?.totalPages;
        this.listCharacters = data?.items;
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Erro ao mudar de pagina!",
          detail: err,
          life: 3000,
        });
      }
      this.loading = false;
    },
    async search() {
      this.page = 0;
      this.page = 0;
      this.loading = true;
      try {
        const { data } = await axios.get(
          `${this.$serviceSearch}/${this.filter}`,
          {}
        );
        this.totalRecords = data?.totalPages;
        this.listCharacters = data?.items;
      } catch (err) {
        this.$toast.add({
          severity: "error",
          summary: "Erro ao fazer pesquisa!",
          detail: err,
          life: 3000,
        });
      }

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
  