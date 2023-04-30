import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'coaches',
      path: '/coaches',
      alias: '/',
      component: () => import('@/pages/coaches/CoachesList.vue'),
    },
    {
      name: 'coach',
      path: '/coaches/:id',
      component: () => import('@/pages/coaches/CoachDetail.vue'),
      props: true,
      children: [
        {
          name: 'contact',
          path: 'contact',
          component: () => import('@/pages/requests/ContactCoach.vue'),
        },
      ],
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/pages/coaches/CoachRegistration.vue'),
    },
    {
      name: 'requests',
      path: '/requests',
      component: () => import('@/pages/requests/RequestsReceived.vue'),
    },
    {
      name: 'not-found',
      path: '/:notFound(.*)',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
})
