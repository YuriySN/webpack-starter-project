import './vendors'
import './main/common'
import '../pug/index.pug'
import '../scss/index.scss'

import { createApp } from 'vue'
import App from '../components/App.vue'

createApp(App).mount('#app')

// const app = createApp({});
// app.mount("#app");