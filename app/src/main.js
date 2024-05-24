import 'core-js';
import App from './App.vue';
import CoreuiVue from '@coreui/vue';
import { createApp } from 'vue';
import '@coreui/coreui/dist/css/coreui.min.css';

const app = createApp(App);

app.use(CoreuiVue);

app.mount('#app');
