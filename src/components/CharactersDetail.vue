<template>
  <Dialog
    modal
    header="Detalhes do personagem"
    :style="{ width: '30vw' }"
    :closable="false"
  >
    <table
      align="left"
      border="0"
      cellpadding="0"
      cellspacing="10"
      style="width: 28vw"
    >
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
    <template #footer>
      <Button label="Voltar" icon="pi pi-check" @click="$emit('onClose')" />
    </template>
  </Dialog>
</template>
  
<script>
export default {
  emits: ["onClose"],
  name: "CharactersDetail",
  props: {
    character: {
      type: Object,
    }
  }
};
</script>
  
<style scoped>
</style>
  