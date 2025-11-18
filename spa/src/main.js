import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vSelect from 'vue-select'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia();
app.use(pinia)
app.use(router)
app.component('v-select', vSelect)

app.mount('#app')
