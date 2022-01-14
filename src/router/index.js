import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventLayout from '@/views/event/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({
      perPage: parseInt(route.query.limit) || 2,
      page: parseInt(route.query.page) || 1,
    }),
  },
  {
    path: '/about-us',
    name: 'About',
    alias: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      },
    ],
  },
  /*
  // REDIRECT WITH CHILDREN  
  {
    path: '/event/:id',
    redirect: (route) => {
      // não importa o nome que você dê ao argumento dessa função anônima, ele sempre será o objeto route
      return {
        name: 'EventLayout',
        params: { id: route.params.id },
      }
    },
    children: [
      {
        path: 'register',
        redirect: { name: 'EventRegister' },
      },
      {
        path: 'edit',
        redirect: { name: 'EventEdit' },
      },
    ],
  },*/
  // REDIRECT WITH WILDCARD
  {
    path: '/event/:afterEvent(.*)',
    redirect: (route) => ({
      path: `/events/${route.params.afterEvent}`,
    }),
  },
  {
    path: '/not-found/:resource',
    name: 'ResourceNotFound',
    component: NotFound,
    props: true,
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'ResourceNotFound', params: { resource: 'page' } },
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
