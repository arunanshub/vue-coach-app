import { createRouter, createWebHistory } from 'vue-router'

import NotFound from '@/components/nav/NotFound.vue'
import TeamsList from '@/components/teams/TeamsList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'teams',
      path: '/teams',
      meta: { needsAuth: true },
      components: {
        default: TeamsList,
        footer: () => import('@/components/teams/TeamsFooter.vue'),
      },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          props: true,
          component: () => import('@/components/teams/TeamMembers.vue'),
        },
      ],
    },
    {
      name: 'users',
      path: '/users',
      components: {
        default: () => import('@/components/users/UsersList.vue'),
        footer: () => import('@/components/users/UsersFooter.vue'),
      },
      props: true,
      beforeEnter(to, from, next) {
        console.log(to, from)
        console.log('before userenter')
        next()
      },
    },
    {
      path: '/:catchAll(.*)',
      component: NotFound,
    },
  ],
  linkActiveClass: 'active',
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0 }
  },
})

export default router
