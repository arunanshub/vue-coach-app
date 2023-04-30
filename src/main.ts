import App from '@/App.vue'
import { router } from '@/router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'
import NavLink from '@/components/custom/NavLink.vue'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .use(router)
  .component('NavLink', NavLink)
  .mount('#app')
