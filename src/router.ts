import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth'

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
      meta: {
        needsLogIn: true,
      },
      component: () => import('@/pages/coaches/CoachRegistration.vue'),
    },
    {
      name: 'requests',
      path: '/requests',
      meta: {
        needsLogIn: true,
      },
      component: () => import('@/pages/requests/RequestsReceived.vue'),
    },
    {
      name: 'auth',
      path: '/auth',
      meta: {
        needsLogOut: true,
      },
      component: () => import('@/pages/auth/UserAuth.vue'),
    },
    {
      name: 'not-found',
      path: '/:notFound(.*)',
      component: () => import('@/pages/NotFound.vue'),
    },
  ],
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  if (to.meta.needsLogIn && !authStore.isLoggedIn) {
    return next({ name: 'auth' })
  } else if (to.meta.needsLogOut && authStore.isLoggedIn) {
    return next({ name: 'coaches' })
  }
  next()
})
