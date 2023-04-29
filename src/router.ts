import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '@/pages/NotFound.vue'
import CoachDetail from '@/pages/coaches/CoachDetail.vue'
import CoachRegistration from '@/pages/coaches/CoachRegistration.vue'
import CoachesList from '@/pages/coaches/CoachesList.vue'
import ContactCoach from '@/pages/requests/ContactCoach.vue'
import RequestsReceived from '@/pages/requests/RequestsReceived.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { name: 'coaches', path: '/coaches', alias: '/', component: CoachesList },
    {
      name: 'coach',
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ name: 'contact', path: 'contact', component: ContactCoach }],
    },
    { name: 'register', path: '/register', component: CoachRegistration },
    { name: 'requests', path: '/requests', component: RequestsReceived },
    { name: 'not-found', path: '/:notFound(.*)', component: NotFound },
  ],
})
