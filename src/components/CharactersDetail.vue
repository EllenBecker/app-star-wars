<template>
  <Dialog
    modal
    header="Detalhes do personagem"
    :style="{ 'max-width': dialogMaxWidth }"
    :closable="false"
  >
    <div class="p-d-flex p-flex-column">
      <div class="p-dialog-content">
        <table>
          <tbody>
            <tr>
              <td><strong>Nome</strong>: {{ character.name }}</td>
              <td>
                <strong>Ano de Aniversário</strong>: {{ character.birth_year }}
              </td>
            </tr>
            <tr>
              <td><strong>Genero</strong>: {{ character.gender }}</td>
              <td><strong>Cor dos olhos</strong>: {{ character.eye_color }}</td>
            </tr>
          </tbody>
        </table>
        <Divider align="center" type="dotted">
          <b>Lista de Filmes</b>
        </Divider>
        <FilmsList :films="character.films" />
      </div>
    </div>
    <template #footer>
      <div class="p-dialog-footer p-d-flex p-jc-end">
        <Button label="Voltar" icon="pi pi-check" @click="$emit('onClose')" />
      </div>
    </template>
  </Dialog>
</template>
  
<script>
import FilmsList from "./FilmsList.vue";

export default {
  emits: ["onClose"],
  name: "CharactersDetail",
  components: {
    FilmsList,
  },
  props: {
    character: {
      type: Object,
    },
  },
  computed: {
    dialogMaxWidth() {
      return window.innerWidth > 576 ? "50vw" : "90vw";
    },
  },
};
</script>
  
<style scoped>
@media screen and (min-width: 576px) {
  .p-dialog-content {
    max-height: 70vh;
    overflow-y: auto;
  }
}
</style>
  