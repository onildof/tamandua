import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventLayout from '@/views/event/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/store'

const About = () => {
  console.log("resolving async component 'About'")
  return import(/* webpackChunkName: "about" */ '../views/About.vue')
}

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    beforeEnter: (to, from) => {
      console.log(`${from.name} > ${to.name}\tper-route\tbeforeEnter()`)
    },
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
    component: About,
    beforeEnter: (to, from) => {
      console.log(`${from.name} > ${to.name}\tper-route\tbeforeEnter()`)
    },
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    beforeEnter: (to, from) => {
      console.log(
        `${from.name} > ${to.name}\tper-route\tbeforeEnter() em EventLayout`
      )

      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data
        })
        .catch((error) => {
          if (error.request.status === 404) {
            return {
              name: 'ResourceNotFound',
              params: { resource: 'event' },
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
        .finally(() => {
          console.log(`per-route beforeEnter de 'EventLayout' Chamada à API resolvida.
\tGStore.event.title === ${GStore.event.title}`)
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails,
        beforeEnter: (to, from) => {
          console.log(
            `${from.name} > ${to.name}\tper-route\tbeforeEnter() em EventDetails`
          )
        },
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
        meta: { requireAuth: true },
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach((to, from) => {
  console.log(`${from.name} > ${to.name}\tglobal\t\tbeforeEach()`)
  NProgress.start()

  const notAuthorized = true //na prática se usaria uma chamada à biblioteca de authorização

  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'UNAUTHORIZED'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    console.log(from)

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.beforeResolve((to, from) => {
  console.log(`${from.name} > ${to.name}\tglobal\t\tbeforeResolve()`)
})

router.afterEach((to, from) => {
  console.log(`${from.name} > ${to.name}\tglobal\t\tafterEach()`)
  NProgress.done()
})

export default router
