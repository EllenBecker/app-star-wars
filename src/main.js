import { createApp } from 'vue';
import App from './App.vue';

import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/themes/lara-light-indigo/theme.css';

import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

const app = createApp(App);
app.use(PrimeVue);
/* eslint-disable */
app.component('Button', Button);
app.component('Dialog', Dialog);
app.mount('#app');
