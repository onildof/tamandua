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
import NProgress from 'nprogress'

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
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    EventService.getEvents(
      parseInt(routeTo.query.limit) || 2,
      parseInt(routeTo.query.page) || 1
    )
      .then((response) => {
        next((component) => {
          component.events = response.data
          component.eventsCount = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
      .finally(() => {
        NProgress.done()
      })
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    NProgress.start()
    EventService.getEvents(
      parseInt(routeTo.query.limit) || 2,
      parseInt(routeTo.query.page) || 1
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
        NProgress.done()
      })
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
