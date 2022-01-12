<template>
  <div class="home">
    <h1>Events for Good</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event" />
    <router-link
      :to="{ name: 'EventList', query: { page: page - 1 } }"
      v-if="page > 1"
      >prev</router-link
    >
    <router-link :to="{ name: 'EventList', query: { page: page + 1 } }"
      >next</router-link
    >
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'

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
    }
  },
  created() {
    watchEffect(() => {
      this.events = null
      EventService.getEvents(this.perPage, this.page)
        .then((response) => {
          this.events = response.data
        })
        .catch((error) => {
          console.log(error)
        })
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
</style>
