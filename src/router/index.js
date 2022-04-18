import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
  NavigationFailureType,
} from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventDetails from '@/views/event/Details.vue'
import EventRegister from '@/views/event/Register.vue'
import EventEdit from '@/views/event/Edit.vue'
import EventCreate from '@/views/EventCreate.vue'
import EventLayout from '@/views/event/Layout.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import ErrorDisplay from '@/views/ErrorDisplay.vue'
import NProgress from 'nprogress'
import GStore from '@/store'
import store2 from '@/store2'
import RandomNumber from '@/components/RandomNumber.vue'

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
    meta: {
      //criei esses route meta fields para unificar em um só lugar os valores padrão de paginação e chamada à API, retirando os hardcoded do componente EventList
      perPageDefault: 2,
      pageDefault: 1,
    },
    props: (route) => ({
      //query parameters (ou na ausência destes, route meta fields) viram props, os quais o componente usará para criar os links de paginação
      perPage: parseInt(route.query.limit || route.meta.perPageDefault),
      page: parseInt(route.query.page || route.meta.pageDefault),
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
    path: '/create',
    name: 'EventCreate',
    component: EventCreate,
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    component: EventLayout,
    beforeEnter: (to, from) => {
      console.log(
        `${from.name} > ${to.name}\tper-route\tbeforeEnter() em EventLayout`
      )
      return store2
        .dispatch('fetchEvent', to.params.id)
        .then(() => {})
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
          console.log(`per-route beforeEnter de 'EventLayout': despacho de ação do Vuex settled.
\tstore2.state.event.title === ${
            store2.state.event && store2.state.event.title
          }`)
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
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: ErrorDisplay,
  },
  {
    path: '/random-number',
    name: 'RandomNumber',
    component: RandomNumber,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition) //PROBLEMA!!! se eu andar da 1a à 3a página e voltar no botão do browser, a savedPosition da 2a página vem zerada, mas a da 1a página vem recuperada ok.
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
    //eu usaria from.name para identificar uma navegação direta para a URL, mas o curso usa from.href
    if (from.href) {
      //esta navegação veio de uma outra página
      return false
    } else {
      //esta navegação veio de uma URL direta
      return { path: '/' }
    }
  }
})

router.beforeResolve((to, from) => {
  console.log(`${from.name} > ${to.name}\tglobal\t\tbeforeResolve()`)
})

router.afterEach((to, from, failure) => {
  console.log(`${from.name} > ${to.name}\tglobal\t\tafterEach()`)

  if (isNavigationFailure(failure)) {
    console.log('the navigation failed')
  }

  if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    console.log(
      'it was aborted (meaning a navigation guard returned false or called next(false)):',
      failure
    )
  }

  if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
    console.log(
      'it was cancelled (meaning a new navigation took place before the current navigation could finish. e.g. router.push was called while waiting inside of a navigation guard.)',
      failure
    )
  }

  if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
    console.log(
      'it was duplicated (meaning the navigation was prevented because we are already at the target location):',
      failure
    )
  }

  NProgress.done()
})

export default router
