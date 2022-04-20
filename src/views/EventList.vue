<template>
  <div class="home">
    <h1 data-testid="event-list-title">Events for Good</h1>
    <router-link
      class="event-link"
      v-for="event in events"
      :key="event.id"
      :to="{ name: 'EventDetails', params: { id: event.id } }"
    >
      <EventCard data-testid="event" :event="event" />
    </router-link>
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        v-if="page > 1"
        >&#60; Prev</router-link
      >
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        v-if="hasNextPage"
        >Next &#62;</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import store2 from '@/store2'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  // Os props são usados apenas para criar os RouterLinks de paginação
  // então temos ROUTE (query params OU route meta fields) > COMPONENT SCRIPT (props) > COMPONENT TEMPLATE (pagination RouterLinks)
  // RouterLinks só podem acessar props do componente
  props: {
    perPage: {
      type: Number,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    hasNextPage() {
      return this.$store.state.eventsCount > this.page * this.perPage
    },
    events() {
      return this.$store.state.events
    },
    eventsCount() {
      return this.$store.state.eventsCount
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteEnter()`)
    // O beforeRouteEnter não pode acessar os props do componente pois este nem existe ainda
    // mas pode acessar os query parameters ou na ausência destes, os route meta fields
    // para despachar uma action no Vuex store
    store2
      .dispatch('fetchEvents', {
        perPage: parseInt(to.query.limit || to.meta.perPageDefault),
        page: parseInt(to.query.page || to.meta.pageDefault),
      })
      .then(() => {
        next((vm) => {
          console.log(
            `${from.name} > ${to.name}\tin-component\tbeforeRouteEnter() CALLBACK do next executado.`
          )
          console.log(`\tvm.$options.name === '${vm.$options.name}'`)
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
      .finally(() => {
        console.log(
          'in-component beforeRouteEnter() de EventList: despacho de ação do Vuex settled'
        )
      })
  },
  beforeRouteUpdate(to, from, next) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteUpdate()`)
    // Em suma: os queryParams (ou na ausência destes, os route meta fields) são alimentados tanto
    // nos props do componente, quanto nos in-component route navigation guards
    // Os props por sua vez alimentam a paginação do template, e os route navigation guards
    // alimentam chamadas ao store Vuex, que retornarão os eventos.
    this.$store
      .dispatch('fetchEvents', {
        perPage: parseInt(to.query.limit || to.meta.perPageDefault),
        page: parseInt(to.query.page || to.meta.pageDefault),
      })
      .then(() => {
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
      .finally(() => {
        console.log(`in-component beforeRouteUpdate() de EventList: despacho de ação do Vuex settled.
    \tthis.eventsCount === ${this.eventsCount}`)
      })
  },
  beforeRouteLeave(to, from) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteLeave()`)
  },
  beforeCreate() {
    console.log(`${this.$options.name} * beforeCreate()`)
  },
  created() {
    console.log(`${this.$options.name} * created()`)
  },
  beforeMount() {
    console.log(`${this.$options.name} * beforeMount()`)
  },
  mounted() {
    console.log(`${this.$options.name} * mounted()`)
  },
  beforeUpdate() {
    console.log(`${this.$options.name} * beforeUpdate()`)
  },
  updated() {
    console.log(`${this.$options.name} * updated()`)
  },
  beforeUnmount() {
    console.log(`${this.$options.name} * beforeUnmount()`)
  },
  unmounted() {
    console.log(`${this.$options.name} * unmounted()`)
  },
  activated() {
    console.log(`${this.$options.name} * activated()`)
  },
  deactivated() {
    console.log(`${this.$options.name} * deactivated()`)
  },
  errorCaptured() {
    console.log(`${this.$options.name} * errorCaptured()`)
  },
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
