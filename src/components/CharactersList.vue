<template>
    <Button label="Listar Personagens" @click="listarPersonagens"/>
        <DataTable :value="listaPersonagens" v-if="this.listaPersonagens.length" tableStyle="min-width: 50rem">
            <Column field="name" header="Nome"></Column>
            <Column field="birth_year" header="Ano de Aniversario"></Column>
            <Column field="gender" header="Genero"></Column>
            <Column field="eye_color" header="Cor dos olhos"></Column>
        </DataTable>
</template>
  
<script>
import axios from 'axios';

export default {
    name: 'CharactersList',
    data() {
        return {
            listaPersonagens: []
        }
    },
    methods: {
        async listarPersonagens() {
            const { data } = await axios.get("http://localhost:3000/star_wars", {});
            this.listaPersonagens = data;
            return this.listaPersonagens;
        }
    }
};
</script>
  
<style scoped>

</style>
  