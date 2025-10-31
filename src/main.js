import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './stores'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
