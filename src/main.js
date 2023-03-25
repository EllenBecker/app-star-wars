import { createApp } from 'vue';
import App from './App.vue';

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Paginator from 'primevue/paginator';
import InputText from 'primevue/inputtext';

const app = createApp(App);
app.use(PrimeVue);
/* eslint-disable */
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Paginator', Paginator);
app.component('InputText', InputText);

app.mount('#app');
