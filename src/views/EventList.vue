<template>
  <div class="home">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
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
import EventService from '@/services/EventService.js'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  props: {
    perPage: {
      type: Number,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      events: null,
      eventsCount: 0,
    }
  },
  computed: {
    hasNextPage() {
      return this.eventsCount > this.page * this.perPage
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteEnter()`)
    EventService.getEvents(
      parseInt(to.query.limit) || 2,
      parseInt(to.query.page) || 1
    )
      .then((response) => {
        next((vm) => {
          console.log(
            `${from.name} > ${to.name}\tin-component\tbeforeRouteEnter() CALLBACK do next executado.`
          )
          console.log(`\tvm.$options.name === '${vm.$options.name}'`)
          vm.events = response.data
          vm.eventsCount = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
  },
  beforeRouteUpdate(to, from, next) {
    console.log(`${from.name} > ${to.name}\tin-component\tbeforeRouteUpdate()`)
    EventService.getEvents(
      parseInt(to.query.limit) || 2,
      parseInt(to.query.page) || 1
    )
      .then((response) => {
        this.events = response.data
        this.eventsCount = response.headers['x-total-count']
        next()
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
      .finally(() => {
        console.log(`in-component beforeRouteUpdate de EventList Chamada à API resolvida.
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
